import {
  CheckCircleIcon,
  ArrowPathIcon,
  ExclamationTriangleIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline'

export const fileStatusIcons = {
  synced: {
    Icon: CheckCircleIcon,
    iconClass: 'text-green-500',
    textClass: 'text-green-600'
  },
  syncing: {
    Icon: ArrowPathIcon,
    iconClass: 'text-orange-500 animate-spin',
    textClass: 'text-orange-600'
  },
  conflict: {
    Icon: ExclamationTriangleIcon,
    iconClass: 'text-yellow-500',
    textClass: 'text-yellow-600'
  },
  error: {
    Icon: ExclamationCircleIcon,
    iconClass: 'text-red-500',
    textClass: 'text-red-600'
  }
}
