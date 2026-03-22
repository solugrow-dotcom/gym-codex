# Gym Management SaaS

A multi-tenant Gym Management SaaS starter built with **React + Tailwind CSS** on the frontend and **Node.js + Express + MongoDB** on the backend. It includes production-oriented architecture for gym operations, member lifecycle management, attendance, payments, trainer workflows, notifications, reports, and platform monetization.

## Features

- JWT auth with refresh tokens, forgot/reset password, bcrypt hashing, RBAC, rate limiting, and validation.
- Multi-role support: Super Admin, Gym Owner, Trainer, Member.
- Multi-tenant SaaS model with per-gym data segregation and subdomain awareness.
- Advanced dashboard KPIs, revenue trends, member retention, and trainer performance.
- Member profiles, membership history, progress tracking, remarks/notes, and QR identity generation.
- Attendance APIs with QR/manual/scan check-ins plus analytics.
- Stripe-ready checkout service, cash/UPI tracking, invoice PDF generation, reminders, and billing scaffolding.
- Membership plans, coupons, trainer workflows, workout plans, diet plans, and notifications.
- Reports, CSV exports, activity logs, backup endpoint, and Swagger JSON.
- Modern responsive UI with dark mode, dashboard charts, SaaS admin overview, and plan comparison.

## Project Structure

```text
/frontend   React + Vite + Tailwind dashboard
/backend    Express API with MVC-style structure
```

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

```bash
cp backend/.env.example backend/.env
```

Update the values in `backend/.env` for MongoDB Atlas/local MongoDB, JWT secrets, Stripe, Twilio, Nodemailer, and Cloudinary.

### 3. Run development servers

```bash
npm run dev
```

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`
- Health check: `http://localhost:5000/health`
- API docs JSON: `http://localhost:5000/api-docs.json`

## Production Readiness Notes

- Use MongoDB Atlas or a managed Mongo replica set.
- Store secrets in Render/Railway/Vercel environment variables.
- Replace mock WhatsApp / email fallbacks with live provider credentials.
- Add Redis-backed queues/websockets for large-scale real-time updates.
- Add automated tests (Vitest/Jest + Supertest) before commercial launch.

## Deployment Guide

### Frontend on Vercel

1. Push this repository to GitHub.
2. Create a Vercel project and select the repo.
3. Set root directory to `frontend`.
4. Add env var `VITE_API_URL=https://your-backend-domain/api/v1`.
5. Build command: `npm run build`.
6. Output directory: `dist`.
7. Deploy and connect a custom domain/subdomain if required.

### Backend on Render or Railway

1. Create a web service from the repo.
2. Set root directory to `backend`.
3. Install command: `npm install`.
4. Start command: `npm start`.
5. Add all variables from `backend/.env.example`.
6. Point `MONGODB_URI` to MongoDB Atlas.
7. Configure your frontend URL in `CLIENT_URL`.
8. Add wildcard DNS/subdomain routing if using tenant subdomains.

### Database on MongoDB Atlas

1. Create a cluster and database user.
2. Allow your deployment IPs or use VPC peering where appropriate.
3. Copy the Atlas connection string into `MONGODB_URI`.
4. Create indexes and backups via Atlas tooling.

## SaaS Monetization Flow

- Offer `Free`, `Pro`, and `Premium` plans.
- Use `trialEndsAt`, `subscriptionPlan`, and `subscriptionStatus` in the `Gym` model to control access.
- Trigger upgrade/downgrade logic via payment webhooks or admin actions.
- Use global admin analytics to track platform revenue and active gyms.

## Suggested Next Steps

- Add test suites and CI/CD.
- Add a job scheduler for expiry reminders and auto-renew billing.
- Add a proper object storage strategy for backups and invoice archives.
- Expand the frontend with form-driven CRUD pages and authenticated API hooks.
