# 🔐 Next.js Better Auth

A production-oriented authentication system built with **Next.js App Router, Better Auth, Prisma, and PostgreSQL**.

The project supports both traditional **Email & Password authentication** and **OAuth authentication with Google and GitHub**.

## ✨ Features

- Email & Password Signup
- Email & Password Login
- Google OAuth Login
- GitHub OAuth Login
- Session Management
- Protected Routes
- Guest-only Routes
- Secure Logout
- PostgreSQL Database
- Prisma Adapter
- shadcn/ui Authentication UI
- Server-side Session Validation

## 🛠️ Tech Stack

- **Next.js** — App Router
- **Better Auth** — Authentication & Session Management
- **Prisma** — Database ORM
- **PostgreSQL** — Database
- **shadcn/ui** — Authentication UI
- **Tailwind CSS** — Styling

## 🔐 Authentication

### Email & Password

Users can create an account using:

- Full Name
- Email
- Password
- Confirm Password

After successful signup, the user is redirected to the login page and can manually log in using their credentials.

### OAuth

Users can also authenticate using:

- Google
- GitHub

Better Auth handles the OAuth flow and session creation.

## 🔄 Authentication Flow

### Signup

```text
/signup
   ↓
Enter Name + Email + Password
   ↓
Better Auth
   ↓
PostgreSQL
   ↓
Account Created
   ↓
/login