import axios from 'axios'
import https from 'https'
import { getCookieHeader } from './auth'
import { getAllFiles } from './db/metadata'

const BASE_URL = import.meta.env.MAIN_VITE_FRAPPE_URL

//get home id to display its files
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

//get home folder id and diplay files inside it
export function registerFileHandlers(ipcMain) {
  ipcMain.handle('get-files', async () => {
    try {
      const homeFolder = await getHomeId()
      const response = await axios.get(`${BASE_URL}/method/drive.api.list.files`, {
        params: {
          entity_name: homeFolder,
          is_active: 1,
          limit: 60,
          favourites_only: false,
          recents_only: false,
          file_kind_list: '[]',
          tag_list: '[]'
        },
        headers: { Cookie: getCookieHeader() },
        httpsAgent: new https.Agent({ rejectUnauthorized: false })
      })

      const tracked = getAllFiles()
      // remove files that dont have a remote id and make each file an object
      // with the remote id as the key and the state as the value
      const stateByRemoteId = Object.fromEntries(
        tracked.filter((f) => f.remote_id).map((f) => [f.remote_id, f.state])
      )

      //take all properties from server and add state
      const files = response.data.message.map((f) => ({
        ...f,
        state: stateByRemoteId[f.name] ?? null
      }))

      return { success: true, message: files }
    } catch (err) {
      return { success: false, error: err.message }
    }
  })
}
