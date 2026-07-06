import { useState, useEffect } from 'react'
import { ServerIcon } from '@heroicons/react/24/outline'

export default function Footer() {
  const [quota, setQuota] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchQuota() {
      try {
        const result = await window.api.getStorageQuota()
        setQuota(result)
      } catch (err) {
        console.error('Failed to fetch storage quota:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchQuota()

    // Refresh whenever a sync operation completes (upload, delete, etc.)
    window.api.onSyncUpdate(fetchQuota)
    return () => window.api.offSyncUpdate(fetchQuota)
  }, [])

  const storagePercent = quota ? Math.min((quota.used / quota.limit) * 100, 100) : 0
  const isWarning = storagePercent >= 80
  const isCritical = storagePercent >= 95

  const progressColor = isCritical
    ? 'progress-error'
    : isWarning
      ? 'progress-warning'
      : 'progress-info'
  const iconColor = isCritical ? 'text-red-600' : isWarning ? 'text-orange-500' : 'text-gray-400'

  return (
    <footer className="flex items-center gap-4 px-8 py-4 bg-white border-t border-gray-100 shrink-0">
      <ServerIcon className={`w-5 h-5 ${iconColor} shrink-0 transition-colors duration-300`} />

      {loading ? (
        <progress className="progress flex-1" />
      ) : (
        <progress
          className={`progress flex-1 transition-colors duration-300 ${progressColor}`}
          value={storagePercent}
          max="100"
        />
      )}

      <span className="text-sm font-medium text-gray-500 shrink-0 whitespace-nowrap">
        {loading
          ? '— / — GB'
          : quota
            ? `${formatGB(quota.used)} / ${formatGB(quota.limit)} GB`
            : 'Storage unavailable'}
      </span>
    </footer>
  )
}

function formatGB(bytes) {
  return (bytes / 1024 ** 3).toFixed(2)
}
