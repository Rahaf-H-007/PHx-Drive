import PageHeader from './PageHeader'
import Toolbar from './Toolbar'
import FileTable from './FileTable'
import Footer from './Footer'

export default function MenuFiles() {
  return (
    <main className="flex-1 flex flex-col overflow-hidden">
      <PageHeader>
        <h1 className="text-lg font-bold text-gray-900 leading-tight">Files</h1>
        <p className="text-xs text-gray-400 leading-tight">Your synced files</p>
      </PageHeader>

      <Toolbar />

      <FileTable />

      <Footer />
    </main>
  )
}
