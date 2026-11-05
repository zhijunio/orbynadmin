import { BadgeExample } from "@/components/custom/badge/badge-examples";
import { CatalogSections } from "@/components/custom/docs/catalog-sections";

const sections = [
  {
    title: "Colors",
    examples: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
    layout: "wide" as const,
    span: 2 as const,
  },
  {
    title: "Sizes",
    examples: [18, 19],
    stack: true,
    layout: "wide" as const,
    span: 2 as const,
  },
  {
    title: "Content Variants",
    examples: [20, 22, 24, 25],
    layout: "wide" as const,
    span: 2 as const,
  },
  {
    title: "Actions",
    examples: [21, 23],
    layout: "wide" as const,
    span: 2 as const,
  },
];

export function BadgeCatalogExamples() {
  return (
    <CatalogSections sections={sections} render={(example) => <BadgeExample example={example} />} />
  );
}
