/* eslint-disable react/prop-types */
import { ClockIcon } from '@heroicons/react/24/outline'
import { formatRelativeTime } from '../utils/format'
import { STATUS_CONFIG } from '../icons/fileStatusIcons'

export default function StatusCard({ status }) {
  const { Icon, bg, color, label } = STATUS_CONFIG[status.status] ?? STATUS_CONFIG.synced

  return (
    <div className="bg-base-100 rounded-2xl p-2 m-7 shadow-sm border border-base-200 flex items-center gap-5">
      <div
        className={`flex items-center justify-center w-14 h-14 rounded-2xl ${bg} shrink-0`}
        aria-hidden="true"
      >
        <Icon className={`w-7 h-7 ${color} stroke-[1.5]`} />
      </div>
      <div>
        <h2 className="text-base font-semibold text-base-content leading-snug">{label}</h2>
        <div className="flex items-center gap-1.5 mt-1 text-base-content/40">
          <ClockIcon className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          <span className="text-sm">{getStatusLabel(status)}</span>
        </div>
      </div>
    </div>
  )
}

//TODO: might need to use this in the main tab so will keep it here for now
function getStatusLabel(status) {
  if (!status) return null
  const time = formatRelativeTime(status.lastSyncedAt)
  switch (status.status) {
    case 'pending':
      return `${status.pendingCount} file${status.pendingCount !== 1 ? 's' : ''} pending`
    case 'conflict':
      return `${status.conflictCount} conflict${status.conflictCount !== 1 ? 's' : ''}`
    case 'error':
      return `${status.errorCount} file${status.errorCount !== 1 ? 's' : ''} failed`
    default:
      return time ? `Last synced ${time}` : 'Not yet synced'
  }
}
