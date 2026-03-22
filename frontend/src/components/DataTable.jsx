export const DataTable = ({ columns, rows }) => (
  <div className="overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800">
    <table className="min-w-full text-left text-sm">
      <thead className="bg-slate-50 dark:bg-slate-900">
        <tr>
          {columns.map((column) => <th key={column} className="px-4 py-3 font-medium text-slate-500">{column}</th>)}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex} className="border-t border-slate-200 dark:border-slate-800">
            {Object.values(row).map((value, valueIndex) => <td key={valueIndex} className="px-4 py-3">{value}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
