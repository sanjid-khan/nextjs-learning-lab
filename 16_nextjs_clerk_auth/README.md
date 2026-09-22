# Next.js + Clerk Authentication

A simple authentication setup using **Next.js** and **Clerk**.

## 🚀 Features

- Sign Up
- Sign In
- Sign Out
- Protected Routes
- User Profile
- Authentication State

## 🛠️ Tech Stack

- Next.js
- Clerk
- TypeScript

## ⚙️ Setup

### Install Clerk

```bash
npm install @clerk/nextjs
```

### Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
CLERK_SECRET_KEY=your_secret_key
```

### Run

```bash
npm run dev
```

Open `http://localhost:3000`

## 🔐 Authentication Flow

```text
User
 ↓
Sign Up / Sign In
 ↓
Clerk
 ↓
Session
 ↓
Protected Routes
 ↓
Authenticated User
```

## 📌 Clerk Components

- `ClerkProvider` — Authentication provider
- `SignIn` — Login UI
- `SignUp` — Registration UI
- `UserButton` — Profile & logout
- `auth()` — Access authenticated user/session
- `currentUser()` — Get current user
- `proxy.ts` — Protect routes

## 🎯 Purpose

This project demonstrates a **Next.js + Clerk authentication setup** with sign-in, sign-up, user management, and protected routes.