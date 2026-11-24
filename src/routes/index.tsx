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
  softwareApplicationJsonLd,
} from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      ...pageMeta(HOME_TITLE, HOME_DESCRIPTION, "/"),
      {
        name: "keywords",
        content: "Sourza, autonomous B2B procurement, marketplace, Sentiera",
      },
    ],
    links: [canonicalLink("/")],
    scripts: [
      jsonLdScript(organizationJsonLd()),
      jsonLdScript(softwareApplicationJsonLd()),
      jsonLdScript(faqPageJsonLd(FAQ)),
    ],
  }),
  component: Home,
});

function Home() {
  return <Brochure />;
}
