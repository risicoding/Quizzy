import { NextRequest, NextResponse } from "next/server";
import { auth } from "./features/auth";
import { headers as nextHeaders } from "next/headers";

const privateRoutes = ["/dashboard", "/chat"];
const authRoutes = ["/sign-in", "/sign-up"];

export async function middleware(request: NextRequest) {
  const headers = await nextHeaders();
  const session = await auth.api.getSession({ headers });
  const { pathname, search } = request.nextUrl;

  console.log("middleware", { session, pathname });

  const isPrivateRoute = privateRoutes.some((r) => pathname.startsWith(r));

  if (session && authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!session && isPrivateRoute) {
    const signInUrl = new URL("/sign-in", request.url);
    signInUrl.searchParams.set(
      "redirect_url",
      process.env.BETTER_AUTH_URL + pathname + search,
    ); // Preserve query params
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
