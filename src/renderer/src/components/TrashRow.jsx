/* eslint-disable react/prop-types */
import { DocumentIcon } from '@heroicons/react/24/outline'
import RestoreButton from './RestoreButton'
import DeletePermanentlyButton from './DeletePermanentlyButton'

export default function TrashRow({ file }) {
  return (
    <tr className="bg-white group border-t border-gray-100 transition-colors hover:bg-white/50">
      {/* Name */}
      <td className="py-4.5 pl-6 pr-4">
        <div className="flex items-center gap-3">
          <DocumentIcon aria-hidden="true" className="h-5 w-5 shrink-0 text-gray-400" />
          <span className="text-sm font-medium text-gray-800">{file.name}</span>
        </div>
      </td>

      {/* Size */}
      <td className="py-4.5 px-4 text-sm text-gray-500 whitespace-nowrap">{file.size}</td>

      {/* Deleted */}
      <td className="py-4.5 px-4 text-sm text-gray-500 whitespace-nowrap">{file.deletedAt}</td>

      {/* Retention */}
      <td className="py-4.5 px-4 text-sm text-gray-400 whitespace-nowrap">
        Purges in {file.daysLeft} days
      </td>

      {/* Actions */}
      <td className="py-4.5 pl-4 pr-6">
        <div className="flex items-center justify-end gap-5">
          <RestoreButton /* onClick={() => onRestore?.(file.id)} */ />
          <DeletePermanentlyButton /* onClick={() => onDelete?.(file.id)} */ />
        </div>
      </td>
    </tr>
  )
}
