# B2B Gym Management SaaS — Super Admin Dashboard + CRM Blueprint (No-Code Ready)

## 1) Full System Overview

### 1.1 What this system is
A centralized **SaaS Owner Control Panel** that combines:
- **Admin Dashboard** (platform operations + billing + user governance)
- **CRM System** (lead pipeline + follow-ups + conversion + retention)

It is designed for one goal: **grow recurring revenue while reducing churn**.

### 1.2 Primary outcomes
- Real-time visibility into business growth (gyms, MRR, churn).
- Faster lead-to-paid conversion via structured CRM workflow.
- Better retention using proactive alerts on expiry, inactivity, and failed payments.
- Scalable operations with automation instead of manual follow-up.

### 1.3 No-code architecture (practical)
- **Backend + Auth + DB**: Supabase (recommended) or Firebase.
- **Dashboard/UI**: Lovable / WeWeb / FlutterFlow / Retool.
- **Automations**: n8n / Make / Zapier.
- **Messaging**: Email (Resend/SendGrid), SMS/OTP provider, WhatsApp API.
- **Payments**: Stripe/Razorpay for SaaS subscriptions.

### 1.4 Tenancy model
- Each gym is a tenant record.
- Super Admin has global access across all tenants.
- Gym owners only access their own tenant data.

---

## 2) Admin Dashboard UI Structure (Step-by-Step)

## 2.1 Global layout & design system

### Navigation
- **Left Sidebar**
  - Dashboard
  - Gyms
  - Subscriptions
  - Payments
  - CRM
  - Users
  - Notifications
  - Reports
  - System Settings
- **Top Bar**
  - Global search
  - Date range picker
  - Notifications bell
  - Theme toggle (Light/Dark)
  - Profile menu

### Visual style
- Clean, data-rich UI inspired by Stripe/HubSpot.
- Card-based sections with consistent spacing.
- Status colors:
  - Success (green), warning (amber), risk (red), neutral (gray).
- Mobile responsive:
  - Collapsible sidebar
  - Stacked cards and swipeable tables

---

## 2.2 Dashboard Home (Revenue Command Center)

### A) KPI cards (top section)
1. **Total Gyms**
2. **Active Subscriptions**
3. **MRR (Monthly Recurring Revenue)**
4. **New Signups** (toggle daily/weekly)
5. **Churn Rate**

Each KPI card includes:
- current value
- % change vs previous period
- mini trend sparkline

### B) Analytics charts
1. **Revenue Growth (Monthly)** — line/area chart
2. **Gym Signup Trends** — bar chart by week/month
3. **Active vs Inactive Gyms** — stacked column
4. **Plan Distribution** (Free / Pro / Enterprise) — donut chart

### C) Insight widgets
- Top growth cities
- At-risk subscriptions (expiring soon)
- Failed payment spike alert

---

## 2.3 Gym Management Module

### Gym table columns
- Gym Name
- Owner Name
- Plan
- Status (Active / Expired / Suspended)
- Last Payment Date
- MRR Contribution
- Actions (View / Edit / Suspend / Upgrade Plan)

### Detail drawer (on row click)
- Gym profile
- Owner contact
- Subscription timeline
- Payment history snapshot
- Activity history

### Filters/search
- Plan, status, city, signup date, MRR band

---

## 2.4 Billing System

### Screens
1. **All Subscriptions**
   - subscription id, gym, plan, renewal date, amount, status
2. **Payment History**
   - invoice id, amount, gateway, payment date, status
3. **Failed Payments**
   - failure reason, retry status, action queue
4. **Manual Invoice**
   - create one-off invoice for enterprise/custom billing

### Billing actions
- Retry payment
- Send invoice link
- Apply discount/coupon
- Pause/cancel subscription

---

## 2.5 User Management

### Owner user table
- Name, email, phone, linked gym, status, last login

### Controls
- Role control (owner/admin-staff future-ready)
- Block / unblock
- Delete (soft delete recommended)
- Force password reset

### Activity logs
- login events
- permission changes
- billing actions
- risk events (too many OTP attempts)

---

## 2.6 System Controls

### Broadcast center
- Send announcements to all gyms or filtered segments
- Channel selection: in-app / email / WhatsApp

### Notification templates
- Renewal reminder
- Failed payment alert
- Trial ending soon
- Inactive gym warning

### Auth/OTP/email settings
- OTP provider config
- email sender config
- retry limits and fraud guardrails

---

## 3) CRM Pipeline Design

## 3.1 Lead pipeline (Kanban)

### Stages
1. New Lead
2. Contacted
3. Demo Scheduled
4. Trial Active
5. Converted (Paid)
6. Lost

Each stage has card limits and SLA timers to prevent lead neglect.

## 3.2 Lead card structure
Each lead card must show:
- Gym Name
- Owner Name
- Phone / WhatsApp
- City
- Lead Source (Ads / Instagram / Referral / Other)
- Lead score
- Last touch date
- Notes / interaction history

Quick actions on card:
- Call now
- Send WhatsApp template
- Schedule demo
- Add note
- Move stage

## 3.3 Follow-up system

### Capabilities
- Call reminders with due date/time
- Demo scheduling with calendar sync
- WhatsApp follow-ups with templates
- Automatic reminders for stale leads

### Follow-up rules (example)
- If lead in **Contacted** for > 2 days with no activity -> reminder to sales owner.
- If demo done but no trial started in 24h -> send follow-up message.
- If trial ends in 2 days and not converted -> discount offer task.

## 3.4 Sales analytics dashboard

### KPIs
- Total leads
- Conversion rate (%)
- Revenue per lead
- Lead aging (days in stage)
- Best lead sources

### Charts
- Funnel conversion by stage
- Source-wise conversion heatmap
- Rep-wise performance leaderboard

## 3.5 Retention cockpit

### Track
- Expiring subscriptions (next 7/15/30 days)
- Inactive gyms (low login/usage)
- Late payments

### Action panel
- Send reminders (bulk or one-click)
- Offer discounts (save playbook)
- Manual follow-up alerts for success team

---

## 4) Database Schema (Supabase-Ready)

> Keep all business tables tenant-aware with `gym_id` where applicable.

## 4.1 `users`
- `id` (PK, uuid)
- `full_name`
- `email` (unique)
- `phone`
- `role` (enum: super_admin, gym_owner, staff)
- `status` (active, blocked, deleted)
- `last_login_at`
- `created_at`, `updated_at`

## 4.2 `gyms`
- `id` (PK)
- `name`
- `owner_user_id` (FK -> users.id)
- `city`, `country`, `timezone`
- `status` (active, expired, suspended)
- `created_at`, `updated_at`

## 4.3 `subscriptions`
- `id` (PK)
- `gym_id` (FK -> gyms.id)
- `plan` (free, pro, enterprise)
- `billing_cycle` (monthly, yearly)
- `amount`
- `start_date`
- `renewal_date`
- `status` (trial, active, past_due, canceled)
- `trial_ends_at`
- `created_at`, `updated_at`

## 4.4 `payments`
- `id` (PK)
- `subscription_id` (FK -> subscriptions.id)
- `gym_id` (FK -> gyms.id)
- `invoice_number`
- `amount`
- `currency`
- `gateway`
- `status` (paid, failed, pending, refunded)
- `payment_date`
- `failure_reason`
- `created_at`

## 4.5 `leads`
- `id` (PK)
- `gym_name`
- `owner_name`
- `phone`
- `whatsapp`
- `city`
- `lead_source`
- `stage` (new, contacted, demo_scheduled, trial_active, converted, lost)
- `lead_score`
- `assigned_to_user_id` (FK -> users.id)
- `expected_mrr`
- `lost_reason`
- `created_at`, `updated_at`

## 4.6 `activities` (CRM logs)
- `id` (PK)
- `lead_id` (FK -> leads.id, nullable)
- `gym_id` (FK -> gyms.id, nullable)
- `user_id` (FK -> users.id)
- `activity_type` (call, whatsapp, email, note, demo, payment_action, system)
- `activity_time`
- `next_follow_up_at`
- `meta_json`
- `created_at`

## 4.7 `notifications`
- `id` (PK)
- `target_type` (lead, gym, user, global)
- `target_id`
- `template_key`
- `channel` (in_app, email, whatsapp, sms)
- `status` (queued, sent, failed)
- `scheduled_at`
- `sent_at`
- `error_message`
- `created_at`

## 4.8 Relationship summary
- One `user` (owner) can own one or more `gyms`.
- One `gym` has many `subscriptions` over time.
- One `subscription` has many `payments`.
- One `lead` has many `activities`.
- `notifications` can reference leads, gyms, users, or global broadcasts.

---

## 5) Automation Workflows (Must-Have)

## 5.1 Auto payment reminders
Trigger: subscription renewal due in 7/3/1 days.
- Send email + WhatsApp.
- If unpaid after due date, create `activities` follow-up task.

## 5.2 Trial expiry alerts
Trigger: trial ending in 3 and 1 day.
- Send value-based CTA message.
- Auto-create sales task for call follow-up.

## 5.3 Lead follow-up reminders
Trigger: no activity on lead for configured SLA.
- Notify assigned sales user.
- Escalate to manager if overdue > X days.

## 5.4 Daily admin report
Trigger: every day 8:00 AM.
- Send summary: new leads, conversions, churn risk gyms, failed payments, MRR movement.

## 5.5 Inactive gym alerts
Trigger: gym has low activity (no login/no attendance data/no billing activity for threshold days).
- Send retention campaign message.
- Create manual intervention task.

---

## 6) How this System Scales SaaS Revenue

1. **Improves top-of-funnel conversion** with structured lead stages and follow-up SLAs.
2. **Increases trial-to-paid conversion** via automated nudges and sales tasks.
3. **Protects MRR** by catching failed payments and impending expiries early.
4. **Reduces churn** with inactivity detection + proactive retention playbooks.
5. **Boosts team productivity** through unified dashboard + CRM + automation.
6. **Enables data-driven decisions** with clear metrics on plans, sources, and conversion efficiency.

---

## 7) No-Code Build Sequence (Fast Execution)

1. Build schema and RBAC in Supabase.
2. Create dashboard pages and CRM kanban in no-code UI builder.
3. Connect payment gateway webhooks.
4. Configure automation scenarios in n8n/Make.
5. Set up notification templates and broadcast center.
6. Add analytics widgets and daily summary reports.
7. Pilot with internal sales team; refine SLA and stages.

This design is practical, implementation-first, and ready for immediate no-code development.
