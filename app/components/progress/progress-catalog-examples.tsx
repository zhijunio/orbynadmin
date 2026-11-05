import { CatalogSections } from "@/components/custom/docs/catalog-sections";
import { ProgressExample } from "@/components/custom/progress/progress-examples";



const sections = [
  { title: "Sizes", examples: [1, 2, 3, 8], columns: 2 as const },
  { title: "Status", examples: [4, 5, 7], stack: true, layout: "wide" as const, span: 2 as const },
  { title: "With Control", examples: [6], stack: true, layout: "wide" as const, span: 2 as const },
];

export function ProgressCatalogExamples() {
  return (
    <>
      <CatalogSections sections={sections} render={(example) => <ProgressExample example={example} />} />
    </>
  );
}
