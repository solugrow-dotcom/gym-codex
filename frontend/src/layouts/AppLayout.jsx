import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';

export const AppLayout = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-emerald-50 p-4 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 md:p-6">
    <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <main className="space-y-6">
        <Header />
        <Outlet />
      </main>
    </div>
  </div>
);
