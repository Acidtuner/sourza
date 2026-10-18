export type ArticleBucket = "sourcing" | "policy" | "macro";

export type Article = {
  slug: string;
  title: string;
  date: string;
  /** Last substantive edit (YYYY-MM-DD); defaults to `date`. */
  updated?: string;
  summary: string;
  bucket: ArticleBucket;
  body: string[];
};

export const ARTICLES: Article[] = [
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
