# B2B Gym Management SaaS — Production-Ready No-Code Blueprint

## 1) Full System Overview

### 1.1 Product Vision
A multi-tenant B2B SaaS platform where each gym owner gets an isolated digital operating system to run members, trainers, plans, attendance, payments, and reporting from one dashboard.

### 1.2 Core Value Proposition
- **Gym owners** reduce manual work, improve retention, and track cash flow in real time.
- **Trainers** manage programs and progress from mobile-first screens.
- **Members** get transparency on plans, payments, attendance, and workouts.
- **SaaS owner (Super Admin)** controls onboarding, billing, and platform health.

### 1.3 Multi-Tenant SaaS Model
- **Tenant = Gym**.
- One gym can have many owners/staff/members under one tenant boundary.
- Data isolation enforced via tenant-aware queries and RBAC policies.
- Supports single-location and future multi-branch gym expansion.

### 1.4 Recommended No-Code Build Stack
- **Backend/Data/Auth**: Supabase or Firebase.
- **UI Builder**: Lovable / FlutterFlow / WeWeb / Retool (admin-heavy screens).
- **Automation**: Make/Zapier/n8n for reminders and workflows.
- **Notifications**: WhatsApp API + SMS + Email provider.
- **Payments**: Stripe/Razorpay (depending on market).

### 1.5 End-to-End User Journey
1. Gym owner starts free trial.
2. Creates gym profile + initial plans + adds trainers.
3. Imports/adds members.
4. Starts tracking attendance + payments.
5. Receives automated renewal/payment alerts.
6. Reviews dashboard analytics and churn risks.
7. Upgrades from trial/free to paid SaaS plan.

---

## 2) All Dashboards (Step-by-Step UI)

## 2.1 Shared UX System (All Roles)

### Layout Pattern
- **Left Sidebar**: primary navigation.
- **Top Bar**: search, notifications, profile switcher.
- **Main Canvas**: cards, tables, charts, action drawers.
- **Global Quick Actions**: floating “+” for role-critical create actions.

### Design Language
- **Style**: Stripe/Notion-inspired clean blocks, rounded cards, subtle shadows.
- **Color system**:
  - Primary: Indigo/Blue.
  - Success: Green.
  - Warning: Amber.
  - Danger: Red.
  - Neutral: Gray scale.
- **Modes**: Light + Dark mode with token-based theming.
- **Responsive behavior**:
  - Desktop: full sidebar + dense data tables.
  - Tablet: collapsible sidebar.
  - Mobile: bottom nav + stacked cards + quick filters.

---

## 2.2 Super Admin Dashboard (SaaS Owner)

### Sidebar Navigation
- Overview
- Gyms
- Owners
- Subscription Plans
- Billing & Revenue
- System Logs
- Feature Flags
- Support Tickets
- Settings

### Overview Screen (Default)
- KPI cards:
  - Total Gyms Onboarded
  - Active Paid Gyms
  - MRR
  - Churned Gyms (monthly)
  - Trial-to-Paid Conversion
- Revenue chart: monthly recurring revenue trend.
- Plan mix donut: Free vs Pro vs Enterprise.
- Alerts panel: failed renewals, abuse flags, system incidents.

### Gyms Management Screen
- Table columns: Gym Name, Owner, Plan, Status, MRR, Created Date.
- Actions: View, Suspend, Upgrade, Reset trial, Contact owner.
- Filters: plan, country/city, status, signup date.

### Owners/User Management
- Owner list with verification status.
- Assign/revoke platform-level privileges.
- Force password reset / MFA enforcement.

### Plan Management
- Define plan tiers:
  - **Free**: limited members/features.
  - **Pro**: full operations + reporting.
  - **Enterprise**: custom limits + priority support + API.
- Configure quotas: members, trainers, branches, AI credits, automations.

### System Logs & Control
- Auth logs, webhook logs, payment events, job queue status.
- Maintenance mode toggle.
- Feature release toggles by plan.

---

## 2.3 Gym Owner Dashboard

### Sidebar Navigation
- Dashboard
- Members
- Membership Plans
- Trainers
- Attendance
- Payments
- Reports
- Notifications
- Gym Settings

### Dashboard Home
- KPI cards:
  - Total Members
  - Active Memberships
  - Today’s Attendance
  - Overdue Payments
  - Expiring Memberships (next 7 days)
- Charts:
  - Member growth (monthly)
  - Collection vs due amount
  - Attendance trend by day/time
- Task panel:
  - Pending renewals
  - Unassigned members to trainer
  - New member onboarding checklist

### Member Management UI
- Member table with avatar, plan, status, due date, assigned trainer.
- Quick actions:
  - Add member
  - Edit profile
  - Freeze membership
  - Renew membership
  - Delete/archive member
- Detail drawer tabs:
  - Profile
  - Attendance
  - Payments
  - Workout plan
  - Notes

### Membership Plans UI
- Plan cards (monthly/yearly/custom duration).
- Fields: plan name, duration, sessions/week, price, discount rules.
- Controls: activate/deactivate, duplicate plan, seasonal promotions.

### Payment Tracking UI
- Ledger table: invoice id, member, amount, due date, payment mode, status.
- Status chips: Paid, Pending, Failed, Refunded.
- Bulk reminders for unpaid members.
- Export: CSV/PDF summary.

### Trainer Management UI
- Trainer directory with specialization, assigned members, active status.
- Assign/reassign members with drag-and-drop list.
- Trainer performance panel:
  - attendance compliance
  - member progress completion

### Attendance UI
- Daily attendance board:
  - manual check-in
  - QR check-in (future-ready)
  - class/session attendance
- Heatmap by weekday/hour.

### Reports & Analytics UI
- Revenue report
- Renewal forecast
- Churn risk report
- Trainer utilization
- Attendance consistency scoring

### Notifications UI
- Templates: payment reminder, expiry reminder, welcome message.
- Channels: in-app, email, SMS, WhatsApp.
- Automation rules builder: “if due in 3 days → send reminder”.

---

## 2.4 Trainer Dashboard

### Sidebar Navigation
- Today
- My Members
- Workout Plans
- Attendance
- Progress
- Messages

### Today Screen
- Today’s assigned members and sessions.
- Quick “Mark Attendance” action.
- Pending updates (workout not submitted, progress logs overdue).

### My Members Screen
- Member list with goals, injuries/constraints, attendance streak.
- Filter by goal type (weight loss, strength, rehab, endurance).

### Workout Plans Screen
- Template library + custom builder.
- Assign/edit per member.
- Version history (Plan v1, v2, etc.) for progress comparison.

### Attendance Screen
- Session-wise attendance marking.
- Late/absent reasons (optional).

### Progress Screen
- Weekly check-ins:
  - body metrics
  - strength milestones
  - trainer notes
- Progress graphs per member.

---

## 2.5 Member Dashboard

### Sidebar Navigation
- Home
- My Membership
- Workout Plan
- Attendance
- Payments
- Notifications
- Profile & Preferences

### Home Screen
- Welcome card + goal summary.
- Next session info.
- Current attendance streak.
- Outstanding dues (if any).

### My Membership
- Plan type, start date, end date, days remaining.
- Upgrade/renew CTA.

### Workout Plan
- Day-wise routine view.
- Completed vs pending workouts.
- Trainer notes and updates.

### Attendance
- Calendar + list history.
- Monthly attendance percentage.

### Payments
- Payment history with downloadable receipts.
- Upcoming dues and payment options.

### Notifications
- Renewal reminders
- Session reminders
- Plan updates

---

## 3) Database Schema (Tables + Relations)

> Structure is optimized for Supabase/Firebase-style multi-tenant modeling.

## 3.1 `users`
- `id` (PK, UUID)
- `auth_provider_id` (unique)
- `full_name`
- `email` (unique)
- `phone`
- `role` (enum: `super_admin`, `gym_owner`, `trainer`, `member`)
- `status` (active/inactive/suspended)
- `created_at`, `updated_at`

## 3.2 `gyms`
- `id` (PK)
- `name`
- `owner_user_id` (FK -> users.id)
- `slug` (unique tenant identifier)
- `logo_url`
- `address`, `city`, `country`, `timezone`
- `plan_tier` (free/pro/enterprise)
- `trial_ends_at`
- `subscription_status`
- `created_at`, `updated_at`

## 3.3 `trainers`
- `id` (PK)
- `gym_id` (FK -> gyms.id)
- `user_id` (FK -> users.id)
- `specialization`
- `joining_date`
- `is_active`
- `created_at`, `updated_at`

## 3.4 `memberships`
- `id` (PK)
- `gym_id` (FK -> gyms.id)
- `member_user_id` (FK -> users.id)
- `plan_name`
- `billing_cycle` (monthly/yearly/custom)
- `price`
- `start_date`
- `end_date`
- `status` (active/expired/frozen/cancelled)
- `auto_renew` (bool)
- `assigned_trainer_id` (FK -> trainers.id, nullable)
- `created_at`, `updated_at`

## 3.5 `payments`
- `id` (PK)
- `gym_id` (FK -> gyms.id)
- `membership_id` (FK -> memberships.id)
- `member_user_id` (FK -> users.id)
- `amount`
- `currency`
- `due_date`
- `paid_at` (nullable)
- `payment_method`
- `gateway_txn_id`
- `status` (paid/pending/failed/refunded)
- `created_at`, `updated_at`

## 3.6 `attendance`
- `id` (PK)
- `gym_id` (FK -> gyms.id)
- `member_user_id` (FK -> users.id)
- `trainer_id` (FK -> trainers.id, nullable)
- `check_in_time`
- `check_out_time` (nullable)
- `session_type` (gym_floor/class/pt)
- `status` (present/absent/late)
- `notes`
- `created_at`

## 3.7 `workout_plans`
- `id` (PK)
- `gym_id` (FK -> gyms.id)
- `member_user_id` (FK -> users.id)
- `trainer_id` (FK -> trainers.id)
- `title`
- `goal_type`
- `plan_json` (structured workout blocks)
- `version`
- `is_active`
- `effective_from`
- `created_at`, `updated_at`

## 3.8 Recommended Supporting Tables (Practical Add-ons)
- `gym_staff` (many-to-many mapping of users to gyms with role override)
- `subscription_contracts` (SaaS billing entity per gym)
- `invoices` (owner-facing SaaS invoices)
- `notification_logs` (audit trail)
- `ai_insights` (stored model outputs + confidence)

## 3.9 Relationship Map (Simplified)
- One **gym** -> many **trainers**, **memberships**, **payments**, **attendance**, **workout_plans**.
- One **user** (member) -> many **memberships** over time.
- One **membership** -> many **payments**.
- One **trainer** -> many assigned member memberships + workout plans.
- One **member user** -> many attendance rows + workout plan versions.

## 3.10 Access Control Logic (RBAC + Tenant)
- **Super Admin**: read/write all gyms.
- **Gym Owner**: read/write only their gym tenant data.
- **Trainer**: read assigned members; write attendance/workout updates.
- **Member**: read own data only.
- Enforce with tenant ID checks and role policies on every table.

---

## 4) Feature Breakdown

## 4.1 Authentication & Security
- Email/password + OTP login.
- Optional phone OTP for members.
- MFA for owners and super admins.
- Session timeout and suspicious login alerts.

## 4.2 Subscription System (B2B SaaS Billing)
- Trial start + countdown.
- Auto-upgrade flow with payment method capture.
- Dunning workflow for failed renewals.
- Upgrade/downgrade with proration handling.
- Optional monthly **AutoPay** so owner billing is charged automatically without manual payment each cycle.
- Service continuity rule: keep gym services uninterrupted on successful auto-debit and invoice generation.

## 4.3 Automated Reminders
- Membership expiring in X days.
- Payment overdue notices.
- Missed attendance nudges.
- Fully configurable templates per gym.

## 4.4 Reporting Engine
- Revenue and collection efficiency.
- Attendance trends and peak times.
- Trainer productivity metrics.
- Renewal funnel and churn indicators.

## 4.5 Multi-Gym Support
- Owner can manage multiple branches (future plan/enterprise).
- Branch-level data + global consolidated reports.

## 4.6 AI Features (Advanced Edge)

### A) Auto-Generate Workout Plans
- Input: goal, fitness level, constraints, session frequency.
- Output: structured weekly routine with progression logic.
- Human-in-the-loop: trainer approval before publishing.

### B) Predict Member Churn
- Inputs: attendance drop, payment delays, engagement decline.
- Output: risk score (low/medium/high) + recommended action.

### C) Suggest Best Membership Pricing
- Inputs: local market bands, occupancy, conversion rates.
- Output: recommended monthly/yearly pricing and discount band.

### D) Peak Gym Hours Prediction
- Input: historical attendance timestamps.
- Output: forecasted crowd heatmap for staffing/scheduling.

---

## 5) Business Model

## 5.1 Pricing Strategy
- **Free Trial**: 14 days, full feature preview (with soft limits).
- **Free Plan**: capped members, basic operations, branding watermark.
- **Pro Plan**: full gym operations + automations + core analytics.
- **Enterprise Plan**: multi-branch, API, custom SLAs, dedicated success.

## 5.2 Revenue Levers
- Base subscription per gym.
- Add-ons:
  - extra branches
  - premium AI credits
  - WhatsApp messaging packs
  - white-label branding

## 5.3 Upgrade/Downgrade Flow
- In-app comparison table.
- Upgrade CTA from feature lock screens.
- Downgrade warnings for quota overflow + grace period.

---

## 6) Future Scalability Ideas

1. **Class booking module** (group classes with seat limits).
2. **POS + inventory** (supplements, merchandise).
3. **Mobile apps** for trainer/member native experience.
4. **Wearable integrations** (Apple Health, Google Fit, Garmin).
5. **Referral and loyalty engine**.
6. **Franchise analytics** for enterprise chains.
7. **Open API + webhook marketplace**.
8. **Localized tax/GST invoicing and compliance packs**.

---

## 7) Build-Ready Implementation Blueprint (No-Code Practical Steps)

1. Set up auth + roles in Supabase/Firebase.
2. Create tenant-aware schema with gym_id on business tables.
3. Build role-specific dashboards in no-code UI builder.
4. Connect payment gateway for SaaS plan billing.
5. Configure automation flows for reminders and lifecycle events.
6. Add chart components for reports.
7. Add AI endpoints/workflows and store outputs in `ai_insights`.
8. QA with sample gyms (small, medium, enterprise).
9. Launch beta with onboarding wizard and help center.

This blueprint is intentionally practical, modular, and directly mappable to no-code builders for rapid MVP-to-scale execution.
