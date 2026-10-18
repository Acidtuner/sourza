import { createFileRoute } from "@tanstack/react-router";
import { listArticles } from "@/lib/articles";
import { canonicalUrl } from "@/lib/seo";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

/** /sitemap.xml — home, resources and every article, built from src/lib/articles.ts. */
export function buildSitemap() {
  const articles = listArticles();
  const newest = articles
    .map((article) => article.updated ?? article.date)
    .sort()
    .at(-1);

  const entries: { loc: string; lastmod?: string }[] = [
    { loc: canonicalUrl("/"), lastmod: newest },
    { loc: canonicalUrl("/resources"), lastmod: newest },
    ...articles.map((article) => ({
      loc: canonicalUrl(`/resources/${article.slug}`),
      lastmod: article.updated ?? article.date,
    })),
    { loc: canonicalUrl("/plants") },
    { loc: canonicalUrl("/privacy") },
  ];

  const urls = entries
    .map(
      ({ loc, lastmod }) =>
        `  <url>\n    <loc>${escapeXml(loc)}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ""}\n  </url>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () =>
        new Response(buildSitemap(), {
          headers: {
            "content-type": "application/xml; charset=utf-8",
            "cache-control": "public, max-age=3600",
          },
        }),
    },
  },
});
