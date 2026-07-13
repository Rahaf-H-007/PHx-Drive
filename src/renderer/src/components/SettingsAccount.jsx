/* eslint-disable react/prop-types */
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import SettingsCard from './SettingsCard'

export default function SettingsAccount({ onClick }) {
  return (
    <SettingsCard label="Account">
      <button
        type="button"
        onClick={onClick}
        className="w-full flex items-center gap-4 px-5 pt-3 pb-4 hover:bg-base-200 hover:cursor-pointer transition-colors text-left focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#8B1A1A]"
      >
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-base-content leading-tight truncate">
            Account details
          </p>
        </div>
        <ChevronRightIcon className="w-4 h-4 text-base-content/40 shrink-0" />
      </button>
    </SettingsCard>
  )
}
