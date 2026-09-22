# 📝 Post Management App

A simple Post Management App built with **Next.js, TypeScript, Prisma ORM, and Neon PostgreSQL**.

## 🚀 Features

- Create Post
- View All Posts
- View Single Post
- Update Post
- Delete Post
- Sort posts by updated date

## 🛠️ Tech Stack

- Next.js
- TypeScript
- Prisma ORM
- Neon PostgreSQL
- Tailwind CSS
- Server Actions

## 📁 Structure

```text
app/
├── actions/
│   ├── post-action.ts
│   └── user-action.ts
│
├── generated/
│   └── prisma/
│
└── page.tsx

lib/
└── db/
    └── index.ts

prisma/
└── schema.prisma
```

## ⚙️ Setup

Install dependencies:

```bash
npm install
```

Create `.env`:

```env
DATABASE_URL="your-neon-database-url"
```

Generate Prisma Client:

```bash
npx prisma generate
```

Run database migration:

```bash
npx prisma migrate dev
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
Prisma ORM
   ↓
Neon PostgreSQL
   ↓
revalidatePath()
   ↓
Updated UI
```

## 🎯 Purpose

This project was built to learn **Prisma ORM, Server Actions, and PostgreSQL CRUD operations** by creating a simple Post Management system.