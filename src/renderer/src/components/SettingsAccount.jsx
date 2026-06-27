import { ChevronRightIcon } from '@heroicons/react/24/outline'
import SettingsCard from './SettingsCard'

export default function SettingsAccount() {
  return (
    <SettingsCard label="Account">
      <button
        type="button"
        className="w-full flex items-center gap-4 px-5 pt-3 pb-4 hover:bg-gray-50 transition-colors text-left focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#8B1A1A]"
      >
        {/* Avatar */}
        <div className="bg-[#8B1A1A] w-11 h-11 rounded-xl flex items-center justify-center text-white text-sm font-semibold shrink-0 select-none">
          RH
        </div>

        {/* User info */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-900 leading-tight">Rahaf Hazem</p>
          <p className="text-sm text-gray-500 mt-0.5 leading-tight">rahaf.hazem@pharaonx.com</p>
          <span className="inline-block mt-2 text-xs font-medium rounded-full px-2.5 py-0.5 leading-tight border text-[#8B1A1A] border-[#8B1A1A80]">
            Pro 50 GB
          </span>
        </div>

        {/* Chevron */}
        <ChevronRightIcon className="w-4 h-4 text-gray-400 shrink-0" />
      </button>
    </SettingsCard>
  )
}
