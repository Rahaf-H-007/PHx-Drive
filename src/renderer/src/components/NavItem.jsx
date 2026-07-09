/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom'

export default function NavItem({ item, active, collapsed }) {
  const { Icon } = item
  const navigate = useNavigate()

  return (
    <button
      onClick={() => navigate(item.path)}
      title={collapsed ? item.label : undefined}
      className={`w-full flex items-center gap-3 py-2.5 rounded-lg text-left
        transition-colors duration-100 hover:cursor-pointer
        ${collapsed ? 'justify-center px-2' : 'px-3.5'}
        ${
          active
            ? 'bg-red-800/10 text-red-800'
            : 'text-base-content/50 hover:bg-base-200 hover:text-base-content/70'
        }`}
    >
      {/* icon */}
      <Icon className={`w-5 h-5 shrink-0 ${active ? 'text-red-700' : 'text-base-content/50'}`} />

      {/* text */}
      {!collapsed && (
        <span className={`flex-1 text-sm ${active ? 'font-semibold' : 'font-medium'}`}>
          {item.label}
        </span>
      )}

      {/* active indicator */}
      {!collapsed && active && <span className="text-red-400 shrink-0"></span>}
    </button>
  )
}
