import PricingCards from "@/components/pricing-cards";

const pricingTiers = [
  {
    id: "free",
    name: "Free",
    price: 0,
    plan: null,
    currency: "USD",
    interval: "month",
    features: [
      "Access to basic features",
      "Limited usage",
      "Community support",
    ],
    isPopular: false,
  },
  {
    id: "premium",
    name: "Premium",
    price: 10,
    plan: "premium",
    currency: "USD",
    interval: "month",
    features: [
      "All Free features",
      "Unlimited usage",
      "Priority support",
      "Access to premium content",
    ],
    isPopular: true,
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen py-16 bg-gray-50 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          Flexible Plans for Everyone
        </h1>

        <p className="text-gray-600">
          Choose the plan that works best for your needs.
        </p>
      </div>

      <PricingCards tiers={pricingTiers} />
    </main>
  );
}