"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Logged out successfully");
          router.push("/login");
          router.refresh();
        },
        onError: (ctx) => {
          toast.error(ctx.error.message || "Failed to logout");
        },
      },
    });
  };

  return (
    <Button
      variant="destructive"
      size="sm"
      onClick={handleLogout}
      className="w-full flex items-center justify-center gap-2 mt-2"
    >
      <LogOut className="size-4" />
      Logout
    </Button>
  );
}