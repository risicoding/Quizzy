import { NextRequest, NextResponse } from "next/server";
import { auth } from "./features/auth";
import { headers as nextHeaders } from "next/headers";

const privateRoutes = ["/dashboard", "/chat"];
const authRoutes = ["/sign-in", "/sign-up"];

export async function middleware(request: NextRequest) {
  const headers = await nextHeaders();
  const session = await auth.api.getSession({ headers });
  const { pathname } = request.nextUrl;

  console.log("middleware", { session, pathname });

  // Redirect authenticated users away from auth pages
  if (session && authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Redirect unauthenticated users away from private routes
  if (!session && privateRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
