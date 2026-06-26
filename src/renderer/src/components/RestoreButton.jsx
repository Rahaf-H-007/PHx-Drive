import { ArrowPathIcon } from '@heroicons/react/24/outline'

export default function RestoreButton() {
  return (
    <button
      type="button"
      //   onClick={onClick}
      className="inline-flex items-center gap-1.5 rounded-lg border border-[#8B1C1C] px-3 py-[7px] text-sm font-medium text-[#8B1C1C] transition-colors hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300 focus-visible:ring-offset-1 active:scale-[0.98]"
    >
      <ArrowPathIcon aria-hidden="true" className="h-4 w-4" />
      Restore
    </button>
  )
}
