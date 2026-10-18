import type { Article } from "@/lib/articles";

/**
 * The one public host. Both sourza.com and www.sourza.com answer 200 on the
 * live site; the apex is the host the brand uses, www 301s to it
 * (server/middleware/canonical-host.ts), and every canonical / og:url points here.
 */
export const SITE_URL = "https://sourza.com";

export const HOME_TITLE = "Sourza — Find the plant for a specified part";
export const HOME_DESCRIPTION =
  "Sourza reads a specified part, turns it into a brief, and lines up quotes from Indian plants for buyers in the UAE and the Gulf. Machined parts first.";

export const PLANTS_TITLE = "Sourza — Register an Indian factory";
export const PLANTS_DESCRIPTION =
  "Factories in India can register with Sourza to quote machined parts for buyers in the UAE and the Gulf. You stay the exporter.";

const OG_IMAGE = `${SITE_URL}/og.jpg`;

/**
 * Share tags marked `data-page-meta` are kept by the platform head injector
 * (scripts/grok-pwa-shared.mjs) instead of being replaced by the site-wide card,
 * so each page's own title/description reach X and LinkedIn crawlers.
 */
const PAGE = { "data-page-meta": "1" } as const;

export function canonicalUrl(path: string) {
  return `${SITE_URL}${path === "/" ? "/" : path}`;
}

export function canonicalLink(path: string) {
  return { rel: "canonical", href: canonicalUrl(path) };
}

export function pageMeta(title: string, description: string, path?: string) {
  return [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title, ...PAGE },
    { property: "og:description", content: description, ...PAGE },
    { property: "og:type", content: "website", ...PAGE },
    ...(path ? [{ property: "og:url", content: canonicalUrl(path), ...PAGE }] : []),
    { property: "og:image", content: OG_IMAGE },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title, ...PAGE },
    { name: "twitter:description", content: description, ...PAGE },
    { name: "twitter:image", content: OG_IMAGE },
  ];
}

export function articleMeta(
  title: string,
  description: string,
  path: string,
  published: string,
  modified: string = published,
) {
  const url = canonicalUrl(path);
  return [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title, ...PAGE },
    { property: "og:description", content: description, ...PAGE },
    { property: "og:type", content: "article", ...PAGE },
    { property: "og:url", content: url, ...PAGE },
    { property: "og:image", content: OG_IMAGE },
    { property: "article:published_time", content: published },
    { property: "article:modified_time", content: modified },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title, ...PAGE },
    { name: "twitter:description", content: description, ...PAGE },
    { name: "twitter:image", content: OG_IMAGE },
  ];
}

const ORG = {
  "@type": "Organization",
  name: "Sourza",
  url: `${SITE_URL}/`,
  logo: { "@type": "ImageObject", url: `${SITE_URL}/sourza-logo.svg` },
};

/** schema.org Organization JSON-LD for the home page. */
export function organizationJsonLd() {
  return { "@context": "https://schema.org", ...ORG };
}

/** schema.org Article JSON-LD for one /resources/<slug> page. */
export function articleJsonLd(article: Article) {
  const url = canonicalUrl(`/resources/${article.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.summary,
    datePublished: article.date,
    dateModified: article.updated ?? article.date,
    author: ORG,
    publisher: ORG,
    image: OG_IMAGE,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };
}

/** `<script type="application/ld+json">` entry for a route's head(). */
export function jsonLdScript(data: unknown) {
  return {
    type: "application/ld+json",
    // Escape `<` so article text can never close the script element.
    children: JSON.stringify(data).replace(/</g, "\\u003c"),
  };
}
