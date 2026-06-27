/* eslint-disable react/prop-types */
export default function SettingsSyncModeOption({ mode, selected, onChange }) {
  const isSelected = selected === mode.value

  return (
    <label
      htmlFor={mode.id}
      className={[
        'flex items-start gap-3.5 rounded-xl border px-4 py-3.5 cursor-pointer transition-colors',
        isSelected ? 'border-[#8B1A1A] bg-[#FDF2F2]' : 'border-gray-200 bg-white hover:bg-gray-50'
      ].join(' ')}
    >
      <input
        type="radio"
        id={mode.id}
        name="sync-mode"
        value={mode.value}
        checked={isSelected}
        onChange={() => onChange(mode.value)}
        className="sr-only"
      />

      {/* Custom radio indicator */}
      <div
        className={[
          'mt-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors',
          isSelected ? 'border-[#8B1A1A]' : 'border-gray-300'
        ].join(' ')}
        aria-hidden="true"
      >
        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-[#8B1A1A]" />}
      </div>

      {/* Label + description */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-semibold text-gray-900">{mode.label}</span>
          {mode.isDefault && (
            <span className="bg-[#8B1A1A] inline-block text-xs font-semibold text-white rounded-md px-2 py-0.5 leading-tight">
              Default
            </span>
          )}
        </div>
        <p className="text-sm text-gray-500 mt-0.5 leading-relaxed">{mode.description}</p>
      </div>
    </label>
  )
}
