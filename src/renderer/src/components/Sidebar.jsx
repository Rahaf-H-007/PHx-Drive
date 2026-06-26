import Navbar from './NavBar'
import UserProfile from './UserProfile'

export default function Sidebar() {
  return (
    <aside className="w-65 shrink-0 bg-white border-r border-gray-100 flex flex-col">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 h-18 border-b border-gray-100 shrink-0">
        <div className="w-9 h-9 bg-red-800 rounded-lg flex items-center justify-center shrink-0 shadow-sm">
          <span className="text-white text-sm font-black tracking-tight">Px</span>
        </div>
        <div className="min-w-0">
          <p className="text-sm font-bold text-gray-900 leading-snug">PHx Drive</p>
          <p className="text-[11px] text-gray-400 leading-snug truncate">
            PharaonX · No Limitations
          </p>
        </div>
      </div>

      <Navbar />

      <UserProfile />
    </aside>
  )
}
