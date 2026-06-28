import { FolderOpenIcon } from '@heroicons/react/24/outline'

export default function EmptyFiles() {
  return (
    <div className="flex h-72 flex-col items-center justify-center">
      <FolderOpenIcon className="h-14 w-14 text-gray-300" />

      <h2 className="mt-4 text-lg font-semibold text-gray-900">No files yet</h2>

      <p className="mt-2 text-sm text-gray-500">Upload your first file and it will appear here.</p>

      {/* TODO:handle upload(when ntegrating DB) */}
      <button className="mt-5 rounded-md bg-[#b31313] px-4 py-2 text-sm font-semibold text-white hover:bg-[#800d0d]">
        Upload file
      </button>
    </div>
  )
}
