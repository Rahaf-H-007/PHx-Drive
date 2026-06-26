import Sidebar from '../components/Sidebar'
import MenuFiles from '../components/MenuFiles'

export default function Home() {
  return (
    <div
      className="flex h-screen bg-neutral-50 overflow-hidden select-none"
      style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
    >
      <Sidebar />
      <MenuFiles />
    </div>
  )
}
