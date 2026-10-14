import { NextRequest, NextResponse } from "next/server";

// Basic Auth gate for /admin. Fails closed: with no credentials configured the admin is unavailable.
function safeEqual(a: string, b: string) {
  const x = new TextEncoder().encode(a);
  const y = new TextEncoder().encode(b);
  let diff = x.length ^ y.length;
  for (let i = 0; i < Math.max(x.length, y.length); i++) diff |= (x[i] ?? 0) ^ (y[i] ?? 0);
  return diff === 0;
}

export function middleware(req: NextRequest) {
  const user = process.env.ADMIN_USER;
  const pass = process.env.ADMIN_PASSWORD;
  if (!user || !pass) return new NextResponse("Admin is not configured", { status: 503 });

  const header = req.headers.get("authorization") ?? "";
  if (header.startsWith("Basic ")) {
    try {
      const decoded = atob(header.slice(6));
      const i = decoded.indexOf(":");
      if (i > -1) {
        const okUser = safeEqual(decoded.slice(0, i), user);
        const okPass = safeEqual(decoded.slice(i + 1), pass);
        if (okUser && okPass) {
          const res = NextResponse.next();
          res.headers.set("Cache-Control", "no-store");
          return res;
        }
      }
    } catch {}
  }
  return new NextResponse("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Admin", charset="UTF-8"', "Cache-Control": "no-store" },
  });
}

export const config = { matcher: ["/admin", "/admin/:path*"] };
