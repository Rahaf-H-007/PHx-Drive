import axios from 'axios'
import https from 'https'
import { getCookieHeader } from './auth'

const BASE_URL = import.meta.env.MAIN_VITE_FRAPPE_URL

export async function getHomeId() {
  //get user details from cookie
  const cookie = getCookieHeader()

  if (!cookie) {
    throw new Error('Not authenticated')
  }

  const response = await axios.get(`${BASE_URL}/method/drive.api.files.get_home_folder_id`, {
    headers: {
      Cookie: cookie
    },
    httpsAgent: new https.Agent({
      rejectUnauthorized: false
    })
  })

  return response.data.message
}

//get home folder id
export function registerFileHandlers(ipcMain) {
  ipcMain.handle('get-home-id', async () => {
    try {
      const homeId = await getHomeId()
      return { success: true, homeId }
    } catch (err) {
      return { success: false, error: err.message }
    }
  })
}

//TODO
//list files in home folder
