import { app, safeStorage } from 'electron'
import { existsSync, readFileSync, writeFileSync, rmSync } from 'fs'
import { join } from 'path'
import axios from 'axios'
import https from 'https'

const BASE_URL = import.meta.env.MAIN_VITE_FRAPPE_URL
const SESSION_PATH = join(app.getPath('userData'), 'session.enc')
const EMAIL_PATH = join(app.getPath('userData'), 'user.enc')

// cookieHeader is private in this file
// handlers that need the cookie use getCookieHeader
//were using email to save user settings(in case user logs in woth different credentials)
let cookieHeader = null
let owner = null
let currentUserEmail = null

//save session and encrypt it
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
  } catch (err) {
    console.log(err)
    return null
  }
}

function clearSession() {
  if (existsSync(SESSION_PATH)) rmSync(SESSION_PATH)
}

//save email and encrypt it
function saveEmail(email) {
  const encrypted = safeStorage.encryptString(email)
  writeFileSync(EMAIL_PATH, encrypted)
}

function loadEmail() {
  if (!safeStorage.isEncryptionAvailable()) return null
  if (!existsSync(EMAIL_PATH)) return null
  try {
    const encrypted = readFileSync(EMAIL_PATH)
    return safeStorage.decryptString(encrypted)
  } catch {
    return null
  }
}

function clearEmail() {
  if (existsSync(EMAIL_PATH)) rmSync(EMAIL_PATH)
}

export function getCurrentUserEmail() {
  return currentUserEmail
}

// restore any saved session on startup
export function initSession() {
  cookieHeader = loadSession()
  currentUserEmail = loadEmail()
}

// get cookieHeader for other funtions (file handlers)
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

      //this gets full_name and replaces the synbols with a space
      owner = decodeURIComponent(
        cookies
          .find((c) => c.startsWith('full_name='))
          ?.split(';')[0]
          .split('=')[1]
          .replace(/\+/g, ' ') ?? ''
      )

      currentUserEmail = loggedUser.data.message
      saveEmail(currentUserEmail)

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
      currentUserEmail = response.data.message

      return { user: response.data.message, owner }
    } catch {
      cookieHeader = null
      clearSession()
      return null
    }
  })

  ipcMain.handle('profile:get-profile', async () => {
    if (!cookieHeader) return null
    const agent = new https.Agent({ rejectUnauthorized: false })
    try {
      const userId = decodeURIComponent(
        cookieHeader
          .split('; ')
          .find((c) => c.startsWith('user_id='))
          ?.split('=')[1] ?? ''
      )
      if (!userId) return null

      // Fetch user data, energy points, and rank all at once
      const [userRes, energyRes, rankRes] = await Promise.all([
        axios.post(
          `${BASE_URL}/method/frappe.client.get`,
          { doctype: 'User', name: userId },
          { headers: { Cookie: cookieHeader }, httpsAgent: agent }
        ),
        axios.post(
          `${BASE_URL}/method/frappe.social.doctype.energy_point_log.energy_point_log.get_user_energy_and_review_points`,
          { user: userId },
          { headers: { Cookie: cookieHeader }, httpsAgent: agent }
        ),
        axios.post(
          `${BASE_URL}/method/frappe.desk.page.user_profile.user_profile.get_user_rank`,
          { user: userId },
          { headers: { Cookie: cookieHeader }, httpsAgent: agent }
        )
      ])

      const userData = userRes.data?.message ?? {}
      const energyData = energyRes.data?.message ?? {}
      const rankData = rankRes.data?.message ?? {}

      // avatar in its own try catch because if it failed
      // it shouldn't block everythign else
      let avatarDataUrl = null
      if (userData.user_image) {
        try {
          const origin = new URL(BASE_URL).origin
          const imgRes = await axios.get(`${origin}${userData.user_image}`, {
            headers: { Cookie: cookieHeader },
            httpsAgent: agent,
            responseType: 'arraybuffer'
          })
          const base64 = Buffer.from(imgRes.data).toString('base64')
          const contentType = imgRes.headers['content-type']?.split(';')[0].trim() || 'image/jpeg'
          avatarDataUrl = `data:${contentType};base64,${base64}`
        } catch (imgErr) {
          console.error('[get-profile] avatar fetch failed:', imgErr.message)
        }
      }

      return {
        avatarDataUrl,
        fullName: userData.full_name ?? null,
        email: userData.email ?? userId,
        language: userData.language ?? null,
        timezone: userData.time_zone ?? null,
        country: userData.country ?? null,
        energyPoints: energyData.energy_points ?? 0,
        reviewPoints: energyData.review_points ?? 0,
        monthlyRank: rankData.monthly_rank ?? [],
        allTimeRank: rankData.all_time_rank ?? []
      }
    } catch (err) {
      console.error('[get-profile]', err.message)
      return null
    }
  })

  ipcMain.handle('logout', async () => {
    cookieHeader = null
    currentUserEmail = null
    clearEmail()
    clearSession()
    return { success: true }
  })
}
