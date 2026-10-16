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
];

export function getArticle(slug: string) {
  return ARTICLES.find((article) => article.slug === slug);
}

export function listArticles() {
  return [...ARTICLES].sort((a, b) => (a.date < b.date ? 1 : -1));
}
