import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline'
export default function SettingsSignOut() {
  return (
    <div className="border border-red-200 bg-red-50 rounded-2xl px-5 py-4 flex items-center justify-between gap-4">
      <div className="min-w-0">
        <p className="text-sm font-semibold text-gray-900">Sign out of PHx Drive</p>
        <p className="text-sm text-gray-500 mt-0.5">
          Your synced files will remain in the local folder.
        </p>
      </div>

      <button
        type="button"
        className="shrink-0 flex items-center gap-1.5 text-sm hover:cursor-pointer font-medium text-[#8B1A1A] border border-[#8B1A1A]/40 rounded-xl px-4 py-2 transition-colors whitespace-nowrap hover:bg-red-100 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#8B1A1A]"
      >
        <ArrowLeftOnRectangleIcon className="w-4 h-4" />
        Sign out
      </button>
    </div>
  )
}
