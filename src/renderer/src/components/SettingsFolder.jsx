/* eslint-disable react/prop-types */
import { FolderIcon } from '@heroicons/react/24/outline'
import SettingsCard from './SettingsCard'

//TODO:handle folder (later)
export default function SettingsFolder({ folderPath, onFolderChange }) {
  const handleBrowse = async () => {
    const path = await window.api.selectSyncFolder()

    if (path) {
      onFolderChange(path)
    }
  }
  return (
    <SettingsCard label="Sync folder">
      <div className="px-5 pt-3 pb-5">
        <div className="flex items-center gap-0 border border-gray-200 rounded-xl overflow-hidden">
          {/* Path input area */}
          <div className="flex items-center gap-2.5 flex-1 min-w-0 px-3.5 py-2.5">
            <FolderIcon className="w-4 h-4 text-gray-400 shrink-0" aria-hidden="true" />
            <span className="text-sm text-gray-700 truncate select-all" title={folderPath}>
              {folderPath || 'No folder selected'}
            </span>
          </div>

          {/* Divider */}
          <div className="w-px h-9 bg-gray-200 shrink-0"></div>

          {/* Browse button */}
          <button
            type="button"
            onClick={handleBrowse}
            className="shrink-0 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:cursor-pointer transition-colors focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#8B1A1A]"
          >
            Browse...
          </button>
        </div>
      </div>
    </SettingsCard>
  )
}
