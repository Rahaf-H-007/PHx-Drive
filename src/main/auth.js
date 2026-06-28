import { app, safeStorage } from 'electron'
import { existsSync, readFileSync, writeFileSync, rmSync } from 'fs'
import { join } from 'path'
import axios from 'axios'
import https from 'https'

const BASE_URL = import.meta.env.MAIN_VITE_FRAPPE_URL

const SESSION_PATH = join(app.getPath('userData'), 'session.enc')

// cookieHeader is private in this file
// nothing outside can touch it directly
let cookieHeader = null
let owner = null

function saveSession(cookie) {
  const encrypted = safeStorage.encryptString(cookie)
  writeFileSync(SESSION_PATH, encrypted)
}

function loadSession() {
  if (!safeStorage.isEncryptionAvailable()) return null
  if (!existsSync(SESSION_PATH)) return null
  try {
    const encrypted = readFileSync(SESSION_PATH)
    return safeStorage.decryptString(encrypted)
  } catch {
    return null
  }
}

function clearSession() {
  if (existsSync(SESSION_PATH)) rmSync(SESSION_PATH)
}

// restore any saved session on startup
export function initSession() {
  cookieHeader = loadSession()
}

// get cookieHeader for other funtions (file handlers)
// without letting renderer access it
export function getCookieHeader() {
  return cookieHeader
}

export function registerAuthHandlers(ipcMain) {
  ipcMain.handle('login', async (_, { email, password }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/method/login`,
        new URLSearchParams({ usr: email, pwd: password }),
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          httpsAgent: new https.Agent({ rejectUnauthorized: false })
        }
      )

      const cookies = response.headers['set-cookie']
      cookieHeader = cookies.map((c) => c.split(';')[0]).join('; ')
      saveSession(cookieHeader)

      const loggedUser = await axios.get(`${BASE_URL}/method/frappe.auth.get_logged_user`, {
        headers: { Cookie: cookieHeader },
        httpsAgent: new https.Agent({ rejectUnauthorized: false })
      })

      owner = decodeURIComponent(
        cookies
          .find((c) => c.startsWith('full_name='))
          ?.split(';')[0]
          .split('=')[1]
          .replace(/\+/g, ' ') ?? ''
      )

      return { success: true, user: loggedUser.data.message, owner }
    } catch (error) {
      return { success: false, error: error.response?.data.message || error.message }
    }
  })

  ipcMain.handle('get-session', async () => {
    if (!cookieHeader) return null

    try {
      const response = await axios.get(`${BASE_URL}/method/frappe.auth.get_logged_user`, {
        headers: { Cookie: cookieHeader },
        httpsAgent: new https.Agent({ rejectUnauthorized: false })
      })

      owner = decodeURIComponent(
        cookieHeader
          .split('; ')
          .find((c) => c.startsWith('full_name='))
          ?.split('=')[1]
          .replace(/\+/g, ' ') ?? ''
      )
      console.log(owner)
      return { user: response.data.message, owner }
    } catch {
      cookieHeader = null
      clearSession()
      return null
    }
  })

  ipcMain.handle('logout', async () => {
    cookieHeader = null
    clearSession()
    return { success: true }
  })
}

// handlers that need the cookie use getCookieHeader
