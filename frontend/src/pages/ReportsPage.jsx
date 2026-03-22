import { SectionTitle } from '../components/SectionTitle';

export const ReportsPage = () => (
  <div className="card space-y-6">
    <SectionTitle eyebrow="Reports" title="Exportable revenue, growth, and attendance analytics" subtitle="Business intelligence for gym owners and the SaaS operator." />
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {['Daily / Monthly / Yearly Revenue', 'Member Growth Trends', 'Attendance Heatmaps', 'CSV / PDF Exports'].map((item) => (
        <div key={item} className="rounded-3xl bg-slate-100 p-4 text-sm dark:bg-slate-800">{item}</div>
      ))}
    </div>
    <div className="rounded-3xl border border-dashed border-slate-300 p-6 text-sm text-slate-500 dark:border-slate-700">
      Hook these cards to `/reports` and `/reports/export/csv` for live analytics exports in production.
    </div>
  </div>
);
