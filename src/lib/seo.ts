export const HOME_TITLE = "Sourza — Find the plant for a specified part";
export const HOME_DESCRIPTION =
  "Sourza finds verified Indian plants that can make a specified part for buyers in the UAE and the Gulf, and puts the quotes side by side. Machined parts first.";

export const PLANTS_TITLE = "Sourza — Register an Indian factory";
export const PLANTS_DESCRIPTION =
  "Factories in India can register with Sourza to quote machined parts for buyers in the UAE and the Gulf. You stay the exporter.";

export function pageMeta(title: string, description: string) {
  return [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:image", content: "/og.jpg" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: "/og.jpg" },
  ];
}
