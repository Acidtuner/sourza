import type { MouseEvent } from "react";
import { ChevronDown, Menu, X } from "lucide-react";

const LINKS = [
  { href: "/#how-it-works", label: "How it works" },
  { href: "/resources", label: "Resources" },
  { href: "/careers", label: "Careers" },
];

function AboutItems({
  onNavigate,
}: {
  onNavigate?: (event: MouseEvent<HTMLAnchorElement>) => void;
}) {
  return (
    <>
      <span className="block px-3 py-2 text-sm text-soft">Introduction</span>
      <span className="block px-3 py-2 text-sm text-soft">How the AI works</span>
      <a
        href="/#faq"
        className="block rounded-lg px-3 py-2 text-sm text-ink hover:bg-cream"
        onClick={onNavigate}
      >
        FAQs
      </a>
      <span className="block px-3 py-2 text-sm text-soft">Vel Venture</span>
    </>
  );
}

export function SiteHeader({ action }: { action: { href: string; label: string } }) {
  return (
    <header className="sticky top-0 z-20 border-b border-line/80 bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 md:px-8">
        <a href="/" className="shrink-0" aria-label="Sourza home">
          <img src="/sourza-logo.svg" alt="Sourza" className="h-7 w-auto md:h-8" />
        </a>
        <nav className="hidden items-center gap-7 md:flex" aria-label="Page">
          <details className="group relative">
            <summary className="flex cursor-pointer list-none items-center gap-1 text-sm text-muted [&::-webkit-details-marker]:hidden">
              About Sourza
              <ChevronDown className="size-3.5" aria-hidden="true" />
            </summary>
            <div className="absolute left-0 z-30 mt-3 w-56 rounded-xl border border-line bg-paper p-2 shadow-lg">
              <AboutItems />
            </div>
          </details>
          {LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-muted transition-colors hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a
          href={action.href}
          className="hidden rounded-full bg-ink px-4 py-2 text-sm text-cream md:inline-flex"
        >
          {action.label}
        </a>
        <details className="group md:hidden">
          <summary
            className="inline-flex size-11 cursor-pointer list-none items-center justify-center rounded-full border border-line [&::-webkit-details-marker]:hidden"
            aria-label="Open menu"
          >
            <Menu className="size-5 group-open:hidden" />
            <X className="hidden size-5 group-open:block" />
          </summary>
          <nav
            className="absolute inset-x-0 top-full border-t border-line bg-paper px-5 py-3 shadow-lg"
            aria-label="Mobile"
          >
            <p className="pt-2 text-xs font-medium tracking-widest text-gold-deep uppercase">
              About Sourza
            </p>
            <div className="pb-2">
              <AboutItems
                onNavigate={(event) => {
                  event.currentTarget.closest("details")?.removeAttribute("open");
                }}
              />
            </div>
            {LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block py-3 text-base"
                onClick={(event) => {
                  event.currentTarget.closest("details")?.removeAttribute("open");
                }}
              >
                {item.label}
              </a>
            ))}
            <a
              href={action.href}
              className="block py-3 text-base"
              onClick={(event) => {
                event.currentTarget.closest("details")?.removeAttribute("open");
              }}
            >
              {action.label}
            </a>
          </nav>
        </details>
      </div>
    </header>
  );
}
