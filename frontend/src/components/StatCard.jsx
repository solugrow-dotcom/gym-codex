export const StatCard = ({ title, value, delta }) => (
  <div className="card">
    <p className="text-sm text-slate-500">{title}</p>
    <div className="mt-3 flex items-end justify-between">
      <h3 className="text-3xl font-bold">{value}</h3>
      <span className="rounded-full bg-brand-500/10 px-3 py-1 text-xs font-semibold text-brand-500">{delta}</span>
    </div>
  </div>
);
