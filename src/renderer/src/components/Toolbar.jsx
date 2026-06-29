/* eslint-disable react/prop-types */
import { useState } from 'react'
import { ArrowPathIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid'

export default function Toolbar({ search, setSearch, onSyncNow }) {
  // const [autoSync, setAutoSync] = useState(false)
  return (
    <div
      className="flex items-center gap-4 px-8 py-3.5 bg-white border-b
            border-gray-100 shrink-0"
    >
      {/* Search */}
      <div className="relative w-72">
        <MagnifyingGlassIcon
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4
                text-gray-400 pointer-events-none"
        />
        <input
          type="text"
          placeholder="Search files..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-3.5 py-2 text-sm bg-gray-50 border border-gray-200
                  rounded-lg text-gray-700 placeholder-gray-400
                  focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300
                  transition-all"
        />
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-5 ml-auto">
        {/* <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={autoSync}
            onChange={(e) => setAutoSync(e.target.checked)}
            className="w-4 h-4 rounded border-gray-300 cursor-pointer accent-red-800"
          />
          <span className="text-sm text-gray-600">Automatic sync</span>
        </label> */}

        <button
          className="flex items-center gap-2 px-4 py-2 bg-red-800 hover:bg-red-900 hover:cursor-pointer
                  active:scale-[0.97] text-white text-sm font-bold rounded-lg
                  transition-all duration-150 shadow-sm"
          onClick={onSyncNow}
        >
          <ArrowPathIcon className="w-5 h-5" />
          Sync Now
        </button>
      </div>
    </div>
  )
}
