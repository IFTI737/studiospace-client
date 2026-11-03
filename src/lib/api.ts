import { getTokenFromClient } from "./getTokenFromClient";

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Wait up to 45 seconds so slow connections still get a reply
const TIMEOUT_MS = 45000;

const networkMessage = (method: string) =>
  method === "GET"
    ? "Your internet looks slow or offline. Please check your connection and try again."
    : "Your connection is slow or dropped. Your request may have gone through, so please check the list before trying again.";

// Small fetch helper for client components: adds JSON + JWT and throws
// a readable error message when the server says no or the network fails.
export async function apiFetch<T = unknown>(
  path: string,
  options: { method?: string; body?: unknown; auth?: boolean } = {},
): Promise<T> {
  const { method = "GET", body, auth = true } = options;
  const headers: Record<string, string> = { "Content-Type": "application/json" };

  if (auth) {
    let token: string | undefined;
    try {
      token = await getTokenFromClient();
    } catch {
      throw new Error(networkMessage("GET"));
    }
    if (!token) throw new Error("Please log in first");
    headers.authorization = `Bearer ${token}`;
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  let res: Response;
  try {
    res = await fetch(`${API_URL}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });
  } catch {
    throw new Error(networkMessage(method));
  } finally {
    clearTimeout(timer);
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data?.message || "Something went wrong. Please try again.");
  }
  return data as T;
}
