import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import { canonicalLink, pageMeta } from "@/lib/seo";
import {
  APPLICATION_EMAIL,
  APPLICATION_URL,
  OPERATIONS_PATH,
  REQUIREMENTS,
  RESPONSIBILITIES,
  ROLE_SUMMARY,
  WHY_JOIN,
} from "@/lib/careers";

export const Route = createFileRoute("/careers/operations-manager-bangalore")({
  head: () => ({
    meta: pageMeta(
      "Operations Manager — Bangalore | Sourza",
      "Join Sourza as an Operations Manager in Bangalore. Help coordinate Indian manufacturing plants, buyer enquiries, quotes and order follow-up.",
      OPERATIONS_PATH,
    ),
    links: [canonicalLink(OPERATIONS_PATH)],
  }),
  component: OperationsManagerPage,
});

function OperationsManagerPage() {
  return (
    <article className="max-w-3xl">
      <a
        href="/careers"
        className="inline-flex min-h-11 items-center gap-2 text-sm text-muted hover:text-ink"
      >
        <ArrowLeft aria-hidden="true" className="size-4" />
        All openings
      </a>
      <p className="mt-6 text-xs font-medium tracking-widest text-gold-deep uppercase">
        Careers at Sourza
      </p>
      <h1 className="mt-4 font-display text-4xl leading-tight text-ink-deep md:text-5xl">
        Operations Manager
      </h1>
      <p className="mt-5 flex items-center gap-2 text-muted">
        <MapPin aria-hidden="true" className="size-4" />
        Bangalore (Bengaluru), India
      </p>
      <a
        href="#apply"
        className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm text-cream"
      >
        Apply for this role
        <ArrowRight aria-hidden="true" className="size-4" />
      </a>
      <section className="mt-12 border-t border-line pt-8">
        <h2 className="font-display text-2xl text-ink-deep">The role</h2>
        <p className="mt-4 leading-relaxed text-muted">{ROLE_SUMMARY}</p>
      </section>
      <section className="mt-9">
        <h2 className="font-display text-2xl text-ink-deep">What you’ll do</h2>
        <ul className="mt-4 list-disc space-y-3 pl-5 leading-relaxed text-muted">
          {RESPONSIBILITIES.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
      <section className="mt-9">
        <h2 className="font-display text-2xl text-ink-deep">What we’re looking for</h2>
        <ul className="mt-4 list-disc space-y-3 pl-5 leading-relaxed text-muted">
          {REQUIREMENTS.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
      <section className="mt-9">
        <h2 className="font-display text-2xl text-ink-deep">Why join Sourza?</h2>
        <p className="mt-4 leading-relaxed text-muted">{WHY_JOIN}</p>
      </section>
      <section
        id="apply"
        className="mt-12 scroll-mt-28 rounded-card border border-line bg-cream p-6 md:p-8"
      >
        <h2 className="font-display text-2xl text-ink-deep">How to apply</h2>
        <p className="mt-4 leading-relaxed text-muted">
          Send your CV and a short note about a manufacturing, sourcing or supplier problem you’ve
          helped solve to{" "}
          <a href={APPLICATION_URL} className="break-words text-gold-deep underline">
            {APPLICATION_EMAIL}
          </a>
          .
        </p>
        <p className="mt-4 leading-relaxed text-muted">
          Use the subject line{" "}
          <strong className="font-medium text-ink">Operations Manager — Bangalore</strong>.
        </p>
        <a
          href={APPLICATION_URL}
          className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm text-cream"
        >
          Apply by email
          <ArrowRight aria-hidden="true" className="size-4" />
        </a>
        <p className="mt-3 text-sm leading-relaxed text-soft">
          This opens your email app. You can also copy the address above.
        </p>
      </section>
    </article>
  );
}
