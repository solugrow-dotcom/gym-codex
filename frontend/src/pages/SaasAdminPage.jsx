import { SectionTitle } from '../components/SectionTitle';

export const SaasAdminPage = () => (
  <div className="grid gap-6 xl:grid-cols-2">
    <div className="card">
      <SectionTitle eyebrow="Super control" title="Multi-tenant SaaS administration" subtitle="Manage gyms, owner subscriptions, features, and global analytics." />
      <ul className="space-y-3 text-sm text-slate-500">
        <li>• Subdomain-based tenant separation architecture (`gymname.app.com`).</li>
        <li>• Feature flags to enable/disable modules per gym.</li>
        <li>• Trial conversion, subscription lifecycle, and admin earnings tracking.</li>
      </ul>
    </div>
    <div className="card">
      <SectionTitle eyebrow="Automation" title="Notifications & activity logging" subtitle="Email, WhatsApp, backup/restore, and action audit trails." />
      <ul className="space-y-3 text-sm text-slate-500">
        <li>• Nodemailer + Twilio service layer with mock mode fallback.</li>
        <li>• Activity log model for who-did-what auditing.</li>
        <li>• Backup API endpoint for data export / restore workflows.</li>
      </ul>
    </div>
  </div>
);
