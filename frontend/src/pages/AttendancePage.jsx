import { SectionTitle } from '../components/SectionTitle';

export const AttendancePage = () => (
  <div className="grid gap-6 xl:grid-cols-2">
    <div className="card">
      <SectionTitle eyebrow="Attendance" title="QR-powered smart check-ins" subtitle="Support manual, scan, and QR flows with late/absent analytics." />
      <ul className="space-y-3 text-sm text-slate-500">
        <li>• Unique QR code per member for entry and kiosk scanning.</li>
        <li>• Daily logs with timestamps, trainer visibility, and member history.</li>
        <li>• Attendance analytics to identify churn and inactive users early.</li>
      </ul>
    </div>
    <div className="card">
      <SectionTitle eyebrow="Automation" title="Operational insights" subtitle="Late arrivals, no-shows, and trend reporting for staff." />
      <div className="rounded-3xl border border-dashed border-brand-500/50 p-6 text-sm text-slate-500">
        Real-time occupancy widgets and kiosk/mobile scanner hooks can connect directly to the attendance API endpoints.
      </div>
    </div>
  </div>
);
