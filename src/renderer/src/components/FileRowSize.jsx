/* eslint-disable react/prop-types */
export default function FileRowSize({ size }) {
  return (
    <td className="w-24 pt-0.5">
      <span className="text-sm text-gray-500">
        {size === null ? '<1KB' : `${Math.round(size / 1000)} KB`}
      </span>
    </td>
  )
}
