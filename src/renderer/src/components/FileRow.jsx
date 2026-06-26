/* eslint-disable react/prop-types */
import { fileTypeIcons } from '../icons/fileTypeIcons'
import FileProgressBar from './FileProgressBar'
import FileRowModifiedDate from './FileRowModifiedDate'
import FileRowSize from './FileRowSize'
import FileRowStatus from './FileRowStatus'

//TODO:refactor

export default function FileRow({ file, isLast }) {
  const { TypeIcon, typeIconClass } = fileTypeIcons[file.ext]

  return (
    <tr
      className={`hover:bg-gray-50/60 transition-colors cursor-default
  ${!isLast ? 'border-b border-gray-100' : ''}`}
    >
      <td className="px-6 py-3.5 pr-4">
        <div className="flex items-start gap-3 min-w-0">
          {/* TODO: later make it based on mime types not extensions */}
          {/* icon */}
          <div className="mt-0.5 shrink-0">
            {TypeIcon && <TypeIcon className={`w-5 h-5 ${typeIconClass}`} />}
          </div>

          {/* name */}
          <div className="min-w-0">
            <p className="text-sm font-medium text-gray-800 truncate">{file.name}</p>

            {/* progress bar */}
            {file.syncPercent && (
              <div className="mt-1.5 space-y-0.5">
                <FileProgressBar syncPercent={file.syncPercent} />
                <span className="text-[11px] text-gray-400">{file.syncPercent}%</span>
              </div>
            )}
          </div>
        </div>
      </td>

      {/* Size */}
      <FileRowSize size={file.size} />

      {/* Modified */}
      <FileRowModifiedDate modified={file.modified} />

      {/* Status */}
      <FileRowStatus status={file.status} />
    </tr>
  )
}
