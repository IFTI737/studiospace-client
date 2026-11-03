import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { headers } from "next/headers";
import { auth } from "./lib/auth";

// Private routes: if there is no session, send the user to /login and
// remember where they wanted to go. A logged-in user is never redirected,
// so reloading a private page keeps them on it.
export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/add-studio",
    "/my-listings",
    "/my-bookings",
    "/saved",
    "/profile",
    "/studios/edit/:path*",
  ],
};
