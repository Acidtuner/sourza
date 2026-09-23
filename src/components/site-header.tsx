import { useState } from "react";
import { Menu, X } from "lucide-react";

const LINKS = [
  { href: "/#intelligence", label: "Intelligence" },
  { href: "/#method", label: "Method" },
  { href: "/#corridor", label: "Corridor" },
  { href: "/#principles", label: "Principles" },
  { href: "/plants", label: "Plants" },
];

export function SiteHeader({ action }: { action: { href: string; label: string } }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 border-b border-line/80 bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 md:px-8">
        <a href="/" className="shrink-0" aria-label="Sourza home">
          <img src="/sourza-logo.svg" alt="Sourza" className="h-7 w-auto md:h-8" />
        </a>
        <nav className="hidden items-center gap-7 md:flex" aria-label="Page">
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
        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-full border border-line md:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>
      {open ? (
        <nav className="border-t border-line px-5 py-3 md:hidden" aria-label="Mobile">
          {LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="block py-3 text-base"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a href={action.href} className="block py-3 text-base" onClick={() => setOpen(false)}>
            {action.label}
          </a>
        </nav>
      ) : null}
    </header>
  );
}
