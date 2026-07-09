import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
export default function SettingsSignOut() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  async function handleSignOut() {
    await logout()
    navigate('/login', { replace: true })
  }
  return (
    <div className="border border-red-800/60 bg-red-800/5 rounded-2xl px-5 py-4 flex items-center justify-between gap-4">
      <div className="min-w-0">
        <p className="text-sm font-semibold text-base-content">Sign out of PHx Drive</p>
        <p className="text-sm text-base-content/50 mt-0.5">
          Your synced files will remain in the local folder.
        </p>
      </div>
      <button
        type="button"
        className="shrink-0 flex items-center gap-1.5 text-sm hover:cursor-pointer font-medium text-[#8B1A1A] border border-[#8B1A1A]/60 rounded-xl px-4 py-2 transition-colors whitespace-nowrap hover:bg-red-800/30 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#8B1A1A]"
        onClick={handleSignOut}
      >
        <ArrowLeftOnRectangleIcon className="w-4 h-4" />
        Sign out
      </button>
    </div>
  )
}
