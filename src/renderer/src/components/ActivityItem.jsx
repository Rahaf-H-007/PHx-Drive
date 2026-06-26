import ActivityIconBadge from './ActivityIconBadge'

/* eslint-disable react/prop-types */
export default function ActivityItem({ item, isLast }) {
  return (
    <li className={`flex items-center gap-4 py-4 ${!isLast ? 'border-b border-gray-100' : ''}`}>
      <ActivityIconBadge type={item.type} />

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate leading-snug">{item.filename}</p>
        <p className="text-sm text-gray-400 mt-0.5 leading-snug">{item.status}</p>
      </div>

      <span className="text-sm text-gray-400 whitespace-nowrap shrink-0">{item.time}</span>
    </li>
  )
}
