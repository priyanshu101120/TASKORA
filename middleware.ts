import { createServerClient } from "@supabase/ssr"; // ✅ Server client
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const supabase = createServerClient( // ✅ createServerClient, not createBrowserClient
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            req.cookies.set(name, value);
            res.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  // ✅ getUser() is more reliable than getSession() in middleware
  const { data: { user } } = await supabase.auth.getUser();

  const { pathname } = req.nextUrl;

  if (user && pathname === "/login") {
    return NextResponse.redirect(new URL("/boards", req.url));
  }

  if (!user && (pathname.startsWith("/boards") || pathname.startsWith("/board"))) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return res;
}

export const config = {
  matcher: ["/login", "/boards/:path*", "/board/:path*"],
};