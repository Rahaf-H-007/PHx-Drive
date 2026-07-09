/* eslint-disable react/prop-types */
import { useAuth } from '../contexts/AuthContext'
import { getInitials } from '../utils/format'

export default function UserProfile({ collapsed }) {
  const { user } = useAuth()
  return (
    <div
      className={`flex items-center gap-3 py-4 border-t border-base-200 shrink-0 ${
        collapsed ? 'justify-center px-2' : 'px-5'
      }`}
    >
      <div className="w-9 h-9 bg-red-800 rounded-full flex items-center justify-center shrink-0">
        <span className="text-white text-xs font-bold">{getInitials(user.owner)}</span>
      </div>
      {!collapsed && (
        <div className="min-w-0">
          <p className="text-sm font-semibold text-base-content leading-snug">{user.owner}</p>
        </div>
      )}
    </div>
  )
}
