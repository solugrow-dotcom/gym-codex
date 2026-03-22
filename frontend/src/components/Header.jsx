import { MoonStar, SunMedium } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../theme/ThemeContext';

export const Header = () => {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white/70 p-6 backdrop-blur md:flex-row md:items-center md:justify-between dark:border-slate-800 dark:bg-slate-900/70">
      <div>
        <p className="text-sm text-slate-500">Production-ready multi-tenant gym management SaaS.</p>
        <h2 className="text-3xl font-semibold">Welcome back, {user.name}</h2>
      </div>
      <div className="flex items-center gap-3">
        <div className="rounded-2xl border border-slate-200 px-4 py-2 text-sm dark:border-slate-800">
          {user.role} • {user.gym}
        </div>
        <button type="button" onClick={toggleTheme} className="rounded-2xl bg-slate-950 px-4 py-2 text-white dark:bg-white dark:text-slate-950">
          {theme === 'dark' ? <SunMedium size={18} /> : <MoonStar size={18} />}
        </button>
      </div>
    </header>
  );
};
