import { createFileRoute } from "@tanstack/react-router";
import { Brochure, FAQ } from "@/components/brochure";
import {
  canonicalLink,
  faqPageJsonLd,
  HOME_DESCRIPTION,
  HOME_TITLE,
  jsonLdScript,
  organizationJsonLd,
  pageMeta,
  serviceJsonLd,
} from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      ...pageMeta(HOME_TITLE, HOME_DESCRIPTION, "/"),
      { name: "robots", content: "index, follow" },
      { property: "og:site_name", content: "Sourza" },
      { property: "og:locale", content: "en" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
    ],
    links: [canonicalLink("/")],
    scripts: [
      jsonLdScript(organizationJsonLd()),
      jsonLdScript(serviceJsonLd()),
      jsonLdScript(faqPageJsonLd(FAQ)),
    ],
  }),
  component: Home,
});

function Home() {
  return <Brochure />;
}
