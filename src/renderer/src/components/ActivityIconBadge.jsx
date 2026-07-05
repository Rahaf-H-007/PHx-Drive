/* eslint-disable react/prop-types */
import { BADGE_CONFIG } from '../icons/activityIcons'

export default function ActivityIconBadge({ type }) {
  const { Icon, bg, color } = BADGE_CONFIG[type] ?? BADGE_CONFIG.error
  return (
    <div className={`flex items-center justify-center w-9 h-9 rounded-xl ${bg} shrink-0`}>
      <Icon className={`w-5 h-5 ${color} stroke-[1.5]`} />
    </div>
  )
}
