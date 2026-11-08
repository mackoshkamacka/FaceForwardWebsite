import { NextResponse, type NextRequest } from "next/server";

/**
 * Site lock ("coming soon" mode).
 *
 * While locked, every page request gets a minimal holding page instead of the
 * site, served with 503 + noindex so search engines treat it as temporary and
 * don't index anything. API routes and static assets are left alone.
 *
 *  - Never locked on the local dev server (`npm run dev`); set SITE_LOCKED=true
 *    to test the holding page locally.
 *  - Locked by default everywhere else. To unlock, set the env var SITE_LOCKED=false
 *    (Vercel → Project → Settings → Environment Variables, then redeploy),
 *    or flip DEFAULT_LOCKED below.
 *  - Optional team preview while locked: set SITE_PREVIEW_KEY=<secret>, then
 *    visit any page with ?preview=<secret> once; a cookie keeps you in.
 */
const DEFAULT_LOCKED = true;
const PREVIEW_COOKIE = "ff_preview";

function isLocked() {
    const flag = process.env.SITE_LOCKED;
    if (flag !== undefined) return flag !== "false";
    // Always visible on the local dev server (`npm run dev`).
    if (process.env.NODE_ENV === "development") return false;
    return DEFAULT_LOCKED;
}

export function proxy(request: NextRequest) {
    if (!isLocked()) return NextResponse.next();

    const previewKey = process.env.SITE_PREVIEW_KEY;
    if (previewKey) {
        if (request.cookies.get(PREVIEW_COOKIE)?.value === previewKey) {
            return NextResponse.next();
        }
        if (request.nextUrl.searchParams.get("preview") === previewKey) {
            const url = request.nextUrl.clone();
            url.searchParams.delete("preview");
            const response = NextResponse.redirect(url);
            response.cookies.set(PREVIEW_COOKIE, previewKey, {
                httpOnly: true,
                secure: true,
                sameSite: "lax",
                maxAge: 60 * 60 * 24 * 14,
            });
            return response;
        }
    }

    return new NextResponse(HOLDING_PAGE, {
        status: 503,
        headers: {
            "Content-Type": "text/html; charset=utf-8",
            "Retry-After": "86400",
            "X-Robots-Tag": "noindex, nofollow",
            "Cache-Control": "no-store",
        },
    });
}

export const config = {
    // Everything except API routes, Next internals, and files with an extension.
    matcher: ["/((?!api/|_next/|.*\\..*).*)"],
};

const HOLDING_PAGE = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Face Forward Canada</title>
<style>
  * { box-sizing: border-box; }
  body {
    margin: 0; min-height: 100vh; display: grid; place-items: center; padding: 1.5rem;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    color: #3b2a8f;
    background:
      radial-gradient(40vmax 40vmax at 0% 100%, #f7e98a99, transparent 70%),
      radial-gradient(45vmax 45vmax at 100% 0%, #e7a6f599, transparent 70%),
      radial-gradient(40vmax 40vmax at 0% 30%, #9eeef299, transparent 70%),
      #ece6fb;
  }
  main { text-align: center; max-width: 32rem; }
  img { width: 120px; height: 120px; border-radius: 50%; background: #fff; padding: 12px; }
  h1 { font-size: clamp(1.8rem, 6vw, 2.6rem); margin: 1.25rem 0 0.5rem; letter-spacing: 0.02em; }
  p { line-height: 1.5; margin: 0.5rem 0; }
  a { color: #4b6fe0; }
</style>
</head>
<body>
<main>
  <img src="/FaceForwardLogo.png" alt="Face Forward logo">
  <h1>Face Forward Canada</h1>
  <p>Our new website is on its way.</p>
  <p>In the meantime, reach us at <a href="mailto:info.faceforwardcanada@gmail.com">info.faceforwardcanada@gmail.com</a>.</p>
</main>
</body>
</html>`;
