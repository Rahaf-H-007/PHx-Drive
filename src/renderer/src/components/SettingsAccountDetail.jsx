/* eslint-disable react/prop-types */
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { /* useEffect, */ useState } from 'react'
import PageHeader from './PageHeader'
import SettingsCard from './SettingsCard'
import { formatFileSize, getInitials } from '../utils/format'

//TODO: clean up comments if UI is approved
export default function SettingsAccountDetail({ onBack, profile, quota, avatarSrc }) {
  const [imgError, setImgError] = useState(false)
  const usedPercent = quota ? Math.min(100, Math.round((quota.used / quota.limit) * 100)) : 0

  // useEffect(() => {
  //   async function load() {
  //     const [session, quotaData, avatar] = await Promise.all([
  //       window.api.getSession(),
  //       window.api.getStorageQuota(),
  //       window.api.getAvatar()
  //     ])
  //     setProfile(session)
  //     setQuota(quotaData)
  //     setAvatarSrc(avatar)
  //     setLoading(false)
  //   }
  //   load()
  // }, [])

  return (
    <main className="flex-1 overflow-y-auto">
      <PageHeader>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="p-1.5 rounded-lg hover:bg-base-200 hover:cursor-pointer transition-colors text-base-content/50 hover:text-base-content/70 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#8B1A1A]"
          >
            <ArrowLeftIcon className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-base-content leading-tight">Account</h1>
            <p className="text-xs text-base-content/40 leading-tight">Your profile & storage</p>
          </div>
        </div>
      </PageHeader>

      <div className="flex flex-col gap-5 px-8 py-6">
        {/* Profile */}
        <SettingsCard label="Profile">
          <div className="flex items-center gap-4 px-5 py-4">
            <div className="shrink-0 w-20 h-20 rounded-4xl overflow-hidden bg-[#8B1A1A] flex items-center justify-center text-white text-base font-semibold select-none">
              {!imgError && avatarSrc ? (
                <img
                  src={avatarSrc}
                  alt={profile?.owner ?? ''}
                  className="w-full h-full object-cover"
                  onError={() => setImgError(true)}
                />
              ) : (
                getInitials(profile?.owner)
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-base-content leading-tight truncate">
                {profile?.owner || '—'}
              </p>
              <p className="text-sm text-base-content/50 mt-0.5 leading-tight truncate">
                {profile?.user || '—'}
              </p>
            </div>
          </div>
        </SettingsCard>

        <SettingsCard label="Storage">
          <div className="px-5 pt-3 pb-5 flex flex-col gap-3">
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-base-content">
                <span className="font-medium">{formatFileSize(quota?.used)}</span>
                <span className="text-base-content/40"> used</span>
              </span>
              <span className="text-sm text-base-content/40">
                {formatFileSize(quota?.limit)} total
              </span>
            </div>
            <div className="w-full h-2 bg-base-200 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700 bg-[#8B1A1A]"
                style={{ width: `${usedPercent}%` }}
              />
            </div>
            <p className="text-xs text-base-content/40">
              {formatFileSize(quota?.available)} available
            </p>
          </div>
        </SettingsCard>
      </div>
    </main>
  )
}
