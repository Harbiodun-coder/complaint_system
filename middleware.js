import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

// Middleware runs on the Edge runtime, which can't use the `jsonwebtoken` package -
// that's why this uses `jose` instead, just for verification.
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(request) {
  const token = request.cookies.get("lasu_token")?.value;
  const { pathname } = request.nextUrl;

  let payload = null;
  if (token) {
    try {
      const result = await jwtVerify(token, JWT_SECRET);
      payload = result.payload;
    } catch {
      payload = null;
    }
  }

  // Not logged in -> block dashboard/admin, send to login
  if (!payload && (pathname.startsWith("/dashboard") || pathname.startsWith("/admin"))) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Logged in but not admin -> block /admin
  if (pathname.startsWith("/admin") && payload?.role !== "admin") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Already logged in -> skip login/register pages
  if (payload && (pathname === "/login" || pathname === "/register")) {
    const dest = payload.role === "admin" ? "/admin" : "/dashboard";
    return NextResponse.redirect(new URL(dest, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/login", "/register"],
};
