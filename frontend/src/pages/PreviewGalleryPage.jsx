import { Eye, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SectionTitle } from '../components/SectionTitle';

const pagePreviews = [
  {
    name: 'Dashboard',
    path: '/',
    highlights: ['Live KPI cards', 'Revenue + retention charts', 'SaaS monetization overview']
  },
  {
    name: 'Members',
    path: '/members',
    highlights: ['Advanced member profiles', 'Progress tracking', 'Membership lifecycle status']
  },
  {
    name: 'Attendance',
    path: '/attendance',
    highlights: ['QR/manual check-in flow', 'Late/absent tracking', 'Analytics-ready operations']
  },
  {
    name: 'Payments',
    path: '/payments',
    highlights: ['Stripe/Razorpay-ready billing', 'Cash + UPI tracking', 'Invoices and reminders']
  },
  {
    name: 'Trainers',
    path: '/trainers',
    highlights: ['Trainer panel workflow', 'Workout + diet planning', 'Performance reporting']
  },
  {
    name: 'Reports',
    path: '/reports',
    highlights: ['Revenue exports', 'Growth trends', 'Attendance intelligence']
  },
  {
    name: 'SaaS Admin',
    path: '/saas-admin',
    highlights: ['Global gym analytics', 'Feature control', 'Backup + audit operations']
  }
];

export const PreviewGalleryPage = () => (
  <div className="space-y-6">
    <div className="card">
      <SectionTitle
        eyebrow="Preview gallery"
        title="Pure project ka har page yahan preview mode mein"
        subtitle="Quickly review every major screen before wiring live APIs, auth state, and form workflows."
      />
      <div className="rounded-3xl border border-dashed border-brand-500/50 p-4 text-sm text-slate-500 dark:border-brand-500/30">
        Har card mein page ka short preview diya gaya hai; “Open page” se actual route par jump kar sakte ho.
      </div>
    </div>

    <section className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
      {pagePreviews.map((page) => (
        <article key={page.name} className="card flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-brand-500">Page preview</p>
              <h3 className="text-2xl font-semibold">{page.name}</h3>
            </div>
            <div className="rounded-2xl bg-brand-500/10 p-3 text-brand-500">
              <Eye size={20} />
            </div>
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-slate-100 via-white to-emerald-50 p-4 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
            <div className="mb-3 flex items-center justify-between text-xs text-slate-500">
              <span>{page.path}</span>
              <span>Preview</span>
            </div>
            <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
              <div className="h-3 w-24 rounded-full bg-brand-500/70" />
              <div className="grid grid-cols-3 gap-2">
                <div className="h-12 rounded-2xl bg-slate-100 dark:bg-slate-800" />
                <div className="h-12 rounded-2xl bg-slate-100 dark:bg-slate-800" />
                <div className="h-12 rounded-2xl bg-slate-100 dark:bg-slate-800" />
              </div>
              <div className="h-24 rounded-3xl bg-slate-100 dark:bg-slate-800" />
            </div>
          </div>

          <ul className="space-y-2 text-sm text-slate-500">
            {page.highlights.map((highlight) => (
              <li key={highlight}>• {highlight}</li>
            ))}
          </ul>

          <Link
            to={page.path}
            className="inline-flex items-center gap-2 rounded-2xl bg-brand-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-600"
          >
            Open page
            <ExternalLink size={16} />
          </Link>
        </article>
      ))}
    </section>
  </div>
);
