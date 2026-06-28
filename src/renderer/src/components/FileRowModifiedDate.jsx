/* eslint-disable react/prop-types */
export default function FileRowModifiedDate({ added }) {
  return (
    <td className="w-44 pt-0.5">
      <span className="text-sm text-gray-500">
        {new Date(added).toLocaleString([], {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })}
      </span>
    </td>
  )
}
