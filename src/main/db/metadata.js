import Database from 'better-sqlite3'
import path from 'path'
import { app } from 'electron'

// create db file if it doesnt exist
const db = new Database(path.join(app.getPath('userData'), 'metadata.db'))

db.exec(`
  CREATE TABLE IF NOT EXISTS metadata (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    path TEXT NOT NULL UNIQUE,
    content_hash TEXT,
    size INTEGER,
    remote_id TEXT,
    state TEXT NOT NULL DEFAULT 'pending' CHECK(state IN ('synced', 'pending', 'conflict', 'error')),
    last_synced_at INTEGER
  )
`)

// use named parameters so that @path matches with path in the object isnide .run
//what this means:
// insert this row. If a row with this path already exists,
// don't insert a duplicate and instead take the existing row
// and overwrite its content_hash, size, remote_id, , state, and last_synced_at
// with the new values.
export function updateFile({ path, content_hash, size, remote_id, state, last_synced_at }) {
  db.prepare(
    `
    INSERT INTO metadata (path, content_hash, size, remote_id,  state, last_synced_at)
    VALUES (@path, @content_hash, @size, @remote_id,  @state, @last_synced_at)
    ON CONFLICT(path) DO UPDATE SET
      content_hash   = excluded.content_hash,
      size           = excluded.size,
      remote_id      = excluded.remote_id,
      state          = excluded.state,
      last_synced_at = excluded.last_synced_at
  `
  ).run({ path, content_hash, size, remote_id, state: state ?? 'pending', last_synced_at })
}

export const getFile = (path) => db.prepare('SELECT * FROM metadata WHERE path = ?').get(path)
export const getAllFiles = () => db.prepare('SELECT * FROM metadata').all()
export const setState = (path, state) =>
  db.prepare('UPDATE metadata SET state = ? WHERE path = ?').run(state, path)
export const deleteFile = (path) => db.prepare('DELETE FROM metadata WHERE path = ?').run(path)
export const getRemoteId = (path) =>
  db.prepare('SELECT remote_id FROM metadata WHERE path = ?').get(path)?.remote_id
