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
