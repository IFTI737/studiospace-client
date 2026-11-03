"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";

// Google users have no password yet. Better Auth only allows setting
// a first password from the server, so this small server action does it.
export async function setFirstPassword(newPassword: string) {
  try {
    await auth.api.setPassword({ body: { newPassword }, headers: await headers() });
    return { ok: true, message: "Password added. You can now also log in with email and password." };
  } catch (err) {
    return { ok: false, message: (err as Error).message || "Could not add a password" };
  }
}
