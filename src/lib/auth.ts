import { headers } from "next/headers";

export type AuthUser = { id: string; email: string };

export async function getAuthUser(): Promise<AuthUser | null> {
  const requestHeaders = headers();
  const userId = requestHeaders.get("x-user-id") ?? process.env.DEV_USER_ID;
  const email = requestHeaders.get("x-user-email") ?? "demo@leadgen.app";

  if (!userId) return null;
  return { id: userId, email };
}
