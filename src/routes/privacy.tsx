import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { SiteHeader } from "@/components/site-header";
import { pageMeta } from "@/lib/seo";

const TITLE = "Sourza — Privacy";
const DESCRIPTION =
  "How Sourza handles the personal details collected on its forms, under the UAE personal data and cybercrime laws.";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: pageMeta(TITLE, DESCRIPTION),
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <SiteHeader action={{ href: "/#introduction", label: "Request an introduction" }} />
      <main className="mx-auto max-w-3xl px-5 py-14 md:px-8 md:py-20">
        <p className="text-xs font-medium tracking-widest text-gold-deep uppercase">Privacy</p>
        <h1 className="mt-3 font-display text-4xl leading-tight text-ink-deep md:text-5xl">
          What we keep, and why.
        </h1>
        <p className="mt-4 text-sm text-soft">25 September 2026</p>
        <p className="mt-6 text-lg leading-relaxed text-muted">
          This notice is for anyone who sends a form on this site, or who types a question
          to the desk. It describes what Sourza actually does with that information. It is
          not a legal opinion.
        </p>

        <Section title="Who we are">
          <p>
            Sourza is the founding team behind this website. We use it to hear from buyers
            and from factories. We are the people who decide why your details are kept. In
            the language of the UAE personal data law, that makes us the controller of the
            details you send us.
          </p>
        </Section>

        <Section title="The UAE rules this follows">
          <p>
            Two federal laws matter when someone in the UAE sends us a form.
          </p>
          <p>
            Federal Decree-Law No. 45 of 2021 on the Protection of Personal Data has been in
            force since 2 January 2022. It says personal data is collected for a clear
            purpose, kept only as long as that purpose needs, protected from misuse, and
            not moved out of the country without a lawful ground. People can ask what is
            held, ask for a correction, and ask for it to be deleted or stopped.
          </p>
          <p>
            Federal Decree-Law No. 34 of 2021 on Countering Rumours and Cybercrimes makes it
            a criminal offence to take, keep, leak, copy, or process personal electronic
            data without permission, and to collect or process personal data of UAE
            nationals and residents in breach of the law in force. We only take what you
            type into a form, and only for the reason below.
          </p>
          <p>
            A company later licensed inside the Abu Dhabi Global Market would follow the
            ADGM data protection regulations for processing done there, rather than the
            federal personal data law. This notice will be updated if that happens. Until
            then, the federal law is the one we work to.
          </p>
        </Section>

        <Section title="What the forms collect">
          <p>The introduction form asks for your name, organisation, email, whether you buy or make, and a note.</p>
          <p>
            The factory form asks for the works name, where it is, a contact name, email,
            phone, whether you already export, what you can run, and a note.
          </p>
          <p>
            We do not ask for an Emirates ID, a passport, a bank account, or a card. Do not
            put health information, identity documents, or anyone else's private details in
            the note. A hidden field on each form is there to catch automated submissions.
            If that field is filled, the form is dropped and not stored.
          </p>
        </Section>

        <Section title="Why we keep it">
          <p>
            So the founding team can read the enquiry and write back, and so we can tell a
            buyer from a factory. We do not sell the details, we do not use them for
            advertising, and we do not feed them into an automated decision about you.
          </p>
          <p>
            Sending the form is how you ask us to hold the details for that purpose. You
            can withdraw that at any time by asking us to delete them.
          </p>
        </Section>

        <Section title="Where it is kept">
          <p>
            Form entries are stored in a database run by the company that hosts this
            website. That server may be outside the UAE. Under the personal data law, a
            transfer out of the UAE needs a lawful ground: adequate protection in the other
            country, a contract that carries the same protections, or another ground the
            law allows, including consent where consent is enough.
          </p>
          <p>
            By sending the form you agree we may store it on that host so we can reply,
            including if the server is outside the UAE. Access is limited to the founding
            team. We do not publish the entries.
          </p>
        </Section>

        <Section title="The chat">
          <p>
            A question you type to the desk is sent to xAI so a reply can be written. The
            chat is not saved in our database. Do not type a passport number, an identity
            number, or anything you would not say on an open call. The form entries are
            not sent to xAI.
          </p>
        </Section>

        <Section title="How long">
          <p>
            We keep a form while the conversation is open, and for up to 24 months after
            the last message, then we delete it. If you ask us to delete it sooner, we
            will, unless a law requires us to keep it.
          </p>
        </Section>

        <Section title="Who else sees it">
          <p>
            The host stores the database for us. xAI sees only the chat text, and only to
            write the reply. We do not pass the forms to a buyer, a plant, or a freight
            firm. We will disclose an entry if a competent authority in the UAE requires
            it under the law.
          </p>
        </Section>

        <Section title="If something goes wrong">
          <p>
            We take reasonable care to keep the entries from being read, changed, or lost:
            the site is served over an encrypted connection, and the database is not open
            to the public. If a breach is likely to harm you, we will tell you, and where
            the personal data law requires it we will also tell the UAE Data Office.
          </p>
        </Section>

        <Section title="What you can ask">
          <p>
            If the personal data law applies to you, including if you are in the UAE, you
            can ask us:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>what we hold about you, and why</li>
            <li>to correct something that is wrong</li>
            <li>to erase it, or to stop using it</li>
            <li>to object to the way it is used</li>
            <li>for a copy, where the law gives you that right</li>
          </ul>
          <p>
            Write through the introduction form on the home page and start the note with
            the word Privacy, or reply to any email we have sent you. Say which form you
            sent, and the email address you used. We will answer without undue delay. If
            you think we have handled this badly, you can also complain to the UAE Data
            Office.
          </p>
        </Section>

        <Section title="Children">
          <p>This site is not for anyone under 18. We do not knowingly keep a child's details.</p>
        </Section>

        <Section title="Changes">
          <p>
            If we change what we collect or why, we will change this page and the date at
            the top. The forms will keep pointing here.
          </p>
        </Section>
      </main>
      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-5 py-8 md:px-8">
          <a href="/" className="text-sm text-muted">
            Back to Sourza
          </a>
          <p className="text-sm text-soft">Indian plants. Gulf buyers. Specified parts.</p>
        </div>
      </footer>
    </div>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="font-display text-2xl text-ink-deep">{title}</h2>
      <div className="mt-3 space-y-3 leading-relaxed text-muted">{children}</div>
    </section>
  );
}
