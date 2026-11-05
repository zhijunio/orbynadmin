import { CatalogSections } from "@/components/custom/docs/catalog-sections";
import { TableExample } from "@/components/custom/table/table-examples";

const tableExampleLabels: Record<number, string> = {
  1: "Basic table",
  2: "Table with footer",
  3: "Table in card with status badges",
  4: "Table card with actions column",
  5: "Table with interactive elements",
  6: "Team members table",
  7: "Orders table",
  14: "Issues table",
  16: "Vertical employee profile",
};

const sections = [
  { title: "Basic", description: "Simple data tables, footers, and inline controls.", examples: [1, 2, 5], stack: true, layout: "wide" as const, span: 2 as const },
  { title: "Actions", description: "Row actions and status badges in a card frame.", examples: [3, 4], stack: true, layout: "wide" as const, span: 2 as const },
  { title: "Records", description: "Common admin row patterns with avatars and metadata.", examples: [6, 7, 14], stack: true, layout: "wide" as const, span: 2 as const },
  { title: "Vertical", description: "Label-value rows for detail panels.", examples: [16], stack: true, layout: "wide" as const, span: 2 as const },
];

export function TableCatalogExamples() {
  return (
    <CatalogSections
      sections={sections}
      exampleLabel={(example) => tableExampleLabels[example]}
      render={(example) => <TableExample example={example} />}
    />
  );
}
