export const SITE_URL = "https://www.sourza.com";

export const HOME_TITLE = "Sourza — Find the plant for a specified part";
export const HOME_DESCRIPTION =
  "Sourza reads a specified part, turns it into a brief, and lines up quotes from Indian plants for buyers in the UAE and the Gulf. Machined parts first.";

export const PLANTS_TITLE = "Sourza — Register an Indian factory";
export const PLANTS_DESCRIPTION =
  "Factories in India can register with Sourza to quote machined parts for buyers in the UAE and the Gulf. You stay the exporter.";

export function pageMeta(title: string, description: string) {
  return [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:image", content: "/og.jpg" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: "/og.jpg" },
  ];
}

export function articleMeta(title: string, description: string, path: string, published: string) {
  const url = `${SITE_URL}${path}`;
  return [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "article" },
    { property: "og:url", content: url },
    { property: "og:image", content: "/og.jpg" },
    { property: "article:published_time", content: published },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: "/og.jpg" },
  ];
}
