export type Article = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  bucket: "sourcing" | "policy" | "macro";
  body: string[];
};

export const ARTICLES: Article[] = [
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

export function getArticle(slug: string) {
  return ARTICLES.find((article) => article.slug === slug);
}

export function listArticles() {
  return [...ARTICLES].sort((a, b) => (a.date < b.date ? 1 : -1));
}
