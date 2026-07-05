import { db } from './metadata'

//this is to be able to access mainwindow
let _mainWindow = null

export function setMainWindow(win) {
  _mainWindow = win
}

//activity log table
db.exec(`
  CREATE TABLE IF NOT EXISTS activity_log (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    event_type   TEXT NOT NULL CHECK(event_type IN ('uploaded', 'downloaded', 'folder_created', 'deleted', 'error')),
    path         TEXT NOT NULL,
    size         INTEGER,
    occurred_at  INTEGER NOT NULL
  )
`)

// keep only last 7 days in activity log table on startup
db.prepare('DELETE FROM activity_log WHERE occurred_at < ?').run(
  Date.now() - 7 * 24 * 60 * 60 * 1000
)

export function logActivity({ event_type, path, size = null }) {
  db.prepare(
    `
    INSERT INTO activity_log (event_type, path, size, occurred_at)
    VALUES (@event_type, @path, @size, @occurred_at)
  `
  ).run({ event_type, path, size, occurred_at: Date.now() })
  //this emits an event whenever something is logged so that its displayed immediately in th ui
  if (_mainWindow && !_mainWindow.isDestroyed()) {
    _mainWindow.webContents.send('sync:updated')
  }
}

export function getRecentActivity() {
  return db.prepare('SELECT * FROM activity_log ORDER BY occurred_at DESC').all()
}

export function getSyncStatus() {
  const { count: pendingCount } = db
    .prepare("SELECT COUNT(*) as count FROM metadata WHERE state = 'pending'")
    .get()
  const { count: conflictCount } = db
    .prepare("SELECT COUNT(*) as count FROM metadata WHERE state = 'conflict'")
    .get()
  const { count: errorCount } = db
    .prepare("SELECT COUNT(*) as count FROM metadata WHERE state = 'error'")
    .get()
  const { ts: lastSyncedAt } = db
    .prepare("SELECT MAX(last_synced_at) as ts FROM metadata WHERE state = 'synced'")
    .get()

  let status = 'synced'
  if (errorCount > 0) status = 'error'
  if (conflictCount > 0) status = 'conflict'
  if (pendingCount > 0) status = 'pending'

  return { status, pendingCount, conflictCount, errorCount, lastSyncedAt }
}
