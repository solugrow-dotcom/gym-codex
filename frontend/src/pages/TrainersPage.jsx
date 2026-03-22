import { SectionTitle } from '../components/SectionTitle';

export const TrainersPage = () => (
  <div className="grid gap-6 lg:grid-cols-2">
    <div className="card">
      <SectionTitle eyebrow="Trainer panel" title="Assign members and manage workouts" subtitle="Supports trainer login, workout plans, reps/sets builder, and diet programs." />
      <ul className="space-y-3 text-sm text-slate-500">
        <li>• Workout plan builder with sets, reps, rest intervals, and goals.</li>
        <li>• Diet plan blocks with calories and food lists.</li>
        <li>• Performance tracking by assigned members and active renewals.</li>
      </ul>
    </div>
    <div className="card">
      <SectionTitle eyebrow="Reports" title="Progress reporting" subtitle="Deliver trainer-to-member insights that improve retention and upsells." />
      <div className="rounded-3xl border border-slate-200 p-5 text-sm text-slate-500 dark:border-slate-800">
        The backend includes trainer dashboard and workout endpoints ready for form-based UI expansion.
      </div>
    </div>
  </div>
);
