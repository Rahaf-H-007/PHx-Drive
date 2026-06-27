/* eslint-disable react/prop-types */
export default function SettingsCard({ label, children, className = '' }) {
  return (
    <section className={`border border-gray-200 rounded-2xl bg-white overflow-hidden ${className}`}>
      <p className="px-5 pt-4 pb-0 text-xs text-gray-400 font-normal">{label}</p>
      {children}
    </section>
  )
}
