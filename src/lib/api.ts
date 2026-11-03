import { getTokenFromClient } from "./getTokenFromClient";

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Small fetch helper for client components: adds JSON + JWT and throws
// a readable error message when the server says no.
export async function apiFetch<T = unknown>(
  path: string,
  options: { method?: string; body?: unknown; auth?: boolean } = {},
): Promise<T> {
  const { method = "GET", body, auth = true } = options;
  const headers: Record<string, string> = { "Content-Type": "application/json" };

  if (auth) {
    const token = await getTokenFromClient();
    if (!token) throw new Error("Please log in first");
    headers.authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data?.message || "Something went wrong. Please try again.");
  }
  return data as T;
}
