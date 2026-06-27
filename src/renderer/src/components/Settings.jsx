import { useState } from 'react'
import SettingsAccount from './SettingsAccount'
import SettingsFolder from './SettingsFolder'
import SettingsSyncMode from './SettingsSyncMode'
import SettingsSignOut from './SettingsSignOut'
import PageHeader from './PageHeader'

export default function Settings() {
  const [syncMode, setSyncMode] = useState('manual')

  return (
    <main className="flex-1  overflow-y-auto">
      <PageHeader>
        <h1 className="text-lg font-bold text-gray-900 leading-tight">Settings</h1>
        <p className="text-xs text-gray-400 leading-tight">Manage Your PHx Drive Preferences</p>
      </PageHeader>

      <div className="flex flex-col gap-5 px-8 py-6">
        <SettingsAccount />

        <SettingsFolder />

        <SettingsSyncMode syncMode={syncMode} onSyncModeChange={setSyncMode} />

        <button
          type="button"
          className="self-start px-6 py-2.5 text-sm font-semibold text-white rounded-xl bg-[#8B1A1A] hover:bg-[#7A1515] hover:cursor-pointer active:bg-[#6B1010] transition-colors focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#8B1A1A]"
        >
          Save changes
        </button>

        <SettingsSignOut />
      </div>
    </main>
  )
}
