import { InformationCircleIcon } from '@heroicons/react/24/outline'

export default function TrashBanner() {
  return (
    <div
      role="note"
      className="flex items-start gap-3 rounded-xl border border-orange-200 bg-orange-50 px-5 py-4 m-7"
    >
      <InformationCircleIcon
        aria-hidden="true"
        className="mt-0.5 h-5 w-5 shrink-0 text-orange-500"
      />
      <p className="text-sm leading-relaxed text-amber-600">
        Deleted files are moved here first and kept for{' '}
        <strong className="font-semibold text-amber-900">30 days</strong> before they are
        permanently removed. You can restore a file any time before it purges.
      </p>
    </div>
  )
}
