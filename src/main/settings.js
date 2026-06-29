import { app, dialog, safeStorage } from 'electron'
import { join } from 'path'
import { existsSync, readFileSync, writeFileSync } from 'fs'
const SETTINGS_PATH = join(app.getPath('userData'), 'settings.dat')

export function registerSettingsHandlers(ipcMain) {
  ipcMain.handle('sync-folder:select', async () => {
    const result = await dialog.showOpenDialog({
      properties: ['openDirectory'],
      title: 'Choose Sync Folder'
    })

    if (result.canceled) {
      return null
    }

    return result.filePaths[0]
  })

  ipcMain.handle('settings:save', (_, settings) => {
    try {
      saveSettings(settings)
      return {
        success: true
      }
    } catch (err) {
      return {
        success: false,
        error: err.message
      }
    }
  })

  ipcMain.handle('settings:load', async () => {
    try {
      return loadSettings()
    } catch (err) {
      console.log(err)
      return {
        syncFolder: '',
        syncMode: 'manual'
      }
    }
  })
}

function saveSettings(settings) {
  const json = JSON.stringify(settings)

  const encrypted = safeStorage.encryptString(json)

  writeFileSync(SETTINGS_PATH, encrypted)
  // console.log(SETTINGS_PATH)
}

function loadSettings() {
  if (!safeStorage.isEncryptionAvailable()) return null
  if (!existsSync(SETTINGS_PATH)) return null
  try {
    const encrypted = readFileSync(SETTINGS_PATH)
    const json = safeStorage.decryptString(encrypted)
    return JSON.parse(json)
  } catch (err) {
    console.log(err)
    return null
  }
}
