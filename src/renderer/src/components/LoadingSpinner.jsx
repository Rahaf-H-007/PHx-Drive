import { ArrowPathIcon } from '@heroicons/react/24/outline'

export default function LoadingSpinner() {
  return (
    <div className="flex h-72 items-center justify-center">
      <ArrowPathIcon className="h-8 w-8 animate-spin text-[#b31313]" />
    </div>
  )
}
