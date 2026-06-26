import {
  ArrowsRightLeftIcon,
  CloudArrowDownIcon,
  CloudArrowUpIcon,
  TrashIcon
} from '@heroicons/react/24/outline'

export const activityIcons = {
  upload: {
    ActivityIcon: CloudArrowUpIcon,
    bg: 'bg-orange-100',
    color: 'text-orange-500'
  },
  download: {
    ActivityIcon: CloudArrowDownIcon,
    bg: 'bg-blue-100',
    color: 'text-blue-500'
  },
  conflict: {
    ActivityIcon: ArrowsRightLeftIcon,
    bg: 'bg-red-100',
    color: 'text-red-500'
  },
  trash: {
    ActivityIcon: TrashIcon,
    bg: 'bg-gray-100',
    color: 'text-gray-400'
  }
}
