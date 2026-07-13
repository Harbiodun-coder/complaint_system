# LASU Complaints Management System

Final year project scaffold — Full Next.js (App Router), MongoDB, JWT auth.

## What's built so far

- **Landing page** (`/`) — 
- **Register** (`/register`) & **Login** (`/login`) — real accounts, hashed passwords, JWT cookie sessions
- **Student dashboard** (`/dashboard`) — stats, recent complaints, quick actions
- **Submit complaint** (`/dashboard/submit`) and **My Complaints** (`/dashboard/complaints`)
- **Admin dashboard** (`/admin`) — stats, complaints trend chart, top categories
- **Admin complaints management** (`/admin/complaints`) — view details, update status
- Route protection via `middleware.js` — students can't reach `/admin`, guests can't reach either dashboard

## Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up MongoDB**
   - Easiest: create a free cluster at https://www.mongodb.com/cloud/atlas, create a database user, and copy the connection string.
   - Or install MongoDB locally and use `mongodb://localhost:27017/lasu-complaints`.

3. **Environment variables**
   ```bash
   create .env.local
   ```
   Then fill in `MONGODB_URI` and set `JWT_SECRET` to any long random string (you can generate one with `openssl rand -base64 32`).

4. **Run it**
   ```bash
   npm run dev
   ```
   Open http://localhost:3000

## Creating your first admin account

New registrations always default to `role: "student"` on purpose — there's no public sign-up for admin. To create an admin for testing/demo:

1. Register a normal account through `/register`.
2. Open your database (MongoDB Atlas UI, or Compass) and find that user in the `users` collection.
3. Change its `role` field from `"student"` to `"admin"`.
4. Log out and log back in — you'll land on `/admin`.

## Still to build

- Notifications page (currently just a sidebar link)
- Profile & Change Password pages (sidebar links exist, pages don't yet)
- Track Complaint detail view for students (currently they see all complaints in the table; a single-complaint view page is a natural next step)
- Toast/success messages instead of just redirecting after actions
- Form validation polish (e.g. password strength, duplicate email check on the frontend before submit)
- Deployment (Vercel is the easiest pairing with Next.js — you'll need to add your MongoDB URI and JWT secret as environment variables there too)

## Project structure

```
app/
  api/auth/{register,login,logout}/route.js   - auth endpoints
  api/complaints/route.js                     - list/create complaints
  api/complaints/[id]/route.js                - get/update single complaint
  register, login/page.js                     - auth pages
  dashboard/                                  - student area
  admin/                                      - admin area
components/                                   - Sidebar, StatCard, chart, etc.
lib/db.js                                     - MongoDB connection
lib/auth.js                                   - password hashing, JWT, cookies
models/                                       - User, Complaint schemas
middleware.js                                 - route protection
```
