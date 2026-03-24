# Trainer Dashboard Blueprint (Gym Management SaaS, No-Code Ready)

## 1) Full Dashboard Overview

### 1.1 Purpose
This dashboard is the trainer’s daily workspace to manage assigned members, deliver workout plans, track attendance, and monitor measurable progress.

### 1.2 Primary goals
- Keep trainers focused on member outcomes.
- Reduce manual tracking with simple workflows.
- Improve member consistency through reminders and alerts.
- Give clear visibility into who needs attention each day.

### 1.3 Top KPI cards (Dashboard Home)
1. **Total Assigned Members**
2. **Today’s Sessions**
3. **Completed Workouts**
4. **Pending Workouts**
5. **Active Members**

Each KPI card should show:
- current value
- trend vs previous week
- color-coded status (good / warning / risk)

### 1.4 UX principles
- Mobile-first daily usage.
- One-click actions (mark attendance, assign workout, update progress).
- Minimal data entry with presets/templates.
- Clear alerting for at-risk members.

---

## 2) Page-by-Page UI Structure

## 2.1 Shared Layout

### Sidebar navigation
- Dashboard
- My Members
- Workouts
- Attendance
- Progress
- Messages
- Alerts
- Settings

### Top bar
- Search members
- Date selector
- Notification bell
- Profile menu

### Visual design
- Clean card + table layout.
- Compact rows on desktop; stacked cards on mobile.
- Light + dark mode supported.

---

## 2.2 Dashboard Home

### Main blocks
1. KPI cards row
2. Today’s sessions timeline
3. Members needing action
   - missed yesterday
   - no workout update
   - low progress
4. Quick actions
   - Mark Attendance
   - Assign Workout
   - Send Reminder

### “Start day” trainer flow
- Review today’s sessions
- Check pending workouts
- Send reminders before session windows

---

## 2.3 My Members Page

### Member table (assigned members only)
- Name
- Goal (weight loss / muscle gain / fitness)
- Plan
- Last Attendance
- Progress Status

### Row actions
- View Profile
- Assign Workout
- Update Progress
- Message Member

### Member profile view
Tabs:
- Overview (goal, plan, trainer notes)
- Attendance history
- Workout history
- Progress history (metrics + charts)
- Messages

---

## 2.4 Workout Management Page

### Features
- Create workout plans
- Assign to members
- Day-wise workout structure
- Add exercises, sets, reps, rest, notes

### UI structure
- Left panel: member selector + templates
- Center panel: day-wise builder (Mon-Sun)
- Right panel: safety notes, substitutions, progression level

### Plan components
- Warm-up
- Main workout
- Cool-down
- Trainer notes

### Practical controls
- Duplicate previous plan
- Save as template
- Version history (v1, v2...)

---

## 2.5 Attendance Page

### Features
- Mark present / absent
- Daily attendance list
- Low attendance tracking

### Layout
- Date-based list of assigned members
- Bulk actions (mark all present for group session)
- Quick filter: absent 3+ times in last 2 weeks

### Attendance insights
- Today’s attendance %
- Weekly consistency score
- Members at dropout risk

---

## 2.6 Progress Tracking Page

### Metrics tracked
- Weight
- Body measurements (waist/chest/hips/arms)
- Strength (e.g., squat/bench/deadlift or custom lifts)
- Workout completion rate

### Views
- Weekly chart
- Monthly chart
- Goal achievement progress bar

### Update flow
- Enter metrics after check-in
- Auto-compare vs previous check-in
- Add qualitative note (energy, pain, recovery)

---

## 2.7 Communication Page

### Features
- Message individual members
- Send reminders
- Send motivation messages

### Message types
- Session reminder
- Missed workout follow-up
- Progress encouragement
- Habit-building tips

### Communication UX
- Template library
- Quick personalization tokens (name/goal)
- Message history timeline

---

## 2.8 Alerts Page

### Alert categories
- Member inactive
- Workout incomplete
- Low progress alerts

### Alert card actions
- Send reminder
- Schedule call/check-in
- Adjust workout intensity
- Escalate to gym owner (if needed)

---

## 3) Features Explanation

## 3.1 Better member outcomes
Trainers can identify low attendance and low progress early and take corrective action before members lose motivation.

## 3.2 Faster daily operations
KPI cards + quick actions reduce clicks and help trainers complete core tasks in minutes.

## 3.3 More consistent programming
Workout templates and versioning keep plan quality consistent across members.

## 3.4 Stronger accountability
Attendance, workout completion, and progress charts create objective visibility for trainer and member.

## 3.5 Better communication
Structured reminders and motivational messaging improve member adherence and session attendance.

---

## 4) Database Schema (Supabase-Ready)

> Keep tables tenant-aware with `gym_id` in production for multi-gym SaaS.

## 4.1 `trainers`
- `id` (PK, uuid)
- `gym_id` (FK -> gyms.id)
- `full_name`
- `phone`
- `email`
- `status` (active, inactive)
- `created_at`, `updated_at`

## 4.2 `members`
- `id` (PK, uuid)
- `gym_id` (FK -> gyms.id)
- `assigned_trainer_id` (FK -> trainers.id)
- `full_name`
- `goal` (weight_loss, muscle_gain, fitness, rehab)
- `plan_name`
- `status` (active, inactive)
- `created_at`, `updated_at`

## 4.3 `workouts`
- `id` (PK)
- `gym_id` (FK -> gyms.id)
- `member_id` (FK -> members.id)
- `trainer_id` (FK -> trainers.id)
- `title`
- `day_of_week`
- `exercise_json` (exercise, sets, reps, notes)
- `version`
- `status` (active, completed, pending)
- `created_at`, `updated_at`

## 4.4 `progress`
- `id` (PK)
- `gym_id` (FK -> gyms.id)
- `member_id` (FK -> members.id)
- `trainer_id` (FK -> trainers.id)
- `weight`
- `measurements_json`
- `strength_json`
- `completion_rate`
- `note`
- `recorded_at`

## 4.5 `attendance`
- `id` (PK)
- `gym_id` (FK -> gyms.id)
- `member_id` (FK -> members.id)
- `trainer_id` (FK -> trainers.id)
- `attendance_date`
- `status` (present, absent)
- `created_at`

## 4.6 `messages`
- `id` (PK)
- `gym_id` (FK -> gyms.id)
- `trainer_id` (FK -> trainers.id)
- `member_id` (FK -> members.id)
- `message_type` (reminder, motivation, follow_up)
- `channel` (in_app, whatsapp, sms)
- `content`
- `status` (queued, sent, failed)
- `sent_at`
- `created_at`

## 4.7 Relationship map
- One `trainer` -> many assigned `members`.
- One `member` -> many `workouts`, `attendance`, `progress`, and `messages`.
- One `trainer` -> many `workouts`, `progress`, `attendance`, and `messages`.
- All tables link back to `gym_id` for tenant isolation.

---

## 5) Automation Workflows

## 5.1 Workout reminders
- Trigger: scheduled workout time approaching.
- Action: send reminder to member via in-app/WhatsApp/SMS.

## 5.2 Missed session alerts
- Trigger: member marked absent for scheduled day.
- Action: send follow-up + create alert in trainer dashboard.

## 5.3 Weekly progress reports
- Trigger: every week end.
- Action: compile member progress summary and send to member + trainer dashboard.

## 5.4 Inactive member automation
- Trigger: no attendance for 7+ days.
- Action: send motivation message and flag for manual check-in.

## 5.5 Low progress alert automation
- Trigger: no measurable progress across configured period.
- Action: suggest plan revision task for trainer.

---

## 6) No-Code Build Notes (Practical)

1. Create schema in Supabase with RBAC by trainer and gym.
2. Build screens in Lovable/FlutterFlow with reusable member/workout components.
3. Connect automation workflows in Make/n8n.
4. Add chart widgets for progress trends.
5. Launch with template workout library to reduce setup time.

This design is simple for daily use, outcome-focused, and ready to build with no-code tools.
