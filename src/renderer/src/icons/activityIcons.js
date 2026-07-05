import {
  ArrowUpIcon,
  ArrowDownIcon,
  FolderPlusIcon,
  TrashIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline'

export const BADGE_CONFIG = {
  uploaded: { Icon: ArrowUpIcon, bg: 'bg-blue-50', color: 'text-blue-500' },
  downloaded: { Icon: ArrowDownIcon, bg: 'bg-green-50', color: 'text-green-500' },
  folder_created: { Icon: FolderPlusIcon, bg: 'bg-yellow-50', color: 'text-yellow-500' },
  deleted: { Icon: TrashIcon, bg: 'bg-red-50', color: 'text-red-400' },
  error: { Icon: ExclamationCircleIcon, bg: 'bg-red-50', color: 'text-red-500' }
}
