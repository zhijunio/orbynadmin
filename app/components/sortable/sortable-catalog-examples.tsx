"use client";

import { CatalogGridItems } from "@/components/custom/docs/catalog-page-grid";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { SortableDemo } from "@/app/components/sortable/sortable-catalog-demos";


const showcase = [
  { title: "File List Rows", index: 0 },
  { title: "Grid Cards", index: 1 },
  { title: "Grouped Lists", index: 2, span: 2 as const },
  { title: "Playlist Frame", index: 3, layout: "panel" as const },
  { title: "Notification Priority", index: 4, layout: "panel" as const },
  { title: "Sidebar Navigation", index: 5, layout: "field" as const },
  { title: "Image Gallery Grid", index: 6, span: 2 as const, layout: "wide" as const },
  { title: "Persisted Reorder", index: 7, layout: "panel" as const, description: "Failed saves restore the previous order." },
];

export function SortableCatalogExamples() {
  return (
    <CatalogGridItems>
      {showcase.map((item) => (
        <ComponentPreview key={item.title} title={item.title} description={item.description} layout={item.layout ?? "panel"} span={item.span ?? 1}>
          <SortableDemo index={item.index} />
        </ComponentPreview>
      ))}
    </CatalogGridItems>
  );
}
