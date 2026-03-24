# Gym Owner Dashboard Blueprint (B2B Gym Management SaaS, No-Code Ready)

## 1) Full Dashboard Overview

### 1.1 Purpose
This dashboard is the **daily operating system for gym owners** who are non-technical. It helps them run members, payments, attendance, trainers, and growth from one simple interface.

### 1.2 Core goals
- Manage members without spreadsheets.
- Improve on-time payment collection.
- Increase attendance and reduce inactive members.
- Monitor trainer effectiveness.
- Grow revenue with clear reports and reminders.

### 1.3 Top dashboard section (Home)

#### KPI Cards
1. **Total Members**
2. **Active Members**
3. **Today’s Attendance**
4. **Monthly Revenue**
5. **Pending Payments**

Each card includes:
- current number
- % change vs last month/week
- color status (good/attention/risk)

#### Quick Action Buttons
- **Add Member**
- **Record Payment**
- **Mark Attendance**
- **Send Reminder**

### 1.4 Design principles for non-technical owners
- Simple labels (no jargon).
- One-click actions for daily tasks.
- Large buttons and readable tables.
- Smart defaults (auto date, auto reminders, pre-filled templates).
- Mobile-friendly daily operations.

---

## 2) Page-by-Page Breakdown

## 2.1 Shared UI/UX Foundation

### Sidebar navigation
- Dashboard
- Members
- Memberships
- Payments
- Attendance
- Trainers
- Workout Plans
- Reports
- Notifications
- Settings

### Global UI pattern
- Top bar: search, date filter, notification bell, profile.
- Main area: cards + table + quick filters.
- Drawer/modals for create/edit actions.

### Theme and responsiveness
- Light mode + dark mode.
- Desktop: full sidebar and wide tables.
- Mobile: bottom tabs, stacked cards, large touch targets.

---

## 2.2 Dashboard Home

### Sections
1. KPI cards (top row)
2. Quick actions (second row)
3. Revenue trend mini chart
4. Pending dues list (next 7 days)
5. Expiring memberships list (next 7/15/30 days)
6. Low attendance alerts

### Owner’s “today workflow” from home
- Check pending dues
- Send reminders in bulk
- Mark walk-in attendance
- Record new payment

---

## 2.3 Member Management Page

### Features
- Add / Edit / Delete Member
- Membership plan mapping (monthly, quarterly, yearly)
- Expiry date tracking
- Status badges (Active / Expired / Inactive)

### Member table fields
- Name
- Phone
- Plan
- Join Date
- Expiry Date
- Status

### Row actions
- Renew Membership
- Call / WhatsApp
- View Profile
- Edit
- Archive/Delete

### Member profile tabs
- Profile details
- Membership history
- Payment history
- Attendance summary
- Workout plan + progress notes

---

## 2.4 Payment System Page

### Features
- Track paid and unpaid members
- Payment history timeline
- Due list (priority section)
- Manual payment entry
- Invoice generation

### Payment table fields
- Member Name
- Amount
- Payment Date
- Mode (Cash / UPI / Online)
- Status (Paid / Due / Failed)

### Actions
- Record payment
- Send due reminder
- Download invoice
- Mark partial payment

### Collection-focused widgets
- Today’s collections
- This month collected vs outstanding
- Top defaulters (optional private view)

---

## 2.5 Attendance System Page

### Features
- Daily attendance tracking
- Manual check-in
- QR code check-in (recommended)

### Views
- Today view: present / absent counts
- Member list with check-in status
- Low attendance members (last 30 days)

### Useful controls
- Filter by trainer/session time
- One-click mark present
- Bulk mark for classes

---

## 2.6 Trainer Management Page

### Features
- Add trainers
- Assign members to trainers
- Track trainer performance

### Trainer table
- Trainer Name
- Specialization
- Assigned Members
- Active Status
- Performance Score

### Performance metrics
- member attendance under trainer
- plan completion rate
- member feedback score (optional)

---

## 2.7 Workout Plan System Page

### Features
- Assign workout plans to members
- Edit/update plans
- Track progress over time

### UI layout
- Left: member list + goal filter
- Center: current workout plan
- Right: progress notes + completion trend

### Owner visibility
- unassigned members
- overdue plan updates
- progress drop alerts

---

## 2.8 Reports & Analytics Page

### Include
- Monthly revenue report
- Member growth chart
- Attendance trends
- Retention rate

### Recommended widgets
- revenue by plan type
- renewal forecast (next 30 days)
- inactive member count trend

### Export options
- CSV/PDF monthly summary
- owner-friendly one-page report

---

## 2.9 Notifications Center

### Supports
- Membership expiry alerts
- Payment reminders
- Attendance alerts

### Channels
- WhatsApp
- SMS
- In-app notification

### Notification controls
- templates (editable)
- trigger timing (e.g., 7 days before expiry)
- send now / schedule later
- delivery logs

---

## 3) Feature Explanation (Practical)

## 3.1 Member lifecycle management
From lead/member onboarding to renewal and reactivation, owner can handle everything from one profile and avoid missed renewals.

## 3.2 Payment clarity
Due list + status chips + reminders give the owner immediate visibility on cash flow risk and collection priorities.

## 3.3 Attendance intelligence
Not just check-ins—owner sees low-attendance trends early and can intervene before churn.

## 3.4 Trainer accountability
Assignment and performance dashboards help owners balance trainer load and improve service quality.

## 3.5 Workout consistency
Plan assignment and progress tracking keep members engaged and more likely to renew.

## 3.6 Growth decisions
Reports turn daily operations into monthly strategy (pricing, retention, staffing, promotions).

---

## 4) Database Schema (Supabase-Ready)

> All tables should include `gym_id` for tenant isolation in multi-gym SaaS.

## 4.1 `members`
- `id` (PK, uuid)
- `gym_id` (FK -> gyms.id)
- `full_name`
- `phone`
- `email` (nullable)
- `join_date`
- `status` (active, expired, inactive)
- `assigned_trainer_id` (FK -> trainers.id, nullable)
- `created_at`, `updated_at`

## 4.2 `memberships`
- `id` (PK)
- `gym_id` (FK -> gyms.id)
- `member_id` (FK -> members.id)
- `plan_type` (monthly, quarterly, yearly)
- `start_date`
- `expiry_date`
- `price`
- `auto_renew` (boolean)
- `status` (active, expired, paused)
- `created_at`, `updated_at`

## 4.3 `payments`
- `id` (PK)
- `gym_id` (FK -> gyms.id)
- `member_id` (FK -> members.id)
- `membership_id` (FK -> memberships.id)
- `amount`
- `payment_date`
- `mode` (cash, upi, online)
- `status` (paid, due, failed, partial)
- `invoice_number`
- `notes`
- `created_at`

## 4.4 `attendance`
- `id` (PK)
- `gym_id` (FK -> gyms.id)
- `member_id` (FK -> members.id)
- `attendance_date`
- `check_in_time`
- `check_out_time` (nullable)
- `method` (manual, qr)
- `status` (present, absent)
- `created_at`

## 4.5 `trainers`
- `id` (PK)
- `gym_id` (FK -> gyms.id)
- `full_name`
- `phone`
- `specialization`
- `status` (active, inactive)
- `joined_at`
- `created_at`, `updated_at`

## 4.6 `workout_plans`
- `id` (PK)
- `gym_id` (FK -> gyms.id)
- `member_id` (FK -> members.id)
- `trainer_id` (FK -> trainers.id)
- `goal`
- `plan_data_json`
- `version`
- `is_active`
- `created_at`, `updated_at`

## 4.7 `notifications`
- `id` (PK)
- `gym_id` (FK -> gyms.id)
- `member_id` (FK -> members.id, nullable)
- `type` (expiry_alert, payment_due, attendance_alert, broadcast)
- `channel` (whatsapp, sms, in_app)
- `message`
- `scheduled_at`
- `status` (queued, sent, failed)
- `sent_at` (nullable)
- `created_at`

## 4.8 Relationship map
- One `gym` -> many `members`, `memberships`, `payments`, `attendance`, `trainers`, `workout_plans`, `notifications`.
- One `member` -> many `memberships`, `payments`, `attendance`, and `workout_plans` over time.
- One `trainer` -> many assigned `members` and `workout_plans`.
- One `membership` -> many related `payments`.

---

## 5) Automation Workflows

## 5.1 Membership expiry reminders
- Trigger: 7/3/1 days before `expiry_date`.
- Action: send WhatsApp + SMS + in-app reminder.
- Fallback: create owner task if not renewed.

## 5.2 Payment due alerts
- Trigger: payment status = due or partial nearing deadline.
- Action: send reminder with payment link/instructions.
- Escalation: second reminder after X days.

## 5.3 Daily attendance summary
- Trigger: end of day.
- Action: send owner summary: present count, absent count, low attendance members.

## 5.4 Inactive member alerts
- Trigger: no attendance for 7/14/30 days.
- Action: send re-engagement message and create follow-up call task.

## 5.5 Weekly business digest (recommended)
- Trigger: every Monday morning.
- Action: send weekly revenue, renewals due, risk members, trainer performance snapshot.

---

## 6) How This Improves Gym Business

1. **Higher revenue collection** through due tracking and automated payment reminders.
2. **Better retention** via expiry alerts and inactive member interventions.
3. **Stronger daily control** with quick actions and clear KPI visibility.
4. **Improved trainer output** through assignment and performance tracking.
5. **Reduced admin time** using automations instead of manual calling.
6. **Faster growth decisions** with practical reports (revenue, growth, attendance, retention).

---

## 7) No-Code Implementation Plan (Fast)

1. Create tables and relations in Supabase.
2. Add role-based access (owner + staff) and tenant filters by `gym_id`.
3. Build pages in Lovable/FlutterFlow using card + table components.
4. Connect WhatsApp/SMS/email providers for notifications.
5. Configure automations in n8n/Make (expiry, due, attendance, inactive alerts).
6. Launch with preset templates and owner onboarding checklist.

This blueprint is intentionally simple, actionable, and ready for immediate no-code development.
