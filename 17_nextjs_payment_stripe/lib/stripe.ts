import Stripe from "stripe";

export const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const STRIPE_PRICE_IDS = {
  premium: process.env.STRIPE_PREMIUM_PRICE_ID!,
} as const;

export type StripePlan = keyof typeof STRIPE_PRICE_IDS;