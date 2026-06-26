/* eslint-disable react/prop-types */
import { fileStatusIcons } from '../icons/fileStatusIcons'

export default function FileRowStatus({ status }) {
  const { StatusIcon, statusIconClass, statusTextClass } = fileStatusIcons[status]
  return (
    <td className="w-32 pt-0.5">
      <div className="flex items-center gap-2">
        {StatusIcon && <StatusIcon className={`w-5 h-5 ${statusIconClass}`} />}

        <span className={`text-sm capitalize ${statusTextClass}`}>{status}</span>
      </div>
    </td>
  )
}
