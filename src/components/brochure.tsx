import { useState } from "react";
import { DeskChat } from "@/components/desk-chat";
import { registerIntroduction } from "@/lib/introduction";
import { SiteHeader } from "@/components/site-header";
import {
  ArrowRight,
  Columns2,
  Factory,
  FileSearch,
  GitCompare,
  History,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const LENSES = [
  {
    id: "read",
    kicker: "01",
    title: "Reads the spec",
    body: "Specs arrive messy. Mixed units, a missing tolerance, a note in the margin. Sourza turns that into a brief a plant can quote against, before anyone is asked.",
    icon: FileSearch,
  },
  {
    id: "match",
    kicker: "02",
    title: "Finds who can make it",
    body: "It looks at process, material, and proof of what a factory can actually run. Not a public list of everything they say they make.",
    icon: Factory,
  },
  {
    id: "compare",
    kicker: "03",
    title: "Puts the quotes side by side",
    body: "Every offer is read against the same brief. Gaps, exceptions, and lead time stay visible, so you compare the work, not the sales story.",
    icon: Columns2,
  },
  {
    id: "remember",
    kicker: "04",
    title: "Remembers the last job",
    body: "What fitted, what was refused, and why is kept. The next match starts from that, not from a blank search.",
    icon: History,
  },
] as const;

type LensId = (typeof LENSES)[number]["id"];

const STEPS = [
  {
    n: "01",
    title: "The requirement",
    text: "You describe the part, the standard, and the constraint. There is no catalogue to browse. It starts from what you need made.",
  },
  {
    n: "02",
    title: "A short list, with reasons",
    text: "A few plants are invited. You can see why each one was considered, and where an offer misses the brief.",
  },
  {
    n: "03",
    title: "A written decision",
    text: "Who was chosen, or why the job stopped, stays on the file. The plant still makes it and ships it.",
  },
];

export function Brochure() {
  const [lens, setLens] = useState<LensId>("read");
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    organisation: "",
    email: "",
    role: "Buyer",
    note: "",
  });

  const active = LENSES.find((item) => item.id === lens) ?? LENSES[0];

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    const next = {
      name: form.name.trim(),
      organisation: form.organisation.trim(),
      email: form.email.trim(),
      role: form.role,
      note: form.note.trim(),
    };
    if (!next.name || !next.organisation || !next.email) return;
    const fax = String(new FormData(event.currentTarget).get("fax") ?? "");
    setBusy(true);
    setError("");
    try {
      const result = await registerIntroduction({ data: { ...next, fax } });
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setForm(next);
      setSent(true);
    } catch {
      setError("The desk could not save this just now.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen bg-paper text-ink">
      <SiteHeader action={{ href: "/#introduction", label: "Request an introduction" }} />

      <main id="top">
        <section className="relative overflow-hidden">
          <img
            src="/banner.jpg"
            alt=""
            className="pointer-events-none absolute inset-0 h-full w-full object-cover object-[center_40%]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-paper/95 via-paper/88 to-paper/92 md:bg-gradient-to-r md:from-paper/96 md:via-paper/88 md:to-paper/72" />
          <div className="relative mx-auto grid max-w-6xl items-end gap-12 px-5 pt-14 pb-16 md:grid-cols-12 md:px-8 md:pt-20 md:pb-24">
          <div className="md:col-span-7">
            <p className="mb-5 text-xs font-medium tracking-widest text-gold-deep uppercase">
              Specified parts
            </p>
            <h1 className="font-display text-5xl leading-tight font-medium tracking-tight text-ink-deep md:text-6xl">
              You know the <span className="text-gold-deep">part</span>. Finding the plant is the hard bit.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              We take the requirement, turn it into a brief a plant can quote, and put the
              offers side by side. For buyers in the Gulf who want a second source they can
              stand behind.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#intelligence"
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm text-cream"
              >
                How it works
                <ArrowRight className="size-4" />
              </a>
              <button
                type="button"
                onClick={() => window.dispatchEvent(new Event("sourza-desk-open"))}
                className="inline-flex min-h-11 items-center rounded-full border border-line bg-cream px-5 py-3 text-sm"
              >
                Ask a question
              </button>
            </div>
          </div>

          <aside className="md:col-span-5">
            <div className="rounded-3xl border border-line bg-cream p-5 shadow-lg">
              <div className="flex items-center justify-between border-b border-line pb-3">
                <p className="text-xs tracking-widest text-soft uppercase">Example</p>
                <Sparkles className="size-4 text-gold" aria-hidden="true" />
              </div>
              <p className="mt-4 font-display text-2xl leading-snug text-ink-deep">
                A shaft. Diameter stated. Tolerance missing.
              </p>
              <ul className="mt-5 space-y-3 text-sm">
                <li className="flex items-start justify-between gap-4 border-b border-line pb-3">
                  <span className="text-muted">Plant A</span>
                  <span className="text-right">Can mill it. No tolerance on the file, so no price.</span>
                </li>
                <li className="flex items-start justify-between gap-4 border-b border-line pb-3">
                  <span className="text-muted">Plant B</span>
                  <span className="text-right">Can turn and grind it. Asks for the tolerance before quoting.</span>
                </li>
                <li className="flex items-start justify-between gap-4">
                  <span className="text-muted">What stays visible</span>
                  <span className="text-right">The gap, not a guess.</span>
                </li>
              </ul>
            </div>
          </aside>
          </div>
        </section>

        <section className="border-y border-line bg-ink-deep text-cream">
          <div className="mx-auto grid max-w-6xl gap-8 px-5 py-8 sm:grid-cols-3 md:px-8">
            {[
              ["Plants", "Factories we are qualifying in India"],
              ["Buyers", "Teams in the Gulf who already know the part"],
              ["Our role", "The plant stays the exporter"],
            ].map(([label, value]) => (
              <div key={label}>
                <p className="text-xs tracking-widest text-gold uppercase">{label}</p>
                <p className="mt-2 font-display text-2xl">{value}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="intelligence" className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-widest text-gold-deep uppercase">
              The software
            </p>
            <h2 className="mt-3 font-display text-4xl leading-tight text-ink-deep md:text-5xl">
              Four jobs. Then a record.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              This is not a supplier directory, and it is not a freight desk. The software
              reads the requirement, finds the plants, lines the quotes up, and remembers
              what worked last time. The desk does this with you now. The software is so the
              next job does not depend on one person.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-12">
            <div className="flex flex-col gap-2 lg:col-span-5" role="tablist" aria-label="Model lenses">
              {LENSES.map((item) => {
                const selected = item.id === lens;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setLens(item.id)}
                    className={
                      "rounded-2xl border px-4 py-4 text-left transition-colors " +
                      (selected
                        ? "border-ink bg-ink text-cream"
                        : "border-line bg-cream text-ink hover:border-ink")
                    }
                  >
                    <span className="flex items-center justify-between gap-3">
                      <span className={selected ? "text-gold" : "text-gold-deep"}>{item.kicker}</span>
                      <item.icon className="size-4 shrink-0" aria-hidden="true" />
                    </span>
                    <span className="mt-1 block font-display text-2xl">{item.title}</span>
                  </button>
                );
              })}
            </div>
            <article
              className="flex flex-col justify-between rounded-card border border-line bg-cream p-8 lg:col-span-7"
              role="tabpanel"
            >
              <div>
                <active.icon className="size-6 text-gold-deep" aria-hidden="true" />
                <h3 className="mt-6 font-display text-4xl leading-tight text-ink-deep">
                  {active.title}
                </h3>
                <p className="mt-4 max-w-md text-lg leading-relaxed text-muted">{active.body}</p>
              </div>
            </article>
          </div>
        </section>

        <section id="method" className="bg-paper-2">
          <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
            <div className="flex items-end justify-between gap-6">
              <div className="max-w-xl">
                <p className="text-xs font-medium tracking-widest text-gold-deep uppercase">
                  For a buyer
                </p>
                <h2 className="mt-3 font-display text-4xl leading-tight text-ink-deep md:text-5xl">
                  From a requirement to a decision you can compare.
                </h2>
              </div>
              <GitCompare className="hidden size-8 text-gold md:block" aria-hidden="true" />
            </div>
            <ol className="mt-12 grid gap-px overflow-hidden rounded-card border border-line bg-line md:grid-cols-3">
              {STEPS.map((step) => (
                <li key={step.n} className="bg-cream p-7">
                  <p className="font-display text-3xl text-gold">{step.n}</p>
                  <h3 className="mt-4 text-lg">{step.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="corridor" className="relative overflow-hidden">
          <img
            src="/corridor.jpg"
            alt=""
            className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
          />
          <div className="pointer-events-none absolute inset-0 bg-paper/90" />
          <div className="relative mx-auto grid max-w-6xl gap-12 px-5 py-20 md:grid-cols-2 md:px-8 md:py-28">
            <div>
              <p className="text-xs font-medium tracking-widest text-gold-deep uppercase">
                Where we begin
              </p>
              <h2 className="mt-3 font-display text-4xl leading-tight text-ink-deep md:text-5xl">
                Indian plants. Gulf buyers first.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted">
                We start with machined parts, between verified Indian plants and buyers in
                the UAE and the wider Gulf. The software can go further later. We are not
                trying to cover every trade on day one.
              </p>
            </div>
            <div className="grid gap-4">
              {[
                ["Buyers", "Traders and contractor buying teams who already import parts, and want another plant that can hit the drawing.", "/#introduction", "Tell us the part"],
                ["Plants", "Factories that export, or are getting ready to. You get a clearer requirement and a written decision. The customer stays with you.", "/plants", "Register interest"],
              ].map(([title, text, href, link]) => (
                <div key={title} className="rounded-2xl border border-line bg-cream p-5">
                  <h3 className="font-display text-2xl text-ink-deep">{title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{text}</p>
                  {href ? (
                    <a href={href} className="mt-3 inline-flex min-h-11 items-center text-sm text-gold-deep">
                      {link}
                    </a>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="principles" className="border-y border-line bg-ink text-cream">
          <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-24">
            <div className="flex items-center gap-3">
              <ShieldCheck className="size-5 text-gold" aria-hidden="true" />
              <p className="text-xs tracking-widest text-gold uppercase">What this is not</p>
            </div>
            <h2 className="mt-4 max-w-3xl font-display text-4xl leading-tight md:text-5xl">
              A few things we will not do.
            </h2>
            <ul className="mt-10 grid gap-8 md:grid-cols-3">
              {[
                ["We don't own the goods", "The plant remains the exporter. Sourza does not take title."],
                ["No shop window", "There is no public list of parts. Work starts when someone has a requirement."],
                ["We don't ship it", "Freight and duty stay with the people on the shipment. We keep the decision on file."],
              ].map(([title, text]) => (
                <li key={title}>
                  <h3 className="font-display text-2xl">{title}</h3>
                  <p className="mt-2 leading-relaxed text-cream/75">{text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="introduction" className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <p className="text-xs font-medium tracking-widest text-gold-deep uppercase">
                Introduction
              </p>
              <h2 className="mt-3 font-display text-4xl leading-tight text-ink-deep md:text-5xl">
                Tell us who you are.
              </h2>
              <p className="mt-4 leading-relaxed text-muted">
                If you buy or make, leave a note. Someone from the founding team will write back.
              </p>
            </div>
            <div className="md:col-span-7">
              {sent ? (
                <div className="rounded-card border border-line bg-cream p-7">
                  <p className="font-display text-3xl text-ink-deep">Introduction received.</p>
                  <p className="mt-3 leading-relaxed text-muted">
                    {form.name} · {form.organisation} · {form.role}. We'll write to you.
                  </p>
                </div>
              ) : (
                <form onSubmit={submit} className="relative rounded-card border border-line bg-cream p-6 md:p-7">
                  <div className="absolute top-0 left-0 -z-10 h-px w-px overflow-hidden" aria-hidden="true">
                    <label>
                      Fax
                      <input name="fax" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
                    </label>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block text-sm">
                      Name
                      <input
                        required
                        value={form.name}
                        onChange={(event) => setForm({ ...form, name: event.target.value })}
                        className="mt-2 w-full rounded-xl border border-line bg-paper px-3 py-3 outline-none focus:border-ink"
                      />
                    </label>
                    <label className="block text-sm">
                      Organisation
                      <input
                        required
                        value={form.organisation}
                        onChange={(event) =>
                          setForm({ ...form, organisation: event.target.value })
                        }
                        className="mt-2 w-full rounded-xl border border-line bg-paper px-3 py-3 outline-none focus:border-ink"
                      />
                    </label>
                    <label className="block text-sm sm:col-span-2">
                      Email
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={(event) => setForm({ ...form, email: event.target.value })}
                        className="mt-2 w-full rounded-xl border border-line bg-paper px-3 py-3 outline-none focus:border-ink"
                      />
                    </label>
                  </div>
                  <fieldset className="mt-4">
                    <legend className="text-sm">You are</legend>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {["Buyer", "Plant"].map((role) => (
                        <label
                          key={role}
                          className={
                            "inline-flex min-h-11 items-center rounded-full border px-4 text-sm " +
                            (form.role === role
                              ? "border-ink bg-ink text-cream"
                              : "border-line bg-paper")
                          }
                        >
                          <input
                            type="radio"
                            name="role"
                            value={role}
                            checked={form.role === role}
                            onChange={() => setForm({ ...form, role })}
                            className="sr-only"
                          />
                          {role}
                        </label>
                      ))}
                    </div>
                  </fieldset>
                  <label className="mt-4 block text-sm">
                    What should the desk know
                    <textarea
                      rows={4}
                      value={form.note}
                      onChange={(event) => setForm({ ...form, note: event.target.value })}
                      className="mt-2 w-full resize-y rounded-xl border border-line bg-paper px-3 py-3 outline-none focus:border-ink"
                      placeholder="What you buy, what you make, or what you want to know."
                    />
                  </label>
                  {error ? <p className="mt-4 text-sm text-gold-deep">{error}</p> : null}
                  <button
                    type="submit"
                    disabled={busy}
                    className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm text-cream disabled:opacity-60"
                  >
                    {busy ? "Saving" : "Request an introduction"}
                    <ArrowRight className="size-4" />
                  </button>
                  <p className="mt-3 text-sm leading-relaxed text-soft">
                    By sending this, you agree we may keep these details as described in the{" "}
                    <a href="/privacy" className="text-gold-deep underline">
                      privacy notice
                    </a>
                    .
                  </p>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-8 md:flex-row md:items-end md:justify-between md:px-8">
          <div>
            <img src="/sourza-logo.svg" alt="" className="h-6 w-auto" />
            <p className="mt-3 text-lg leading-snug text-muted md:text-xl">
              Indian plants. Gulf buyers. Specified parts.
            </p>
          </div>
          <a href="/privacy" className="text-sm text-muted hover:text-ink">
            Privacy
          </a>
        </div>
      </footer>
      <DeskChat />
    </div>
  );
}
