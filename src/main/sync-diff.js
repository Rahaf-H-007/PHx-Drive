export function compareSnapshots(localFiles, remoteFiles, dbFiles, mode = 'normal') {
  const operations = []

  const localMap = new Map(localFiles.map((file) => [file.path, file]))
  const remoteMap = new Map(remoteFiles.map((file) => [file.path, file]))
  const dbMap = new Map(dbFiles.map((file) => [file.path, file]))

  const allPaths = new Set([...localMap.keys(), ...remoteMap.keys(), ...dbMap.keys()])

  for (const path of allPaths) {
    const local = localMap.get(path)
    const remote = remoteMap.get(path)
    const db = dbMap.get(path)

    if (local && !remote && !db) {
      if (mode === 'normal') {
        operations.push({
          type: 'upload',
          item: local
        })
      }
    } else if (!local && remote && !db) {
      if (remote.type === 'directory') {
        operations.push({ type: 'download', item: remote })
      } else {
        operations.push({ type: 'create_placeholder', item: remote })
      }
    } else if (local && remote && !db) {
      if (local.type === 'file' && local.size === 0 && (remote.size ?? 0) > 0) {
        operations.push({ type: 'create_placeholder', item: remote })
      } else {
        operations.push({ type: 'track', local, remote })
      }
    } else if (!local && remote && db) {
      operations.push({
        type: 'deleteRemote',
        remote,
        db
      })
    } else if (local && !remote && db) {
      // if its not flagged flag it otherwise do nothing
      if (db.state !== 'remote_deleted') {
        operations.push({ type: 'deleteLocal', local, db })
      }
    } else if (local && remote && db) {
      // detect placeholder even if DB state got out of sync ( after folder switch)
      const isPlaceholder =
        db.state === 'online_only' ||
        (local.type === 'file' && local.size === 0 && (remote.size ?? 0) > 0)

      if (isPlaceholder) {
        if (db.state !== 'online_only') {
          operations.push({ type: 'create_placeholder', item: remote })
        } else if (local.atime && local.atime > db.last_synced_at) {
          operations.push({ type: 'download', item: remote })
        }
      } else if (local.type === 'file' && local.content_hash !== db.content_hash) {
        operations.push({ type: 'reupload', local, remote })
      }
    }
  }
  return operations
}
