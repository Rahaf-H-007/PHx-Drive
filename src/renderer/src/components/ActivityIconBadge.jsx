/* eslint-disable react/prop-types */
import { activityIcons } from '../icons/activityIcons'
export default function ActivityIconBadge({ type }) {
  const { ActivityIcon, bg, color } = activityIcons[type] ?? activityIcons.upload
  return (
    <div
      className={`flex items-center justify-center w-10 h-10 rounded-xl shrink-0 ${bg}`}
      aria-hidden="true"
    >
      <ActivityIcon className={`w-5 h-5 ${color}`} />
    </div>
  )
}
