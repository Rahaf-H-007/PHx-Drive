import { app, dialog, safeStorage } from 'electron'
import { join } from 'path'
import { existsSync, readFileSync, writeFileSync } from 'fs'
import { clearMetadata } from './db/metadata'
import { syncFolder, waitForSyncToFinish } from './sync'
import { startAutoSync, stopAutoSync } from './sync-file-watcher'
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

  ipcMain.handle('settings:save', async (_, settings) => {
    try {
      const previousSettings = loadSettings()
      const syncFolderChanged = previousSettings?.syncFolder !== settings.syncFolder

      // no new polls
      stopAutoSync()
      // finish whatever's currently running before touching metadata
      await waitForSyncToFinish()

      if (syncFolderChanged) {
        clearMetadata()
      }

      saveSettings(settings)

      console.log({
        previous: previousSettings?.syncFolder,
        current: settings.syncFolder,
        changed: syncFolderChanged
      })

      if (syncFolderChanged) {
        await syncFolder(settings.syncFolder, 'initialDownload')
      }

      if (settings.syncMode === 'automatic') {
        startAutoSync(settings.syncFolder)
      }

      return {
        success: true
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
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

  const settings = loadSettings()
  if (settings?.syncMode === 'automatic' && settings?.syncFolder) {
    startAutoSync(settings.syncFolder)
  }
}

export function saveSettings(settings) {
  const json = JSON.stringify(settings)

  const encrypted = safeStorage.encryptString(json)

  writeFileSync(SETTINGS_PATH, encrypted)
  // console.log(SETTINGS_PATH)
}

export function loadSettings() {
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
