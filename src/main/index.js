import { app, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { optimizer, is } from '@electron-toolkit/utils'
import { initSession, registerAuthHandlers } from './auth'
import { registerFileHandlers } from './files'
import { registerSettingsHandlers } from './settings'
import { registerSyncHandlers } from './sync'
import { setMainWindow } from './db/activityLog'
import { registerActivityLogHandlers } from './activity'
import { createTray, destroyTray, setTrayState } from './tray'

let isQuitting = false

let mainWindow
function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 950,
    minHeight: 750,
    //     show: false,
    autoHideMenuBar: true,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js')
      //       sandbox: false
    },
    icon: join(__dirname, '../../build/icon.ico')
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  // minimize to tray on close
  mainWindow.on('close', (e) => {
    if (!isQuitting) {
      e.preventDefault()
      mainWindow.hide()
    }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(() => {
  //Electron extra config. TODO: uncomment when done
  // Set app user model id for windows
  // electronApp.setAppUserModelId('com.electron')
  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()
  // get session
  initSession()

  registerAuthHandlers(ipcMain)

  registerFileHandlers(ipcMain)

  registerSettingsHandlers(ipcMain)

  registerSyncHandlers(ipcMain, mainWindow, {
    onSyncStatus: ({ syncing, error }) => {
      if (syncing) setTrayState('syncing')
      else if (error) setTrayState('error')
      else setTrayState('idle')
    }
  })

  registerActivityLogHandlers(ipcMain)

  setMainWindow(mainWindow)

  createTray(mainWindow, {
    onShowSettings: () => {
      if (!mainWindow.isDestroyed()) {
        mainWindow.webContents.send('app:navigate', '/settings')
      }
    }
  })
})

app.on('window-all-closed', () => {
  // empty so that the tray keeps running
})

//for macOS
app.on('activate', () => {
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.show()
    mainWindow.focus()
  }
})

app.on('before-quit', () => {
  isQuitting = true
  destroyTray()
})
