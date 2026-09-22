import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { stripeClient, STRIPE_PRICE_IDS } from "@/lib/stripe";
import { prisma } from "@/lib/db";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request: NextRequest) {
  if (!webhookSecret) {
    return NextResponse.json(
      { error: "Webhook secret is missing" },
      { status: 500 }
    );
  }

  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripeClient.webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    );
  } catch (error) {
    console.error("Webhook signature verification failed:", error);

    return NextResponse.json(
      { error: "Invalid signature" },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;

        const userId = session.metadata?.userId;
        const subscriptionId =
          typeof session.subscription === "string"
            ? session.subscription
            : session.subscription?.id;

        if (!userId || !subscriptionId) break;

        const subscription =
          await stripeClient.subscriptions.retrieve(subscriptionId);

        const subscriptionItem = subscription.items.data[0];

        if (!subscriptionItem) break;

        const stripePriceId = subscriptionItem.price.id;
        const isPremium = stripePriceId === STRIPE_PRICE_IDS.premium;

        await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            stripeSubscriptionId: subscription.id,
            stripePriceId,
            stripeCurrentPeriodEnd: new Date(
              subscriptionItem.current_period_end * 1000
            ),
            stripeCancelAtPeriodEnd: subscription.cancel_at_period_end,
            plan: isPremium ? "PREMIUM" : "FREE",
          },
        });

        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;

        const customerId =
          typeof subscription.customer === "string"
            ? subscription.customer
            : subscription.customer.id;

        const user = await prisma.user.findFirst({
          where: {
            stripeCustomerId: customerId,
          },
        });

        if (!user) break;

        const subscriptionItem = subscription.items.data[0];

        if (!subscriptionItem) break;

        const stripePriceId = subscriptionItem.price.id;
        const isPremium = stripePriceId === STRIPE_PRICE_IDS.premium;

        const isActive =
          subscription.status === "active" ||
          subscription.status === "trialing";

        await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            stripeSubscriptionId: subscription.id,
            stripePriceId,
            stripeCurrentPeriodEnd: new Date(
              subscriptionItem.current_period_end * 1000
            ),
            stripeCancelAtPeriodEnd: subscription.cancel_at_period_end,
            plan: isActive && isPremium ? "PREMIUM" : "FREE",
          },
        });

        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;

        const customerId =
          typeof subscription.customer === "string"
            ? subscription.customer
            : subscription.customer.id;

        const user = await prisma.user.findFirst({
          where: {
            stripeCustomerId: customerId,
          },
        });

        if (!user) break;

        await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            stripeSubscriptionId: null,
            stripePriceId: null,
            stripeCurrentPeriodEnd: null,
            stripeCancelAtPeriodEnd: false,
            plan: "FREE",
          },
        });

        break;
      }

      case "invoice.paid": {
        const invoice = event.data.object as Stripe.Invoice;

        const customerId =
          typeof invoice.customer === "string"
            ? invoice.customer
            : invoice.customer?.id;

        if (!customerId) break;

        const user = await prisma.user.findFirst({
          where: {
            stripeCustomerId: customerId,
          },
        });

        if (!user) break;

        const invoiceSubscription = (
          invoice as { subscription?: string | Stripe.Subscription | null }
        ).subscription;

        const subscriptionId =
          typeof invoiceSubscription === "string"
            ? invoiceSubscription
            : invoiceSubscription?.id;

        if (!subscriptionId) break;

        const stripeSubscription =
          await stripeClient.subscriptions.retrieve(subscriptionId);

        const subscriptionItem = stripeSubscription.items.data[0];

        if (!subscriptionItem) break;

        const stripePriceId = subscriptionItem.price.id;
        const isPremium = stripePriceId === STRIPE_PRICE_IDS.premium;

        const isActive =
          stripeSubscription.status === "active" ||
          stripeSubscription.status === "trialing";

        await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            stripeSubscriptionId: stripeSubscription.id,
            stripePriceId,
            stripeCurrentPeriodEnd: new Date(
              subscriptionItem.current_period_end * 1000
            ),
            stripeCancelAtPeriodEnd: stripeSubscription.cancel_at_period_end,
            plan: isActive && isPremium ? "PREMIUM" : "FREE",
          },
        });

        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;

        const customerId =
          typeof invoice.customer === "string"
            ? invoice.customer
            : invoice.customer?.id;

        if (!customerId) break;

        const user = await prisma.user.findFirst({
          where: {
            stripeCustomerId: customerId,
          },
        });

        if (!user) break;

        const invoiceSubscription = (
          invoice as { subscription?: string | Stripe.Subscription | null }
        ).subscription;

        const subscriptionId =
          typeof invoiceSubscription === "string"
            ? invoiceSubscription
            : invoiceSubscription?.id;

        if (!subscriptionId) break;

        const stripeSubscription =
          await stripeClient.subscriptions.retrieve(subscriptionId);

        const subscriptionItem = stripeSubscription.items.data[0];

        if (!subscriptionItem) break;

        const stripePriceId = subscriptionItem.price.id;
        const isPremium = stripePriceId === STRIPE_PRICE_IDS.premium;

        const isActive =
          stripeSubscription.status === "active" ||
          stripeSubscription.status === "trialing";

        await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            stripeSubscriptionId: stripeSubscription.id,
            stripePriceId,
            stripeCurrentPeriodEnd: new Date(
              subscriptionItem.current_period_end * 1000
            ),
            stripeCancelAtPeriodEnd: stripeSubscription.cancel_at_period_end,
            plan: isActive && isPremium ? "PREMIUM" : "FREE",
          },
        });

        break;
      }

      default:
        console.log(`Unhandled Stripe event: ${event.type}`);
    }

    return NextResponse.json({
      received: true,
    });
  } catch (error) {
    console.error("Error processing Stripe webhook:", error);

    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}