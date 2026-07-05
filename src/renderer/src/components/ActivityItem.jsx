/* eslint-disable react/prop-types */
import ActivityIconBadge from './ActivityIconBadge'
import { formatRelativeTime, formatFileSize } from '../utils/formatTime'

export default function ActivityItem({ item, isLast }) {
  const filename = item.path.split('/').pop() || item.path
  const size = formatFileSize(item.size)
  // here we replace underscores with spaces
  // and filter in case there is falsy value(like size being null for a folder)
  const label = [item.event_type.split('_').join(' '), size].filter(Boolean).join(' - ')

  return (
    <li className={`flex items-center gap-4 py-4 ${!isLast ? 'border-b border-gray-100' : ''}`}>
      <ActivityIconBadge type={item.event_type} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate leading-snug">{filename}</p>
        <p className="text-sm text-gray-400 mt-0.5 leading-snug">{label}</p>
      </div>
      <span className="text-sm text-gray-400 whitespace-nowrap shrink-0">
        {formatRelativeTime(item.occurred_at)}
      </span>
    </li>
  )
}
