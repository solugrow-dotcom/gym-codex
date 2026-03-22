import { DataTable } from '../components/DataTable';
import { SectionTitle } from '../components/SectionTitle';

const rows = [
  { Name: 'Aanya Shah', Phone: '+91 9876543210', Status: 'Active', Progress: 'BMI 21.1 ↓' },
  { Name: 'Rohit Das', Phone: '+91 9988776655', Status: 'Expired', Progress: 'Weight 84kg → 78kg' },
  { Name: 'Maya Verma', Phone: '+91 8899001122', Status: 'Pending', Progress: 'Body fat 23% ↓' }
];

export const MembersPage = () => (
  <div className="card">
    <SectionTitle eyebrow="Members" title="Advanced member management" subtitle="Membership history, progress tracking, notes, QR identities, and auto-expiry readiness." />
    <div className="mb-6 grid gap-4 md:grid-cols-3">
      <div className="rounded-3xl bg-slate-100 p-4 dark:bg-slate-800">Full profile fields with photo, DOB, gender, notes, and emergency details.</div>
      <div className="rounded-3xl bg-slate-100 p-4 dark:bg-slate-800">Membership history timeline + active/expired lifecycle handling.</div>
      <div className="rounded-3xl bg-slate-100 p-4 dark:bg-slate-800">Trainer assignment, progress measurements, and remarks audit trail.</div>
    </div>
    <DataTable columns={['Name', 'Phone', 'Status', 'Progress']} rows={rows} />
  </div>
);
