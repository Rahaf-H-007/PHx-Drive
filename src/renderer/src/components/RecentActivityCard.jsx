import ActivityItem from './ActivityItem'

export default function RecentActivityCard() {
  const RECENT_ACTIVITY = [
    {
      id: 1,
      filename: 'Client_Proposal_Final.docx',
      status: 'Uploaded to cloud',
      time: '2 min ago',
      type: 'upload'
    },
    {
      id: 2,
      filename: 'Q2_Financial_Report.pdf',
      status: 'Downloaded from cloud',
      time: '6 min ago',
      type: 'download'
    },
    {
      id: 3,
      filename: 'Budget_2026.xlsx',
      status: 'Conflict — both copies kept',
      time: '14 min ago',
      type: 'conflict'
    },
    {
      id: 4,
      filename: 'Old_Logo.png',
      status: 'Moved to Trash',
      time: '1 hr ago',
      type: 'trash'
    },
    {
      id: 5,
      filename: 'Team_Photo_Offsite.jpg',
      status: 'Uploaded to cloud',
      time: '2 hr ago',
      type: 'upload'
    },
    {
      id: 6,
      filename: 'Product_Roadmap_2026.pptx',
      status: 'Downloaded from cloud',
      time: '3 hr ago',
      type: 'download'
    },
    {
      id: 7,
      filename: 'Product_Roadmap_2026.pptx',
      status: 'Downloaded from cloud',
      time: '3 hr ago',
      type: 'download'
    },
    {
      id: 8,
      filename: 'Product_Roadmap_2026.pptx',
      status: 'Downloaded from cloud',
      time: '3 hr ago',
      type: 'download'
    }
  ]
  return (
    <div className="m-7 mt-0 bg-white rounded-2xl shadow-sm border border-gray-100/80 ">
      {/* Section header */}
      <div className="px-6 pt-5 pb-1">
        <p className="text-xs font-semibold tracking-[0.12em] uppercase text-gray-400">
          Recent Activity
        </p>
      </div>

      {/* Activity list */}
      <ul className="px-6 pb-2" role="list" aria-label="Recent sync activity">
        {RECENT_ACTIVITY.map((item, index) => (
          <ActivityItem key={item.id} item={item} isLast={index === RECENT_ACTIVITY.length - 1} />
        ))}
      </ul>
    </div>
  )
}
