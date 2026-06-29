import { getAllFiles, updateFile, getRemoteId, deleteFile } from './db/metadata'
import { loadSettings } from './settings'
import { mkdir, writeFile, readdir, stat, readFile } from 'fs/promises'
import { join, relative, dirname, basename } from 'path'
import axios from 'axios'
import https from 'https'
import { getHomeId } from './files'
import { getCookieHeader } from './auth'
import { createHash, randomUUID } from 'crypto'
import { createReadStream } from 'fs'

const BASE_URL = import.meta.env.MAIN_VITE_FRAPPE_URL

export async function registerSyncHandlers(ipcMain) {
  ipcMain.handle('sync:manual', async () => {
    const settings = await loadSettings()
    await syncFolder(settings.syncFolder)

    return {
      success: true
    }
  })
}
async function syncFolder(syncFolderPath) {
  const localFiles = await scanLocal(syncFolderPath)
  const remoteFiles = await scanRemote()
  const dbFiles = getAllFiles()

  const operations = compareSnapshots(localFiles, remoteFiles, dbFiles)

  console.log(operations)

  for (const operation of operations) {
    switch (operation.type) {
      case 'upload':
        await uploadItem(operation.item, syncFolderPath)
        break

      case 'download':
        await downloadItem(operation.item, syncFolderPath)
        break

      case 'track':
        await trackItem(operation.local, operation.remote)
        break
      case 'deleteRemote':
        await deleteRemoteItem(operation.remote)
        break

      case 'keepLocal':
        await keepLocalItem(operation.local)
        break

      default:
        console.warn(`Unknown operation: ${operation.type}`)
    }
  }
}

export async function scanLocal(syncFolderPath) {
  const entries = []

  async function walk(currentDir) {
    const dirEntries = await readdir(currentDir, {
      withFileTypes: true
    })

    for (const entry of dirEntries) {
      const absolutePath = join(currentDir, entry.name)
      const relativePath = relative(syncFolderPath, absolutePath).replace(/\\/g, '/')

      if (entry.isDirectory()) {
        entries.push({
          path: relativePath,
          absolutePath,
          type: 'directory'
        })

        await walk(absolutePath)
      } else if (entry.isFile()) {
        const info = await stat(absolutePath)
        const contentHash = await hashFile(absolutePath)

        entries.push({
          path: relativePath,
          absolutePath,
          type: 'file',
          size: info.size,
          lastModified: info.mtimeMs,
          content_hash: contentHash
        })
      }
    }
  }

  await walk(syncFolderPath)

  return entries
}

export async function scanRemote() {
  const homeId = await getHomeId()
  const entries = []

  async function walk(folderId, currentPath = '') {
    const response = await axios.get(`${BASE_URL}/method/drive.api.list.files`, {
      params: {
        entity_name: folderId,
        is_active: 1,
        limit: 1000,
        favourites_only: false,
        recents_only: false,
        file_kind_list: '[]',
        tag_list: '[]'
      },
      headers: {
        Cookie: getCookieHeader()
      },
      httpsAgent: new https.Agent({
        rejectUnauthorized: false
      })
    })

    for (const item of response.data.message) {
      const relativePath = currentPath ? `${currentPath}/${item.title}` : item.title

      if (item.is_group) {
        entries.push({
          path: relativePath,
          type: 'directory',
          remote_id: item.name
        })

        await walk(item.name, relativePath)
      } else {
        entries.push({
          path: relativePath,
          type: 'file',
          remote_id: item.name,
          size: item.file_size
        })
      }
    }
  }

  await walk(homeId)

  return entries
}

export function compareSnapshots(localFiles, remoteFiles, dbFiles) {
  const operations = []

  const localMap = new Map(localFiles.map((file) => [file.path, file]))
  const remoteMap = new Map(remoteFiles.map((file) => [file.path, file]))
  const dbMap = new Map(dbFiles.map((file) => [file.path, file]))

  const allPaths = new Set([...localMap.keys(), ...remoteMap.keys(), ...dbMap.keys()])

  for (const path of allPaths) {
    const local = localMap.get(path)
    const remote = remoteMap.get(path)
    const db = dbMap.get(path)

    if (local && !remote && !db) {
      operations.push({
        type: 'upload',
        item: local
      })
    } else if (!local && remote && !db) {
      operations.push({
        type: 'download',
        item: remote
      })
    } else if (local && remote && !db) {
      operations.push({
        type: 'track',
        local,
        remote
      })

      // NEW
    } else if (!local && remote && db) {
      operations.push({
        type: 'deleteRemote',
        remote,
        db
      })
    } else if (local && !remote && db) {
      operations.push({
        type: 'keepLocal',
        local,
        db
      })
    }
  }

  return operations
}

async function uploadItem(item, syncFolderPath) {
  const parentPath = dirname(item.path)

  const parent = parentPath === '.' ? await getHomeId() : getRemoteId(parentPath)

  if (item.type === 'directory') {
    const response = await axios.post(
      `${BASE_URL}/method/drive.api.files.create_folder`,
      {
        title: basename(item.path),
        parent
      },
      {
        headers: {
          Cookie: getCookieHeader()
        },
        httpsAgent: new https.Agent({
          rejectUnauthorized: false
        })
      }
    )

    updateFile({
      path: item.path,
      content_hash: null,
      size: null,
      remote_id: response.data.message.name,
      version: null,
      state: 'synced',
      last_synced_at: Date.now()
    })

    console.log(`Created remote folder: ${item.path}`)
    return
  }

  const bytes = await readFile(join(syncFolderPath, item.path))

  const form = new FormData()

  form.append('uuid', randomUUID())
  form.append('chunk_index', '0')
  form.append('total_file_size', String(item.size))
  form.append('chunk_size', '20971520')
  form.append('total_chunk_count', '1')
  form.append('chunk_byte_offset', '0')
  form.append('last_modified', String(Date.now()))
  form.append('parent', parent)
  form.append('file', new Blob([bytes]), basename(item.path))

  const response = await axios.post(`${BASE_URL}/method/drive.api.files.upload_file`, form, {
    headers: {
      Cookie: getCookieHeader()
    },
    httpsAgent: new https.Agent({
      rejectUnauthorized: false
    })
  })

  updateFile({
    path: item.path,
    content_hash: item.content_hash,
    size: item.size,
    remote_id: response.data.message.name,
    state: 'synced',
    last_synced_at: Date.now()
  })

  console.log(`Uploaded file: ${item.path}`)
}

async function downloadItem(item, syncFolderPath) {
  const localPath = join(syncFolderPath, item.path)

  // Directories
  if (item.type === 'directory') {
    await mkdir(localPath, { recursive: true })
    updateFile({
      path: item.path,
      content_hash: null,
      size: null,
      remote_id: item.remote_id,

      state: 'synced',
      last_synced_at: Date.now()
    })

    console.log(`Created directory: ${item.path}`)
    return
  }

  // Ensure parent directory exists
  await mkdir(dirname(localPath), { recursive: true })

  const response = await axios.get(`${BASE_URL}/method/drive.api.files.get_file_content`, {
    params: {
      entity_name: item.remote_id,
      trigger_download: 1
    },
    headers: {
      Cookie: getCookieHeader()
    },
    responseType: 'arraybuffer',
    httpsAgent: new https.Agent({
      rejectUnauthorized: false
    })
  })

  await writeFile(localPath, response.data)
  const contentHash = await hashFile(localPath)
  updateFile({
    path: item.path,
    content_hash: contentHash,
    size: item.size,
    remote_id: item.remote_id,

    state: 'synced',
    last_synced_at: Date.now()
  })

  console.log(`Downloaded: ${item.path}`)
  console.log(localPath)
}

async function trackItem(local, remote) {
  updateFile({
    path: local.path,
    content_hash: local.type === 'file' ? local.content_hash : null,
    size: local.type === 'file' ? local.size : null,
    remote_id: remote.remote_id,
    state: 'synced',
    last_synced_at: Date.now()
  })

  console.log(`Tracking: ${local.path}`)
}

export function hashFile(filePath) {
  return new Promise((resolve, reject) => {
    const hash = createHash('sha256')
    const stream = createReadStream(filePath)

    stream.on('data', (chunk) => hash.update(chunk))
    stream.on('end', () => resolve(hash.digest('hex')))
    stream.on('error', reject)
  })
}

async function deleteRemoteItem(remote) {
  await axios.post(
    `${BASE_URL}/method/drive.api.files.remove_or_restore`,
    {
      entity_names: JSON.stringify([remote.remote_id])
    },
    {
      headers: {
        Cookie: getCookieHeader()
      },
      httpsAgent: new https.Agent({
        rejectUnauthorized: false
      })
    }
  )

  deleteFile(remote.path)

  console.log(`Moved to remote trash: ${remote.path}`)
}

async function keepLocalItem(local) {
  deleteFile(local.path)

  console.log(`Stopped tracking: ${local.path}`)
}
