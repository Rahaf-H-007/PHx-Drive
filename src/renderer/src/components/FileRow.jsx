/* eslint-disable react/prop-types */
import { fileStatusIcons } from '../icons/fileStatusIcons'
import { fileTypeIcons } from '../icons/fileTypeIcons'

export default function FileRow({ file, isLast }) {
  const { StatusIcon, statusIconClass, statusTextClass } = fileStatusIcons[file.status]
  const { TypeIcon, typeIconClass } = fileTypeIcons[file.ext]

  return (
    <div
      className={`flex items-start px-6 py-3.5 hover:bg-gray-50/60 transition-colors
      cursor-default ${!isLast ? 'border-b border-gray-100' : ''}`}
    >
      {/* Name */}
      {/* TODO: later make it based on mime types not extensions */}
      <div className="flex items-start gap-3 flex-1 min-w-0 pr-4">
        <div className="mt-0.5 shrink-0">
          {TypeIcon && <TypeIcon className={`w-5 h-5 ${typeIconClass}`} />}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-gray-800 truncate">{file.name}</p>
          {file.syncPercent && (
            <div className="mt-1.5 space-y-0.5">
              <div className="w-44 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-orange-400 rounded-full"
                  style={{ width: `${file.syncPercent}%` }}
                />
              </div>
              <span className="text-[11px] text-gray-400">{file.syncPercent}%</span>
            </div>
          )}
        </div>
      </div>
      {/* Size */}
      <div className="w-24 shrink-0 pt-0.5">
        <span className="text-sm text-gray-500">{file.size}</span>
      </div>
      {/* Modified */}
      <div className="w-44 shrink-0 pt-0.5">
        <span className="text-sm text-gray-500">{file.modified}</span>
      </div>
      {/* Status */}
      <div className="w-32 shrink-0 pt-0.5 flex items-center gap-2">
        {StatusIcon && <StatusIcon className={`w-5 h-5 ${statusIconClass}`} />}
        <span className={`text-sm capitalize ${statusTextClass}`}>{file.status}</span>
      </div>
    </div>
  )
}
