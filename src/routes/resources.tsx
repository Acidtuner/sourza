import { createFileRoute, Outlet } from "@tanstack/react-router";
import { pageMeta } from "@/lib/seo";

const TITLE = "Sourza — Resources";
const DESCRIPTION =
  "Practical notes on India to Gulf machined parts: how a brief is written, why the plant stays the exporter, and what the corridor actually looks like.";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: pageMeta(TITLE, DESCRIPTION),
  }),
  component: ResourcesLayout,
});

function ResourcesLayout() {
  return <Outlet />;
}
