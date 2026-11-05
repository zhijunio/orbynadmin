import { CatalogSections } from "@/components/custom/docs/catalog-sections";
import { TraceExample } from "@/components/custom/trace/trace-examples";

const sections = [
  { title: "Agent", description: "Streaming runs, citations, and approvals.", examples: [1, 2, 3, 4, 6, 7, 17, 18], stack: true, layout: "wide" as const, span: 2 as const },
  { title: "Changes", description: "CI, spans, errors, and pipeline events.", examples: [5, 8, 9, 10, 11], stack: true, layout: "wide" as const, span: 2 as const },
  { title: "Data", description: "Queries, imports, and operational traces.", examples: [12, 13, 14, 15, 16, 22], stack: true, layout: "wide" as const, span: 2 as const },
  { title: "Access", description: "Identity, audit, and policy review flows.", examples: [19, 20, 21], stack: true, layout: "wide" as const, span: 2 as const },
];

export function TraceCatalogExamples() {
  return <CatalogSections sections={sections} render={(example) => <TraceExample example={example} />} />;
}
