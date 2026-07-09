//most liekly this component will never be needed because once the
// user changes to an empty folder and saves the sync will start
// but ill keep it here just n case
import { FolderOpenIcon } from '@heroicons/react/24/outline'

export default function EmptyFiles() {
  return (
    <div className="flex h-72 flex-col items-center justify-center">
      <FolderOpenIcon className="h-14 w-14 text-gray-300" />

      <h2 className="mt-4 text-lg font-semibold text-gray-900">No files yet</h2>

      <p className="mt-2 text-sm text-gray-500">
        Upload your first file in your sync folder, sync now and it will appear here.
      </p>
    </div>
  )
}
