import { syncFolder } from './sync'

let pollTimer = null

export function startAutoSync(syncFolderPath, intervalMs = 10000) {
  if (pollTimer) return

  console.log(`Auto sync enabled, polling every ${intervalMs}ms`)

  syncFolder(syncFolderPath).catch((err) => console.error('Auto sync error:', err))

  pollTimer = setInterval(() => {
    syncFolder(syncFolderPath).catch((err) => console.error('Auto sync error:', err))
  }, intervalMs)
}

export function stopAutoSync() {
  if (pollTimer) {
    clearInterval(pollTimer)
    pollTimer = null
    console.log('Auto sync disabled')
  }
}
