import FileRow from './FileRow'

export default function FileTable() {
  const FILES = [
    {
      id: 1,
      name: 'Q2_Financial_Report.pdf',
      ext: 'pdf',
      size: '4.2 MB',
      modified: '2026-06-21 14:30',
      status: 'synced',
      syncPercent: 100
    },
    {
      id: 2,
      name: 'Design_Assets_v3.zip',
      ext: 'zip',
      size: '128 MB',
      modified: '2026-06-22 09:15',
      status: 'syncing',
      syncPercent: 62
    },
    {
      id: 3,
      name: 'Budget_2026.xlsx',
      ext: 'xlsx',
      size: '1.1 MB',
      modified: '2026-06-20 11:00',
      status: 'conflict',
      syncPercent: 90
    },
    {
      id: 4,
      name: 'Meeting_Notes_draft.txt',
      ext: 'txt',
      size: '12 KB',
      modified: '2026-06-18 16:45',
      status: 'error',
      syncPercent: 50
    },
    {
      id: 5,
      name: 'Product_Roadmap_2026.pptx',
      ext: 'pptx',
      size: '55 MB',
      modified: '2026-06-19 08:00',
      status: 'synced',
      syncPercent: 100
    },
    {
      id: 6,
      name: 'Team_Photo_Offsite.jpg',
      ext: 'jpg',
      size: '8.7 MB',
      modified: '2026-06-17 13:22',
      status: 'synced',
      syncPercent: 100
    },
    {
      id: 7,
      name: 'Client_Proposal_Final.docx',
      ext: 'docx',
      size: '2.3 MB',
      modified: '2026-06-22 11:50',
      status: 'syncing',
      syncPercent: 35
    }
  ]
  return (
    <div className="flex-1 px-8 py-5 overflow-auto m-0 mt-2">
      <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full table-fixed">
          {/* Column headers */}
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th
                className="px-6 py-3 text-left text-[11px] font-semibold text-gray-400
              uppercase tracking-[0.08em]"
              >
                Name
              </th>

              <th
                className="w-24 px-0 py-3 text-left text-[11px] font-semibold text-gray-400
              uppercase tracking-[0.08em]"
              >
                Size
              </th>

              <th
                className="w-44 px-0 py-3 text-left text-[11px] font-semibold text-gray-400
              uppercase tracking-[0.08em]"
              >
                Modified
              </th>

              <th
                className="w-32 px-0 py-3 text-left text-[11px] font-semibold text-gray-400
              uppercase tracking-[0.08em]"
              >
                Status
              </th>
            </tr>
          </thead>

          {/* Rows */}
          <tbody>
            {FILES.map((file, idx) => (
              <FileRow key={file.id} file={file} isLast={idx === FILES.length - 1} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
