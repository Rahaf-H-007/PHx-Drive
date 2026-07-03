import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'

export default function Home() {
  return (
    <div
      className="flex h-screen bg-[#f9f6f1] overflow-hidden select-none"
      style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
    >
      <Sidebar />
      <div className="flex-1 min-w-0 overflow-auto">
        <Outlet />
      </div>
    </div>
  )
}
