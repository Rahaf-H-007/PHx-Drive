import { getAllFiles } from './db/metadata'
import { loadSettings, saveSettings } from './settings'
import {
  deleteRemoteItem,
  downloadItem,
  keepLocalItem,
  reuploadItem,
  trackItem,
  uploadItem
} from './sync-crud'
import { compareSnapshots } from './sync-diff'
import { startAutoSync, stopAutoSync } from './sync-file-watcher'
import { scanLocal, scanRemote } from './sync-scanner'

export async function registerSyncHandlers(ipcMain) {
  ipcMain.handle('sync:manual', async () => {
    const settings = await loadSettings()
    await syncFolder(settings.syncFolder)

    return {
      success: true
    }
  })

  ipcMain.handle('sync:auto-enable', async () => {
    const settings = await loadSettings()
    await saveSettings({ ...settings, autoSyncEnabled: true })
    startAutoSync(settings.syncFolder)
    return { success: true }
  })

  ipcMain.handle('sync:auto-disable', async () => {
    const settings = await loadSettings()
    await saveSettings({ ...settings, autoSyncEnabled: false })
    stopAutoSync()
    return { success: true }
  })

  // Resume auto sync if it was left enabled the last time the app was open
  const settings = await loadSettings()
  if (settings.autoSyncEnabled) {
    startAutoSync(settings.syncFolder)
  }
}

let isSyncing = false

export async function syncFolder(syncFolderPath, mode = 'normal') {
  if (isSyncing) {
    console.log('Sync already in progress, skipping')
    return
  }
  isSyncing = true

  try {
    console.log('Sync started')
    const localFiles = await scanLocal(syncFolderPath)
    const remoteFiles = await scanRemote()
    const dbFiles = getAllFiles()

    const operations = compareSnapshots(localFiles, remoteFiles, dbFiles, mode)

    console.log({
      mode,
      local: localFiles.length,
      remote: remoteFiles.length,
      db: dbFiles.length,
      operations
    })

    for (const operation of operations) {
      switch (operation.type) {
        case 'upload':
          await uploadItem(operation.item, syncFolderPath)
          break
        case 'download':
          await downloadItem(operation.item, syncFolderPath)
          break
        case 'track':
          await trackItem(operation.local, operation.remote)
          break
        case 'deleteRemote':
          await deleteRemoteItem(operation.remote)
          break
        case 'keepLocal':
          await keepLocalItem(operation.local)
          break
        case 'reupload':
          await reuploadItem(operation.local, operation.remote, syncFolderPath)
          break
        default:
          console.log(`Unknown operation: ${operation.type}`)
      }
    }
  } finally {
    isSyncing = false
  }
}
