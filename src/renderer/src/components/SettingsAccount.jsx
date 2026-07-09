/* eslint-disable react/prop-types */
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import SettingsCard from './SettingsCard'
// import { getInitials } from '../utils/format'

//TODO: clean up comments if UI is approved
export default function SettingsAccount({ onClick /* profile, quota */ }) {
  // const storageLabel = quota?.limit ? `${(quota.limit / 1024 ** 3).toFixed(0)} GB` : null
  return (
    <SettingsCard label="Account">
      <button
        type="button"
        onClick={onClick}
        className="w-full flex items-center gap-4 px-5 pt-3 pb-4 hover:bg-base-200 hover:cursor-pointer transition-colors text-left focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#8B1A1A]"
      >
        {/* <div className="bg-[#8B1A1A] w-11 h-11 rounded-xl flex items-center justify-center text-white text-sm font-semibold shrink-0 select-none">
          {getInitials(profile?.owner)}
        </div> */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-base-content leading-tight truncate">
            {/* {profile?.owner || '—'} */} Account details
          </p>
          {/* <p className="text-sm text-gray-500 mt-0.5 leading-tight truncate">
            {profile?.user || '—'}
          </p> */}
          {/* {storageLabel && (
            <span className="inline-block mt-2 text-xs font-medium rounded-full px-2.5 py-0.5 leading-tight border text-[#8B1A1A] border-[#8B1A1A80]">
              {storageLabel}
            </span>
          )} */}
        </div>
        <ChevronRightIcon className="w-4 h-4 text-base-content/40 shrink-0" />
      </button>
    </SettingsCard>
  )
}
