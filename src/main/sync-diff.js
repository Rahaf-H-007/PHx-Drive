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
      operations.push({
        type: 'download',
        item: remote
      })
    } else if (local && remote && !db) {
      operations.push({
        type: 'track',
        local,
        remote
      })
    } else if (!local && remote && db) {
      operations.push({
        type: 'deleteRemote',
        remote,
        db
      })
    } else if (local && !remote && db) {
      operations.push({
        type: 'keepLocal',
        local,
        db
      })
    } else if (local && remote && db) {
      if (local.type === 'file' && local.content_hash !== db.content_hash) {
        operations.push({ type: 'reupload', local, remote })
      }
    }
  }
  return operations
}
