import { readdir, stat } from 'fs/promises'
import { join, relative } from 'path'
import { createHash } from 'crypto'
import { createReadStream } from 'fs'
import axios from 'axios'
import https from 'https'
import { getCookieHeader } from './auth'
import { getHomeId } from './files'

const BASE_URL = import.meta.env.MAIN_VITE_FRAPPE_URL

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
          atime: info.atimeMs,
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
      // skip frappe files that don't have a download option
      if (item.mime_type === 'frappe_doc' || item.mime_type === 'frappe_whiteboard') {
        console.log(`Skipping unsupported Drive item: ${item.title} (${item.mime_type})`)
        continue
      }
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

export function hashFile(filePath) {
  return new Promise((resolve, reject) => {
    const hash = createHash('sha256')
    const stream = createReadStream(filePath)

    stream.on('data', (chunk) => hash.update(chunk))
    stream.on('end', () => resolve(hash.digest('hex')))
    stream.on('error', reject)
  })
}
