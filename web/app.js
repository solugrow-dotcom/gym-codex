const SUPABASE_URL = localStorage.getItem('supabase_url') || 'https://YOUR_PROJECT.supabase.co';
const SUPABASE_ANON = localStorage.getItem('supabase_anon') || 'YOUR_ANON_KEY';
const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON);

const roleRoutes = {
  admin: '/admin',
  gym_owner: '/dashboard',
  trainer: '/trainer',
  manager: '/manager',
  receptionist: '/reception',
  member: '/member'
};

async function getProfile() {
  const { data: { user } } = await sb.auth.getUser();
  if (!user) return null;
  const { data } = await sb.from('users').select('*').eq('id', user.id).single();
  return data || null;
}

async function redirectIfLoggedIn() {
  const profile = await getProfile();
  if (profile?.role && roleRoutes[profile.role]) {
    location.href = roleRoutes[profile.role];
  }
}

async function requireAuth(allowedRoles = []) {
  const profile = await getProfile();
  if (!profile) {
    location.href = '/login';
    return null;
  }
  if (allowedRoles.length && !allowedRoles.includes(profile.role)) {
    location.href = roleRoutes[profile.role] || '/login';
    return null;
  }
  return profile;
}

async function requireActiveSubscription(profile) {
  if (profile.role !== 'gym_owner') return true;
  const { data: gym } = await sb.from('gyms').select('*').eq('owner_user_id', profile.id).single();
  if (!gym) return false;
  const now = new Date();
  const trialEnded = gym.trial_end_date && new Date(gym.trial_end_date) < now;
  const activePlan = gym.status === 'active';
  if (trialEnded && !activePlan) {
    location.href = '/upgrade';
    return false;
  }
  return true;
}

async function signupGymOwner(formData) {
  const { data, error } = await sb.auth.signUp({
    email: formData.email,
    password: formData.password,
    options: { data: { phone: formData.phone } }
  });
  if (error) throw error;

  const userId = data.user.id;
  const now = new Date();
  const trialEnd = new Date(now);
  trialEnd.setDate(trialEnd.getDate() + 3);

  const { error: uErr } = await sb.from('users').insert({
    id: userId,
    email: formData.email,
    phone: formData.phone,
    role: 'gym_owner',
    full_name: formData.gym_name,
    city: formData.city,
    state: formData.state,
    country: formData.country,
    status: 'active'
  });
  if (uErr) throw uErr;

  const { error: gErr } = await sb.from('gyms').insert({
    name: formData.gym_name,
    owner_user_id: userId,
    email: formData.email,
    phone: formData.phone,
    city: formData.city,
    state: formData.state,
    country: formData.country,
    status: 'trial',
    trial_start_date: now.toISOString(),
    trial_end_date: trialEnd.toISOString()
  });
  if (gErr) throw gErr;
}

async function login(email, password) {
  const { error } = await sb.auth.signInWithPassword({ email, password });
  if (error) throw error;
  const profile = await getProfile();
  location.href = roleRoutes[profile.role] || '/dashboard';
}

async function logout() {
  await sb.auth.signOut();
  location.href = '/';
}

async function startPayment(planName, amountPaise) {
  const profile = await getProfile();
  const options = {
    key: 'RAZORPAY_KEY_ID',
    amount: amountPaise,
    currency: 'INR',
    name: 'SoluGrow',
    description: `${planName} Plan Subscription`,
    handler: async function (response) {
      const start = new Date();
      const end = new Date(start);
      end.setMonth(end.getMonth() + 1);
      const { data: gym } = await sb.from('gyms').select('id').eq('owner_user_id', profile.id).single();
      await sb.from('subscriptions').insert({
        gym_id: gym.id,
        plan_name: planName,
        start_date: start.toISOString(),
        end_date: end.toISOString(),
        status: 'active',
        razorpay_payment_id: response.razorpay_payment_id
      });
      await sb.from('gyms').update({ status: 'active', plan_name: planName }).eq('id', gym.id);
      alert('Payment successful. Plan activated.');
      location.href = '/dashboard';
    },
    theme: { color: '#ff7a18' }
  };
  const rzp = new Razorpay(options);
  rzp.open();
}

window.App = {
  sb,
  redirectIfLoggedIn,
  requireAuth,
  requireActiveSubscription,
  signupGymOwner,
  login,
  logout,
  startPayment,
  getProfile
};
