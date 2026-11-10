import { createFileRoute, Outlet } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";

export const Route = createFileRoute("/careers")({ component: CareersLayout });

function CareersLayout() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <SiteHeader action={{ href: "/careers#openings", label: "View openings" }} />
      <main className="mx-auto max-w-5xl px-5 py-14 md:px-8 md:py-20">
        <Outlet />
      </main>
      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-5 px-5 py-8 md:px-8">
          <a href="/" aria-label="Sourza home">
            <img src="/sourza-logo.svg" alt="Sourza" className="h-6 w-auto" />
          </a>
          <nav aria-label="Footer" className="flex gap-6 text-sm text-muted">
            <a href="/careers" className="hover:text-ink">
              Careers
            </a>
            <a href="/resources" className="hover:text-ink">
              Resources
            </a>
            <a href="/privacy" className="hover:text-ink">
              Privacy
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
