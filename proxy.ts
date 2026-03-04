import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import authConfig from "@/auth.config";

const { auth } = NextAuth(authConfig);

const PUBLIC_PATHS = ["/"];
const PENDING_ALLOWED = ["/pending", "/logout"];

export default auth((req) => {
  const { nextUrl, auth: session } = req;
  const { pathname } = nextUrl;

  const isAuthApi = pathname.startsWith("/api/auth");
  if (isAuthApi) return NextResponse.next();

  const isPublic = PUBLIC_PATHS.includes(pathname);
  if (!session) {
    if (isPublic) return NextResponse.next();
    return NextResponse.redirect(new URL("/", nextUrl));
  }

  const status = session.user?.status;
  if (status !== "active") {
    const isAllowedForPending =
      PENDING_ALLOWED.includes(pathname) || pathname.startsWith("/api/auth");
    if (!isAllowedForPending) {
      return NextResponse.redirect(new URL("/pending", nextUrl));
    }
  }

  if (pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
