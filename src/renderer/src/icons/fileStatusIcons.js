import {
  CheckCircleIcon,
  ArrowPathIcon,
  ExclamationTriangleIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline'

export const STATUS_CONFIG = {
  synced: {
    Icon: CheckCircleIcon,
    bg: 'bg-green-100',
    color: 'text-green-500',
    label: 'All files up to date'
  },
  pending: { Icon: ArrowPathIcon, bg: 'bg-blue-100', color: 'text-blue-500', label: 'Syncing...' },
  conflict: {
    Icon: ExclamationTriangleIcon,
    bg: 'bg-yellow-100',
    color: 'text-yellow-500',
    label: 'Conflicts detected'
  },
  error: {
    Icon: ExclamationCircleIcon,
    bg: 'bg-red-100',
    color: 'text-red-500',
    label: 'Sync error'
  }
}
