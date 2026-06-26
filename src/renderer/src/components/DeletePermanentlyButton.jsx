import { TrashIcon } from '@heroicons/react/24/outline'

export default function DeletePermanentlyButton() {
  return (
    <button
      type="button"
      //   onClick={onClick}
      className="inline-flex items-center gap-1.5 text-sm text-gray-400 transition-colors hover:text-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-200 focus-visible:ring-offset-1"
    >
      <TrashIcon aria-hidden="true" className="h-4 w-4 shrink-0" />
      <span>Delete permanently</span>
    </button>
  )
}
