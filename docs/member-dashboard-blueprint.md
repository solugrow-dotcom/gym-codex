# Gym Member Dashboard Blueprint (Gym SaaS, No-Code Ready)

## 1) Full Dashboard Overview

### 1.1 Purpose
This dashboard is the member’s daily companion on mobile/web to stay consistent with workouts, attendance, progress, and membership renewals.

### 1.2 Member-centered goals
- Follow workout plans clearly each day.
- Track attendance and maintain streaks.
- See measurable progress over time.
- Stay motivated with reminders and feedback.
- Renew membership before expiry.

### 1.3 Top cards (Home)
1. **Today’s Workout**
2. **Membership Status**
3. **Days Left**
4. **Today’s Attendance**
5. **Pending Payment**

Each card shows quick status + one primary action button.

### 1.4 UX principles
- Mobile-first, thumb-friendly interactions.
- Minimal taps for daily tasks.
- Positive and motivating language.
- Visual progress cues (streaks, completion rings, badges).

---

## 2) Page-by-Page UI

## 2.1 Navigation and global layout

### Bottom navigation (mobile)
- Home
- Workout
- Attendance
- Progress
- Membership

### Secondary access
- Messages (trainer chat)
- Notifications
- Profile/Settings

### Design style
- Clean modern fitness app look.
- Card-based sections, soft color accents, high readability.
- Dark/light theme optional.

---

## 2.2 Home Dashboard

### Sections
1. Top status cards
2. “Today plan” snapshot
3. Attendance streak widget
4. Weekly completion summary
5. Upcoming payment/renewal reminder

### Quick actions
- Start workout
- Mark attendance
- Message trainer
- Renew plan

### Motivation elements
- Daily tip
- Streak celebration
- Milestone badges

---

## 2.3 Today’s Workout Page

### Features
- Day-wise workout plan
- Exercise list with sets/reps
- Mark each exercise complete or skip
- Optional workout timer

### Layout
- Header: day + focus area (e.g., upper body)
- Workout blocks:
  - exercise name
  - sets/reps
  - rest timer
  - trainer notes

### Interactions
- Complete exercise
- Skip with reason
- Add personal note
- Mark full workout complete

### Smart UX
- Auto-save workout progress
- Resume where left off
- End-session summary (completed vs skipped)

---

## 2.4 Attendance Page

### Features
- Calendar view
- Present/absent status
- Streak tracking

### Views
- Monthly attendance calendar
- Weekly attendance %
- Current streak + best streak

### Useful actions
- Quick check-in (if enabled)
- View missed days
- Attendance insights (“You’re more regular on weekdays”)

---

## 2.5 Progress Tracking Page

### Metrics
- Weight
- Body measurements
- Strength
- Completed workouts

### Charts
- Weekly progress graph
- Monthly trend graph
- Goal progress bars

### Progress UX
- Comparison with previous week/month
- Trainer comments on progress
- “What improved” highlights

---

## 2.6 Membership & Payments Page

### Membership section
- Plan name
- Start date
- Expiry date
- Days left
- Status (active/expiring/expired)

### Payments section
- Payment history list
- Pending dues
- Invoice/receipt download
- Renew option (primary CTA)

### Helpful prompts
- Renewal countdown
- Suggested renewal package
- One-tap contact support for billing issues

---

## 2.7 Trainer Connect Page

### Features
- Message trainer
- Ask questions
- Feedback system

### Chat utilities
- Quick message templates (“Need form check”, “Can’t attend today”)
- Attach progress photo (optional)
- Conversation timeline

### Feedback
- Post-workout feedback form
- Session satisfaction rating

---

## 2.8 Notifications Page

### Types
- Workout reminders
- Payment alerts
- Motivation messages

### Controls
- Notification preferences by type
- Channel preference (in-app/SMS/WhatsApp if enabled)
- Quiet hours setting

---

## 3) Features Explanation

## 3.1 Consistency engine
Home cards + reminders + streaks nudge members to show up and complete sessions regularly.

## 3.2 Better workout adherence
Day-wise plans and one-tap completion tracking reduce drop-offs and confusion.

## 3.3 Transparent progress
Weekly/monthly graphs make improvements visible, improving motivation and retention.

## 3.4 Frictionless renewal
Membership status, days-left visibility, and clear renew CTAs reduce accidental expiries.

## 3.5 Strong trainer-member loop
In-app messaging and feedback improve accountability, confidence, and plan quality.

---

## 4) Database Schema (Supabase-Ready)

> Keep all rows tenant-safe with `gym_id` in production (multi-gym platform).

## 4.1 `members`
- `id` (PK, uuid)
- `gym_id` (FK -> gyms.id)
- `full_name`
- `phone`
- `email`
- `membership_status` (active, expiring, expired)
- `joined_at`
- `created_at`, `updated_at`

## 4.2 `workouts`
- `id` (PK)
- `gym_id` (FK -> gyms.id)
- `member_id` (FK -> members.id)
- `trainer_id` (FK -> trainers.id, nullable)
- `workout_date`
- `exercise_json` (exercise, sets, reps, notes)
- `completion_status` (completed, partial, skipped)
- `completed_at` (nullable)
- `created_at`, `updated_at`

## 4.3 `attendance`
- `id` (PK)
- `gym_id` (FK -> gyms.id)
- `member_id` (FK -> members.id)
- `attendance_date`
- `status` (present, absent)
- `check_in_time` (nullable)
- `created_at`

## 4.4 `progress`
- `id` (PK)
- `gym_id` (FK -> gyms.id)
- `member_id` (FK -> members.id)
- `weight`
- `measurements_json`
- `strength_json`
- `completed_workouts_count`
- `recorded_at`
- `created_at`

## 4.5 `payments`
- `id` (PK)
- `gym_id` (FK -> gyms.id)
- `member_id` (FK -> members.id)
- `amount`
- `payment_date`
- `status` (paid, pending, failed)
- `mode` (cash, upi, online)
- `invoice_url` (nullable)
- `created_at`

## 4.6 `messages`
- `id` (PK)
- `gym_id` (FK -> gyms.id)
- `member_id` (FK -> members.id)
- `trainer_id` (FK -> trainers.id)
- `sender_role` (member, trainer)
- `content`
- `message_type` (question, reminder, feedback, motivation)
- `sent_at`
- `created_at`

## 4.7 Relationship map
- One `member` -> many `workouts`, `attendance`, `progress`, `payments`, and `messages`.
- One `trainer` -> many member `messages` and assigned `workouts`.
- One `gym` -> all member-facing records via `gym_id`.

---

## 5) Automation Workflows

## 5.1 Daily workout reminder
- Trigger: daily scheduled workout time.
- Action: send push/in-app/WhatsApp reminder.

## 5.2 Missed workout alert
- Trigger: workout not marked complete by end of day.
- Action: send nudge + quick “resume workout” link.

## 5.3 Weekly progress report
- Trigger: every week end.
- Action: generate summary (attendance, workouts completed, weight/strength change).

## 5.4 Expiry reminder
- Trigger: membership expiry in 7/3/1 days.
- Action: send renewal reminder + payment CTA.

## 5.5 Attendance consistency nudge (recommended)
- Trigger: attendance drop below threshold.
- Action: send motivation message + suggest trainer check-in.

---

## 6) No-Code Build Notes (Practical)

1. Build schema in Supabase with member-level RBAC policies.
2. Design mobile-first pages in Lovable/FlutterFlow.
3. Add chart widgets for progress and streaks.
4. Connect messaging/notification providers.
5. Implement automations in Make/n8n for reminders and reports.

This blueprint is simple, engaging, and practical for immediate no-code implementation.
