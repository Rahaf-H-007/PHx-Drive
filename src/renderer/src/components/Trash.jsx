import PageHeader from './PageHeader'
import TrashBanner from './TrashBanner'
import TrashTable from './TrashTable'

export default function Trash() {
  const TRASH_FILES = [
    {
      id: 1,
      name: 'Old_Logo.png',
      size: '240 KB',
      deletedAt: '2026-06-22 14:10',
      daysLeft: 29
    },
    {
      id: 2,
      name: 'Invoice_March.pdf',
      size: '180 KB',
      deletedAt: '2026-06-20 09:40',
      daysLeft: 27
    },
    {
      id: 3,
      name: 'Draft_Presentation.pptx',
      size: '32 MB',
      deletedAt: '2026-06-18 17:05',
      daysLeft: 25
    },
    {
      id: 4,
      name: 'temp_export.csv',
      size: '2.1 MB',
      deletedAt: '2026-06-15 10:00',
      daysLeft: 22
    }
  ]
  return (
    <main className="flex-1 flex flex-col overflow-hidden">
      <PageHeader>
        <h1 className="text-lg font-bold text-gray-900 leading-tight">Trash</h1>
        <p className="text-xs text-gray-400 leading-tight">Recently Deleted Files</p>
      </PageHeader>

      <div className="flex-1 overflow-y-auto">
        <TrashBanner />
        <TrashTable files={TRASH_FILES} />
        {/* <StatusCard />
        <RecentActivityCard /> */}
      </div>
    </main>
  )
}
