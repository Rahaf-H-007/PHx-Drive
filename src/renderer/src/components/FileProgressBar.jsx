/* eslint-disable react/prop-types */
export default function FileProgressBar({ syncPercent }) {
  return (
    <div className="w-44 h-1.5 bg-gray-200 rounded-full overflow-hidden">
      <div className="h-full bg-orange-400 rounded-full" style={{ width: `${syncPercent}%` }}></div>
    </div>
  )
}
