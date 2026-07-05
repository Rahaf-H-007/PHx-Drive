import { useEffect, useState } from 'react'
import PageHeader from './PageHeader'
import RecentActivityCard from './RecentActivityCard'
import StatusCard from './StatusCard'
import LoadingSpinner from './LoadingSpinner'

export default function SyncActivity() {
  const [status, setStatus] = useState(null)
  const [activity, setActivity] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    //this is used to track whether the user switched tabs or not
    let cancelled = false

    async function fetchData() {
      try {
        const [statusData, activityData] = await Promise.all([
          window.api.getSyncStatus(),
          window.api.getRecentActivity()
        ])
        if (!cancelled) {
          setStatus(statusData)
          setActivity(activityData)
        }
      } catch (err) {
        console.error('Failed to fetch sync data:', err)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchData()
    //if the main process sends "sync:updated" call fetchData again
    window.api.onSyncUpdate(fetchData)
    //cleanup function when user switches tabs
    return () => {
      cancelled = true
      window.api.offSyncUpdate(fetchData)
    }
  }, [])

  return (
    <main className="flex-1 flex flex-col overflow-hidden">
      <PageHeader>
        <h1 className="text-lg font-bold text-gray-900 leading-tight">Sync Activity</h1>
        <p className="text-xs text-gray-400 leading-tight">Live Feed Of Sync Events</p>
      </PageHeader>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="flex-1 overflow-y-auto">
          <StatusCard status={status} />
          <RecentActivityCard activity={activity} />
        </div>
      )}
    </main>
  )
}
