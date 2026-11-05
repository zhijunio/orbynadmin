import { ButtonGroupExample } from "@/components/custom/button-group/button-group-examples";
import { CatalogSections } from "@/components/custom/docs/catalog-sections";



const sections = [
  { title: "Groups", layout: "wide" as const, span: 2 as const, examples: [1, 5, 6, 23] },
  { title: "With Field", layout: "wide" as const, span: 2 as const, examples: [2, 16, 19, 20, 56] },
  { title: "Menu", layout: "wide" as const, span: 2 as const, examples: [4, 15, 17, 21, 51] },
  { title: "Split", layout: "wide" as const, span: 2 as const, examples: [18, 39] },
  { title: "Selection", layout: "wide" as const, span: 2 as const, examples: [12, 24, 25, 26, 27, 32, 33, 34, 36, 41, 42, 43, 44, 45, 46, 54, 57] },
  { title: "Orientation", layout: "wide" as const, span: 2 as const, examples: [13, 14, 40, 49] },
  { title: "Adornments", layout: "wide" as const, span: 2 as const, examples: [3, 7, 8, 29, 30, 31] },
  { title: "Pagination", layout: "wide" as const, span: 2 as const, examples: [10, 11, 35] },
  { title: "Nested", layout: "wide" as const, span: 2 as const, examples: [9] },
  { title: "States", layout: "wide" as const, span: 2 as const, examples: [22] },
  { title: "Toolbars", layout: "wide" as const, span: 2 as const, examples: [28, 37, 38, 47, 48, 50, 52, 53, 55] },
];

export function ButtonGroupCatalogExamples() {
  return (
    <>
      <CatalogSections sections={sections} render={(example) => <ButtonGroupExample example={example} />} />
    </>
  );
}
