import PageHeader from './PageHeader'
import Toolbar from './Toolbar'
import FileTable from './FileTable'
import Footer from './Footer'
import { useState } from 'react'

export default function MenuFiles() {
  const [search, setSearch] = useState('')
  return (
    <main className="flex-1 flex flex-col overflow-hidden">
      <PageHeader>
        <h1 className="text-lg font-bold text-gray-900 leading-tight">Files</h1>
        <p className="text-xs text-gray-400 leading-tight">Your synced files</p>
      </PageHeader>

      <div className="flex-1 overflow-auto">
        <Toolbar search={search} setSearch={setSearch} />

        <FileTable search={search} />
      </div>
      <Footer />
    </main>
  )
}
