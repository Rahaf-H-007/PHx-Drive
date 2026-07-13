import { formatFileSize } from '../utils/format'

/* eslint-disable react/prop-types */
export default function FileRowSize({ size }) {
  return (
    <td className="w-24 pt-0.5">
      <span className="text-sm text-base-content/50">{formatFileSize(size) ?? '<1KB'}</span>
    </td>
  )
}
