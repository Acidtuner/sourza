import { createFileRoute } from "@tanstack/react-router";
import { Brochure } from "@/components/brochure";
import { HOME_DESCRIPTION, HOME_TITLE, pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      ...pageMeta(HOME_TITLE, HOME_DESCRIPTION),
      {
        "script:ld+json": {
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Sourza",
          description: HOME_DESCRIPTION,
        },
      },
    ],
  }),
  component: Home,
});

function Home() {
  return <Brochure />;
}
