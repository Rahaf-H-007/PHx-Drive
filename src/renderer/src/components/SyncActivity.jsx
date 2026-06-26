import PageHeader from './PageHeader'
import RecentActivityCard from './RecentActivityCard'
import StatusCard from './StatusCard'

export default function SyncActivity() {
  return (
    <main className="flex-1 flex flex-col overflow-hidden">
      <PageHeader>
        <h1 className="text-lg font-bold text-gray-900 leading-tight">Sync Activity</h1>
        <p className="text-xs text-gray-400 leading-tight">Live Feed Of Sync Events</p>
      </PageHeader>
      <div className="flex-1 overflow-y-auto">
        <StatusCard />
        <RecentActivityCard />
      </div>
    </main>
  )
}
