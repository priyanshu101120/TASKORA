# ✦ Taskora

### AI-Powered Kanban Task Manager

**A full-stack task management app with drag-and-drop boards, an AI assistant that auto-generates sub-tasks, OTP-based email verification, and a glassmorphism UI built for developers who care about how their tools look.**

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-taskora--beta.vercel.app-black?style=for-the-badge)](https://taskora-beta.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/atlas)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white)](https://ui.shadcn.com/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![Railway](https://img.shields.io/badge/Railway-0B0D0E?style=for-the-badge&logo=railway&logoColor=white)](https://railway.app/)

---

## 🎬 Demo

![Taskora Demo](./screenshots/demo.gif)

## 📸 Screenshots

| Boards                                            | Columns And Tasks                              |
| -------------------------------------------------- | ----------------------------------------------- |
| ![Boards Dashboard](./screenshots/Boards.png)       | ![Board View](./screenshots/Board.png)          |

---

## 🎯 What is Taskora?

Taskora is an **AI-powered task manager** built for solo developers and small teams. You get drag-and-drop boards, an AI assistant that generates sub-tasks and cleans up completed work, and smart deadline notifications — all running on a custom full-stack setup with a self-built REST API, JWT authentication, and email-based account verification.

> **The Problem:** Most task managers are either too bloated (Jira, Asana) or too simple (plain to-do lists). Taskora sits in the middle — powerful enough for real workflows, fast and beautiful enough that you actually want to use it.

---

## ✨ Key Features

### 🤖 Taskora AI Assistant
- Auto-generates sub-tasks based on your goals
- Suggests deadlines based on task complexity
- Helps clean up completed work to keep boards tidy

### 🔐 Custom Authentication & Security
- Self-built Express REST API with JWT-based authentication (httpOnly cookies)
- OTP email verification on signup — no account is usable until the email is confirmed
- Passwords hashed with bcrypt; ownership checks enforced at the controller level for every board, column, and task

### 🗂️ Boards, Columns & Tasks
- Create boards, add up to 4 columns per board, and manage tasks with title, description, assignee, and due date
- Cascade deletes — removing a board cleans up its columns and tasks automatically

### 🎨 Premium UI
- Glassmorphism aesthetic built with Tailwind CSS + shadcn/ui
- Fully responsive — desktop, tablet, and mobile

---

## 🛠️ Tech Stack

### Frontend
| Layer | Technology | Purpose |
|---|---|---|
| **Framework** | Next.js (App Router) | React frontend, routing, SSR |
| **Language** | TypeScript | Type safety across the codebase |
| **Styling** | Tailwind CSS | Utility-first, zero-config CSS |
| **Components** | shadcn/ui + Radix UI | Accessible, composable UI primitives |
| **Forms** | React Hook Form + Zod | Form state and schema validation |
| **Icons** | Lucide React | Consistent icon system |
| **Deployment** | Vercel | Hosting, CI/CD from GitHub |

### Backend
| Layer | Technology | Purpose |
|---|---|---|
| **Runtime** | Node.js + Express | REST API server |
| **Database** | MongoDB (Atlas) + Mongoose | Persistent storage for users, boards, columns, tasks |
| **Auth** | JWT + httpOnly cookies | Stateless session management |
| **Email** | Brevo (transactional email API) | OTP delivery for email verification |
| **Deployment** | Railway | Backend hosting, environment config |

---

## 🏗️ Architecture

```
Taskora
├── Frontend (Next.js — Vercel)
│   ├── /app/login              → Sign in / Sign up / OTP verification
│   ├── /app/boards             → Protected boards dashboard
│   ├── /app/boards/[id]        → Individual Kanban board (columns + tasks)
│   ├── /context/AuthContext    → Client-side auth state, API calls
│   └── /lib/api                → Centralized fetch client for the backend
│
└── Backend (Express + MongoDB — Railway)
    ├── /api/auth                → register, verify-otp, resend-otp, login, logout, profile
    ├── /api/boards               → CRUD + pin, cascade delete
    ├── /api/columns               → CRUD, scoped to board ownership
    ├── /api/tasks                  → CRUD, scoped to board ownership
    ├── middleware/auth.middleware  → JWT verification on protected routes
    └── MongoDB Atlas                → users, boards, columns, tasks collections
```

### 🔒 Auth & Data Isolation

Authentication is handled with a custom Express API: on signup, a 6-digit OTP is generated and emailed via Brevo, and the account stays unverified until the code is confirmed. On login, a JWT is issued and stored in an httpOnly cookie (`sameSite: none` + `secure` in production, since frontend and backend run on separate domains). Every board, column, and task route checks resource ownership server-side against the authenticated user's ID before allowing reads or writes.

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- A [MongoDB Atlas](https://www.mongodb.com/atlas) cluster (free tier works fine)
- A [Brevo](https://www.brevo.com) account (free tier — for OTP emails)

### 1. Clone the repo

```bash
git clone https://github.com/priyanshu101120/TASKORA.git
cd TASKORA
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_random_secret_string
JWT_EXPIRES_IN=7d
NODE_ENV=development
BREVO_API_KEY=your_brevo_api_key
BREVO_SENDER_EMAIL=your_verified_sender_email
```

Run the backend:

```bash
npm run dev
```

### 3. Frontend setup

```bash
cd ../frontend
npm install
```

Create a `.env.local` file in `frontend/`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Run the frontend:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## 📁 Project Structure

```
TASKORA/
├── frontend/
│   ├── src/
│   │   ├── app/          # Next.js App Router — pages & layouts
│   │   ├── components/   # Reusable UI components
│   │   ├── context/       # AuthContext — client-side auth state
│   │   ├── hooks/         # Custom hooks (useAuth, useBoard)
│   │   └── lib/            # API client
│   └── public/
│
└── backend/
    ├── src/
    │   ├── models/         # Mongoose schemas (User, Board, Column, Task)
    │   ├── controllers/    # Route handlers
    │   ├── routes/          # Express routers
    │   ├── middleware/      # JWT auth middleware
    │   ├── utils/            # Token generation, email sending
    │   └── db/                # MongoDB connection
    └── server.js
```

---

## 🧠 What I Learned

Building and migrating Taskora's backend taught me:

- **Building a REST API from scratch** — designing routes, controllers, and Mongoose schemas instead of relying on a BaaS
- **JWT auth with httpOnly cookies** — and the cross-domain cookie issues (`sameSite`, `secure`) that show up once frontend and backend are deployed on different domains
- **Ownership-based authorization** — enforcing per-user access at the controller level for every resource, since there's no database-level RLS to fall back on
- **Transactional email delivery** — why cloud platforms like Railway often block outbound SMTP ports, and how switching to an HTTP-based email API (Brevo) solves it
- **Deployment across two platforms** — Vercel for the frontend, Railway for the backend, including root-directory configuration, environment variables, and CORS across origins

---

## 🔮 Roadmap

- [ ] Real drag-and-drop between columns (dnd-kit integration)
- [ ] Taskora AI — live sub-task generation via LLM API
- [ ] Team collaboration (shared boards, member invites)
- [ ] Custom email domain for production-grade OTP delivery
- [ ] Analytics dashboard — task completion rates, velocity tracking
- [ ] Mobile app (React Native / Expo)

---

## 👤 Author

**Priyanshu Singh** — Built this end-to-end as a solo developer.

[![GitHub](https://img.shields.io/badge/GitHub-priyanshu101120-181717?style=for-the-badge&logo=github)](https://github.com/priyanshu101120)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Priyanshu_Singh-0077B5?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/priyanshu-singh-452459360/)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**⭐ If you found this project useful, consider giving it a star!**

*Built with 💚 using Next.js, Express, and MongoDB*
