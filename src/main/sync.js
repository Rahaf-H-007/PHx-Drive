import { getAllFiles } from './db/metadata'
import { loadSettings } from './settings'
import { deleteRemoteItem, downloadItem, keepLocalItem, trackItem, uploadItem } from './sync-crud'
import { compareSnapshots } from './sync-diff'
import { scanLocal, scanRemote } from './sync-scanner'

export async function registerSyncHandlers(ipcMain) {
  ipcMain.handle('sync:manual', async () => {
    const settings = await loadSettings()
    await syncFolder(settings.syncFolder)

    return {
      success: true
    }
  })
}

export async function syncFolder(syncFolderPath, mode = 'normal') {
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

      default:
        console.warn(`Unknown operation: ${operation.type}`)
    }
  }
}
