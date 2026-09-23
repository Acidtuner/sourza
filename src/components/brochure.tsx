import { useState } from "react";
import { DeskChat } from "@/components/desk-chat";
import { registerIntroduction } from "@/lib/introduction";
import { SiteHeader } from "@/components/site-header";
import {
  ArrowRight,
  FileSearch,
  GitCompare,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const LENSES = [
  {
    id: "read",
    kicker: "01",
    title: "Reads the requirement",
    body: "A written specification is uneven: mixed units, missing tolerances, a note in the margin. Sourza turns that language into a structured ask before anyone is invited to quote.",
  },
  {
    id: "match",
    kicker: "02",
    title: "Matches capability, not catalogues",
    body: "The model compares a requirement to what a verified plant can actually run — process, material, and evidence — rather than a public list of everything a factory claims to make.",
  },
  {
    id: "compare",
    kicker: "03",
    title: "Lines quotes up on the same terms",
    body: "Offers come back against one brief. Gaps, exceptions, and lead differences stay visible, so a buyer is comparing work, not storytelling.",
  },
  {
    id: "remember",
    kicker: "04",
    title: "Remembers what held",
    body: "Each decision leaves a trace: what fitted, what was refused, and why. The next match starts from that memory, not from a blank search.",
  },
] as const;

type LensId = (typeof LENSES)[number]["id"];

const STEPS = [
  {
    n: "01",
    title: "A specified ask",
    text: "The buyer describes the part, the standard, and the constraint. Sourza does not browse a shop. It starts from the drawing of the need.",
  },
  {
    n: "02",
    title: "A short, reasoned set",
    text: "A few verified plants are invited. The file shows why each was considered, and where an offer falls short of the brief.",
  },
  {
    n: "03",
    title: "A record that travels",
    text: "The decision, the milestones, and the quality evidence stay in one place through the order — for the buyer and for the plant.",
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
        <section className="mx-auto grid max-w-6xl items-end gap-12 px-5 pb-16 pt-14 md:grid-cols-12 md:px-8 md:pb-24 md:pt-20">
          <div className="md:col-span-7">
            <p className="mb-5 text-xs font-medium tracking-widest text-gold-deep uppercase">
              AI-native procurement
            </p>
            <h1 className="font-display text-5xl leading-tight font-medium tracking-tight text-ink-deep md:text-6xl">
              Intelligence between a drawing and a decision.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              Sourza reads a specified industrial requirement, matches it to verified
              Indian plants, and keeps the reasoning in one file. Built for buyers who
              already know the part — and need a second source they can trust.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#intelligence"
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm text-cream"
              >
                How the model works
                <ArrowRight className="size-4" />
              </a>
              <button
                type="button"
                onClick={() => window.dispatchEvent(new Event("sourza-desk-open"))}
                className="inline-flex min-h-11 items-center rounded-full border border-line bg-cream px-5 py-3 text-sm"
              >
                Ask Sourza
              </button>
            </div>
          </div>

          <aside className="md:col-span-5">
            <div className="rounded-3xl border border-line bg-cream p-5 shadow-lg">
              <div className="flex items-center justify-between border-b border-line pb-3">
                <p className="text-xs tracking-widest text-soft uppercase">Live reading</p>
                <Sparkles className="size-4 text-gold" aria-hidden="true" />
              </div>
              <p className="mt-4 font-display text-2xl leading-snug text-ink-deep">
                Shaft, specified tolerance, export packing.
              </p>
              <ul className="mt-5 space-y-3 text-sm">
                <li className="flex items-start justify-between gap-4 border-b border-line pb-3">
                  <span className="text-muted">Interpretation</span>
                  <span>Structured brief</span>
                </li>
                <li className="flex items-start justify-between gap-4 border-b border-line pb-3">
                  <span className="text-muted">Plant fit</span>
                  <span>Capability, not catalogue</span>
                </li>
                <li className="flex items-start justify-between gap-4">
                  <span className="text-muted">Decision file</span>
                  <span>Quotes, gaps, evidence</span>
                </li>
              </ul>
            </div>
          </aside>
        </section>

        <section className="border-y border-line bg-ink-deep text-cream">
          <div className="mx-auto grid max-w-6xl gap-8 px-5 py-8 sm:grid-cols-3 md:px-8">
            {[
              ["Origin", "Verified Indian plants"],
              ["First corridor", "GCC procurement desks"],
              ["Role", "Intermediary, not principal"],
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
              The model
            </p>
            <h2 className="mt-3 font-display text-4xl leading-tight text-ink-deep md:text-5xl">
              Four kinds of attention. One file.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              Sourza is not a directory and not a freight desk. The product is the
              intelligence that sits on a specified order — reading, matching, comparing,
              and remembering.
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
                    <span className={selected ? "text-gold" : "text-gold-deep"}>{item.kicker}</span>
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
                <FileSearch className="size-6 text-gold-deep" aria-hidden="true" />
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
                  From requirement to a comparable decision.
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

        <section id="corridor" className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <p className="text-xs font-medium tracking-widest text-gold-deep uppercase">
                Where we begin
              </p>
              <h2 className="mt-3 font-display text-4xl leading-tight text-ink-deep md:text-5xl">
                India-origin parts. GCC buyers first.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted">
                The first work is specified industrial components — beginning with machined
                parts — between verified Indian plants and procurement desks in the UAE and
                the wider Gulf. The same intelligence is designed to travel; the desk is not.
              </p>
            </div>
            <div className="grid gap-4">
              {[
                ["Buyers", "Industrial traders and contractor procurement teams who already import, and want a second source that can hit a drawing.", ""],
                ["Plants", "Export-capable manufacturers who want a clearer requirement and a written decision — without giving up the customer relationship.", "/plants"],
                ["Partners", "Programme partners, including Hub71, looking at how specified sourcing can sit in Abu Dhabi.", ""],
              ].map(([title, text, href]) => (
                <div key={title} className="rounded-2xl border border-line bg-cream p-5">
                  <h3 className="font-display text-2xl text-ink-deep">{title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{text}</p>
                  {href ? (
                    <a href={href} className="mt-3 inline-flex min-h-11 items-center text-sm text-gold-deep">
                      Register interest
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
              <p className="text-xs tracking-widest text-gold uppercase">What we will not become</p>
            </div>
            <h2 className="mt-4 max-w-3xl font-display text-4xl leading-tight md:text-5xl">
              A marketplace with a narrow promise.
            </h2>
            <ul className="mt-10 grid gap-8 md:grid-cols-3">
              {[
                ["Agent, not owner", "Sourza does not take title to the goods. The manufacturer remains exporter of record."],
                ["Not a catalogue", "There is no public shop of SKUs. Work starts from a specified requirement."],
                ["Not a carrier", "Freight and duty stay with the parties to the shipment. Sourza keeps the decision file."],
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
                A conversation, not a signup.
              </h2>
              <p className="mt-4 leading-relaxed text-muted">
                Sourza is introduced through named conversations — buyers, plants, and
                programme partners.
              </p>
            </div>
            <div className="md:col-span-7">
              {sent ? (
                <div className="rounded-card border border-line bg-cream p-7">
                  <p className="font-display text-3xl text-ink-deep">Introduction received.</p>
                  <p className="mt-3 leading-relaxed text-muted">
                    {form.name} · {form.organisation} · {form.role}. The desk has this.
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
                      {["Buyer", "Plant", "Partner"].map((role) => (
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
                      placeholder="A category, a corridor, or a question."
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
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-8 md:flex-row md:items-center md:justify-between md:px-8">
          <img src="/sourza-logo.svg" alt="" className="h-6 w-auto" />
          <p className="max-w-md text-sm leading-relaxed text-muted">
            Specified industrial sourcing. India and the GCC.
          </p>
        </div>
      </footer>
      <DeskChat />
    </div>
  );
}
