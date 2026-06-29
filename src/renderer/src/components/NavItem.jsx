/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom'

export default function NavItem({ item, active }) {
  const { Icon } = item
  const navigate = useNavigate()

  return (
    <button
      onClick={() => navigate(item.path)}
      className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-left
        transition-colors duration-100 hover:cursor-pointer
        ${
          active ? 'bg-red-50 text-red-800' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
        }`}
    >
      {/* icon */}
      <Icon className={`w-5 h-5 shrink-0 ${active ? 'text-red-700' : 'text-gray-500'}`} />

      {/* text */}
      <span className={`flex-1 text-sm ${active ? 'font-semibold' : 'font-medium'}`}>
        {item.label}
      </span>

      {/* active state */}
      {active && <span className="w-3.5 h-3.5 text-red-400 shrink-0"></span>}
    </button>
  )
}
