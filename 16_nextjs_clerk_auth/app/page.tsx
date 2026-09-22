import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 p-6 text-white">
      <div className="flex w-full max-w-md flex-col items-center gap-6 rounded-2xl border border-zinc-800 bg-zinc-900 p-8 shadow-2xl">
        <div className="flex w-full items-center justify-between border-b border-zinc-800 pb-6">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-zinc-100">
              Dashboard
            </h1>
            <p className="text-xs text-zinc-400">Manage your profile & account</p>
          </div>

          <div className="flex items-center justify-center rounded-full ring-2 ring-zinc-700 ring-offset-2 ring-offset-zinc-900">
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "size-10",
                },
              }}
            />
          </div>
        </div>

        <div className="w-full text-center space-y-2">
          <h2 className="text-lg font-medium text-zinc-200">
            Welcome back! 👋
          </h2>
          <p className="text-sm text-zinc-400">
            You are successfully authenticated with Clerk.
          </p>
        </div>
      </div>
    </div>
  );
}