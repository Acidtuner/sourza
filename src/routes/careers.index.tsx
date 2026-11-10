import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, MapPin } from "lucide-react";
import { canonicalLink, pageMeta } from "@/lib/seo";
import { OPERATIONS_PATH } from "@/lib/careers";

export const Route = createFileRoute("/careers/")({
  head: () => ({
    meta: pageMeta(
      "Careers at Sourza | Current openings",
      "Explore current openings at Sourza. We’re hiring an Operations Manager in Bangalore to work with Indian manufacturing plants and Gulf buyers.",
      "/careers",
    ),
    links: [canonicalLink("/careers")],
  }),
  component: CareersPage,
});

function CareersPage() {
  return (
    <>
      <p className="text-xs font-medium tracking-widest text-gold-deep uppercase">
        Careers at Sourza
      </p>
      <h1 className="mt-4 max-w-3xl font-display text-4xl leading-tight text-ink-deep md:text-6xl">
        Work with Sourza.
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
        Sourza connects Gulf buyers with Indian plants that make custom machined parts. We’re hiring
        an Operations Manager in Bangalore to help manage the work between a buyer’s enquiry and a
        plant’s response.
      </p>
      <section id="openings" className="mt-14 scroll-mt-28 border-t border-line pt-10 md:mt-20">
        <h2 className="font-display text-3xl text-ink-deep">Current openings</h2>
        <a
          href={OPERATIONS_PATH}
          className="group mt-6 flex flex-col justify-between gap-6 rounded-card border border-line bg-cream p-6 transition-colors hover:border-ink md:flex-row md:items-center md:p-8"
        >
          <div>
            <h3 className="font-display text-2xl text-ink-deep">Operations Manager</h3>
            <p className="mt-3 flex items-center gap-2 text-sm text-muted">
              <MapPin aria-hidden="true" className="size-4" />
              Bangalore (Bengaluru), India
            </p>
            <p className="mt-4 max-w-xl leading-relaxed text-muted">
              Work with buyers and manufacturing plants to coordinate enquiries, quotes and the next
              steps.
            </p>
          </div>
          <span className="inline-flex min-h-11 shrink-0 items-center gap-2 text-sm font-medium">
            View role{" "}
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform group-hover:translate-x-1"
            />
          </span>
        </a>
      </section>
    </>
  );
}
