import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { DeskChat } from "@/components/desk-chat";
import { SiteHeader } from "@/components/site-header";

const STORAGE_KEY = "sourza.plantInterest";

type Interest = {
  works: string;
  place: string;
  contact: string;
  email: string;
  phone: string;
  capability: string;
  trade: "Already export" | "Preparing to export";
  note: string;
};

const EMPTY: Interest = {
  works: "",
  place: "",
  contact: "",
  email: "",
  phone: "",
  capability: "",
  trade: "Already export",
  note: "",
};

export const Route = createFileRoute("/plants")({
  head: () => ({
    meta: [
      { title: "Sourza — For Indian plants" },
      {
        name: "description",
        content:
          "Register interest if your works can run a specified industrial requirement for buyers in the GCC.",
      },
    ],
  }),
  component: PlantsPage,
});

function PlantsPage() {
  const [form, setForm] = useState<Interest>(EMPTY);
  const [saved, setSaved] = useState<Interest | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw) as Interest;
      if (parsed.works && parsed.email) setSaved(parsed);
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  function update<K extends keyof Interest>(key: K, value: Interest[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function submit(event: React.FormEvent) {
    event.preventDefault();
    const next: Interest = {
      ...form,
      works: form.works.trim(),
      place: form.place.trim(),
      contact: form.contact.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      capability: form.capability.trim(),
      note: form.note.trim(),
    };
    if (!next.works || !next.place || !next.contact || !next.email || !next.capability) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setSaved(next);
  }

  async function copyInterest() {
    if (!saved) return;
    const text = [
      "Sourza plant interest",
      `Works: ${saved.works}`,
      `Place: ${saved.place}`,
      `Contact: ${saved.contact}`,
      `Email: ${saved.email}`,
      saved.phone ? `Phone: ${saved.phone}` : "",
      `Trade: ${saved.trade}`,
      `Capability: ${saved.capability}`,
      saved.note ? `Note: ${saved.note}` : "",
    ]
      .filter(Boolean)
      .join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="min-h-screen bg-paper text-ink">
      <SiteHeader action={{ href: "/#introduction", label: "For buyers" }} />
      <main className="mx-auto grid max-w-6xl gap-12 px-5 py-14 md:grid-cols-12 md:px-8 md:py-20">
        <div className="md:col-span-5">
          <p className="text-xs font-medium tracking-widest text-gold-deep uppercase">
            For Indian plants
          </p>
          <h1 className="mt-3 font-display text-4xl leading-tight font-medium text-ink-deep md:text-5xl">
            Be invited against a drawing, not listed in a shop.
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            Sourza is looking for works that can run a specified industrial part,
            beginning with machined components, for buyers in the UAE and the wider GCC.
            You remain the exporter. The requirement arrives structured, and the quote
            is read on the same terms as the other plants invited.
          </p>
          <ul className="mt-8 space-y-4 text-sm leading-relaxed">
            <li className="border-t border-line pt-4">
              <span className="font-medium">A clearer brief.</span> Mixed units and missing
              notes are resolved before you are asked to quote.
            </li>
            <li className="border-t border-line pt-4">
              <span className="font-medium">Capability, not a catalogue.</span> Interest is
              in what the works can run, not a public list of every SKU.
            </li>
            <li className="border-t border-line pt-4">
              <span className="font-medium">The relationship stays yours.</span> Sourza does
              not take title to the goods.
            </li>
          </ul>
        </div>
        <div className="md:col-span-7">
          {saved ? (
            <div className="rounded-3xl border border-line bg-cream p-6 md:p-8">
              <p className="font-display text-3xl text-ink-deep">Interest registered.</p>
              <p className="mt-3 leading-relaxed text-muted">
                {saved.works}, {saved.place}. {saved.contact} · {saved.email}. Share this
                with the Sourza desk when you speak.
              </p>
              <dl className="mt-6 space-y-3 text-sm">
                <div className="flex justify-between gap-4 border-b border-line pb-3">
                  <dt className="text-muted">Trade</dt>
                  <dd>{saved.trade}</dd>
                </div>
                <div>
                  <dt className="text-muted">Capability</dt>
                  <dd className="mt-1 leading-relaxed">{saved.capability}</dd>
                </div>
              </dl>
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={copyInterest}
                  className="inline-flex min-h-11 items-center rounded-full bg-ink px-5 py-3 text-sm text-cream"
                >
                  {copied ? "Copied" : "Copy interest"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    localStorage.removeItem(STORAGE_KEY);
                    setSaved(null);
                    setCopied(false);
                  }}
                  className="inline-flex min-h-11 items-center rounded-full border border-line px-5 py-3 text-sm"
                >
                  Revise
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={submit} className="rounded-3xl border border-line bg-cream p-6 md:p-8">
              <h2 className="font-display text-3xl text-ink-deep">Register interest</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <Field label="Works name" value={form.works} onChange={(value) => update("works", value)} />
                <Field label="City and state" value={form.place} onChange={(value) => update("place", value)} />
                <Field label="Contact name" value={form.contact} onChange={(value) => update("contact", value)} />
                <Field
                  label="Email"
                  type="email"
                  value={form.email}
                  onChange={(value) => update("email", value)}
                />
                <Field
                  label="Phone"
                  required={false}
                  value={form.phone}
                  onChange={(value) => update("phone", value)}
                />
              </div>
              <fieldset className="mt-4">
                <legend className="text-sm">Export position</legend>
                <div className="mt-2 flex flex-wrap gap-2">
                  {(["Already export", "Preparing to export"] as const).map((trade) => (
                    <label
                      key={trade}
                      className={
                        "inline-flex min-h-11 items-center rounded-full border px-4 text-sm " +
                        (form.trade === trade ? "border-ink bg-ink text-cream" : "border-line bg-paper")
                      }
                    >
                      <input
                        type="radio"
                        name="trade"
                        value={trade}
                        checked={form.trade === trade}
                        onChange={() => update("trade", trade)}
                        className="sr-only"
                      />
                      {trade}
                    </label>
                  ))}
                </div>
              </fieldset>
              <label className="mt-4 block text-sm">
                What the works can run
                <textarea
                  required
                  rows={4}
                  value={form.capability}
                  onChange={(event) => update("capability", event.target.value)}
                  placeholder="Processes, materials, and the kind of part you can hold to a drawing."
                  className="mt-2 w-full resize-y rounded-xl border border-line bg-paper px-3 py-3 outline-none focus:border-ink"
                />
              </label>
              <label className="mt-4 block text-sm">
                Anything else
                <textarea
                  rows={3}
                  value={form.note}
                  onChange={(event) => update("note", event.target.value)}
                  className="mt-2 w-full resize-y rounded-xl border border-line bg-paper px-3 py-3 outline-none focus:border-ink"
                />
              </label>
              <button
                type="submit"
                className="mt-5 inline-flex min-h-11 items-center rounded-full bg-ink px-5 py-3 text-sm text-cream"
              >
                Register interest
              </button>
            </form>
          )}
        </div>
      </main>
      <DeskChat />
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required = true,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block text-sm">
      {label}
      <input
        required={required}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-xl border border-line bg-paper px-3 py-3 outline-none focus:border-ink"
      />
    </label>
  );
}
