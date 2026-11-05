import { CatalogGridItems } from "@/components/custom/docs/catalog-page-grid";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { KanbanDemo } from "@/app/components/kanban/kanban-catalog-demos";

const showcase = [
  { title: "Task Board with Placeholder Overlay", index: 0, span: 2 as const },
  { title: "Task Board with Drag Overlay", index: 1, span: 2 as const },
  { title: "Frame Columns and Status Icons", index: 2 },
  { title: "Stacked Frame Columns", index: 3, span: 2 as const },
  { title: "Roadmap with Progress", index: 4, span: 2 as const },
  { title: "Persisted Moves with Rollback", index: 5, span: 2 as const, description: "Failed saves restore the previous board order." },
];

export function KanbanCatalogExamples() {
  return (
    <CatalogGridItems>
      {showcase.map((item) => (
        <ComponentPreview key={item.title} title={item.title} description={item.description} layout="wide" span={item.span ?? 1}>
          <KanbanDemo index={item.index} />
        </ComponentPreview>
      ))}
    </CatalogGridItems>
  );
}
