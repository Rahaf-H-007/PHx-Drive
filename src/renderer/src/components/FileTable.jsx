/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import FileRow from './FileRow'
import LoadingSpinner from './LoadingSpinner'
import EmptyFiles from './EmptyFiles'

export default function FileTable({ search }) {
  const [files, setFiles] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  useEffect(() => {
    async function loadFiles() {
      try {
        setIsLoading(true)

        const result = await window.api.getFiles()

        if (result.success) {
          setFiles(result.message)
        } else {
          throw new Error(result.error || 'Failed to load files')
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    loadFiles()
  }, [])

  const filteredFiles = files.filter((file) => {
    const term = search.toLowerCase()
    return file.title?.toLowerCase().includes(term) || file.name?.toLowerCase().includes(term)
  })

  return (
    <div className="flex-1 px-8 py-5 overflow-auto m-0 mt-2">
      <div className="border border-gray-100 rounded-xl shadow-sm overflow-hidden">
        {/* loading */}
        {isLoading && <LoadingSpinner />}

        {/* empty files */}
        {!isLoading && filteredFiles.length === 0 && <EmptyFiles />}

        {!isLoading && filteredFiles.length > 0 && (
          <table className="w-full table-fixed bg-white">
            {/* Column headers */}
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th
                  className="px-6 py-3 text-left text-[11px] font-semibold text-gray-400
              uppercase tracking-[0.08em]"
                >
                  Name
                </th>

                <th
                  className="w-24 px-0 py-3 text-left text-[11px] font-semibold text-gray-400
              uppercase tracking-[0.08em]"
                >
                  Size
                </th>

                <th
                  className="w-44 px-0 py-3 text-left text-[11px] font-semibold text-gray-400
              uppercase tracking-[0.08em]"
                >
                  Added
                </th>

                <th
                  className="w-32 px-0 py-3 text-left text-[11px] font-semibold text-gray-400
              uppercase tracking-[0.08em]"
                >
                  Status
                </th>
              </tr>
            </thead>

            {/* Rows */}
            <tbody>
              {filteredFiles.map((file, idx) => (
                <FileRow key={file.name} file={file} isLast={idx === filteredFiles.length - 1} />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
