import { AlertExample } from "@/components/custom/alert/alert-examples";
import { CatalogSections } from "@/components/custom/docs/catalog-sections";



const sections = [
  { title: "Variants", examples: [1, 5, 6, 7, 8, 9], stack: true, layout: "wide" as const, span: 2 as const },
  { title: "Icon", examples: [2, 3], stack: true, layout: "wide" as const, span: 2 as const },
  { title: "Actions", examples: [10, 11], stack: true, layout: "wide" as const, span: 2 as const },
  { title: "Frame", examples: [12, 13, 14], stack: true, layout: "wide" as const, span: 2 as const },
  { title: "Content Variants", examples: [4, 15, 16, 17, 18, 19, 20], stack: true, layout: "wide" as const, span: 2 as const },
];

export function AlertCatalogExamples() {
  return (
    <>
      <CatalogSections sections={sections} render={(example) => <AlertExample example={example} />} />
    </>
  );
}
