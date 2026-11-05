import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { TraceCatalogExamples } from "@/app/components/trace/trace-catalog-examples";
import { PageHeader } from "@/components/custom/docs/page-header";
import { CatalogPageGrid } from "@/components/custom/docs/catalog-sections";

export const metadata = { title: "Trace" };

export default function TracePage() {
  return (
    <AppShell>
      <div className="min-w-0 space-y-5">
        <PageHeader title="Trace" />
        <CatalogPageGrid>
          <TraceCatalogExamples />
        </CatalogPageGrid>
      </div>
    </AppShell>
  );
}
