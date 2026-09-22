import Image from "next/image";
import { requireAuth } from "@/lib/auth-guard";
import LogoutButton from "@/components/logout-button";

export default async function Home() {
  const session = await requireAuth();
  const { user } = session;

  return (
    <div className="flex justify-center items-center h-screen bg-zinc-950 text-white">
      <div className="flex flex-col items-center gap-4 p-8 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl max-w-sm w-full mx-4">
        <div className="relative">
          <Image
            src={user.image || "/fallback-avatar.png"}
            alt={user.name || "User Image"}
            width={100}
            height={100}
            className="rounded-full object-cover ring-4 ring-zinc-800 shadow-md"
            priority
          />
        </div>

        <div className="text-center space-y-1 w-full">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100">
            {user.name || "No Name Provided"}
          </h2>
          <p className="text-sm text-zinc-400 font-medium truncate px-2">
            {user.email}
          </p>
        </div>

        <LogoutButton />
      </div>
    </div>
  );
}