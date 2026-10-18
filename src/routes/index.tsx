import { createFileRoute } from "@tanstack/react-router";
import { Brochure } from "@/components/brochure";
import {
  canonicalLink,
  HOME_DESCRIPTION,
  HOME_TITLE,
  jsonLdScript,
  organizationJsonLd,
  pageMeta,
} from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: pageMeta(HOME_TITLE, HOME_DESCRIPTION, "/"),
    links: [canonicalLink("/")],
    scripts: [jsonLdScript(organizationJsonLd())],
  }),
  component: Home,
});

function Home() {
  return <Brochure />;
}
