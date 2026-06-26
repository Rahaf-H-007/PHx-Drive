import { useState } from 'react'
import NavItem from './NavItem'
import {
  DocumentDuplicateIcon,
  Square3Stack3DIcon,
  TrashIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline'

const NAV_ITEMS = [
  { id: 'files', label: 'Files', Icon: DocumentDuplicateIcon },
  { id: 'activity', label: 'Activity', Icon: Square3Stack3DIcon },
  { id: 'trash', label: 'Trash', Icon: TrashIcon, badge: 4 },
  { id: 'settings', label: 'Settings', Icon: Cog6ToothIcon }
]

export default function Navbar() {
  const [activeNav, setActiveNav] = useState('files')
  return (
    <nav className="flex-1 px-3 pt-5 pb-3 overflow-y-auto">
      <p className="px-3 pb-2.5 text-[10px] font-semibold text-gray-400 uppercase tracking-[0.12em]">
        Menu
      </p>
      <div className="space-y-0.5">
        {NAV_ITEMS.map((item) => (
          <NavItem
            key={item.id}
            item={item}
            active={activeNav === item.id}
            onClick={() => setActiveNav(item.id)}
          />
        ))}
      </div>
    </nav>
  )
}
