# 💳 Next.js Stripe Subscription Platform

A simple subscription platform built with **Next.js, Stripe, Prisma, and PostgreSQL**.

## 🚀 Features

- 🔐 User Authentication
- 🚪 Protected Routes & Logout
- 💳 Stripe Checkout
- ⭐ Free & Premium Plans
- 💰 $10/month Premium Subscription
- 👤 Stripe Customer Creation
- 🔄 Stripe Webhook Integration
- 🗄️ PostgreSQL Database with Prisma
- 📅 Subscription Renewal Date
- 🔒 Webhook Signature Verification
- 🎨 Responsive UI with Tailwind CSS

## 🔄 Stripe Webhooks

The application handles:

- `checkout.session.completed`
- `customer.subscription.updated`
- `customer.subscription.deleted`
- `invoice.paid`
- `invoice.payment_failed`

## 🛠️ Tech Stack

- **Next.js**
- **TypeScript**
- **Tailwind CSS**
- **Stripe**
- **Prisma**
- **PostgreSQL**
- **Neon**

## 📦 Installation

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
npm install
```

Create a `.env.local` file:

```env
NEXT_PUBLIC_APP_URL="http://localhost:3000"

DATABASE_URL="your_database_url"

STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

STRIPE_PREMIUM_PRICE_ID="price_..."
```

## 🗄️ Database Setup

```bash
npx prisma db push
npx prisma generate
```

## ⚡ Stripe Webhook

For local development:

```bash
stripe login
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

Copy the generated `whsec_...` and add it to `.env.local`.

## 🏃 Run the Project

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## 🔌 API Routes

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/stripe/checkout` | Create Stripe Checkout Session |
| POST | `/api/stripe/webhook` | Handle Stripe Webhook Events |

## 📄 License

MIT