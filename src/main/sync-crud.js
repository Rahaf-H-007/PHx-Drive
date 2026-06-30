import { updateFile, getRemoteId, deleteFile } from './db/metadata'
import { mkdir, writeFile, readFile } from 'fs/promises'
import { join, dirname, basename } from 'path'
import axios from 'axios'
import https from 'https'
import { getHomeId } from './files'
import { getCookieHeader } from './auth'
import { randomUUID } from 'crypto'
import { hashFile } from './sync-scanner'

const BASE_URL = import.meta.env.MAIN_VITE_FRAPPE_URL

export async function uploadItem(item, syncFolderPath) {
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

export async function downloadItem(item, syncFolderPath) {
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

export async function trackItem(local, remote) {
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

export async function deleteRemoteItem(remote) {
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

export async function keepLocalItem(local) {
  deleteFile(local.path)

  console.log(`Stopped tracking: ${local.path}`)
}

//this is for edits done locally
//theres no direct edit endpoint on frappe
//so i chose to make it delete then reupload
export async function reuploadItem(local, remote, syncFolderPath) {
  await axios.post(
    `${BASE_URL}/method/drive.api.files.remove_or_restore`,
    { entity_names: JSON.stringify([remote.remote_id]) },
    {
      headers: { Cookie: getCookieHeader() },
      httpsAgent: new https.Agent({ rejectUnauthorized: false })
    }
  )

  await uploadItem(local, syncFolderPath)
  console.log(`Re-uploaded modified file: ${local.path}`)
}
