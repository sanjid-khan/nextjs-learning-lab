import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { requireAuth } from "@/lib/auth-guard";
import LogoutButton from "@/components/logout-button";

export default async function Home() {
  const session = await requireAuth();
  const { user } = session;

  const dbuser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
    select: {
      plan: true,
      stripeCurrentPeriodEnd: true,
      stripeCustomerId: true,
      stripePriceId: true,
    },
  });

  const isPremium = dbuser?.plan === "PREMIUM";

  return (
    <div className="flex justify-center items-center min-h-screen bg-zinc-950 text-white p-4">
      <div className="flex flex-col items-center gap-6 p-8 bg-zinc-900/90 border border-zinc-800/80 backdrop-blur-md rounded-2xl shadow-2xl max-w-sm w-full">
        {/* User Profile Avatar */}
        <div className="relative">
          <Image
            src={user.image || "/fallback-avatar.png"}
            alt={user.name || "User Image"}
            width={96}
            height={96}
            className="rounded-full object-cover ring-4 ring-zinc-800 shadow-xl"
            priority
          />
          <span
            className={`absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-zinc-900 ${
              isPremium ? "bg-emerald-500" : "bg-zinc-500"
            }`}
          />
        </div>

        {/* User Identity Info */}
        <div className="text-center space-y-1 w-full">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100">
            {user.name || "User"}
          </h2>
          <p className="text-sm text-zinc-400 font-medium truncate px-2">
            {user.email}
          </p>
        </div>

        {/* Subscription Details & Badge */}
        <div className="w-full flex flex-col items-center gap-3 p-4 bg-zinc-950/60 border border-zinc-800/50 rounded-xl">
          <div className="flex items-center justify-between w-full text-sm">
            <span className="text-zinc-400 font-medium">Current Plan</span>
            <span
              className={`px-3 py-1 text-xs font-semibold rounded-full tracking-wide uppercase ${
                isPremium
                  ? "bg-indigo-500/20 text-indigo-400 border border-indigo-500/30"
                  : "bg-zinc-800 text-zinc-300 border border-zinc-700"
              }`}
            >
              {dbuser?.plan || "FREE"}
            </span>
          </div>

          {/* Show Period End Date if Subscribed */}
          {isPremium && dbuser?.stripeCurrentPeriodEnd && (
            <div className="flex items-center justify-between w-full text-xs text-zinc-400 pt-2 border-t border-zinc-800/60">
              <span>Renews on</span>
              <span className="font-mono text-zinc-200">
                {new Date(dbuser.stripeCurrentPeriodEnd).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
          )}

          {/* Upgrade CTA Button for Free Plan Users */}
          {!isPremium && (
            <Link
              href="/pricing"
              className="w-full mt-1 text-center py-2 px-4 rounded-lg text-xs font-semibold bg-linear-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white transition-all shadow-md"
            >
              Upgrade to Premium ⚡
            </Link>
          )}
        </div>

        {/* Actions */}
        <div className="w-full pt-2">
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}