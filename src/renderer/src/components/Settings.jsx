import { useEffect, useState } from 'react'
import SettingsAccount from './SettingsAccount'
import SettingsFolder from './SettingsFolder'
import SettingsSyncMode from './SettingsSyncMode'
import SettingsSignOut from './SettingsSignOut'
import PageHeader from './PageHeader'
import SettingsLinks from './SettingsLinks'
import SettingsAccountDetail from './SettingsAccountDetail'
import SettingsTheme from './SettingsTheme'

export default function Settings() {
  const [settings, setSettings] = useState({ syncFolder: '', syncMode: 'manual' })
  const [view, setView] = useState('settings')
  const [profileData, setProfileData] = useState(null)
  const [quota, setQuota] = useState(null)

  useEffect(() => {
    async function load() {
      const [settingsData, quotaData, profile] = await Promise.all([
        window.api.loadSettings(),
        window.api.getStorageQuota(),
        window.api.getProfile()
      ])
      setSettings(settingsData)
      setQuota(quotaData)
      setProfileData(profile)
    }
    load()
  }, [])

  const handleSave = async () => {
    const results = await window.api.saveSettings(settings)
    console.log(results, settings, 'settings saved successfully')
  }

  if (view === 'account') {
    return (
      <SettingsAccountDetail
        onBack={() => setView('settings')}
        profileData={profileData}
        quota={quota}
      />
    )
  }

  return (
    <main className="flex-1 overflow-y-auto">
      <PageHeader>
        <h1 className="text-lg font-bold text-base-content leading-tight">Settings</h1>
        <p className="text-xs text-base-content/40 leading-tight">
          Manage Your PHx Drive Preferences
        </p>
      </PageHeader>
      <div className="flex flex-col gap-5 px-8 py-6">
        <SettingsTheme />
        <SettingsAccount onClick={() => setView('account')} />
        <SettingsFolder
          folderPath={settings.syncFolder}
          onFolderChange={(folder) =>
            setSettings((prev) => ({
              ...prev,
              syncFolder: folder
            }))
          }
        />
        <SettingsSyncMode
          syncMode={settings.syncMode}
          onSyncModeChange={(mode) =>
            setSettings((prev) => ({
              ...prev,
              syncMode: mode
            }))
          }
        />
        <button
          type="button"
          onClick={handleSave}
          className="self-start px-6 py-2.5 text-sm font-semibold text-white rounded-xl bg-[#8B1A1A] hover:bg-[#7A1515] hover:cursor-pointer active:bg-[#6B1010] transition-colors focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#8B1A1A]"
        >
          Save changes
        </button>
        <SettingsLinks />
        <SettingsSignOut />
      </div>
    </main>
  )
}
