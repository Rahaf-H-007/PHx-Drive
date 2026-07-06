import axios from 'axios'
import https from 'https'
import { BrowserWindow } from 'electron'
import { getCookieHeader } from './auth'

const BASE_URL = import.meta.env.MAIN_VITE_FRAPPE_URL

// im not using actual cache these are just names
//if 30 seconds passed on the old quota info then a new request will be made
const cache_ttl = 15000
//this will have all quota info
let _cache = null
//this will be when the "cache" was made
let _cacheAt = 0

//  Fetches cache({ limit, used, available }) (all in bytes) from the two frappe quota endpoints
// forcerefresh means we ignore the cache and make a new request anyway
export async function fetchStorageQuota({ forceRefresh = false } = {}) {
  const now = Date.now()
  //if we're not forcing a refresh and we have a cache and the cache is still fresh
  // then return the cache
  if (!forceRefresh && _cache && now - _cacheAt < cache_ttl) {
    return _cache
  }

  //just so the request looks clean
  const agent = new https.Agent({ rejectUnauthorized: false })
  const headers = { Cookie: getCookieHeader() }

  //get quota
  const [limitRes, usedRes] = await Promise.all([
    axios.get(`${BASE_URL}/method/drive.api.storage.get_max_storage`, {
      headers,
      httpsAgent: agent
    }),
    axios.post(
      `${BASE_URL}/method/drive.api.storage.total_storage_used`,
      {},
      {
        headers,
        httpsAgent: agent
      }
    )
  ])

  const limit = limitRes.data.message.limit
  const used = usedRes.data.message[0]?.total_size ?? 0

  //cache and its time
  _cache = { limit, used, available: limit - used }
  _cacheAt = now

  return _cache
}

//delta is difference but i wrote delta because its shorter
//this function uses the cache to to calculate quota change instead of making new requests
// positive delta is for uplaods, negative is for delete(because delete would free up space)
export function adjustQuotaCache(bytesDelta) {
  if (!_cache) return
  //this is to prevent cache from having a negative value
  const newUsed = Math.max(0, _cache.used + bytesDelta)
  _cache = { ..._cache, used: newUsed, available: _cache.limit - newUsed }
}

export function invalidateQuotaCache() {
  _cache = null
  _cacheAt = 0
}

//this is to let the user know they exceeded quota
export function notifyQuotaExceeded({ path, fileSize, used, limit }) {
  const win = BrowserWindow.getAllWindows()[0]
  if (win && !win.isDestroyed()) {
    win.webContents.send('sync:quota-exceeded', { path, fileSize, used, limit })
  }
}

export function registerStorageHandlers(ipcMain) {
  ipcMain.handle('storage:get-quota', async () => {
    try {
      return await fetchStorageQuota()
    } catch (err) {
      console.error('Failed to fetch storage quota:', err.message)
      return null
    }
  })
}
