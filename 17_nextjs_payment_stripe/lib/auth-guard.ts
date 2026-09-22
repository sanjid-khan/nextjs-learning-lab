import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function getAuthSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session;
}

export async function requireAuth(redirectTo: string = "/login") {
  const session = await getAuthSession();

  if (!session) {
    redirect(redirectTo);
  }

  return session;
}

export async function requireUnAuth(redirectTo: string = "/") {
  const session = await getAuthSession();

  if (session) {
    redirect(redirectTo);
  }

  return session;
}