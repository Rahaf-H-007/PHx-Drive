import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import Navbar from './NavBar'
import UserProfile from './UserProfile'
import { useState } from 'react'

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={`${collapsed ? 'w-20' : 'w-65'} shrink-0 bg-base-100 border-r border-base-200 flex flex-col transition-all duration-300 ease-in-out relative`}
    >
      {/* Logo */}
      <div
        className={`flex items-center gap-3 h-18 border-b border-base-200 shrink-0 ${
          collapsed ? 'justify-center px-2' : 'px-5'
        }`}
      >
        <div className="w-9 h-9 bg-red-800 rounded-lg flex items-center justify-center shrink-0 shadow-sm">
          <span className="text-white text-sm font-black tracking-tight">Px</span>
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <p className="text-sm font-bold text-base-content leading-snug">PHx Drive</p>
          </div>
        )}
      </div>

      <Navbar collapsed={collapsed} />
      <UserProfile collapsed={collapsed} />

      {/* Toggle button */}
      <button
        onClick={() => setCollapsed((c) => !c)}
        className="absolute -right-3 top-20 w-6 h-6 bg-base-100 border border-base-200 rounded-full flex items-center justify-center shadow-sm hover:bg-base-200 hover:cursor-pointer transition-colors z-10"
      >
        {collapsed ? (
          <ChevronRightIcon size={14} className="text-base-content/50" />
        ) : (
          <ChevronLeftIcon size={14} className="text-base-content/50" />
        )}
      </button>
    </aside>
  )
}
