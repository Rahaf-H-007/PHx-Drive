/* eslint-disable react/prop-types */
import { ArrowPathIcon, WifiIcon } from '@heroicons/react/24/solid'

export default function PageHeader({ children, isSyncing }) {
  return (
    <header
      className="flex items-center justify-between px-8 h-18 bg-white
            border-b border-gray-100 shrink-0"
    >
      <div>{children}</div>

      {/* Online badge */}
      <div
        className="flex items-center gap-2 px-3 py-1.5 bg-green-50 border
              border-green-200 rounded-full"
      >
        <WifiIcon className="w-3.5 h-3.5 text-green-600" />
        <span className="text-xs font-medium text-green-700">
          Online{isSyncing ? '. Syncing' : ''}
        </span>
        {isSyncing && <ArrowPathIcon className="w-3 h-3 text-green-600 animate-spin" />}
      </div>
    </header>
  )
}
