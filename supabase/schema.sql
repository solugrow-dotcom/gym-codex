-- SoluGrow core schema (Supabase/Postgres)
create extension if not exists "uuid-ossp";

create table if not exists users (
  id uuid primary key,
  email text unique not null,
  phone text,
  full_name text,
  role text not null check (role in ('admin','gym_owner','trainer','manager','receptionist','member')),
  city text,
  state text,
  country text,
  status text default 'active',
  created_at timestamptz default now()
);

create table if not exists gyms (
  id uuid primary key default uuid_generate_v4(),
  owner_user_id uuid references users(id) on delete cascade,
  name text not null,
  email text,
  phone text,
  city text,
  state text,
  country text,
  logo_url text,
  banner_url text,
  status text default 'trial',
  plan_name text,
  trial_start_date timestamptz,
  trial_end_date timestamptz,
  start_date timestamptz,
  end_date timestamptz,
  created_at timestamptz default now()
);

create table if not exists members (
  id uuid primary key default uuid_generate_v4(),
  gym_id uuid references gyms(id) on delete cascade,
  user_id uuid references users(id),
  member_uid text unique,
  name text not null,
  phone text,
  plan text,
  amount numeric,
  start_date timestamptz,
  end_date timestamptz,
  status text default 'active',
  qr_code text,
  created_at timestamptz default now()
);

create table if not exists staff (
  id uuid primary key default uuid_generate_v4(),
  gym_id uuid references gyms(id) on delete cascade,
  user_id uuid references users(id),
  full_name text not null,
  phone text,
  role text check (role in ('trainer','manager','receptionist','other')),
  created_at timestamptz default now()
);

create table if not exists subscriptions (
  id uuid primary key default uuid_generate_v4(),
  gym_id uuid references gyms(id) on delete cascade,
  plan_name text not null,
  status text default 'active',
  start_date timestamptz,
  end_date timestamptz,
  razorpay_payment_id text,
  created_at timestamptz default now()
);

create table if not exists payments (
  id uuid primary key default uuid_generate_v4(),
  gym_id uuid references gyms(id) on delete cascade,
  member_id uuid references members(id),
  amount numeric not null,
  status text default 'pending',
  mode text,
  payment_date timestamptz,
  created_at timestamptz default now()
);

create table if not exists attendance (
  id uuid primary key default uuid_generate_v4(),
  gym_id uuid references gyms(id) on delete cascade,
  member_id uuid references members(id),
  method text default 'manual',
  status text default 'present',
  checkin_at timestamptz default now()
);

create table if not exists workouts (
  id uuid primary key default uuid_generate_v4(),
  gym_id uuid references gyms(id) on delete cascade,
  member_id uuid references members(id),
  trainer_id uuid references users(id),
  exercise text,
  sets text,
  reps text,
  time text,
  feedback text,
  created_at timestamptz default now()
);

create table if not exists diet_plans (
  id uuid primary key default uuid_generate_v4(),
  gym_id uuid references gyms(id) on delete cascade,
  member_id uuid references members(id),
  trainer_id uuid references users(id),
  details text,
  created_at timestamptz default now()
);
