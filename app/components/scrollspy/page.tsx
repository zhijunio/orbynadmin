import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { ScrollspyCatalogExamples } from "@/app/components/scrollspy/scrollspy-catalog-examples";
import { PageHeader } from "@/components/custom/docs/page-header";
import { CatalogPageGrid } from "@/components/custom/docs/catalog-sections";

export const metadata = { title: "Scrollspy" };

export default function ScrollspyPage() {
  return (
    <AppShell>
      <div className="min-w-0 space-y-5">
        <PageHeader title="Scrollspy" />
        <CatalogPageGrid>
          <ScrollspyCatalogExamples />
        </CatalogPageGrid>
      </div>
    </AppShell>
  );
}
