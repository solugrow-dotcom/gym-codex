import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, ArcElement } from 'chart.js';
import { Doughnut, Line } from 'react-chartjs-2';
import { SectionTitle } from '../components/SectionTitle';
import { StatCard } from '../components/StatCard';
import { DataTable } from '../components/DataTable';
import { gyms, members, planComparison, revenueSeries, stats } from '../data/mockData';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, ArcElement);

const donutData = {
  labels: ['Active', 'Expired', 'Pending'],
  datasets: [{ data: [832, 194, 37], backgroundColor: ['#22c55e', '#f97316', '#ef4444'] }]
};

export const DashboardPage = () => (
  <div className="space-y-6">
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => <StatCard key={stat.title} {...stat} />)}
    </section>

    <section className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
      <div className="card">
        <SectionTitle eyebrow="Revenue" title="Weekly & monthly revenue growth" subtitle="Track high-performing locations and plan profitability." />
        <Line data={revenueSeries} />
      </div>
      <div className="card">
        <SectionTitle eyebrow="Retention" title="Active vs expired members" subtitle="Automated expiry tracking and renewal follow-up." />
        <Doughnut data={donutData} />
      </div>
    </section>

    <section className="grid gap-6 xl:grid-cols-2">
      <div className="card">
        <SectionTitle eyebrow="Members" title="Smart member operations" subtitle="Profiles, trainers, status alerts, and engagement visibility." />
        <DataTable columns={['Name', 'Plan', 'Status', 'Trainer']} rows={members} />
      </div>
      <div className="card">
        <SectionTitle eyebrow="Monetization" title="SaaS plan comparison" subtitle="Free, Pro, and Premium billing tiers with room for upgrades and trials." />
        <div className="space-y-4">
          {planComparison.map((plan) => (
            <div key={plan.name} className="rounded-3xl border border-slate-200 p-4 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold">{plan.name}</h4>
                <span className="text-brand-500">{plan.price}</span>
              </div>
              <ul className="mt-3 space-y-2 text-sm text-slate-500">
                {plan.features.map((feature) => <li key={feature}>• {feature}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="card">
      <SectionTitle eyebrow="Platform analytics" title="Super admin gym overview" subtitle="See monetization performance across all tenant gyms." />
      <DataTable columns={['Gym', 'Plan', 'MRR', 'Status']} rows={gyms} />
    </section>
  </div>
);
