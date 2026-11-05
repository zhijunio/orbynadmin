import { CatalogSections } from "@/components/custom/docs/catalog-sections";
import { SelectExample } from "@/components/custom/select/select-examples";



const sections = [
  { title: "Default Usage", layout: "wide" as const, span: 2 as const, examples: [1, 4, 15] },
  { title: "Sizes", layout: "wide" as const, span: 2 as const, examples: [5, 33] },
  { title: "Groups", layout: "wide" as const, span: 2 as const, examples: [3, 24] },
  { title: "Option Content", layout: "wide" as const, span: 2 as const, examples: [2, 6, 16, 17, 18, 19, 20, 23, 25, 26, 27, 28, 29, 30, 31, 32] },
  { title: "Field", layout: "wide" as const, span: 2 as const, examples: [8, 13, 14] },
  { title: "States", layout: "wide" as const, span: 2 as const, examples: [7, 9, 10, 21, 22] },
  { title: "Multiple", layout: "wide" as const, span: 2 as const, examples: [12] },
  { title: "In Dialog", layout: "wide" as const, span: 2 as const, examples: [11] },
];

export function SelectCatalogExamples() {
  return (
    <>
      <CatalogSections sections={sections} render={(example) => <SelectExample example={example} />} />
    </>
  );
}
