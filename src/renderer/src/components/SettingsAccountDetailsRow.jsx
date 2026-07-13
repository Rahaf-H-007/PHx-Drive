/* eslint-disable react/prop-types */
export default function SettingsAccountDetailRow({ label, value }) {
  return (
    <div className="flex items-center justify-between px-5 py-3 border-b border-base-200 last:border-0">
      <span className="text-sm text-base-content/50">{label}</span>
      <span className="text-sm font-medium text-base-content">
        {value !== null && value !== undefined && value !== '' ? value : '—'}
      </span>
    </div>
  )
}
