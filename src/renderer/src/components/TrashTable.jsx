/* eslint-disable react/prop-types */
import TrashRow from './TrashRow'

export default function TrashTable({ files }) {
  return (
    <div className="rounded-xl border border-gray-200/70 m-7">
      <table className="border-collapse w-full table-fixed">
        <thead>
          <tr className="bg-[#fbf9f5]">
            <th
              scope="col"
              className="py-3 pl-6 pr-4 text-left text-[11px] font-semibold uppercase tracking-widest text-gray-400"
            >
              Name
            </th>
            <th
              scope="col"
              className="py-3 px-4 text-left text-[11px] font-semibold uppercase tracking-widest text-gray-400"
            >
              Size
            </th>
            <th
              scope="col"
              className="py-3 px-4 text-left text-[11px] font-semibold uppercase tracking-widest text-gray-400"
            >
              Deleted
            </th>
            <th
              scope="col"
              className="py-3 px-4 text-left text-[11px] font-semibold uppercase tracking-widest text-gray-400"
            >
              Retention
            </th>
            {/* Empty header for actions column */}
            <th scope="col" className="py-3 pl-4 pr-6" aria-hidden="true" />
          </tr>
        </thead>
        <tbody>
          {files.map((file) => (
            <TrashRow key={file.id} file={file} /* onRestore={onRestore} onDelete={onDelete} */ />
          ))}
        </tbody>
      </table>
    </div>
  )
}
