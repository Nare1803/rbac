import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { pathname } = req.nextUrl;

  const protectedRoutes = ["/dashboard", "/admin", "/patients"];
  const isProtected = protectedRoutes.some((r) => pathname.startsWith(r));

  if (isProtected && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (isLoggedIn && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
