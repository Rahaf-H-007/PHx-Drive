import PageHeader from './PageHeader'
import Toolbar from './Toolbar'
import FileTable from './FileTable'
import Footer from './Footer'
import { useEffect, useState } from 'react'

export default function MenuFiles() {
  const [search, setSearch] = useState('')
  const [syncTick, setSyncTick] = useState(0)
  const [isSyncing, setIsSyncing] = useState(false)

  useEffect(() => {
    const cleanup = window.api.onSyncStatus(({ syncing }) => setIsSyncing(syncing))
    return cleanup
  }, [])

  async function handleSyncNow() {
    const result = await window.api.manualSync()
    setSyncTick((t) => t + 1)
    console.log(result)
  }
  return (
    <main className="flex-1 flex flex-col overflow-hidden">
      <PageHeader isSyncing={isSyncing}>
        <h1 className="text-lg font-bold text-gray-900 leading-tight">Files</h1>
        <p className="text-xs text-gray-400 leading-tight">Your synced files</p>
      </PageHeader>

      <div className="flex-1 overflow-auto">
        <Toolbar search={search} setSearch={setSearch} onSyncNow={handleSyncNow} />

        <FileTable search={search} syncTick={syncTick} />
      </div>
      <Footer />
    </main>
  )
}
