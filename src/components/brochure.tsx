import { useRef, useState } from "react";
import { DeskChat } from "@/components/desk-chat";
import { registerIntroduction } from "@/lib/introduction";
import { SiteHeader } from "@/components/site-header";
import { listArticles, type ArticleBucket } from "@/lib/articles";
import { ARTICLE_IMAGE_HEIGHT, ARTICLE_IMAGE_WIDTH } from "@/lib/seo";
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
  { n: "01", title: "Understand the drawing and the RFQ.", text: "The input is a drawing as a PDF or a high-resolution JPG or PNG, together with any specification or a plain description. The engine is designed to pick out the material, the dimensions, the standards and the notes in the margin, even when the units are mixed.", icon: FileSearch },
  { n: "02", title: "Flag the gaps before a plant is asked to quote.", text: "If a tolerance, a finish or a material grade is missing, the engine is designed to spot it and ask for it first. The aim is a brief that is complete enough that no plant has to guess, and every quote is for the same part.", icon: Sparkles },
  { n: "03", title: "Match plants by what they can actually make.", text: "The engine is designed to look at each plant's capabilities — its machines and processes — and invite the few that fit, rather than sending the drawing to everyone. Why a plant was chosen should be visible. Delivery record and part quality are planned additions, not present today.", icon: Factory },
  { n: "04", title: "Compare quotes against the same brief.", text: "Quotes often arrive in different formats. The platform is designed to put them on one page against the brief, so price, lead time and any shortfall can be read side by side.", icon: Columns2 },
  { n: "05", title: "Keep the job on file.", text: "What fitted, what failed and why are designed to be kept, so the next enquiry can start from what is already known, not from a blank page.", icon: History },
] as const;

const FUNCTIONS = [
  ["Drawing and RFQ understanding", "Read a PDF, JPG or PNG drawing, plus a specification or a plain-language description. Extract the material, dimensions, standards and marginal notes, including where units are mixed, and turn that into a brief a plant can quote against."],
  ["Gap detection", "Check the brief for missing details that would otherwise force a plant to guess — a tolerance, a finish, a material grade — and send those questions back before anyone is invited to quote."],
  ["Plant matching", "Compare the completed brief with what each plant can actually run. Invite a short list, and show why each plant was chosen. Folding in delivery record and part quality is planned, not present."],
  ["Quote comparison", "Take quotes that arrive in different formats and line them up against the same brief, so a buyer can see price, lead time and where an offer falls short."],
] as const;

export const FAQ = [
  { q: "What is Sourza?", a: "Sourza is an autonomous B2B procurement marketplace, built by Sentiera. It is designed to connect a drawing-based requirement with plants that can actually make the part, and to compare their quotes against the same brief." },
  { q: "Is the Sourza AI engine live today?", a: "No. The engine is in development. This page describes the design we are building: reading the drawing, flagging gaps, matching plants by capability, comparing quotes and keeping a record of the job. Proof of the engine can be added once the product is mature." },
  { q: "What is the engine designed to do?", a: "It is designed to read a drawing and any accompanying specification or description, write a clear brief, catch missing details before plants are asked to quote, invite plants whose machines and processes fit, and line the quotes up side by side." },
  { q: "What inputs is it designed to take?", a: "A drawing as a PDF or a high-resolution JPG or PNG, together with any specification or a plain description." },
  { q: "What is it designed to read from a drawing?", a: "The material, the dimensions, the standards and the notes in the margin, even when the units are mixed." },
  { q: "Which gaps is it designed to flag?", a: "A missing tolerance, finish or material grade — the kind of omission that would otherwise leave a plant guessing." },
  { q: "How is plant matching designed to work?", a: "By capability: each plant's machines and processes, compared with the completed brief. A short list is invited, and the reason for each choice is designed to be visible. Delivery record and part quality are planned additions to matching, not present today." },
  { q: "How are quotes designed to be compared?", a: "Quotes often arrive in different formats. The platform is designed to put them on one page against the same brief, so price, lead time and any shortfall can be read together." },
  { q: "What is the platform designed to remember?", a: "What fitted, what failed and why, so the next enquiry can start from what is already known. Over time, each brief, quote and decision is designed to make the next match sharper." },
  { q: "Is Sourza a catalogue you can browse?", a: "No. There is no public catalogue. The pipeline is designed to start from a real requirement, and to represent plants by what they can run." },
] as const;

function bucketLabel(bucket: ArticleBucket) {
  if (bucket === "sourcing") return "Sourcing";
  if (bucket === "policy") return "Policy";
  return "Macro";
}

function GuidesCards() {
  const articles = listArticles().slice(0, 4);
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);

  function onScroll() {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const origin = scroller.getBoundingClientRect().left;
    let best = 0;
    let bestDist = Infinity;
    Array.from(scroller.children).forEach((child, index) => {
      const dist = Math.abs(child.getBoundingClientRect().left - origin);
      if (dist < bestDist) {
        bestDist = dist;
        best = index;
      }
    });
    setActive((current) => (current === best ? current : best));
  }

  function goTo(index: number) {
    const card = scrollerRef.current?.children[index];
    if (card instanceof HTMLElement) {
      card.scrollIntoView({ inline: "start", block: "nearest", behavior: "smooth" });
    }
  }

  return (
    <>
      <ul
        ref={scrollerRef}
        onScroll={onScroll}
        className="mt-8 flex snap-x snap-mandatory items-stretch gap-4 overflow-x-auto overscroll-x-contain [scrollbar-width:none] [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden md:grid md:snap-none md:grid-cols-2 md:gap-6 md:overflow-visible"
      >
        {articles.map((article) => (
          <li key={article.slug} className="w-[85%] shrink-0 snap-start md:w-auto md:min-w-0 md:shrink md:snap-align-none">
            <a
              href={`/resources/${article.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-card border border-line bg-cream transition duration-200 motion-safe:hover:-translate-y-1 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              {article.image ? (
                <img
                  src={article.image}
                  alt={article.title}
                  width={ARTICLE_IMAGE_WIDTH}
                  height={ARTICLE_IMAGE_HEIGHT}
                  sizes="(min-width: 768px) 50vw, 85vw"
                  loading="lazy"
                  decoding="async"
                  className="aspect-video h-auto w-full object-cover"
                />
              ) : null}
              <div className="flex flex-1 flex-col p-6">
                <p className="text-xs font-medium tracking-widest text-gold-deep uppercase">
                  {bucketLabel(article.bucket)}
                </p>
                <h3 className="mt-3 font-display text-2xl leading-tight text-ink-deep">
                  {article.title}
                </h3>
                <p className="mt-3 flex-1 leading-relaxed text-muted">{article.summary}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm text-gold-deep">
                  Read the guide
                  <ArrowRight className="size-4 transition-transform motion-safe:group-hover:translate-x-0.5" />
                </span>
              </div>
            </a>
          </li>
        ))}
      </ul>
      <div
        className="mt-5 flex justify-center gap-2 md:hidden"
        role="group"
        aria-label="Guide cards"
      >
        {articles.map((article, index) => (
          <button
            key={article.slug}
            type="button"
            aria-label={`Show ${article.title}`}
            aria-current={index === active ? "true" : undefined}
            onClick={() => goTo(index)}
            className="flex size-8 items-center justify-center"
          >
            <span
              className={
                "size-2 rounded-full transition-colors " +
                (index === active ? "bg-ink" : "bg-line")
              }
            />
          </button>
        ))}
      </div>
    </>
  );
}

const btn = "inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm text-cream";
const btn2 = "inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-cream px-5 py-3 text-sm";

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
      <SiteHeader action={{ href: "/#introduction", label: "Tell us about a part" }} />

      <main id="top">
        <section className="relative overflow-hidden">
          <img src="/banner.jpg" alt="" className="pointer-events-none absolute inset-0 h-full w-full object-cover object-[center_40%]" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-paper/95 via-paper/88 to-paper/92 md:bg-gradient-to-r md:from-paper/96 md:via-paper/88 md:to-paper/72" />
          <div className="relative mx-auto max-w-6xl px-5 pt-14 pb-16 md:px-8 md:pt-20 md:pb-24">
            <div className="max-w-3xl">
              <p className="mb-5 text-xs font-medium tracking-widest text-gold-deep uppercase">Active / Scaling</p>
              <h1 className="font-display text-5xl leading-tight font-medium tracking-tight text-ink-deep md:text-7xl">
                Sourza
              </h1>
              <p className="mt-4 font-display text-2xl leading-snug text-ink md:text-3xl">
                Autonomous B2B procurement.
              </p>
              <p className="mt-3 text-sm text-muted">
                Built by{" "}
                <a href="https://www.sentieratech.com/about" className="text-gold-deep underline decoration-gold/40 underline-offset-4">
                  Sentiera
                </a>
              </p>
              <div className="mt-6 max-w-2xl space-y-4 text-lg leading-relaxed text-muted">
                <p>Sourza is an AI-native marketplace, built by Sentiera. It connects industrial manufacturing with buyers in the GCC.</p>
                <p>The hard problem the platform is built around is a familiar one in this corridor: a drawing that may be incomplete or mixed in its units, plants whose real capability sits in their machines and processes, and quotes that arrive in different formats. Sourza is designed to turn that into a single brief, a short list of plants that can actually make the part, and a comparison against the same requirement.</p>
                <p>The Sourza AI engine is in development. It is the core of the platform — the part that is designed to read the drawing, flag the gaps, match plants and line the quotes up. This page explains that technical design. The engine is not live today. Proof can be added once the product is mature.</p>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a href="/#introduction" className={btn}>Tell us about a part<ArrowRight className="size-4" /></a>
                <a href="/plants" className={btn2}>Register a plant</a>
              </div>
            </div>
          </div>
        </section>

        <section id="pipeline" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20 md:px-8 md:py-28">
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-widest text-gold-deep uppercase">The pipeline</p>
            <h2 className="mt-3 font-display text-4xl leading-tight text-ink-deep md:text-5xl">How the platform pipeline is designed to work</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              This is the Sourza pipeline we are building. The AI engine that will carry these steps is in development. Each stage is designed to take work that is usually slow and uneven — reading a requirement, completing it, finding a capable plant, and comparing offers — and put it in a form that can be inspected.
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

          <div className="mt-12 rounded-3xl border border-line bg-cream p-6 shadow-lg">
            <h3 className="font-display text-3xl text-ink-deep">How Sourza works</h3>
            <p className="mt-2 text-sm text-muted italic">The pipeline we are building. The AI engine is in development.</p>
            <div className="mt-4 aspect-video w-full overflow-hidden rounded-2xl bg-paper">
              <video
                className="h-full w-full"
                controls
                preload="metadata"
                poster="/videos/how-sourza-works.jpg"
                playsInline
              >
                <source src="/videos/how-sourza-works.mp4" type="video/mp4" />
                <source src="/videos/how-sourza-works.webm" type="video/webm" />
                <track
                  kind="captions"
                  src="/videos/how-sourza-works.vtt"
                  srcLang="en"
                  label="English"
                  default
                />
              </video>
            </div>
          </div>
        </section>

        <section id="engine" className="bg-paper-2">
          <div className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20 md:px-8 md:py-28">
            <p className="text-xs font-medium tracking-widest text-gold-deep uppercase">In development</p>
            <h2 className="mt-3 max-w-3xl font-display text-4xl leading-tight text-ink-deep md:text-5xl">The Sourza AI engine</h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
              The engine is in development. It is designed as a sequence of functions that sit over a single requirement, not as a catalogue search.
            </p>
            <ul className="mt-10 grid gap-px overflow-hidden rounded-card border border-line bg-line md:grid-cols-2">
              {FUNCTIONS.map(([title, text]) => (
                <li key={title} className="bg-cream p-7">
                  <h3 className="font-display text-2xl text-ink-deep">{title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{text}</p>
                </li>
              ))}
            </ul>
            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-soft">
              These four functions, plus the record of each job, are the architecture we can describe today. Models, accuracy targets and integrations are not named here.
            </p>
          </div>
        </section>

        <section id="memory" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20 md:px-8 md:py-24">
          <div className="max-w-3xl">
            <GitCompare className="size-7 text-gold" aria-hidden="true" />
            <h2 className="mt-4 font-display text-4xl leading-tight text-ink-deep md:text-5xl">What the platform is designed to remember</h2>
            <div className="mt-4 space-y-4 text-lg leading-relaxed text-muted">
              <p>The intelligence in Sourza is designed to come from the jobs that run through it, not from a static catalogue of parts.</p>
              <p>Each brief is designed to show which details buyers tend to leave out. Each quote is designed to show which plants are a good fit for which parts. Each decision is designed to show what made the difference. The platform is being built to keep that record, so the next brief can be clearer, the next short list sharper, and the next comparison faster. The more parts that go through the platform, the better its matching is designed to become.</p>
              <p>Two further signals are on the roadmap, and are not in the engine today: a plant's delivery record, and the quality of the parts it has made.</p>
              <p className="text-base text-soft">We do not publish data volumes, training-set sizes or performance figures here, because we do not have approved numbers to stand behind.</p>
            </div>
          </div>
        </section>

        <section id="principles" className="scroll-mt-24 border-y border-line bg-ink text-cream">
          <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-24">
            <div className="flex items-center gap-3"><ShieldCheck className="size-5 text-gold" aria-hidden="true" /></div>
            <h2 className="mt-4 max-w-3xl font-display text-4xl leading-tight md:text-5xl">How Sentiera is engineering Sourza</h2>
            <p className="mt-4 max-w-3xl leading-relaxed text-cream/75">Sourza is built by Sentiera as one of its own platforms — a product the studio is engineering, not a slide about a client. A few design rules follow from that, and from the problem the pipeline is meant to solve.</p>
            <ul className="mt-10 grid gap-8 md:grid-cols-2">
              {[
                ["Start from the requirement, not a catalogue.", "The work begins with a drawing or a description. Plants are represented by what they can run, not by a public list of parts."],
                ["Complete the brief before anyone quotes.", "Missing tolerances, finishes or grades are treated as a problem to catch early, so quotes can be compared on the same part."],
                ["Match on capability, and show the reason.", "Invitation is designed to follow machines and processes, with the reason visible, rather than a broadcast of the drawing."],
                ["Compare like for like.", "Different quote formats are a data problem the platform is designed to normalise against one brief."],
                ["Keep the job, so the next one is better.", "The record of what fitted, what failed and why is part of the system, not an afterthought."],
                ["Be clear about what is not live yet.", "The engine is in development. Planned additions, such as delivery and quality records in matching, are labelled as planned. Sentiera's own rule is to say what it can and cannot do."],
              ].map(([title, text]) => (
                <li key={title}><h3 className="font-display text-2xl">{title}</h3><p className="mt-2 leading-relaxed text-cream/75">{text}</p></li>
              ))}
            </ul>
            <p className="mt-10 max-w-3xl text-sm leading-relaxed text-cream/70">
              Sentiera's engineering and production for its platforms is handled at its technical hub in Bangalore, with strategic leadership from Masdar City, Abu Dhabi. That is where Sourza is being built. It is not a Sourza sales office, and it is not a claim about where parts are made or bought.
            </p>
          </div>
        </section>

        <section id="status" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20 md:px-8 md:py-28">
          <p className="text-xs font-medium tracking-widest text-gold-deep uppercase">Where it stands</p>
          <h2 className="mt-3 font-display text-4xl leading-tight text-ink-deep md:text-5xl">Status and roadmap</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-card border border-line bg-cream p-7">
              <p className="text-xs tracking-widest text-gold-deep uppercase">Active / Scaling</p>
              <p className="mt-3 leading-relaxed text-muted">Sourza is an Active / Scaling product in Sentiera's lineup: an autonomous B2B procurement marketplace, built by Sentiera.</p>
              <p className="mt-3 leading-relaxed text-muted">The AI engine at the core of that marketplace is in development. It is not live today. The pipeline, the four engine functions and the memory layer on this page are the design we are building toward.</p>
            </div>
            <div className="rounded-card border border-line bg-cream p-7">
              <p className="text-xs tracking-widest text-gold-deep uppercase">On the roadmap</p>
              <p className="mt-3 leading-relaxed text-muted">Adding each plant's delivery record and part quality to matching.</p>
              <p className="mt-4 text-xs tracking-widest text-soft uppercase">Not claimed on this page</p>
              <p className="mt-3 leading-relaxed text-muted">Live accuracy, throughput, plant counts, case studies, or a finished autonomous flow. Those can be added when they can be shown.</p>
            </div>
          </div>
        </section>

        <section id="faq" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20 md:px-8 md:py-28">
          <h2 className="font-display text-4xl leading-tight text-ink-deep md:text-5xl">Frequently asked questions</h2>
          <dl className="mt-10 grid gap-6 md:grid-cols-2">
            {FAQ.map((item) => (
              <div key={item.q} className="rounded-2xl border border-line bg-cream p-6">
                <dt className="font-display text-2xl text-ink-deep">{item.q}</dt>
                <dd className="mt-2 leading-relaxed text-muted">{item.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section id="guides" className="bg-paper-2">
          <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-24">
            <h2 className="font-display text-4xl leading-tight text-ink-deep md:text-5xl">Guides for buyers and plants</h2>
            <p className="mt-4 text-lg text-muted">Practical guides from the Sourza team on getting sourcing right:</p>
            <GuidesCards />
            <a href="/resources" className={btn2 + " mt-8"}>See all guides<ArrowRight className="size-4" /></a>
          </div>
        </section>

        <section id="introduction" className="scroll-mt-24 mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <p className="text-xs font-medium tracking-widest text-gold-deep uppercase">
                While the engine is being built
              </p>
              <h2 className="mt-3 font-display text-4xl leading-tight text-ink-deep md:text-5xl">
                Tell us about a part.
              </h2>
              <p className="mt-4 leading-relaxed text-muted">
                The technical design is on this page. Leave a note about a part, or register a plant. Someone from the founding team will write back.
              </p>
              <a href="/plants" className="mt-6 inline-flex min-h-11 items-center text-sm text-gold-deep">
                Register a plant
              </a>
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
                    {busy ? "Saving" : "Tell us about a part"}
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
          <div className="flex flex-col items-start gap-3 md:items-end">
            <a
              href="https://velventurestudio.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-xl border border-line bg-white px-3 py-2"
            >
              <img
                src="/vel-venture-studio.svg"
                alt="Vel Venture Studio"
                className="h-14 w-auto shrink-0"
              />
              <span className="text-sm leading-snug text-muted">
                Part of the Vel Venture
                <br />
                ecosystem
              </span>
            </a>
            <nav aria-label="Footer" className="flex shrink-0 gap-5">
              <a href="/careers" className="text-sm text-muted hover:text-ink">Careers</a>
              <a href="/privacy" className="text-sm text-muted hover:text-ink">Privacy</a>
            </nav>
          </div>
        </div>
      </footer>
      <DeskChat />
    </div>
  );
}
