export type ArticleBucket = "sourcing" | "policy" | "macro";

export type Article = {
  slug: string;
  title: string;
  date: string;
  /** Last substantive edit (YYYY-MM-DD); defaults to `date`. */
  updated?: string;
  summary: string;
  bucket: ArticleBucket;
  /**
   * Paragraphs. A string starting with "## " renders as an H2 subheading.
   * Inline [text](url) renders as a link (http(s), site-relative "/..." or "#...").
   * Plain strings render exactly as before.
   */
  body: string[];
  /**
   * Hero + share-card image, a site path like `/images/articles/<slug>.jpg`
   * (1200x630 JPG in public/images/articles/). Optional: without it the page
   * shows no hero and the share card falls back to the site-wide /og.jpg.
   */
  image?: string;
  /** Plain description of `image` for screen readers. Set whenever `image` is set. */
  imageAlt?: string;
};

export const ARTICLES: Article[] = [
  {
    slug: "how-to-compare-machined-parts-quotes-from-indian-plants",
    title: "How to compare machined parts quotes from Indian plants",
    date: "2026-10-28",
    summary:
      "Two quotes for the same machined part only compare once they name the same drawing revision, material grade, Incoterm, currency and validity date.",
    bucket: "sourcing",
    image: "/images/articles/how-to-compare-machined-parts-quotes-from-indian-plants.jpg",
    imageAlt: "Two printed quotes side by side on a desk next to a machined steel flange",
    body: [
      "Two quotes for the same machined part only compare once they name the same drawing revision, material grade, Incoterm, currency and validity date. Until they do, the lower total may be pricing a different job. So line the quotes up row by row before you look at the bottom line.",
      "## Are the quotes pricing the same part?",
      "Start with the drawing revision each quote names. A price on Rev B and a price on Rev C are two parts. Then the material: one plant quotes the grade you named, another quotes an equivalent. Note it, and decide in writing whether you accept it. Then heat treatment, surface finish and documents. A quote that includes a mill test certificate to EN 10204 3.1 and a dimensional report is pricing more work than one that says nothing ([our mill test certificate guide](https://sourza.com/resources/mill-test-certificates-ask-for-en-10204-3-1-in-the-rfq)). Silence isn't a no. Ask. If your RFQ left a point open, each plant filled it with its own assumption; [our RFQ guide](https://sourza.com/resources/rfq-for-machined-parts-what-to-put-in-it-before-you-send) covers closing those gaps before the quotes come back.",
      "## Which Incoterm and currency is each quote in?",
      "An ex-works price and a CIF Jebel Ali price are not the same number written two ways. The Incoterm decides who pays which costs up to which point, and under Incoterms 2020 each rule lists its costs in one place, articles A9 and B9 ([ICC Incoterms 2020](https://iccwbo.org/business-solutions/incoterms-rules/incoterms-2020/)). Put every quote on the same rule and the same named place, or ask the plant to requote. Under CIF, the default insurance is Institute Cargo Clauses (C) unless you agree higher cover (same ICC page; [our note on CIF and war risk](https://sourza.com/resources/under-cif-war-risk-is-yours-to-ask-for)). Then currency. A rupee quote and a dirham quote drift apart as the rate moves, so write down which currency each is in and the date you converted at. Payment terms go in the same row: compare on the same terms, for example 30/70 TT.",
      "## How long is each quote valid, and what moves the price?",
      "Every quote should carry a validity date. If one doesn't, ask for it before you count that quote. Then read what the plant says can move the price inside that window: material, freight, exchange rate. A price that holds for a short window with no conditions and a price that holds longer but resets with material cost are different offers. Lead time belongs here too. Check whether the weeks count from the PO, from drawing approval or from receipt of the advance. Three plants can quote the same number of weeks and start three different clocks.",
      "## Who owns tooling and fixtures, and is it priced in?",
      "One plant puts fixtures, special tooling or programming into a one-time charge. Another spreads it across the unit price. Neither is wrong. But a lower unit price plus a tooling charge can cost more at your quantity than a higher unit price without one, so add them up at the quantity you'll actually order. Do the same for first-article or sample charges. Then ask who owns the fixture once it's paid for, where it's kept, and whether it comes to you if the part moves. Put the answer in the PO.",
      "In short: Two quotes for the same machined part only compare once they name the same drawing revision, material grade, Incoterm, currency and validity date. Add tooling and one-time charges at your real quantity before you compare totals.",
      "Got a part you're trying to source? Send us the drawing or a plain description and we'll turn it into a brief. [Tell us about your part](https://sourza.com/#introduction)",
    ],
  },
  {
    slug: "cepa-certificate-of-origin-for-exports-to-the-uae-step-by-step",
    title: "CEPA certificate of origin for UAE exports: a step-by-step guide for Indian plants",
    date: "2026-10-26",
    summary:
      "Under the India–UAE CEPA, the plant applies for the CEPA certificate of origin on DGFT's eCoO 2.0 system, with a current IEC and a Class III DSC.",
    bucket: "policy",
    image: "/images/articles/cepa-certificate-of-origin-for-exports-to-the-uae-step-by-step.jpg",
    imageAlt: "Machined steel flange resting on a stack of export documents beside a stamp and a laptop on an office desk",
    body: [
      "Under the India–UAE CEPA, the plant, as exporter, applies for the CEPA certificate of origin online, through DGFT's eCoO 2.0 system on the [government trade portal](https://www.trade.gov.in/). The UAE importer then presents it at clearance to claim the preferential rate. The certificate only holds if the part meets the rule of origin for its HS code, and the plant's own records show it. Rules change; confirm with your advisor.",
      "## What does a plant need before the first application?",
      "Three things. An Importer Exporter Code (IEC) with a current email and mobile number in the DGFT system, because the registration password goes to the IEC holder and branch details fill in from the IEC record. A Class III digital signature certificate (DSC), the same one used for other DGFT applications ([DGFT Trade Notice 05/2022-23](https://content.dgft.gov.in/Website/dgftprod/b603f8eb-91c3-4bba-b37e-ad33d6e7f855/Trade%20Notice%2005%20-%20India%20UAE%20CEPA%20go-live.pdf)). And a registration on eCoO 2.0. Since 17 January 2025, CEPA certificates of origin are filed there, and the old platform at coo.dgft.gov.in takes no new applications under the preferential scheme ([DGFT notice](https://coo.dgft.gov.in/), [Trade Notice 24/2024-25](https://content.dgft.gov.in/Website/dgftprod/6078e80d-9233-4092-a92b-838e0870ef8e/Rescheduling%20of%20Launch%20Date%20for%20Preferential%20eCoO%202.0%20System-reg..pdf)).",
      "## How does a plant check that the part qualifies?",
      "Start with the HS code at six digits, [agreed with the buyer before the PO](https://sourza.com/resources/rfq-for-machined-parts-what-to-put-in-it-before-you-send). The agreement gives two routes: wholly obtained in India, or meeting the product-specific rule for that HS code (Article 3.2, [CEPA text](https://www.eicindia.gov.in/WebApp1/resources/PDF/India-UAE%20Comprehensive%20Economic%20Partnership%20Agreement.pdf)). A part machined from imported bar is not wholly obtained. So the product-specific rule decides, and depending on the code it may ask for a change in tariff classification, a minimum value content, or both. Work it out per part, not per plant. Two parts off the same line can sit under different rules.",
      "## What goes into the application?",
      "On the platform, the plant chooses the preferential scheme, the India–UAE CEPA, a normal certificate and the issuing agency. Then it enters exporter details, the product with its HS code, the raw materials with their country of origin, and the description of goods. The commercial invoice is a mandatory upload ([Noida SEZ procedure](https://www.nsez.gov.in/Resources/Trade/Documents%20for%20COO%20issuance%20UAE.pdf)). It signs with the DSC and submits. Screens on eCoO 2.0 may differ from older guides, so follow the help manual on the portal. Behind the form sits the cost breakup per consignment: inputs, their origin, their value. The agreement asks for supporting records to be kept for five years (Article 3.19).",
      "## What should match across the shipping documents?",
      "The description, quantity and HS code should read the same on the invoice, the packing list, the shipping bill and the certificate. \"Machined components\" on one and \"shafts\" on another is defensible each time and a query when read together. Send the buyer a copy of the certificate with the invoice and packing list before the vessel sails, so their broker can check the UAE side early. The plant knows its own costing best. The point is only that the buyer sees the same story on every page.",
      "In short: Under the India–UAE CEPA, the plant applies for the CEPA certificate of origin on DGFT's eCoO 2.0 system, with a current IEC and a Class III DSC. Check the product-specific rule for the HS code first, and keep the cost records for five years.",
      "Make machined parts for export to the Gulf? Tell us about your plant and how you work. [Tell us about your plant](https://sourza.com/#introduction)",
    ],
  },
  {
    slug: "rfq-for-machined-parts-what-to-put-in-it-before-you-send",
    title: "RFQ for machined parts: what to include before you send",
    date: "2026-10-23",
    summary:
      "An RFQ for machined parts should name what's checked on arrival: tolerances, finish, grade, heat treatment, documents, packing and the Incoterm.",
    bucket: "sourcing",
    image: "/images/articles/rfq-for-machined-parts-what-to-put-in-it-before-you-send.jpg",
    imageAlt: "Machined steel shaft and caliper resting on an engineering drawing on a workshop bench",
    body: [
      "An RFQ for machined parts should name what's checked on arrival: tolerances, finish, grade, heat treatment, documents, packing and the Incoterm. Leave one out and each plant fills the gap with its own assumption. The quotes come back. They just don't answer the same question.",
      "## What goes on the technical side of the RFQ?",
      "Start with the drawing and its revision letter. Then tolerances. \"As per standard\" means different things in different shops, so name the general tolerance you mean, for example ISO 2768-m, and mark the two or three features that actually matter, with a datum where position or runout counts. Give surface finish as an Ra value on the faces that seal, slide or mate. Give material as a grade under a named standard, not \"SS\" or \"alloy steel\", and say whether an equivalent grade needs your written approval. Give heat treatment as condition and hardness range, and say whether it comes before or after finish machining. That changes the process route, not just the price.",
      "## Which documents and packing should the RFQ name?",
      "Documents cost the plant time and money, so they belong in the RFQ, not the PO. Name the certificate: a mill test certificate to EN 10204 3.1, heat number traceable to each part ([our mill test certificate guide](https://sourza.com/resources/mill-test-certificates-ask-for-en-10204-3-1-in-the-rfq) covers why). Say what dimensional report you want: how many pieces, measured values on which features. Say if there's third-party inspection. Then packing: VCI wrap or oil, crate type, ISPM 15 treated wood ([IPPC standard](https://www.ippc.int/en/core-activities/standards-setting/ispms/)) for any wooden packaging, maximum weight per crate, part number on each crate. Carbon steel can rust on a humid sea leg. If you want protection, write it down.",
      "## What commercial terms should the RFQ state?",
      "State the quantity and any price break you want quoted, say 200 pieces with a price at 500. State the Incoterm with its place and version, for example CIF Jebel Ali, Incoterms 2020, because it decides who books the freight and the insurance. State payment terms, for example 30/70 TT. Give a required-at-site date, not \"ASAP\", and name one person for technical questions. If you can't decide something yet, say so. \"Finish on non-functional faces: plant's standard, please state\" turns a guess into a stated assumption you can compare.",
      "## Why does a longer RFQ get a firm price sooner?",
      "A careful plant quotes what it can prove at inspection. Faced with a gap, its estimator either prices in a contingency or sends a question and waits. Each question is a round of email across a time difference. If six points are open and each takes a working day to answer, that's more than a week before a firm price exists. A complete RFQ can be priced in one sitting. And it still doesn't tell the plant how to machine the part. That stays the plant's call.",
      "In short: An RFQ for machined parts should name what's checked on arrival: tolerances, finish, grade, heat treatment, documents, packing and the Incoterm. Where you can't decide yet, ask the plant to state its assumption.",
      "Got a part you're trying to source? Send us the drawing or a plain description and we'll turn it into a brief. [Tell us about your part](https://sourza.com/#introduction)",
    ],
  },
  {
    slug: "mill-test-certificates-ask-for-en-10204-3-1-in-the-rfq",
    title: "Mill test certificates: ask for EN 10204 3.1 in the RFQ",
    date: "2026-10-21",
    summary:
      "An RFQ that says \"MTC required\" doesn't say which certificate, so name EN 10204 3.1 and ask for the heat number to trace to each part.",
    bucket: "sourcing",
    image: "/images/articles/mill-test-certificates-ask-for-en-10204-3-1-in-the-rfq.jpg",
    imageAlt: "Machined steel shaft and flange beside a blank inspection certificate on a workshop bench",
    body: [
      "Name the certificate in the RFQ: EN 10204 3.1, with the heat number traceable to each part. \"MTC required\" alone can be met four different ways. EN 10204 is the European standard for inspection documents on metal products, and a mill test certificate (MTC) is usually issued to one of its four types.",
      "## EN 10204 2.1 vs 2.2 vs 3.1 vs 3.2: what's the difference?",
      "A 2.1 declares the material meets the order, with no test results. A 2.2 adds results, but from the mill's routine testing, not necessarily on the material you're getting. A 3.1 gives results from tests on the material actually supplied, validated by an inspection representative independent of production. A 3.2 is that, plus your inspector or one named by regulation (EN 10204:2004, clauses 3 and 4).",
      "## Why does \"MTC required\" cause problems at dispatch?",
      "So a plant can meet \"MTC required\" with a 2.2, honestly, and it still isn't what your end customer's QA expected. That usually comes out at dispatch, or when the parts reach site. Then it's a document chase across two time zones, or a re-order. A 3.2 is a bigger ask again. It needs an outside inspector involved, so it has to be agreed before the material is bought, and quoted for.",
      "## How does traceability work when the plant isn't the mill?",
      "The plant usually isn't the mill. It buys bar from a mill or a stockist and machines it. The standard covers that: whoever passes the material on hands over the original certificate or a copy, unaltered, with a way to trace product to paper (clause 6). In practice that's the heat number. It should be on the certificate, on the bar, and on the plant's route card after cutting. Ask how the plant keeps that link once the bar is in pieces. A plant with a working system can walk you through it quickly. If it heat-treats, ask for that record too.",
      "## What should the RFQ line say?",
      "One line in the RFQ settles most of it: \"Mill test certificate to EN 10204 3.1 from the mill, heat number traceable to each part, copy with the dispatch documents.\" Then every plant quotes the same paper. The plant stays the exporter and issues its own documents. Your job is to say which ones you need before the PO, not after.",
      "In short: an RFQ that says \"MTC required\" doesn't say which certificate, so name EN 10204 3.1 and ask for the heat number to trace to each part. A 3.2 needs an outside inspector, so agree it before the material is bought.",
    ],
  },
  {
    slug: "under-cif-war-risk-is-yours-to-ask-for",
    title: "Under CIF, war risk is yours to ask for",
    date: "2026-10-16",
    summary:
      "A CIF quote from an Indian plant only has to carry Institute Cargo Clauses (C) cover, so Gulf buyers need to ask for war risk by name.",
    bucket: "sourcing",
    image: "/images/articles/under-cif-war-risk-is-yours-to-ask-for.jpg",
    imageAlt: "Container ship at anchor off a Gulf port at dusk",
    body: [
      "Many Gulf POs for machined parts say CIF Jebel Ali. It feels safe. The plant books the freight and buys the insurance. But under Incoterms 2020, risk passes to you once the goods are on board in India.",
      "Under CIF, the plant only has to buy minimum cover: Institute Cargo Clauses (C). That's the narrowest standard cover. War and strikes are not in it. They generally have to be requested. If nobody asks, nobody adds them.",
      "That used to be a footnote. It isn't now. Shipping near Hormuz has been disrupted this month.",
      "None of this needs a new contract. It needs one line in the RFQ: \"Quote CIF Jebel Ali with Institute War Clauses and Strikes Clauses (Cargo) added, and name the cover and insurer on the quote.\"",
      "The plant stays the exporter and books what you agreed. Getting the right cover is a matter of being specific. Insurance terms change from deal to deal, so confirm yours with your advisor or forwarder.",
    ],
  },
  {
    slug: "what-a-power-cut-in-india-does-to-your-dispatch-date",
    title: "India power shortage 2026: what it means for dispatch dates",
    date: "2026-10-16",
    summary:
      "India's power-station coal shortage can turn into a slipped dispatch date, so ask the plant how it's powered before you rely on the schedule.",
    bucket: "macro",
    image: "/images/articles/what-a-power-cut-in-india-does-to-your-dispatch-date.jpg",
    imageAlt: "CNC machines on a dimly lit machining shop floor",
    body: [
      "On 8 October, 87 of the 191 coal-fired power stations tracked by the Central Electricity Authority held less than 25% of the coal stock they're meant to hold. That's nearly half (CEA daily coal stock report, 8 Oct 2026).",
      "None of that is in a quote you got last month. It can show up later, as a dispatch date that quietly moves or a revised price on heat-intensive steps.",
      "So before you rely on a schedule, ask the plant two things. First: is it on grid power or captive power? Second: what runs the furnace and the CNC line when the grid cuts?",
      "A plant that answers plainly and builds a buffer into the date is giving you more than a tight promise. That's worth more than a few days on paper.",
    ],
  },
  {
    slug: "rodtep-ends-31-december-check-your-january-quotes",
    title: "RoDTEP ends on 31 December. Check your January quotes.",
    date: "2026-10-16",
    summary:
      "RoDTEP is only notified to 31 December 2026, so ask any Indian plant quoting for January dispatch whether its price assumes the remission.",
    bucket: "policy",
    image: "/images/articles/rodtep-ends-31-december-check-your-january-quotes.jpg",
    imageAlt: "Export documents, a desk calendar and machined parts on a desk",
    body: [
      "India's RoDTEP scheme refunds some of the embedded taxes and duties on exported goods. DGFT Notification 41/2026-27, dated 30 September 2026, extends it to 31 December 2026 at unchanged rates and value caps. PIB announced it on 2 October (https://www.pib.gov.in/PressReleasePage.aspx?PRID=2318052). Nothing has been notified beyond that date yet. Last checked: 16 Oct 2026.",
      "That matters if your parts ship in January. Some plants may build the expected remission into their price. Others may not. Either is fine. Not knowing which one you're looking at is the problem.",
      "If a plant quoted in September for a February dispatch, ask one plain question. Does this price assume RoDTEP? If it does, ask what happens to the price if the scheme isn't extended. Get the answer in writing before the PO, not in an email after dispatch.",
      "Same goes for quote validity. A quote with no validity date is an opinion. Put a date on it, and put the assumptions next to it: material, energy, incentives.",
      "The plant is the exporter, so it claims the remission, and its pricing reflects its own view. Your job is to make sure that view is stated, so two quotes answer the same question. Rules change; confirm with your advisor before you rely on the current position.",
    ],
  },
];

export const BUCKETS: ArticleBucket[] = ["sourcing", "policy", "macro"];

export function getArticle(slug: string) {
  return ARTICLES.find((article) => article.slug === slug);
}

export function listArticles() {
  return [...ARTICLES].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function readingTime(article: Article) {
  const words = [article.title, article.summary, ...article.body]
    .join(" ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

export function getRelatedArticles(slug: string, limit = 5) {
  const current = getArticle(slug);
  if (!current) return [];

  const others = listArticles().filter((article) => article.slug !== slug);
  const sameBucket = others.filter((article) => article.bucket === current.bucket);
  const otherBuckets = others.filter((article) => article.bucket !== current.bucket);

  return [...sameBucket, ...otherBuckets].slice(0, limit);
}

export function getAdjacentArticles(slug: string) {
  const ordered = listArticles();
  const index = ordered.findIndex((article) => article.slug === slug);
  if (index < 0) return { prev: null, next: null };

  return {
    prev: ordered[index + 1] ?? null,
    next: ordered[index - 1] ?? null,
  };
}
