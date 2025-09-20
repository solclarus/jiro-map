import { getSessionCookie } from "better-auth/cookies";
import { type NextRequest, NextResponse } from "next/server";

const publicRoutes = ["/login", "/"];

export async function middleware(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);
  const isPrivateRoute = !publicRoutes.includes(request.nextUrl.pathname);

  // THIS IS NOT SECURE!
  // This is the recommended approach to optimistically redirect users
  // We recommend handling auth checks in each page/route
  if (!sessionCookie && isPrivateRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  // API、static、拡張子付きファイル、_next を除外して全てのルートにミドルウェアを適用
  matcher: ["/((?!api|static|.*\\..*|_next).*)"],
};
