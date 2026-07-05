/* eslint-disable react/prop-types */
import ActivityItem from './ActivityItem'

export default function RecentActivityCard({ activity }) {
  return (
    <div className="m-7 mt-0 bg-white rounded-2xl shadow-sm border border-gray-100/80">
      <div className="px-6 pt-5 pb-1">
        <p className="text-xs font-semibold tracking-[0.12em] uppercase text-gray-400">
          Recent Activity
        </p>
      </div>

      {activity.length === 0 ? (
        <p className="px-6 pb-5 pt-3 text-sm text-gray-400">No activity yet.</p>
      ) : (
        <ul className="px-6 pb-2" role="list" aria-label="Recent sync activity">
          {activity.map((item, index) => (
            <ActivityItem key={item.id} item={item} isLast={index === activity.length - 1} />
          ))}
        </ul>
      )}
    </div>
  )
}
