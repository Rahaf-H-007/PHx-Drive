import { app, dialog, safeStorage } from 'electron'
import { join } from 'path'
import { existsSync, readFileSync, writeFileSync } from 'fs'
import { clearMetadata } from './db/metadata'
import { syncFolder, waitForSyncToFinish } from './sync'
import { startAutoSync, stopAutoSync } from './sync-file-watcher'
import { shell } from 'electron'
import { getCurrentUserEmail } from './auth'
import { pathToFileURL } from 'url'

const DRIVE_WEB = import.meta.env.MAIN_VITE_DRIVE_HOME

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
      const email = getCurrentUserEmail()
      if (!email) return { success: false, error: 'Not logged in' }
      const previousSettings = loadSettings(email)
      const syncFolderChanged = previousSettings?.syncFolder !== settings.syncFolder

      // no new polls
      stopAutoSync()
      // finish whatever's currently running before touching metadata
      await waitForSyncToFinish()

      if (syncFolderChanged) {
        clearMetadata()
      }

      saveSettings(email, settings)

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
      const email = getCurrentUserEmail()
      if (!email) return { syncFolder: '', syncMode: 'manual' }
      return loadSettings(email) ?? { syncFolder: '', syncMode: 'manual' }
    } catch (err) {
      console.log(err)
      return {
        syncFolder: '',
        syncMode: 'manual'
      }
    }
  })

  const email = getCurrentUserEmail()
  const settings = email ? loadSettings(email) : null
  if (settings?.syncMode === 'automatic' && settings?.syncFolder) {
    startAutoSync(settings.syncFolder)
  }

  ipcMain.handle('links:open-guide', () => {
    const pdfPath = app.isPackaged
      ? join(process.resourcesPath, 'guide.pdf')
      : join(app.getAppPath(), 'resources', 'guide.pdf')

    shell.openExternal(pathToFileURL(pdfPath).toString())
  })

  ipcMain.handle('links:open-web-app', () => {
    shell.openExternal(`${DRIVE_WEB}`)
  })
}

function getSettingsPath(email) {
  // Sanitise the email so it's safe as a filename
  const safe = email.replace(/[^a-zA-Z0-9._-]/g, '_')
  return join(app.getPath('userData'), `settings-${safe}.enc`)
}

export function saveSettings(email, settings) {
  if (!email) throw new Error('Cannot save settings: no user email')
  const json = JSON.stringify(settings)
  const encrypted = safeStorage.encryptString(json)
  writeFileSync(getSettingsPath(email), encrypted)
}

export function loadSettings(email) {
  if (!email) return null
  if (!safeStorage.isEncryptionAvailable()) return null
  const path = getSettingsPath(email)
  if (!existsSync(path)) return null
  try {
    const encrypted = readFileSync(path)
    const json = safeStorage.decryptString(encrypted)
    return JSON.parse(json)
  } catch (err) {
    console.log(err)
    return null
  }
}
