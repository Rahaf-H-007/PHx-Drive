import chokidar from 'chokidar'
import { syncFolder } from './sync'

let watcher
let syncTimer

export function startWatcher(syncFolderPath) {
  watcher = chokidar.watch(syncFolderPath, {
    ignoreInitial: true,
    persistent: true,
    awaitWriteFinish: {
      stabilityThreshold: 1000,
      pollInterval: 100
    }
  })
  console.log('Watching:', syncFolderPath)

  watcher.on('all', (event, path) => {
    console.log(event, path)
    clearTimeout(syncTimer)

    syncTimer = setTimeout(async () => {
      await syncFolder(syncFolderPath)
    }, 1000)
  })
}

export async function stopWatcher() {
  if (watcher) {
    await watcher.close()
    watcher = null
  }
}
