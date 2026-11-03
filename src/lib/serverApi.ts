import { headers } from "next/headers";
import { auth } from "./auth";
import { getTokenFromServer } from "./getTokenFromServer";

// For private server pages: gets the logged-in user + JWT and calls the API
export async function getSessionUser() {
  const session = await auth.api.getSession({ headers: await headers() });
  return session?.user ?? null;
}

export async function serverFetch<T>(path: string): Promise<T | null> {
  try {
    const token = await getTokenFromServer();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
      headers: { authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}
