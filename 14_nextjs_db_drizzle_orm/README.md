# 📝 Notes App

A simple Notes App built with **Next.js, TypeScript, Drizzle ORM, and Neon PostgreSQL**.

## 🚀 Features

- Create Note
- View Notes
- Edit Note
- Delete Note

## 🛠️ Tech Stack

- Next.js
- TypeScript
- Drizzle ORM
- Neon PostgreSQL
- Tailwind CSS
- Server Actions

## 📁 Structure

```text
app/
├── actions/
│   └── note-actions.ts
├── components/
│   └── Notes.tsx
└── page.tsx

lib/
└── db/
    ├── index.ts
    └── schema.ts

drizzle.config.ts
```

## ⚙️ Setup

```bash
npm install
```

Create `.env`:

```env
DATABASE_URL="your-neon-database-url"
```

Run database migration:

```bash
npx drizzle-kit migrate
```

Start the project:

```bash
npm run dev
```

## 🔄 Flow

```text
Frontend
   ↓
Server Actions
   ↓
Drizzle ORM
   ↓
Neon PostgreSQL
   ↓
Updated UI
```

## 🎯 Purpose

This project was built to learn **Drizzle ORM and Server Actions** by implementing a complete CRUD application.