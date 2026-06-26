import Sidebar from '../components/Sidebar'
import MenuFiles from '../components/MenuFiles'
import SyncActivity from '../components/SyncActivity'

export default function Home() {
  return (
    <div
      className="flex h-screen bg-[#f9f6f1] overflow-hidden select-none"
      style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
    >
      <Sidebar />
      {/* <MenuFiles /> */}
      <SyncActivity />
    </div>
  )
}
