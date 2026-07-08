/* eslint-disable react/prop-types */
import { getFileIcon } from '../icons/fileTypeIcons'
import FileRowModifiedDate from './FileRowModifiedDate'
import FileRowSize from './FileRowSize'
import FileRowStatus from './FileRowStatus'
export default function FileRow({ file, isLast }) {
  const { TypeIcon, typeIconClass } = getFileIcon(file)
  async function handleDownload() {
    await window.api.downloadFile(file.name)
  }
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
          </div>
        </div>
      </td>

      {/* Size */}
      <FileRowSize size={file.file_size} />

      {/* Modified */}
      <FileRowModifiedDate added={file.creation} />

      {/* Status */}
      <FileRowStatus status={file.state} onDownload={handleDownload} />
    </tr>
  )
}
