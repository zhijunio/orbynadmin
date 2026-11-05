import { AvatarExample } from "@/components/custom/avatar/avatar-examples";
import { CatalogSections } from "@/components/custom/docs/catalog-sections";

const sections = [
  { title: "Appearance", examples: [1, 2, 4, 14, 15, 17], stack: true, layout: "wide" as const, span: 2 as const },
  { title: "Sizes", examples: [3, 5], stack: true, layout: "wide" as const, span: 2 as const },
  { title: "Status", examples: [6, 7, 8, 9, 31, 32, 33, 34], stack: true, layout: "wide" as const, span: 2 as const },
  { title: "Group", examples: [10, 11, 12, 13, 18, 20, 21, 22, 23, 24, 25], stack: true, layout: "wide" as const, span: 2 as const },
  { title: "With Details", examples: [16, 19, 26, 27, 28, 29, 35], stack: true, layout: "wide" as const, span: 2 as const },
  { title: "States", examples: [30], stack: true, layout: "wide" as const, span: 2 as const },
];

export function AvatarCatalogExamples() {
  return (
    <CatalogSections sections={sections} render={(example) => <AvatarExample example={example} />} />
  );
}
