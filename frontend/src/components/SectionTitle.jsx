export const SectionTitle = ({ eyebrow, title, subtitle }) => (
  <div className="mb-4">
    <p className="text-xs uppercase tracking-[0.4em] text-brand-500">{eyebrow}</p>
    <h3 className="text-2xl font-semibold">{title}</h3>
    {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}
  </div>
);
