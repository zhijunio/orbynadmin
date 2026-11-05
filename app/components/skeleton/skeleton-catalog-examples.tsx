import { SkeletonLoadingCatalogExample } from "@/app/components/skeleton/skeleton-loading-catalog-example";
import { CatalogGridItems } from "@/components/custom/docs/catalog-page-grid";
import { CatalogSections } from "@/components/custom/docs/catalog-sections";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { SkeletonExample } from "@/components/custom/skeleton/skeleton-examples";



const sections = [
  { title: "Text", examples: [1, 3, 7, 10], columns: 2 as const },
  { title: "Cards", examples: [2, 6, 8], columns: 2 as const },
  { title: "Pages", examples: [4, 5, 9], stack: true, layout: "wide" as const, span: 2 as const },
];

export function SkeletonCatalogExamples() {
  return (
    <CatalogGridItems>
      <CatalogSections sections={sections} render={(example) => <SkeletonExample example={example} label="Loading content" />} />
      <ComponentPreview title="States">
        <SkeletonLoadingCatalogExample />
      </ComponentPreview>
    </CatalogGridItems>
  );
}
