import { useAuth } from '../contexts/AuthContext'

export default function UserProfile() {
  const { user } = useAuth()
  return (
    <div className="flex items-center gap-3 px-5 py-4 border-t border-gray-100 shrink-0">
      <div className="w-9 h-9 bg-red-800 rounded-full flex items-center justify-center shrink-0">
        <span className="text-white text-xs font-bold">{user.owner[0]}</span>
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-gray-800 leading-snug">{user.owner}</p>
        <p className="text-[11px] text-gray-400 leading-snug">Pro 50 GB</p>
      </div>
    </div>
  )
}
