import { useEffect, useState } from 'react'
import SettingsAccount from './SettingsAccount'
import SettingsFolder from './SettingsFolder'
import SettingsSyncMode from './SettingsSyncMode'
import SettingsSignOut from './SettingsSignOut'
import PageHeader from './PageHeader'
import SettingsLinks from './SettingsLinks'
import SettingsAccountDetail from './SettingsAccountDetail'

export default function Settings() {
  const [settings, setSettings] = useState({
    syncFolder: '',
    syncMode: 'manual'
  })
  const [view, setView] = useState('settings')
  const [profile, setProfile] = useState(null)
  const [quota, setQuota] = useState(null)
  const [avatarSrc, setAvatarSrc] = useState(null)

  useEffect(() => {
    async function load() {
      const [settingsData, session, quotaData, avatar] = await Promise.all([
        window.api.loadSettings(),
        window.api.getSession(),
        window.api.getStorageQuota(),
        window.api.getAvatar()
      ])
      setSettings(settingsData)
      setProfile(session)
      setQuota(quotaData)
      setAvatarSrc(avatar)
    }

    load()
  }, [])

  const handleSave = async () => {
    const results = await window.api.saveSettings(settings)
    console.log(results)
    console.log(settings)
    console.log('settings saved successfully')
  }

  if (view === 'account') {
    return (
      <SettingsAccountDetail
        onBack={() => setView('settings')}
        profile={profile}
        quota={quota}
        avatarSrc={avatarSrc}
      />
    )
  }

  return (
    <main className="flex-1  overflow-y-auto">
      <PageHeader>
        <h1 className="text-lg font-bold text-gray-900 leading-tight">Settings</h1>
        <p className="text-xs text-gray-400 leading-tight">Manage Your PHx Drive Preferences</p>
      </PageHeader>

      <div className="flex flex-col gap-5 px-8 py-6">
        <SettingsAccount
          onClick={() => setView('account')}
          profile={profile}
          // avatarSrc={avatarSrc}
          quota={quota}
        />

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
