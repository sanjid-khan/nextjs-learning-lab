import React from "react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 p-4 sm:p-6 md:p-10 text-white">
      <div className="w-full max-w-md">
        {children}
      </div>
    </div>
  );
}