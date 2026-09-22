"use client";

import React, { useState } from "react";

export interface PricingTier {
  id: string;
  name: string;
  price: number;
  plan: string | null;
  currency: string;
  interval: string;
  features: string[];
  isPopular: boolean;
}

interface PricingCardsProps {
  tiers: PricingTier[];
}

const PricingCards = ({ tiers }: PricingCardsProps) => {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const handleSubscribe = async (plan: string | null) => {
    if (!plan) {
      alert("This plan is free. No subscription needed!");
      return;
    }

    if (loadingPlan) return;

    try {
      setLoadingPlan(plan);

      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          plan,
        }),
      });

      if (response.status === 401) {
        window.location.href = "/login";
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to create checkout session"
        );
      }

      if (!data.url) {
        throw new Error("Stripe checkout URL was not returned.");
      }

      window.location.href = data.url;
    } catch (error) {
      console.error("Subscription error:", error);

      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Something went wrong. Please try again.");
      }

      setLoadingPlan(null);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full mx-auto">
      {tiers.map((tier) => {
        const isLoading = loadingPlan === tier.plan;

        return (
          <div
            key={tier.id}
            className={`relative flex flex-col justify-between p-8 rounded-2xl bg-white border transition-all duration-200 ${
              tier.isPopular
                ? "border-zinc-800 shadow-xl scale-[1.02]"
                : "border-gray-200 shadow-sm hover:shadow-md"
            }`}
          >
            {tier.isPopular && (
              <span className="absolute top-6 right-6 px-3 py-1 text-xs font-semibold bg-black text-white rounded-full">
                Popular
              </span>
            )}

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {tier.name}
              </h3>

              <div className="flex items-baseline mb-6">
                <span className="text-4xl font-extrabold text-gray-900">
                  ${tier.price}
                </span>

                <span className="text-gray-500 font-medium ml-1 text-sm">
                  /{tier.interval}
                </span>
              </div>

              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-start text-sm text-gray-600"
                  >
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-black mt-2 mr-2.5 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => handleSubscribe(tier.plan)}
              disabled={!!loadingPlan}
              className={`w-full py-3 px-4 rounded-xl font-medium transition-colors duration-200 ${
                tier.isPopular
                  ? "bg-black text-white hover:bg-zinc-800"
                  : "bg-white text-gray-900 border border-gray-200 hover:bg-gray-50"
              } ${
                loadingPlan
                  ? "opacity-60 cursor-not-allowed"
                  : ""
              }`}
            >
              {isLoading
                ? "Redirecting..."
                : tier.isPopular
                  ? "Upgrade Now"
                  : "Get Started"}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default PricingCards;