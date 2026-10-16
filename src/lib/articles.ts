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
    slug: "plant-stays-the-exporter",
    title: "The plant stays the exporter",
    date: "2026-10-16",
    summary:
      "On India to Gulf machined parts the factory remains the exporter. Sourza does not take title, book the freight, or become the payee.",
    bucket: "sourcing",
    body: [
      "A buyer in the Gulf already knows the part. The hard bit is finding an Indian plant that can make it, and then keeping the commercial path clean.",
      "The plant quotes, the plant invoices, the plant ships. Sourza reads the requirement into a brief, invites a short list, and puts the quotes on one page. After the decision the plant still makes and exports the goods.",
      "Default terms are 30/70 TT. A letter of credit when the bank or the order size asks for it. Escrow is only an optional layer on a first order, and the plant remains the payee. We do not hold funds.",
      "That keeps the file simple. No change of title, no extra party on the shipping documents, no second set of bank instructions. The buyer has a second source they can stand behind. The plant keeps the customer.",
      "If the order later needs freight or a different payment rail, those sit as software seats on the same file. Sourza still does not book the shipment or take the money.",
    ],
  },
  {
    slug: "missing-tolerance-cost",
    title: "What a missing tolerance actually costs",
    date: "2026-10-14",
    summary:
      "A diameter without a tolerance is not a quoteable brief. The gap stays visible so no plant is asked to guess.",
    bucket: "sourcing",
    body: [
      "A shaft arrives with a diameter stated and no tolerance. One plant can mill it but will not price without the tolerance. Another can turn and grind it and asks for the number before quoting.",
      "The brief keeps the gap. It does not fill it with a guess. The buyer sees the question. The plants see the same question. When the answer comes back it is written into the brief before anyone is invited again.",
      "Guessing a tolerance to get a price is how cover quotes start. The plant that guessed high looks expensive. The plant that guessed low cannot hold it. The file then has to be reopened.",
      "Sourza leaves the gap on the page. The comparison stays honest. The next time a similar shaft comes in, the file already knows what the buyer answered last time.",
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

export function getArticle(slug: string) {
  return ARTICLES.find((article) => article.slug === slug);
}

export function listArticles() {
  return [...ARTICLES].sort((a, b) => (a.date < b.date ? 1 : -1));
}
