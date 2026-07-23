import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

 
  if (token && pathname === "/login") {
    return NextResponse.redirect(new URL("/boards", req.url));
  }

  
  if (!token && (pathname.startsWith("/boards") || pathname.startsWith("/board"))) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/boards/:path*", "/board/:path*"],
};