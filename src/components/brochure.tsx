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
  FileText,
  History,
  Mail,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

const COST = [
  "Sourza is free for buyers.",
  "Plants pay a 5% commission on completed sales.",
  "Orders start at USD 5,000.",
  "Default payment terms are 30% advance and 70% balance by bank transfer (TT), agreed between the buyer and the plant.",
] as const;

const TODAY = [
  {
    n: "01",
    title: "You tell us about the part.",
    text: "Send a note with the part, the material, the quantity, any standards and where it needs to go. A drawing as a PDF or a high-resolution JPG or PNG is the most useful thing you can mention or share. There is no public catalogue to browse. Orders start at USD 5,000.",
    icon: FileText,
  },
  {
    n: "02",
    title: "The founding team writes back.",
    text: "Someone from the founding team will reply personally, to understand the requirement and the constraints.",
    icon: Mail,
  },
  {
    n: "03",
    title: "The plant stays the exporter.",
    text: "If the job goes ahead, you deal with the people making the part. The plant stays the exporter. Sourza does not take title to the goods, and you pay the plant directly. Sourza is free for buyers. Default payment terms are 30% advance and 70% balance by bank transfer (TT), agreed between the buyer and the plant. Plants pay a 5% commission on completed sales.",
    icon: Factory,
  },
] as const;

const ENGINE = [
  {
    n: "01",
    title: "Read the drawing.",
    text: "It is designed to take a PDF, JPG or PNG, plus a specification or a plain description, and pick out the material, the dimensions, the standards and the notes in the margin, even when the units are mixed.",
    icon: FileSearch,
  },
  {
    n: "02",
    title: "Flag the gaps before a plant is asked to quote.",
    text: "It is designed to spot a missing tolerance, finish or material grade, and ask for it first, so every quote prices the same part.",
    icon: Sparkles,
  },
  {
    n: "03",
    title: "Match plants by what they can actually make.",
    text: "It is designed to look at each plant's machines and processes, invite a short list that fits, and show why each plant was chosen. Delivery record and part quality are planned additions, not present today.",
    icon: Factory,
  },
  {
    n: "04",
    title: "Line the quotes up side by side.",
    text: "It is designed to put quotes that arrive in different formats on one page against the same brief, so price, lead time and any shortfall can be read together.",
    icon: Columns2,
  },
  {
    n: "05",
    title: "Keep the job on file.",
    text: "It is designed to keep what fitted, what failed and why, so the next enquiry can start from what is already known.",
    icon: History,
  },
] as const;

const TRUST = [
  ["The plant stays the exporter.", "You deal directly with the people making the part, and they stay accountable for it from the drawing to the dock. You pay the plant directly, not Sourza."],
  ["Sourza does not take title to the goods.", "Sourza does not buy or resell the parts, so the contract stays between buyer and plant."],
  ["Sourza is free for buyers.", "Plants pay a 5% commission on completed sales."],
  ["Orders start at USD 5,000.", "Default payment terms are 30% advance and 70% balance by bank transfer (TT), agreed between the buyer and the plant."],
  ["There is no public catalogue.", "Work starts when someone has a real requirement, which keeps every enquiry specific and every plant's details private."],
  ["Freight and duty stay with the shipment parties.", "The buyer and the plant agree delivery terms as they normally would."],
] as const;

export const FAQ = [
  { q: "Is the Sourza AI engine live today?", a: "No. The engine is in development. This page describes what happens today — you leave a note about a part, and the founding team writes back — and what the engine is designed to do once it is mature: read the drawing, flag gaps, match plants by capability, compare quotes and keep a record of the job." },
  { q: "What do I need to send?", a: "A drawing as a PDF or a high-resolution JPG or PNG is ideal, together with any specification or a clear description. Include the material, quantity, any standards and the delivery location. While the engine is being built, leave a note in the form. If you have a drawing, say so in the note." },
  { q: "How many quotes will I get?", a: "We aim to invite two or three plants that can actually make the part, rather than sending your drawing to everyone. While the AI engine is being built, someone from the founding team will write back about your part." },
  { q: "Who do I pay?", a: "You pay the plant directly, not Sourza. Default payment terms are 30% advance and 70% balance by bank transfer (TT), agreed between the buyer and the plant. The plant stays the exporter, and Sourza does not take title to the goods." },
  { q: "What does it cost?", a: "Sourza is free for buyers. Plants pay a 5% commission on completed sales. Orders start at USD 5,000." },
  { q: "What parts do you cover?", a: "Any metal part made to a drawing. We cover all metal materials and every machining and fabrication process, with no size limits. Machined parts are where we started. Orders start at USD 5,000. There is no public catalogue." },
  { q: "I run a plant. How do I join?", a: "Fill in the form and choose \"Plant\", or register on our plants page. Someone from the founding team will get in touch to learn about your machines, processes and export experience. Joining is free. Plants pay a 5% commission on completed sales." },
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

function submitLabel(role: string, busy: boolean) {
  if (busy) return "Saving";
  if (role === "Plant") return "Register a plant";
  if (role === "Investor") return "Send this note";
  return "Tell us about a part";
}

function FaqAnswer({ text }: { text: string }) {
  const marker = "plants page";
  const index = text.indexOf(marker);
  if (index === -1) return text;
  return (
    <>
      {text.slice(0, index)}
      <a href="/plants" className="text-gold-deep underline">
        {marker}
      </a>
      {text.slice(index + marker.length)}
    </>
  );
}

function StepGrid({ steps }: { steps: readonly { n: string; title: string; text: string; icon: LucideIcon }[] }) {
  return (
    <ol className="mt-8 grid gap-px overflow-hidden rounded-card border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
      {steps.map((step) => (
        <li key={step.n + step.title} className="bg-cream p-7">
          <span className="flex items-center justify-between">
            <span className="font-display text-3xl text-gold">{step.n}</span>
            <step.icon className="size-5 text-gold-deep" aria-hidden="true" />
          </span>
          <h3 className="mt-4 text-lg">{step.title}</h3>
          <p className="mt-2 leading-relaxed text-muted">{step.text}</p>
        </li>
      ))}
    </ol>
  );
}

function Audience({
  id,
  eyebrow,
  title,
  lead,
  intro,
  cta,
}: {
  id: string;
  eyebrow: string;
  title: string;
  lead: string;
  intro: string;
  cta: [string, string];
}) {
  return (
    <div id={id} className="scroll-mt-24 rounded-card border border-line bg-cream p-7">
      <p className="text-xs font-medium tracking-widest text-gold-deep uppercase">{eyebrow}</p>
      <h3 className="mt-3 font-display text-3xl leading-tight text-ink-deep">{title}</h3>
      <p className="mt-3 text-lg text-ink">{lead}</p>
      <p className="mt-3 leading-relaxed text-muted">{intro}</p>
      <a href={cta[0]} className={btn + " mt-6"}>
        {cta[1]}
        <ArrowRight className="size-4" />
      </a>
    </div>
  );
}

function IntroductionForm() {
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

  if (sent) {
    return (
      <div className="rounded-card border border-line bg-cream p-7">
        <p className="font-display text-3xl text-ink-deep">Introduction received.</p>
        <p className="mt-3 leading-relaxed text-muted">
          {form.name} · {form.organisation} · {form.role}. We'll write to you.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="relative rounded-card border border-line bg-cream p-6 md:p-7">
      <p className="text-xs font-medium tracking-widest text-gold-deep uppercase">Tell us about a part</p>
      <p className="mt-3 leading-relaxed text-muted">
        Leave a note about the part. If you have a drawing, say so in the note — a PDF or a high-resolution JPG or PNG. Someone from the founding team will write back.
      </p>
      <div className="sr-only" aria-hidden="true">
        <label>
          Fax
          <input name="fax" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          Name
          <input
            required
            name="name"
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
            className="mt-2 w-full rounded-xl border border-line bg-paper px-3 py-3 outline-none focus:border-ink"
          />
        </label>
        <label className="block text-sm">
          Organisation
          <input
            required
            name="organisation"
            value={form.organisation}
            onChange={(event) => setForm({ ...form, organisation: event.target.value })}
            className="mt-2 w-full rounded-xl border border-line bg-paper px-3 py-3 outline-none focus:border-ink"
          />
        </label>
        <label className="block text-sm sm:col-span-2">
          Email
          <input
            required
            type="email"
            name="email"
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
                (form.role === role ? "border-ink bg-ink text-cream" : "border-line bg-paper")
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
          name="note"
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
        {submitLabel(form.role, busy)}
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
  );
}

export function Brochure() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <SiteHeader action={{ href: "/#introduction", label: "Tell us about a part" }} />

      <main id="top">
        <section className="relative overflow-hidden">
          <img src="/banner.jpg" alt="" className="pointer-events-none absolute inset-0 h-full w-full object-cover object-[center_40%]" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-paper/95 via-paper/88 to-paper/92 md:bg-gradient-to-r md:from-paper/96 md:via-paper/88 md:to-paper/72" />
          <div className="relative mx-auto grid max-w-6xl items-start gap-10 px-5 pt-14 pb-16 md:px-8 md:pt-20 md:pb-24 lg:grid-cols-2">
            <div>
              <p className="mb-5 text-xs font-medium tracking-widest text-gold-deep uppercase">Made-to-spec parts</p>
              <h1 className="font-display text-4xl leading-tight font-medium tracking-tight text-ink-deep md:text-5xl">
                Made-to-spec parts from Indian plants, for buyers in the UAE and the GCC.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
                Sourza sources made-to-spec, machined parts from Indian plants it is qualifying, for buyers in the UAE and the GCC. You send a drawing or a clear description of the part. While the AI engine is being built, someone from the founding team will write back.
              </p>
              <p className="mt-4 text-sm text-muted">
                Built by{" "}
                <a href="https://www.sentieratech.com/about" className="text-gold-deep underline decoration-gold/40 underline-offset-4">
                  Sentiera
                </a>
              </p>
            </div>
            <div>
              <IntroductionForm />
              <a href="/plants" className={btn2 + " mt-4"}>
                Register a plant
              </a>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20 md:px-8 md:py-28">
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-widest text-gold-deep uppercase">How it works</p>
            <h2 className="mt-3 font-display text-4xl leading-tight text-ink-deep md:text-5xl">From a note about a part, to quotes you can compare</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              Sourza is not a supplier directory, and it is not a public catalogue. Work starts from a real requirement. The AI engine that will read the drawing, complete the brief, match plants and line the quotes up is in development. Here is what happens today, and what the engine is designed to do.
            </p>
          </div>

          <h3 className="mt-12 font-display text-3xl text-ink-deep">What happens today</h3>
          <StepGrid steps={TODAY} />

          <div className="mt-12 max-w-3xl rounded-card border border-line bg-cream p-7">
            <h3 className="font-display text-3xl text-ink-deep">What it costs</h3>
            <ul className="mt-4 space-y-2 leading-relaxed text-muted">
              {COST.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            <p className="mt-4 leading-relaxed text-ink">You pay the plant directly, not Sourza.</p>
          </div>

          <h3 className="mt-12 font-display text-3xl text-ink-deep">What the AI engine is designed to do</h3>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted">
            The engine is not live today. It is designed to do the slow, careful part of sourcing once it is mature. Proof can be added then.
          </p>
          <StepGrid steps={ENGINE} />

          <div className="mt-12 rounded-3xl border border-line bg-cream p-6 shadow-lg">
            <h3 className="font-display text-3xl text-ink-deep">How Sourza works</h3>
            <p className="mt-2 text-sm text-muted italic">An overview of the Sourza sourcing platform. The AI engine shown here is currently in development.</p>
            <div className="mt-4 aspect-video w-full overflow-hidden rounded-2xl bg-paper">
              <video
                className="h-full w-full"
                controls
                preload="metadata"
                poster="/videos/how-sourza-works.jpg"
                playsInline
                aria-label="How Sourza works — an overview of the Sourza sourcing platform"
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

        <section id="trust" className="bg-paper-2">
          <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
            <h2 className="font-display text-4xl leading-tight text-ink-deep md:text-5xl">How we work with you</h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
              Sourza's role is kept simple, so everyone knows who is responsible for what.
            </p>
            <ul className="mt-10 grid gap-px overflow-hidden rounded-card border border-line bg-line md:grid-cols-2">
              {TRUST.map(([title, text]) => (
                <li key={title} className="bg-cream p-7">
                  <h3 className="text-lg">{title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="parts" className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
          <div className="max-w-3xl">
            <h2 className="font-display text-4xl leading-tight text-ink-deep md:text-5xl">What parts Sourza covers</h2>
            <div className="mt-4 space-y-4 text-lg leading-relaxed text-muted">
              <p>Sourza is for any metal part made to a drawing, not a standard item from a catalogue. We cover all metal materials and every machining and fabrication process, with no size limits. Machined parts are where we started. Orders start at USD 5,000.</p>
              <p>The most useful starting point is a drawing as a PDF or a high-resolution JPG or PNG, together with any specification or a plain description. Include the material, the quantity, any standards and the delivery location.</p>
            </div>
          </div>
        </section>

        <section id="who" className="bg-paper-2">
          <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
            <h2 className="font-display text-4xl leading-tight text-ink-deep md:text-5xl">Who Sourza is for</h2>
            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              <Audience
                id="buyers"
                eyebrow="Buyers"
                title="For buyers in the Gulf"
                lead="A clearer way to source a made-to-spec metal part from India."
                intro="If you already import parts made to a drawing, or you have a drawing and need an Indian plant that can make it, tell Sourza the part, the standard and any constraints. There is no catalogue to browse, because the work starts from what you need made. While the AI engine is being built, the founding team will write back and take the enquiry from there. The engine is designed, once it is live, to complete the brief, invite a short list of plants that can actually make the part, and line the quotes up against the same requirement. Sourza is free for buyers. Orders start at USD 5,000."
                cta={["/#introduction", "Tell us about a part"]}
              />
              <Audience
                id="plants"
                eyebrow="Plants"
                title="For plants in India"
                lead="Enquiries for parts you can actually make, and the customer stays yours."
                intro="If your factory exports, or is getting ready to, you can register your plant. You stay the exporter. You deal directly with the buyer, and Sourza does not take title to the goods. Joining is free. Plants pay a 5% commission on completed sales. Someone from the founding team will get in touch to learn about your machines, processes and export experience."
                cta={["/plants", "Register a plant"]}
              />
            </div>
          </div>
        </section>

        <section id="guides" className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-24">
          <h2 className="font-display text-4xl leading-tight text-ink-deep md:text-5xl">Guides for buyers and plants</h2>
          <p className="mt-4 text-lg text-muted">Practical guides from the Sourza team on getting sourcing right.</p>
          <GuidesCards />
          <a href="/resources" className={btn2 + " mt-8"}>See all guides<ArrowRight className="size-4" /></a>
        </section>

        <section id="faq" className="bg-paper-2">
          <div className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20 md:px-8 md:py-28">
            <h2 className="font-display text-4xl leading-tight text-ink-deep md:text-5xl">Frequently asked questions</h2>
            <dl className="mt-10 grid gap-6 md:grid-cols-2">
              {FAQ.map((item) => (
                <div key={item.q} className="rounded-2xl border border-line bg-cream p-6">
                  <dt className="font-display text-2xl text-ink-deep">{item.q}</dt>
                  <dd className="mt-2 leading-relaxed text-muted">
                    <FaqAnswer text={item.a} />
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section id="introduction" className="scroll-mt-24 mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <p className="text-xs font-medium tracking-widest text-gold-deep uppercase">While the engine is being built</p>
              <h2 className="mt-3 font-display text-4xl leading-tight text-ink-deep md:text-5xl">Tell us about a part.</h2>
              <p className="mt-4 leading-relaxed text-muted">
                The technical design of the AI engine will live on Sentiera's Sourza page. On sourza.com, leave a note about a part, or{" "}
                <a href="/plants" className="text-gold-deep underline">register a plant</a>. Someone from the founding team will write back.
              </p>
            </div>
            <div className="md:col-span-7">
              <IntroductionForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-8 md:flex-row md:items-end md:justify-between md:px-8">
          <div>
            <img src="/sourza-logo.svg" alt="Sourza" className="h-6 w-auto" />
            <p className="mt-3 text-lg leading-snug text-muted md:text-xl">
              Specified parts from Indian plants, for Gulf buyers.
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
