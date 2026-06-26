import { CheckCircleIcon, ClockIcon } from '@heroicons/react/24/outline'

export default function StatusCard() {
  const LAST_SYNCED = '2026-06-22 15:28'
  return (
    <div className="bg-white rounded-2xl p-2 m-7 shadow-sm border border-gray-100/80 flex items-center gap-5">
      {/* green check icon */}
      <div
        className="flex items-center justify-center w-14 h-14 rounded-2xl bg-green-100 shrink-0"
        aria-hidden="true"
      >
        <CheckCircleIcon className="w-7 h-7 text-green-500 stroke-[1.5]" />
      </div>

      <div>
        <h2 className="text-base font-semibold text-gray-900 leading-snug">All files up to date</h2>
        <div className="flex items-center gap-1.5 mt-1 text-gray-400">
          <ClockIcon className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          <span className="text-sm">Last synced {LAST_SYNCED}</span>
        </div>
      </div>
    </div>
  )
}
