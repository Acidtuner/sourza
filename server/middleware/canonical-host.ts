/**
 * One public host: www.sourza.com answers 301 to the same path on
 * https://sourza.com, so every URL matches its canonical tag (src/lib/seo.ts).
 * Nitro registers server/middleware/* alphabetically, so this runs before
 * grok-pwa.ts. Only the exact www host is redirected; previews are untouched.
 */
const CANONICAL_HOST = "sourza.com";
const REDIRECT_HOSTS = new Set(["www.sourza.com"]);

interface HostEvent {
  url: URL;
  req: { method: string; headers: Headers };
}

export default function canonicalHostMiddleware(
  event: HostEvent,
  next: () => unknown | Promise<unknown>,
): unknown | Promise<unknown> {
  const raw =
    event.req.headers.get("x-forwarded-host") ?? event.req.headers.get("host") ?? event.url.host;
  const host = String(raw).split(",")[0]!.trim().toLowerCase().replace(/:\d+$/, "");
  const method = (event.req.method ?? "GET").toUpperCase();
  if (!REDIRECT_HOSTS.has(host) || (method !== "GET" && method !== "HEAD")) return next();

  const target = `https://${CANONICAL_HOST}${event.url.pathname}${event.url.search}`;
  return new Response(null, {
    status: 301,
    headers: { location: target, "cache-control": "public, max-age=86400" },
  });
}
