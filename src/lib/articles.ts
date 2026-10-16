export type ArticleBucket = "sourcing" | "policy" | "macro";

export type Article = {
  slug: string;
  title: string;
  date: string;
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
      "A CIF quote from an Indian plant covers minimum cargo insurance, and with Hormuz disrupted, Gulf buyers should check whether war risk is included.",
    bucket: "sourcing",
    body: [
      "Plenty of Gulf POs for machined parts say CIF Jebel Ali. It feels safe, because the plant books the freight and buys the insurance. But under Incoterms 2020, risk passes to you once the goods are loaded on board in India.",
      "The insurance the plant buys under CIF only has to be minimum cover. Extra cover, such as war risk, generally has to be requested. If nobody asks, nobody adds it.",
      "That used to be a footnote. It isn't now. Ships have been hit and lost near Hormuz this month, and surcharges keep stacking up. One carrier's 7 October advisory added a USD 1,000 per container Hormuz fee, billed to the consignee.",
      "None of this needs a new contract. It needs one line in the RFQ. State the cover you expect, war risk included, and ask the plant to show it on the quote.",
      "The plant stays the exporter and books what you agreed. Getting the right cover is a matter of being specific in the RFQ. Incoterms choices and insurance terms change from deal to deal, so confirm yours with your advisor or forwarder.",
    ],
  },
  {
    slug: "what-a-power-cut-in-india-does-to-your-dispatch-date",
    title: "What a power cut in India does to your dispatch date",
    date: "2026-10-16",
    summary:
      "India's coal and gas squeeze can show up as a slipped dispatch date, so ask the plant how it's powered before you rely on the schedule.",
    bucket: "macro",
    body: [
      "By 10 October, nearly half of India's coal-fired power stations were below 25% of the coal stock they're meant to hold. Small steel mills were losing 10 to 12 hours of power a day.",
      "Gas didn't offer much relief. India's LNG tender prices reached USD 26.4 per mmBtu in September, up from USD 16.8 to 18.8 between March and June.",
      "None of that is in a quote you got last month. It can show up later as a dispatch date that quietly moves, or as a revised price on heat treatment.",
      "So before you rely on a schedule, ask the plant two things. Is it running on grid power or captive power? And what runs the furnace and the CNC line when the grid cuts?",
      "A plant that answers plainly, and builds a buffer into the date, is giving you something more useful than a tight promise. That's worth more than a few days on paper.",
    ],
  },
  {
    slug: "rodtep-ends-31-december-check-your-january-quotes",
    title: "RoDTEP ends on 31 December. Check your January quotes.",
    date: "2026-10-16",
    summary:
      "India's export duty remission scheme runs only to 31 December 2026, so any quote for parts shipping after that should say what it assumes.",
    bucket: "policy",
    body: [
      "India's RoDTEP scheme refunds some of the embedded taxes and duties on exported goods. Notification 41/2026-27, dated 30 September and announced by PIB on 2 October, extends it to 31 December 2026 at unchanged rates. Nothing has been notified beyond that date yet.",
      "That matters if your parts ship in January. Some plants build the expected remission into their price, and some don't. Either way is fine. The problem is not knowing which one you're looking at.",
      "If a plant quoted in September for a February dispatch, ask one plain question: does this price assume RoDTEP? If it does, ask what happens to the price if the scheme isn't extended. You want the answer in writing before the PO, not in an email after dispatch.",
      "The same goes for quote validity. A quote with no validity date is really just an opinion. Put a date on it, and put the assumptions next to it: material, energy and incentives.",
      "The plant is the exporter, so it claims the remission, and its pricing reflects its own view. Your job is to make sure that view is stated, so two quotes are answering the same question.",
      "Rules change, and extensions sometimes come late. Confirm the current position with your advisor before you rely on it.",
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
