/* eslint-disable react/prop-types */
import SettingsCard from './SettingsCard'
import SettingsSyncModeOption from './SettingsSyncModeOption'

export default function SettingsSyncMode({ syncMode, onSyncModeChange }) {
  const SYNC_MODES = [
    {
      id: 'manual',
      value: 'manual',
      label: 'Manual',
      description: 'Sync only when you press "Sync now". Best for metered connections.',
      isDefault: true
    },
    {
      id: 'automatic',
      value: 'automatic',
      label: 'Automatic',
      description: 'Files sync continuously in the background as they change.',
      isDefault: false
    }
  ]
  return (
    <SettingsCard label="Sync mode">
      {/* group radio buttons(accessibility) */}
      <fieldset className="px-5 pt-3 pb-5 flex flex-col gap-2">
        <legend className="sr-only">Choose a sync mode</legend>
        {SYNC_MODES.map((mode) => (
          <SettingsSyncModeOption
            key={mode.id}
            mode={mode}
            selected={syncMode}
            onChange={onSyncModeChange}
          />
        ))}
      </fieldset>
    </SettingsCard>
  )
}
