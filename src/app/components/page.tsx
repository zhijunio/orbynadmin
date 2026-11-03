import { CatalogIndex } from "@/components/custom/docs/catalog-index";

const items = [
  { title: "Charts", href: "/components/charts/bar" },
  { title: "Maps", href: "/components/maps" },
  { title: "Buttons", href: "/components/button" },
];

export default function ComponentsPage() {
  return <CatalogIndex title="Components" items={items} />;
}
