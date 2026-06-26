import { useState } from 'react'
import FileRow from './FileRow'

export default function MenuFiles() {
  const [search, setSearch] = useState('')
  const [autoSync, setAutoSync] = useState(false)
  const STORAGE_USED = 41.2
  const STORAGE_TOTAL = 50
  const storagePercent = (STORAGE_USED / STORAGE_TOTAL) * 100
  const FILES = [
    {
      id: 1,
      name: 'Q2_Financial_Report.pdf',
      ext: 'pdf',
      size: '4.2 MB',
      modified: '2026-06-21 14:30',
      status: 'synced',
      syncPercent: 100
    },
    {
      id: 2,
      name: 'Design_Assets_v3.zip',
      ext: 'zip',
      size: '128 MB',
      modified: '2026-06-22 09:15',
      status: 'syncing',
      syncPercent: 62
    },
    {
      id: 3,
      name: 'Budget_2026.xlsx',
      ext: 'xlsx',
      size: '1.1 MB',
      modified: '2026-06-20 11:00',
      status: 'conflict',
      syncPercent: 90
    },
    {
      id: 4,
      name: 'Meeting_Notes_draft.txt',
      ext: 'txt',
      size: '12 KB',
      modified: '2026-06-18 16:45',
      status: 'error',
      syncPercent: 50
    },
    {
      id: 5,
      name: 'Product_Roadmap_2026.pptx',
      ext: 'pptx',
      size: '55 MB',
      modified: '2026-06-19 08:00',
      status: 'synced',
      syncPercent: 100
    },
    {
      id: 6,
      name: 'Team_Photo_Offsite.jpg',
      ext: 'jpg',
      size: '8.7 MB',
      modified: '2026-06-17 13:22',
      status: 'synced',
      syncPercent: 100
    },
    {
      id: 7,
      name: 'Client_Proposal_Final.docx',
      ext: 'docx',
      size: '2.3 MB',
      modified: '2026-06-22 11:50',
      status: 'syncing',
      syncPercent: 35
    }
  ]
  return (
    <main className="flex-1 flex flex-col overflow-hidden">
      {/* Page header */}
      <header
        className="flex items-center justify-between px-8 h-18 bg-white
          border-b border-gray-100 shrink-0"
      >
        <div>
          <h1 className="text-lg font-bold text-gray-900 leading-tight">Files</h1>
          <p className="text-xs text-gray-400 leading-tight">Your synced files</p>
        </div>

        {/* Online badge */}
        <div
          className="flex items-center gap-2 px-3 py-1.5 bg-green-50 border
            border-green-200 rounded-full"
        >
          {/* <WifiIcon className="w-3.5 h-3.5 text-green-600" /> */}
          <span className="text-xs font-medium text-green-700">Online — syncing</span>
          {/* <SyncIcon className="w-3 h-3 text-green-600" /> */}
          {/* <ChevronDownIcon className="w-3 h-3 text-green-500" /> */}
        </div>
      </header>

      {/* Toolbar */}
      <div
        className="flex items-center gap-4 px-8 py-3.5 bg-white border-b
          border-gray-100 shrink-0"
      >
        {/* Search */}
        <div className="relative w-72">
          {/* <SearchIcon
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4
              text-gray-400 pointer-events-none"
            /> */}
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
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={autoSync}
              onChange={(e) => setAutoSync(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 cursor-pointer accent-red-800"
            />
            <span className="text-sm text-gray-600">Automatic sync</span>
          </label>

          <button
            className="flex items-center gap-2 px-4 py-2 bg-red-800 hover:bg-red-900
                active:scale-[0.97] text-white text-sm font-semibold rounded-lg
                transition-all duration-150 shadow-sm"
          >
            {/* <SyncIcon className="w-3.5 h-3.5" /> */}
            Sync Now
          </button>
        </div>
      </div>

      {/* File list */}
      <div className="flex-1 px-8 py-5 overflow-auto">
        <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
          {/* Column headers */}
          <div className="flex items-center px-6 py-3 border-b border-gray-100 bg-gray-50/50">
            <div
              className="flex-1 pr-4 text-[11px] font-semibold text-gray-400
                uppercase tracking-[0.08em]"
            >
              Name
            </div>
            <div
              className="w-24 shrink-0 text-[11px] font-semibold text-gray-400
                uppercase tracking-[0.08em]"
            >
              Size
            </div>
            <div
              className="w-44 shrink-0 text-[11px] font-semibold text-gray-400
                uppercase tracking-[0.08em]"
            >
              Modified
            </div>
            <div
              className="w-32 shrink-0 text-[11px] font-semibold text-gray-400
                uppercase tracking-[0.08em]"
            >
              Status
            </div>
          </div>

          {/* Rows */}
          {FILES.map((file, idx) => (
            <FileRow key={file.id} file={file} isLast={idx === FILES.length - 1} />
          ))}
        </div>
      </div>

      {/* Storage footer */}
      <div
        className="flex items-center gap-4 px-8 py-4 bg-white border-t
          border-gray-100 shrink-0"
      >
        {/* <HardDriveIcon className="w-5 h-5 text-red-600 shrink-0" /> */}

        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-red-600 rounded-full transition-all duration-500"
            style={{ width: `${storagePercent}%` }}
          />
        </div>

        <span className="text-sm font-medium text-gray-500 shrink-0 whitespace-nowrap">
          {STORAGE_USED} / {STORAGE_TOTAL} GB
        </span>

        <button
          className="text-sm text-gray-400 hover:text-gray-600 transition-colors
            shrink-0 whitespace-nowrap"
        >
          Preview empty state
        </button>
      </div>
    </main>
  )
}
