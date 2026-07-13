/* eslint-disable react/prop-types */
import { getFileIcon } from '../icons/fileTypeIcons'
import FileRowModifiedDate from './FileRowModifiedDate'
import FileRowSize from './FileRowSize'
import FileRowStatus from './FileRowStatus'
export default function FileRow({ file, isLast }) {
  const { TypeIcon, typeIconClass } = getFileIcon(file)
  const isFolder = file.file_kind === 'Folder'

  async function handleDownload() {
    await window.api.downloadFile(file.name)
  }

  async function handleFolderClick() {
    await window.api.openFolder(file.title)
  }

  return (
    <tr
      onClick={isFolder ? handleFolderClick : undefined}
      className={`hover:bg-base-200/60 transition-colors ${isFolder ? 'cursor-pointer' : 'cursor-default'} ${!isLast ? 'border-b border-base-200' : ''}`}
    >
      <td className="px-6 py-3.5 pr-4">
        <div className="flex items-start gap-3 min-w-0">
          <div className="mt-0.5 shrink-0">
            {TypeIcon && <TypeIcon className={`w-5 h-5 ${typeIconClass}`} />}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-base-content truncate">{file.title}</p>
          </div>
        </div>
      </td>
      <FileRowSize size={file.file_size} />
      <FileRowModifiedDate added={file.creation} />
      <FileRowStatus status={file.state} onDownload={handleDownload} />
    </tr>
  )
}
