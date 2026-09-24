import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { DeskChat } from "@/components/desk-chat";
import { SiteHeader } from "@/components/site-header";
import { PLANTS_DESCRIPTION, PLANTS_TITLE, pageMeta } from "@/lib/seo";
import { registerPlant } from "@/lib/plant-register";

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
    meta: pageMeta(PLANTS_TITLE, PLANTS_DESCRIPTION),
  }),
  component: PlantsPage,
});

function PlantsPage() {
  const [form, setForm] = useState<Interest>(EMPTY);
  const [saved, setSaved] = useState<Interest | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  function update<K extends keyof Interest>(key: K, value: Interest[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    const fax = String(new FormData(event.currentTarget).get("fax") ?? "");
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
    setBusy(true);
    setError("");
    try {
      const result = await registerPlant({ data: { ...next, fax } });
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setSaved(next);
    } catch {
      setError("The register could not save this just now.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen bg-paper text-ink">
      <SiteHeader action={{ href: "/#introduction", label: "For buyers" }} />
      <main className="mx-auto grid max-w-6xl gap-12 px-5 py-14 md:grid-cols-12 md:px-8 md:py-20">
        <div className="md:col-span-5">
          <p className="text-xs font-medium tracking-widest text-gold-deep uppercase">
            For factories in India
          </p>
          <h1 className="mt-3 font-display text-4xl leading-tight font-medium text-ink-deep md:text-5xl">
            Quote against a drawing. Don't sit in a catalogue.
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            We're looking for factories that can make a specified part — machined
            components first — for buyers in the UAE and the wider GCC. You stay the
            exporter. The requirement arrives cleaned up, and your quote is read on the
            same terms as the others.
          </p>
          <ul className="mt-8 space-y-4 text-sm leading-relaxed">
            <li className="border-t border-line pt-4">
              <span className="font-medium">A clearer brief.</span> Mixed units and missing
              notes are sorted out before anyone asks you to quote.
            </li>
            <li className="border-t border-line pt-4">
              <span className="font-medium">What you can actually run.</span> We want the
              process and the material, not a public list of every part you have made.
            </li>
            <li className="border-t border-line pt-4">
              <span className="font-medium">The customer stays yours.</span> We don't take
              title to the goods.
            </li>
          </ul>
        </div>
        <div className="md:col-span-7">
          {saved ? (
            <div className="rounded-3xl border border-line bg-cream p-6 md:p-8">
              <p className="font-display text-3xl text-ink-deep">We've got it.</p>
              <p className="mt-3 leading-relaxed text-muted">
                {saved.works}, {saved.place}. {saved.contact} · {saved.email}. We'll be in
                touch.
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
              <div className="mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setSaved(null);
                    setError("");
                  }}
                  className="inline-flex min-h-11 items-center rounded-full border border-line px-5 py-3 text-sm"
                >
                  Register another factory
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={submit} className="relative rounded-3xl border border-line bg-cream p-6 md:p-8">
              <div className="absolute top-0 left-0 -z-10 h-px w-px overflow-hidden" aria-hidden="true">
                <label>
                  Fax
                  <input name="fax" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
                </label>
              </div>
              <h2 className="font-display text-3xl text-ink-deep">Register interest</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <Field label="Factory name" value={form.works} onChange={(value) => update("works", value)} />
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
                <legend className="text-sm">Do you export today?</legend>
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
                      {trade === "Already export" ? "We export" : "Getting ready"}
                    </label>
                  ))}
                </div>
              </fieldset>
              <label className="mt-4 block text-sm">
                What you can make
                <textarea
                  required
                  rows={4}
                  value={form.capability}
                  onChange={(event) => update("capability", event.target.value)}
                  placeholder="Turning, milling, materials, and the kind of part you can hold to a drawing."
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
              {error ? <p className="mt-4 text-sm text-gold-deep">{error}</p> : null}
              <button
                type="submit"
                disabled={busy}
                className="mt-5 inline-flex min-h-11 items-center rounded-full bg-ink px-5 py-3 text-sm text-cream disabled:opacity-60"
              >
                {busy ? "Saving" : "Register interest"}
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
