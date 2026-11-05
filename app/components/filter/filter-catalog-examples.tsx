import { FilterExample } from "@/components/custom/filters/filter-examples";
import { CatalogSections } from "@/components/custom/docs/catalog-sections";

const sections = [
  { title: "Bar", description: "Condition chips in a horizontal filter bar.", examples: [1, 12], stack: true, layout: "wide" as const, span: 2 as const },
  { title: "Nested", description: "Grouped attributes and nested filter paths.", examples: [2, 10, 11], stack: true, layout: "wide" as const, span: 2 as const },
  { title: "Editors", description: "Popovers for dates, ranges, sliders, and choices.", examples: [3, 5, 6, 8, 9], stack: true, layout: "wide" as const, span: 2 as const },
  { title: "Results", description: "Apply filters to a table or saved view.", examples: [4, 7], stack: true, layout: "wide" as const, span: 2 as const },
];

export function FilterCatalogExamples() {
  return <CatalogSections sections={sections} render={(example) => <FilterExample example={example} />} />;
}
