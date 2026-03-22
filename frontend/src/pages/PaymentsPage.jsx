import { DataTable } from '../components/DataTable';
import { SectionTitle } from '../components/SectionTitle';

const rows = [
  { Invoice: 'INV-1001', Member: 'Aarav Sharma', Method: 'Stripe', Status: 'Paid', Amount: '₹12,000' },
  { Invoice: 'INV-1002', Member: 'Sara Khan', Method: 'UPI', Status: 'Pending', Amount: '₹2,500' },
  { Invoice: 'INV-1003', Member: 'Dev Patel', Method: 'Cash', Status: 'Paid', Amount: '₹1,800' }
];

export const PaymentsPage = () => (
  <div className="card space-y-6">
    <SectionTitle eyebrow="Payments" title="Billing, reminders, invoices, and SaaS monetization" subtitle="Track member payments plus subscription billing for gym owners." />
    <div className="grid gap-4 md:grid-cols-3">
      <div className="rounded-3xl bg-brand-500/10 p-4 text-sm">Stripe / Razorpay test integrations for card checkout.</div>
      <div className="rounded-3xl bg-brand-500/10 p-4 text-sm">Cash + UPI tracking with automated invoice PDF delivery.</div>
      <div className="rounded-3xl bg-brand-500/10 p-4 text-sm">Trial, upgrade, downgrade, reminders, and admin earnings dashboard.</div>
    </div>
    <DataTable columns={['Invoice', 'Member', 'Method', 'Status', 'Amount']} rows={rows} />
  </div>
);
