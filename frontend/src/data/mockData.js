export const stats = [
  { title: 'Members', value: '1,284', delta: '+12.4%' },
  { title: 'Revenue', value: '₹4.8L', delta: '+18.2%' },
  { title: 'Attendance', value: '93%', delta: '+2.1%' },
  { title: 'Pending', value: '37', delta: '-8.4%' }
];

export const revenueSeries = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [{ label: 'Revenue', data: [240000, 270000, 320000, 350000, 420000, 480000], borderColor: '#22c55e', backgroundColor: 'rgba(34,197,94,0.2)' }]
};

export const planComparison = [
  { name: 'Free', price: '₹0', features: ['50 members', 'Basic dashboard', 'Email support'] },
  { name: 'Pro', price: '₹2,999/mo', features: ['Unlimited members', 'Payments & QR', 'Analytics + automations'] },
  { name: 'Premium', price: '₹6,999/mo', features: ['White-label SaaS', 'Advanced reports', 'Priority support'] }
];

export const members = [
  { name: 'Aarav Sharma', plan: 'Premium Annual', status: 'Active', trainer: 'Coach Neha' },
  { name: 'Sara Khan', plan: 'Quarterly Shred', status: 'Expiring Soon', trainer: 'Coach Raj' },
  { name: 'Dev Patel', plan: 'Monthly Flex', status: 'Pending Payment', trainer: 'Coach Mira' }
];

export const gyms = [
  { name: 'Iron Temple', plan: 'Premium', mrr: '₹89k', status: 'Active' },
  { name: 'Pulse Fitness', plan: 'Pro', mrr: '₹31k', status: 'Trial' },
  { name: 'Zen Strength', plan: 'Free', mrr: '₹0', status: 'Converted' }
];
