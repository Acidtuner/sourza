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

const STEPS = [
  { n: "01", title: "It reads the drawing.", text: "You send a drawing as a PDF or a high-resolution JPG or PNG, along with any specification or a plain description. The AI picks out the material, the dimensions, the standards and the notes in the margin, even when the units are mixed.", icon: FileSearch },
  { n: "02", title: "It flags the gaps before anyone quotes.", text: "If a tolerance, a finish or a material grade is missing, the AI spots it and asks you first. That way no plant has to guess, and every quote prices the same part.", icon: Sparkles },
  { n: "03", title: "It matches plants by what they can actually make.", text: "The AI looks at each plant's capabilities, meaning its machines and processes, and invites the few that fit. You can see why each one was chosen. Over time, we plan to add each plant's delivery record and part quality to the matching too.", icon: Factory },
  { n: "04", title: "It lines the quotes up side by side.", text: "Quotes arrive in different formats. Sourza puts them on one page against the brief, so you can see the price, the lead time and where an offer falls short.", icon: Columns2 },
  { n: "05", title: "It remembers the last job.", text: "What fitted, what failed and why are all kept on file. Your next enquiry starts from what you already know, not from a blank page.", icon: History },
] as const;

export const FAQ = [
  { q: "What do I need to send?", a: "A drawing as a PDF or a high-resolution JPG or PNG is ideal, together with any specification or a clear description. Include the material, quantity, any standards and the delivery location, and the AI will flag anything that's missing before plants are asked to quote." },
  { q: "How many quotes will I get?", a: "Usually two or three, from plants that can actually make the part. We invite a small, suitable short list rather than sending your drawing to everyone." },
  { q: "Who do I pay?", a: "You pay the plant directly, not Sourza. Default terms are 30% advance and 70% balance by telegraphic transfer (TT), agreed between the buyer and the plant." },
  { q: "What parts do you cover?", a: "Any metal part made to a drawing. We cover all metal materials and every machining and fabrication process, with no size limits. Machined parts are where we started, and there is a minimum order value of USD 5,000." },
  { q: "What does it cost?", a: "Sourza is free for buyers. Sourza earns a 5% commission on each completed sale, paid by the plant." },
  { q: "I run a plant. How do I join?", a: "Fill in the form below and choose \"Plant\". You can also register on our plants page. Someone from the founding team will get in touch to learn about your machines, processes and export experience as part of qualifying your plant. Joining is free, and you pay a 5% commission only on completed sales." },
] as const;

const GUIDES = [
  ["/resources/rfq-for-machined-parts-what-to-put-in-it-before-you-send", "What to put in an RFQ for machined parts before you send it"],
  ["/resources/mill-test-certificates-ask-for-en-10204-3-1-in-the-rfq", "Mill test certificates: ask for EN 10204 3.1 in the RFQ"],
  ["/resources/under-cif-war-risk-is-yours-to-ask-for", "Under CIF, war risk cover is yours to ask for"],
  ["/resources/cepa-certificate-of-origin-for-exports-to-the-uae-step-by-step", "CEPA certificate of origin for UAE exports: a step-by-step guide"],
] as const;

const btn = "inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm text-cream";
const btn2 = "inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-cream px-5 py-3 text-sm";

function Audience({ id, eyebrow, title, lead, intro, points, cta }: { id: string; eyebrow: string; title: string; lead: string; intro?: string; points: [string, string][]; cta: [string, string] }) {
  return (
    <div id={id} className="scroll-mt-24 rounded-card border border-line bg-cream p-7">
      <p className="text-xs font-medium tracking-widest text-gold-deep uppercase">{eyebrow}</p>
      <h3 className="mt-3 font-display text-3xl leading-tight text-ink-deep">{title}</h3>
      <p className="mt-3 text-lg text-ink">{lead}</p>
      {intro ? <p className="mt-3 leading-relaxed text-muted">{intro}</p> : null}
      <ul className="mt-5 space-y-3">
        {points.map(([t, x]) => (
          <li key={t} className="leading-relaxed text-muted"><strong className="text-ink">{t}</strong> {x}</li>
        ))}
      </ul>
      <a href={cta[0]} className={btn + " mt-6"}>{cta[1]}<ArrowRight className="size-4" /></a>
    </div>
  );
}

export function Brochure() {
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
          <img src="/banner.jpg" alt="" className="pointer-events-none absolute inset-0 h-full w-full object-cover object-[center_40%]" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-paper/95 via-paper/88 to-paper/92 md:bg-gradient-to-r md:from-paper/96 md:via-paper/88 md:to-paper/72" />
          <div className="relative mx-auto max-w-6xl px-5 pt-14 pb-16 md:px-8 md:pt-20 md:pb-24">
            <div className="max-w-3xl">
              <p className="mb-5 text-xs font-medium tracking-widest text-gold-deep uppercase">AI sourcing for specified parts</p>
              <h1 className="font-display text-5xl leading-tight font-medium tracking-tight text-ink-deep md:text-6xl">
                AI that matches your machined parts with the right Indian plant
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
                Sourza's AI reads your drawing, spots the gaps, writes a clear brief that a plant can quote against, and lines the quotes up side by side. Gulf buyers get to a decision faster, and Indian plants get enquiries that are ready to price.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a href="/#introduction" className={btn}>I'm a buyer<ArrowRight className="size-4" /></a>
                <a href="/#introduction" className={btn2}>I'm a plant</a>
              </div>
            </div>
          </div>
        </section>

        <section id="intelligence" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20 md:px-8 md:py-28">
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-widest text-gold-deep uppercase">How the AI works</p>
            <h2 className="mt-3 font-display text-4xl leading-tight text-ink-deep md:text-5xl">From a messy drawing to quotes you can compare</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              Sourza isn't a supplier directory or a freight desk. It's an AI platform that does the slow, careful part of sourcing: reading the requirement properly, finding the plants that can make it, and keeping a record of what worked. Here's what happens to a job.
            </p>
          </div>
          <ol className="mt-12 grid gap-px overflow-hidden rounded-card border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
            {STEPS.map((step) => (
              <li key={step.n} className="bg-cream p-7">
                <span className="flex items-center justify-between"><span className="font-display text-3xl text-gold">{step.n}</span><step.icon className="size-5 text-gold-deep" aria-hidden="true" /></span>
                <h3 className="mt-4 text-lg">{step.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{step.text}</p>
              </li>
            ))}
          </ol>

          <div className="mt-12 rounded-3xl border border-line bg-cream p-6 shadow-lg md:max-w-3xl">
            <h3 className="font-display text-3xl text-ink-deep">See it on a real example</h3>
            <p className="mt-2 text-sm text-muted italic">Here's what a typical drawing looks like when it reaches us, and how two plants respond to it.</p>
            <p className="mt-4"><strong>The part:</strong> a shaft. The diameter is stated, but the tolerance is missing.</p>
            <ul className="mt-4 space-y-2 text-muted">
              <li><strong className="text-ink">Plant A</strong> can mill it. With no tolerance on the drawing, it can't give a reliable price.</li>
              <li><strong className="text-ink">Plant B</strong> can turn and grind it, and asks for the tolerance before quoting.</li>
            </ul>
            <p className="mt-4"><strong>What Sourza shows you:</strong> the gap itself, not a guess. Once you add the tolerance, both plants quote the same part, and the comparison means something.</p>
          </div>
        </section>

        <section id="audiences" className="bg-paper-2">
          <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
            <h2 className="font-display text-4xl leading-tight text-ink-deep md:text-5xl">Who Sourza is for</h2>
            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              <Audience id="buyers" eyebrow="Buyers" title="For buyers in the Gulf" lead="Quotes you can actually compare, and a clear record of every decision."
                intro="If you already import machined parts and want another plant that can hit your drawing, Sourza makes the search easier. You tell us the part, the standard and any constraints. There's no catalogue to browse, because the work starts from what you need made."
                points={[["Quotes that price the same part.", "The AI fixes the gaps in the brief before it goes out, so differences in price reflect the plants, not the paperwork."], ["A short list, with reasons.", "A few suitable plants are invited, and you can see why each one was considered and where an offer misses the brief."], ["A written decision.", "Who you chose, or why a job stopped, stays on file for your team, your auditors and your next order."]]}
                cta={["/#introduction", "Tell us about your part"]} />
              <Audience id="plants" eyebrow="Plants" title="For plants in India" lead="Clear, quote-ready enquiries from Gulf buyers, and the customer stays yours."
                intro="If your factory exports, or is getting ready to, Sourza sends you enquiries that have already been checked and completed. You spend your time quoting, not chasing missing details."
                points={[["Quote-ready enquiries.", "Each brief has been read by the AI and checked for gaps, so you know exactly what you're pricing."], ["The customer stays with you.", "You deal directly with the buyer, and the relationship is yours to build."], ["You remain the exporter.", "You make the part, ship it and are paid for it under your own name."], ["You only pay when you sell.", "Joining is free. Sourza earns a 5% commission on each completed sale, so we only earn when you do."], ["A clear decision either way.", "If you aren't chosen, you'll know why, which helps with the next quote."]]}
                cta={["/plants", "Register your plant"]} />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-24">
          <div className="max-w-3xl">
            <GitCompare className="size-7 text-gold" aria-hidden="true" />
            <h2 className="mt-4 font-display text-4xl leading-tight text-ink-deep md:text-5xl">Why AI makes sourcing better over time</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              Every job teaches the platform something. Each brief shows which details buyers tend to leave out, each quote shows which plants are a good fit for which parts, and each decision shows what made the difference. Sourza keeps all of it, so the next brief is clearer, the next short list is sharper, and the next comparison is faster. The more parts that go through the platform, the better its matching becomes for everyone who uses it.
            </p>
          </div>
        </section>

        <section id="principles" className="scroll-mt-24 border-y border-line bg-ink text-cream">
          <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-24">
            <div className="flex items-center gap-3"><ShieldCheck className="size-5 text-gold" aria-hidden="true" /></div>
            <h2 className="mt-4 max-w-3xl font-display text-4xl leading-tight md:text-5xl">How we work with you</h2>
            <p className="mt-4 max-w-3xl leading-relaxed text-cream/75">We've kept Sourza's role clear and simple on purpose, so everyone knows who is responsible for what.</p>
            <ul className="mt-10 grid gap-8 md:grid-cols-2">
              {[
                ["The plant stays the exporter.", "You deal directly with the people making your part, and they stay accountable for it from the drawing to the dock."],
                ["Sourza doesn't take title to the goods.", "We never buy or resell your parts, so the contract stays between buyer and plant. Sourza is paid a commission by the plant on the completed sale."],
                ["There's no public catalogue.", "Work only starts when someone has a real requirement, which keeps every enquiry specific and every plant's details private."],
                ["Freight and duty stay with the shipment parties.", "The buyer and the plant agree delivery terms as they normally would, and we keep the decision on file."],
              ].map(([title, text]) => (
                <li key={title}><h3 className="font-display text-2xl">{title}</h3><p className="mt-2 leading-relaxed text-cream/75">{text}</p></li>
              ))}
            </ul>
          </div>
        </section>

        <section id="faq" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20 md:px-8 md:py-28">
          <h2 className="font-display text-4xl leading-tight text-ink-deep md:text-5xl">Frequently asked questions</h2>
          <dl className="mt-10 grid gap-6 md:grid-cols-2">
            {FAQ.map((item) => (
              <div key={item.q} className="rounded-2xl border border-line bg-cream p-6">
                <dt className="font-display text-2xl text-ink-deep">{item.q}</dt>
                <dd className="mt-2 leading-relaxed text-muted">
                  {item.q.startsWith("I run a plant") ? (
                    <>Fill in the form below and choose "Plant". You can also register on our <a href="/plants" className="text-gold-deep underline">plants page</a>. Someone from the founding team will get in touch to learn about your machines, processes and export experience as part of qualifying your plant. Joining is free, and you pay a 5% commission only on completed sales.</>
                  ) : item.a}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section id="guides" className="bg-paper-2">
          <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-24">
            <h2 className="font-display text-4xl leading-tight text-ink-deep md:text-5xl">Guides for buyers and plants</h2>
            <p className="mt-4 text-lg text-muted">Practical guides from the Sourza team on getting sourcing right:</p>
            <ul className="mt-8 grid gap-3">
              {GUIDES.map(([href, label]) => (
                <li key={href}><a href={href} className="text-lg text-gold-deep underline">{label}</a></li>
              ))}
            </ul>
            <a href="/resources" className={btn2 + " mt-8"}>See all guides<ArrowRight className="size-4" /></a>
          </div>
        </section>

        <section id="introduction" className="scroll-mt-24 mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <p className="text-xs font-medium tracking-widest text-gold-deep uppercase">
                Request an introduction
              </p>
              <h2 className="mt-3 font-display text-4xl leading-tight text-ink-deep md:text-5xl">
                Let's get started
              </h2>
              <p className="mt-4 leading-relaxed text-muted">
                Whether you buy parts, make them or would like to invest, leave us a note. Someone from the founding team will write back to you personally.
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
                  <div className="sr-only" aria-hidden="true">
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
                      {["Buyer", "Plant", "Investor"].map((role) => (
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
                    Tell us about your part or your plant
                    <textarea
                      rows={4}
                      value={form.note}
                      onChange={(event) => setForm({ ...form, note: event.target.value })}
                      className="mt-2 w-full resize-y rounded-xl border border-line bg-paper px-3 py-3 outline-none focus:border-ink"
                      placeholder="What you buy, what you make, or what you'd like to know."
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
                    By sending this, you agree we may keep these details as described in our{" "}
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
              AI sourcing for specified parts · Indian plants · Gulf buyers
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
