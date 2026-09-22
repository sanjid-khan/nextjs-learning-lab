import { NextRequest, NextResponse } from "next/server";
import { stripeClient, STRIPE_PRICE_IDS } from "@/lib/stripe";
import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/auth-guard";

export async function POST(request: NextRequest) {
  try {
    const session = await getAuthSession();

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { plan } = await request.json();

    if (!plan || typeof plan !== "string") {
      return NextResponse.json(
        { error: "Plan is required" },
        { status: 400 }
      );
    }

    const priceId =
      STRIPE_PRICE_IDS[plan as keyof typeof STRIPE_PRICE_IDS];

    if (!priceId) {
      return NextResponse.json(
        { error: "Invalid plan" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    if (user.plan === "PREMIUM" && user.stripeSubscriptionId) {
      return NextResponse.json(
        { error: "You already have an active premium subscription." },
        { status: 400 }
      );
    }

    let customerId = user.stripeCustomerId;

    if (!customerId) {
      const customer = await stripeClient.customers.create({
        email: user.email ?? undefined,
        metadata: {
          userId: user.id,
        },
      });

      customerId = customer.id;

      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          stripeCustomerId: customerId,
        },
      });
    }

    const checkoutSession = await stripeClient.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?canceled=true`,
      metadata: {
        userId: user.id,
        plan,
      },
      subscription_data: {
        metadata: {
          userId: user.id,
          plan,
        },
      },
    });

    return NextResponse.json({
      url: checkoutSession.url,
    });
  } catch (error) {
    console.error("Checkout error:", error);

    return NextResponse.json(
      { error: "An error occurred while creating the checkout session." },
      { status: 500 }
    );
  }
}