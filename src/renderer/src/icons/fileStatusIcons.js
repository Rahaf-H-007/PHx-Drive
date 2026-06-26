import {
  CheckCircleIcon,
  ArrowPathIcon,
  ExclamationTriangleIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline'

export const fileStatusIcons = {
  synced: {
    StatusIcon: CheckCircleIcon,
    statusIconClass: 'text-green-500',
    statusTextClass: 'text-green-600'
  },
  syncing: {
    StatusIcon: ArrowPathIcon,
    statusIconClass: 'text-orange-500 animate-spin',
    statusTextClass: 'text-orange-600'
  },
  conflict: {
    StatusIcon: ExclamationTriangleIcon,
    statusIconClass: 'text-yellow-500',
    statusTextClass: 'text-yellow-600'
  },
  error: {
    StatusIcon: ExclamationCircleIcon,
    statusIconClass: 'text-red-500',
    statusTextClass: 'text-red-600'
  }
}
