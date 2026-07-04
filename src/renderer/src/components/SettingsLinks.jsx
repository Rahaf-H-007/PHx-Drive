import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import SettingsCard from './SettingsCard'

export default function SettingsLinks() {
  return (
    <SettingsCard label="Links">
      <div className="flex flex-col divide-y divide-gray-100">
        <button
          type="button"
          onClick={() => window.api.openGuide()}
          className="w-full flex items-center justify-between gap-4 px-5 py-3.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left hover:cursor-pointer focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#8B1A1A]"
        >
          How-to guide
          <ArrowTopRightOnSquareIcon className="w-4 h-4 text-gray-400 shrink-0" />
        </button>

        <button
          type="button"
          onClick={() => window.api.openWebApp()}
          className="w-full flex items-center justify-between gap-4 px-5 py-3.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left hover:cursor-pointer focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#8B1A1A]"
        >
          Open PHx Drive in browser
          <ArrowTopRightOnSquareIcon className="w-4 h-4 text-gray-400 shrink-0" />
        </button>
      </div>
    </SettingsCard>
  )
}
