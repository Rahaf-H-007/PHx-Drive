/* eslint-disable react/prop-types */
export default function FileRowModifiedDate({ modified }) {
  return (
    <td className="w-44 pt-0.5">
      <span className="text-sm text-gray-500">{modified}</span>
    </td>
  )
}
