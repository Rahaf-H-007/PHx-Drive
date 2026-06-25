import { app, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import axios from 'axios'
import https from 'https'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'

let BASE_URL = import.meta.env.MAIN_VITE_FRAPPE_URL
let cookieHeader = ''

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 950,
    minHeight: 750,
    //     show: false,
    autoHideMenuBar: true,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js')
      //       sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

//Electron extra config. TODO: uncomment when done
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  //Electron extra config. TODO: uncomment when done
  // Set app user model id for windows
  // electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  ipcMain.handle('login', async (_, { email, password }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/method/login`,
        new URLSearchParams({
          usr: email,
          pwd: password
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          httpsAgent: new https.Agent({
            rejectUnauthorized: false
          })
        }
      )

      const cookies = response.headers['set-cookie']

      cookieHeader = cookies.map((c) => c.split(';')[0]).join('; ')

      const loggedUser = await axios.get(`${BASE_URL}/method/frappe.auth.get_logged_user`, {
        headers: {
          Cookie: cookieHeader
        },
        httpsAgent: new https.Agent({
          rejectUnauthorized: false
        })
      })

      return {
        success: true,
        user: loggedUser.data.message
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data.message || error.message
      }
    }
  })

  ipcMain.handle('get-users', async () => {
    try {
      const response = await axios.get(`${BASE_URL}/resource/User`, {
        headers: {
          Cookie: cookieHeader
        },
        httpsAgent: new https.Agent({
          rejectUnauthorized: false
        })
      })

      return response.data
    } catch (error) {
      throw new Error(error.message)
    }
  })
})

//TODO: uncomment when done
//extra config by electron
//   app.on('activate', function () {
//     // On macOS it's common to re-create a window in the app when the
//     // dock icon is clicked and there are no other windows open.
//     if (BrowserWindow.getAllWindows().length === 0) createWindow()
//   })
// })

// // Quit when all windows are closed, except on macOS. There, it's common
// // for applications and their menu bar to stay active until the user quits
// // explicitly with Cmd + Q.
// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') {
//     app.quit()
//   }
// })
