import { DataGridExample, type DataGridExampleId } from "@/components/custom/data-grid/data-grid-examples";
import { CatalogSections } from "@/components/custom/docs/catalog-sections";

const exampleLabels: Record<DataGridExampleId, string> = {
  1: "Compact and striped appearance",
  2: "Selection, expansion, and row reordering",
  3: "Sorting, resizing, and pinning columns",
  4: "Sticky header with aggregate footer",
  5: "Loading state",
  6: "Infinite scrolling",
  7: "Inline editing, create, and delete",
  8: "Remote filtering and pagination",
  9: "Row and column virtualization",
};

const sections = [
  { title: "Appearance", examples: [1], stack: true, layout: "fullBleed" as const, span: 2 as const },
  { title: "Interactions", description: "Select, expand, and move rows. Click headers to sort, drag an edge to resize, or use its menu to pin columns.", examples: [2, 3], stack: true, layout: "fullBleed" as const, span: 2 as const },
  { title: "Header and Footer", examples: [4], stack: true, layout: "fullBleed" as const, span: 2 as const },
  { title: "Loading and Scrolling", description: "Scroll to append rows automatically; use Load more as a manual fallback.", examples: [5, 6], stack: true, layout: "fullBleed" as const, span: 2 as const },
  { title: "Editing", description: "Press Enter to save or Escape to cancel an edit.", examples: [7], stack: true, layout: "fullBleed" as const, span: 2 as const },
  { title: "Remote Data", description: "Async search, sorting, and paging against a local mock source.", examples: [8], stack: true, layout: "fullBleed" as const, span: 2 as const },
  { title: "Virtualization", description: "Windowed rows and columns for a long, wide dataset.", examples: [9], stack: true, layout: "fullBleed" as const, span: 2 as const },
];

function isExampleId(value: number): value is DataGridExampleId {
  return Number.isInteger(value) && value >= 1 && value <= 9;
}

export function DataGridCatalogExamples() {
  return (
    <CatalogSections
      sections={sections}
      exampleLabel={(example) => isExampleId(example) ? exampleLabels[example] : undefined}
      render={(example) => isExampleId(example) ? <DataGridExample example={example} /> : null}
    />
  );
}
