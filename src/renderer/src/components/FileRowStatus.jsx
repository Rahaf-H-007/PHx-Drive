/* eslint-disable react/prop-types */
import { STATUS_CONFIG } from '../icons/fileStatusIcons'

export default function FileRowStatus({ status }) {
  if (!status) return <td className="w-32" />

  const config = STATUS_CONFIG[status]
  if (!config) return <td className="w-32" />

  const { Icon, color } = config

  return (
    <td className="w-32 pt-0.5">
      <div className="flex items-center gap-2">
        <Icon className={`w-5 h-5 ${color}`} />
        <span className={`text-sm capitalize ${color}`}>{status}</span>
      </div>
    </td>
  )
}
