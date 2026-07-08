/* eslint-disable react/prop-types */
import { STATUS_CONFIG } from '../icons/fileStatusIcons'

export default function FileRowStatus({ status, onDownload }) {
  if (!status) return <td className="w-32" />

  const config = STATUS_CONFIG[status]
  if (!config) return <td className="w-32" />

  const { Icon, color, label, clickable } = config

  return (
    <td className="w-32 pt-0.5">
      <div
        className={`flex items-center gap-2 ${clickable ? 'cursor-pointer hover:opacity-70 transition-opacity' : ''}`}
        onClick={clickable ? onDownload : undefined}
        title={clickable ? 'Click to download' : undefined}
      >
        <Icon className={`w-5 h-5 ${color} ${status === 'pending' ? 'animate-spin' : ''}`} />
        <span className={`text-sm ${color}`}>{label ?? status}</span>
      </div>
    </td>
  )
}
