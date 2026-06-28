/* eslint-disable react/prop-types */
import { getFileIcon } from '../icons/fileTypeIcons'
// import FileProgressBar from './FileProgressBar'
import FileRowModifiedDate from './FileRowModifiedDate'
import FileRowSize from './FileRowSize'
// import FileRowStatus from './FileRowStatus'

export default function FileRow({ file, isLast }) {
  const { TypeIcon, typeIconClass } = getFileIcon(file)

  return (
    <tr
      className={`hover:bg-gray-50/60 transition-colors cursor-default
  ${!isLast ? 'border-b border-gray-100' : ''}`}
    >
      <td className="px-6 py-3.5 pr-4">
        <div className="flex items-start gap-3 min-w-0">
          {/* icon */}
          <div className="mt-0.5 shrink-0">
            {TypeIcon && <TypeIcon className={`w-5 h-5 ${typeIconClass}`} />}
          </div>

          {/* name */}
          <div className="min-w-0">
            <p className="text-sm font-medium text-gray-800 truncate">{file.title}</p>

            {/* TODO: when integrating db */}
            {/* progress bar */}
            {file.syncPercent && (
              <div className="mt-1.5 space-y-0.5">
                {/* <FileProgressBar syncPercent={file.syncPercent} />
                <span className="text-[11px] text-gray-400">{file.syncPercent}%</span> */}
              </div>
            )}
          </div>
        </div>
      </td>

      {/* Size */}
      <FileRowSize size={file.file_size} />

      {/* TODO:add file modifed as proper date and time */}
      {/* Modified */}
      <FileRowModifiedDate modified={file.modified} />

      {/* TODO: when inregrating DB */}
      {/* Status */}
      {/* most likely fromDB */}
      {/* <FileRowStatus status={file.status} /> */}
    </tr>
  )
}
