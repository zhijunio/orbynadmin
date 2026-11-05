import { GanttExample } from "@/components/custom/gantt/gantt-examples";
import { CatalogSections } from "@/components/custom/docs/catalog-sections";

const sections = [
  { title: "Rows", description: "Task rows and grouping in the timeline.", examples: [1, 2, 5], stack: true, layout: "wide" as const, span: 2 as const, columns: 2 as const },
  { title: "Timeline", description: "Zoom levels and date headers.", examples: [3, 4], stack: true, layout: "wide" as const, span: 2 as const, columns: 2 as const },
  { title: "Tracking", description: "Dependencies and progress overlays.", examples: [6, 7], stack: true, layout: "wide" as const, span: 2 as const },
];

export function GanttCatalogExamples() {
  return <CatalogSections sections={sections} render={(example) => <GanttExample example={example} />} />;
}
