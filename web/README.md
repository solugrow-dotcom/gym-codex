# SoluGrow Web (Vanilla + Supabase)

## Routes
- `/` landing
- `/signup` signup
- `/login` login
- `/admin` admin dashboard
- `/dashboard` gym owner dashboard
- `/trainer` trainer dashboard
- `/manager` manager dashboard
- `/reception` receptionist dashboard
- `/member` member dashboard
- `/upgrade` subscription lock/upgrade page

## Setup
1. Serve `web/` as site root.
2. Add Supabase URL/anon key in browser localStorage:
   - `supabase_url`
   - `supabase_anon`
3. Run SQL from `supabase/schema.sql`.
4. Set Razorpay key in `app.js` (`RAZORPAY_KEY_ID`).

## Notes
- Landing CTA buttons all route to `/signup`.
- Logged-in users auto-redirect to their role dashboard.
- Gym-owner trial lock redirects to `/upgrade` after trial expiry if plan inactive.
