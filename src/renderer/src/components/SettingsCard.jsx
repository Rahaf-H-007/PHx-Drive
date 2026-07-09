/* eslint-disable react/prop-types */
export default function SettingsCard({ label, children, className = '' }) {
  return (
    <section
      className={`border border-base-200 rounded-2xl bg-base-100 overflow-hidden ${className}`}
    >
      <p className="px-5 pt-4 pb-0 text-xs text-base-content/50 font-normal">{label}</p>
      {children}
    </section>
  )
}
