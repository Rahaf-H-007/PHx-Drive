import { getAllFiles } from './db/metadata'
import { loadSettings } from './settings'
import {
  deleteLocalItem,
  deleteRemoteItem,
  downloadItem,
  reuploadItem,
  setNotifier,
  trackItem,
  uploadItem
} from './sync-crud'
import { compareSnapshots } from './sync-diff'
import { scanLocal, scanRemote } from './sync-scanner'
import {
  registerStorageHandlers,
  fetchStorageQuota,
  adjustQuotaCache,
  notifyQuotaExceeded
} from './stoargeQuota'
import { logActivity } from './db/activityLog'

let syncPromise = null
let _statusNotifier = () => {}

export function setSyncStatusNotifier(fn) {
  _statusNotifier = fn
}

export async function registerSyncHandlers(ipcMain, mainWindow) {
  registerStorageHandlers(ipcMain)

  // set once at startup
  setNotifier((payload) => {
    if (!mainWindow.isDestroyed()) {
      mainWindow.webContents.send('sync:file-state', payload)
    }
  })

  setSyncStatusNotifier((payload) => {
    if (!mainWindow.isDestroyed()) mainWindow.webContents.send('sync:status', payload)
  })

  ipcMain.handle('sync:manual', async () => {
    const settings = await loadSettings()
    await syncFolder(settings.syncFolder)
    return { success: true }
  })
}

export function syncFolder(syncFolderPath, mode = 'normal') {
  if (syncPromise) {
    console.log('Sync already in progress, skipping')
    return syncPromise
  }

  _statusNotifier({ syncing: true })

  syncPromise = runSync(syncFolderPath, mode).finally(() => {
    syncPromise = null
    _statusNotifier({ syncing: false })
  })

  return syncPromise
}

async function runSync(syncFolderPath, mode) {
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

  // fetch quota once per sync. If it fails, proceed without blocking uploads
  //with the start of every sync we will ignore the cache and ask frappe directly for the quota
  // (this is for if someone uplaoded a file on the frappe drive web app)
  let quota = null
  try {
    quota = await fetchStorageQuota({ forceRefresh: true })
    console.log(`[quota]: ${quota.used} / ${quota.limit} bytes used`)
  } catch (err) {
    console.warn('[quota]: could not fetch storage quota. sync will continue:', err.message)
  }

  // track current usage as ops complete so we dont need to make a new request after each file
  let currentUsed = quota?.used ?? 0

  for (const operation of operations) {
    //check for quoat before anything else
    if (quota) {
      //check for file sizes before upload operations
      if (operation.type === 'upload' && operation.item.type === 'file') {
        const fileSize = operation.item.size ?? 0
        //if file size exceeds log file as error in db and dont upload it
        // and continue uploading other files
        if (currentUsed + fileSize > quota.limit) {
          logActivity({ event_type: 'error', path: operation.item.path, size: fileSize })
          notifyQuotaExceeded({
            path: operation.item.path,
            fileSize,
            used: currentUsed,
            limit: quota.limit
          })
          console.warn(
            `[quota]: skipping upload because file would exceed limit: ${operation.item.path}`
          )
          continue
        }
      }

      //if reuploading(file is edited)
      if (operation.type === 'reupload') {
        //check file before and after editing
        const newSize = operation.local.size ?? 0
        const oldSize = operation.remote.size ?? 0
        //get net increase in storage
        // the delete in frees oldSize first(it will be filled again when reuploading)
        // so only block if the net increase still doesn't fit
        const netStoargeIncrease = newSize - oldSize

        //check against quota
        // if file gets smaller after editing it will always pass
        if (netStoargeIncrease > 0 && currentUsed + netStoargeIncrease > quota.limit) {
          logActivity({ event_type: 'error', path: operation.local.path, size: newSize })
          notifyQuotaExceeded({
            path: operation.local.path,
            fileSize: newSize,
            used: currentUsed,
            limit: quota.limit
          })
          console.warn(
            `[quota]: skipping reupload because file would exceed limit: ${operation.local.path}`
          )
          continue
        }
      }
    }

    switch (operation.type) {
      //now we just upload normally and calculate remaining quota
      case 'upload':
        await uploadItem(operation.item, syncFolderPath)
        if (quota && operation.item.type === 'file') {
          const fileSize = operation.item.size ?? 0
          currentUsed += fileSize
          adjustQuotaCache(fileSize)
        }
        break
      case 'download':
        await downloadItem(operation.item, syncFolderPath)
        break
      case 'track':
        await trackItem(operation.local, operation.remote)
        break
      case 'deleteRemote':
        //if deleting the bytes will be negative
        await deleteRemoteItem(operation.remote)
        if (quota && operation.remote.type === 'file') {
          const freed = operation.remote.size ?? 0
          currentUsed -= freed
          adjustQuotaCache(-freed)
        }
        break
      case 'deleteLocal':
        await deleteLocalItem(operation.local, syncFolderPath)
        break
      case 'reupload':
        await reuploadItem(operation.local, operation.remote, syncFolderPath)
        if (quota) {
          const fileSize = (operation.local.size ?? 0) - (operation.remote.size ?? 0)
          currentUsed += fileSize
          adjustQuotaCache(fileSize)
        }
        break
      default:
        console.warn(`Unknown operation: ${operation.type}`)
    }
  }
}

// lets settings:save wait for any sync (started by the old interval, against the old path)
// to fully finish before clearing metadata

export async function waitForSyncToFinish() {
  if (syncPromise) {
    await syncPromise.catch(() => {})
  }
}
