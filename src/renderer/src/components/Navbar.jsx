/* eslint-disable react/prop-types */
import NavItem from './NavItem'
import {
  DocumentDuplicateIcon,
  Square3Stack3DIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline'
import { useLocation } from 'react-router-dom'

const NAV_ITEMS = [
  { id: 'files', label: 'Files', Icon: DocumentDuplicateIcon, path: '/' },
  { id: 'activity', label: 'Activity', Icon: Square3Stack3DIcon, path: '/syncactivity' },
  { id: 'settings', label: 'Settings', Icon: Cog6ToothIcon, path: '/settings' }
]

export default function Navbar({ collapsed }) {
  const { pathname } = useLocation()

  return (
    <nav className="flex-1 px-3 pt-5 pb-3 overflow-y-auto">
      {!collapsed && (
        <p className="px-3 pb-2.5 text-[10px] font-semibold text-base-content/40 uppercase tracking-[0.12em]">
          Menu
        </p>
      )}
      <div className="space-y-0.5">
        {NAV_ITEMS.map((item) => (
          <NavItem
            key={item.id}
            item={item}
            active={pathname === item.path}
            collapsed={collapsed}
          />
        ))}
      </div>
    </nav>
  )
}
