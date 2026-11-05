import { CatalogSections } from "@/components/custom/docs/catalog-sections";
import { SpinnerExample } from "@/components/custom/spinner/spinner-examples";



const sections = [
  { title: "Default Usage", examples: [1, 9, 10, 12], columns: 3 as const },
  { title: "In Controls", examples: [2, 3, 4, 6], columns: 3 as const },
  { title: "Overlay", examples: [5, 7, 8, 11], columns: 2 as const, layout: "wide" as const, span: 2 as const },
];

export function SpinnerCatalogExamples() {
  return (
    <>
      <CatalogSections sections={sections} render={(example) => <SpinnerExample example={example} />} />
    </>
  );
}
