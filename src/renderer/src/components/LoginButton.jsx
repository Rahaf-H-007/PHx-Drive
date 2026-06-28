/* eslint-disable react/prop-types */
import { ArrowPathIcon } from '@heroicons/react/24/outline'

export default function LoginButton({ isLoading }) {
  return (
    <div>
      <button
        type="submit"
        disabled={isLoading}
        className={`flex w-full items-center justify-center gap-2 rounded-md px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b31313]
          ${
            isLoading
              ? 'cursor-not-allowed'
              : 'bg-[#b31313] hover:bg-[#800d0d] hover:cursor-pointer'
          }`}
      >
        {isLoading && <ArrowPathIcon className="h-4 w-4 animate-spin" />}

        {isLoading ? 'Please wait...' : 'Sign In'}
      </button>
    </div>
  )
}
