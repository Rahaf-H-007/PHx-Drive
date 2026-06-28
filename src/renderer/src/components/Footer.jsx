import { ServerIcon } from '@heroicons/react/24/outline'

// TODO:diplay storage quota
export default function Footer() {
  const STORAGE_USED = 41.2
  const STORAGE_TOTAL = 50
  const storagePercent = (STORAGE_USED / STORAGE_TOTAL) * 100
  return (
    <footer
      className="flex items-center gap-4 px-8 py-4 bg-white border-t
      border-gray-100 shrink-0"
    >
      <ServerIcon className="w-5 h-5 text-red-600 shrink-0" />

      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-red-600 rounded-full transition-all duration-500"
          style={{ width: `${storagePercent}%` }}
        />
      </div>

      <span className="text-sm font-medium text-gray-500 shrink-0 whitespace-nowrap">
        {STORAGE_USED} / {STORAGE_TOTAL} GB
      </span>

      {/* TODO: check what this is for */}
      <button
        className="text-sm text-gray-400 hover:text-gray-600 transition-colors
        shrink-0 whitespace-nowrap"
      >
        Preview empty state
      </button>
    </footer>
  )
}
