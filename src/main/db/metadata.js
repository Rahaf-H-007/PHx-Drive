import Database from 'better-sqlite3'
import path from 'path'
import { app } from 'electron'

// create db file if it doesnt exist
export const db = new Database(path.join(app.getPath('userData'), 'metadata.db'))

const _meta = db
  .prepare("SELECT sql FROM sqlite_master WHERE type='table' AND name='metadata'")
  .get()

if (_meta && !_meta.sql.includes('online_only')) {
  db.exec(`
    BEGIN;
    ALTER TABLE metadata RENAME TO _metadata_backup;
    CREATE TABLE metadata (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      path TEXT NOT NULL UNIQUE,
      content_hash TEXT,
      size INTEGER,
      remote_id TEXT,
      state TEXT NOT NULL DEFAULT 'pending' CHECK(state IN (
        'synced', 'pending', 'conflict', 'error', 'remote_deleted', 'online_only'
      )),
      last_synced_at INTEGER
    );
    INSERT INTO metadata SELECT * FROM _metadata_backup;
    DROP TABLE _metadata_backup;
    COMMIT;
  `)
}

//metadata table
db.exec(`
  CREATE TABLE IF NOT EXISTS metadata (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    path TEXT NOT NULL UNIQUE,
    content_hash TEXT,
    size INTEGER,
    remote_id TEXT,
    state TEXT NOT NULL DEFAULT 'pending' CHECK(state IN (
      'synced', 'pending', 'conflict', 'error', 'remote_deleted', 'online_only'
    )),
    last_synced_at INTEGER
  )
`)

//reminder for me
// use named parameters so that @path matches with path in the object isnide .run
//what this means:
// insert this row. If a row with this path already exists,
// don't insert a duplicate and instead take the existing row
// and overwrite its content_hash, size, remote_id, , state, and last_synced_at
// with the new values.
//.prepare() - compiles sql into a reusable statement object that we can execute later
//.get() - executes the statement and returns one row
//.all() - executes the statement and returns all matching rows
//.run() - executes for statements that don't return rows(INSERT UPDATE DELETE)
//and parameters are values that will be used for placeholders
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
export function clearMetadata() {
  db.prepare('DELETE FROM metadata').run()
}
export const getRemoteDeletedFiles = () =>
  db.prepare("SELECT * FROM metadata WHERE state = 'remote_deleted'").all()
export const getOnlineOnlyFiles = () =>
  db.prepare("SELECT * FROM metadata WHERE state = 'online_only'").all()
export const getFileByRemoteId = (remote_id) =>
  db.prepare('SELECT * FROM metadata WHERE remote_id = ?').get(remote_id)
export const hasOnlineOnlyDescendants = (dirPath) =>
  db
    .prepare("SELECT COUNT(*) as count FROM metadata WHERE state = 'online_only' AND path LIKE ?")
    .get(`${dirPath}/%`).count > 0
export const getOnlineOnlyDescendants = (dirPath) =>
  db
    .prepare("SELECT * FROM metadata WHERE state = 'online_only' AND path LIKE ?")
    .all(`${dirPath}/%`)
