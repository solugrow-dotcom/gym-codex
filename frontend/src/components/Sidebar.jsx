import { BarChart3, Bell, CreditCard, Dumbbell, Eye, LayoutDashboard, ShieldCheck, Users } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const navItems = [
  ['/', 'Dashboard', LayoutDashboard],
  ['/members', 'Members', Users],
  ['/attendance', 'Attendance', ShieldCheck],
  ['/payments', 'Payments', CreditCard],
  ['/trainers', 'Trainers', Dumbbell],
  ['/reports', 'Reports', BarChart3],
  ['/saas-admin', 'SaaS Admin', Bell],
  ['/preview-gallery', 'Preview Gallery', Eye]
];

export const Sidebar = () => (
  <aside className="w-full max-w-72 space-y-2 rounded-3xl border border-slate-200 bg-white/70 p-4 backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
    <div className="mb-6">
      <p className="text-xs uppercase tracking-[0.4em] text-brand-500">Gym SaaS</p>
      <h1 className="text-2xl font-bold">Control Center</h1>
    </div>
    {navItems.map(([to, label, Icon]) => (
      <NavLink
        key={to}
        to={to}
        className={({ isActive }) => `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${isActive ? 'bg-brand-500 text-white' : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'}`}
      >
        <Icon size={18} />
        {label}
      </NavLink>
    ))}
  </aside>
);
