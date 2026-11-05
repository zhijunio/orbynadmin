import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { ResizableCatalogExamples } from "@/app/components/resizable/resizable-catalog-examples";
import { PageHeader } from "@/components/custom/docs/page-header";
import { CatalogPageGrid } from "@/components/custom/docs/catalog-sections";

export const metadata = { title: "Resizable" };

export default function ResizablePage() {
  return (
    <AppShell>
      <div className="min-w-0 space-y-5">
        <PageHeader title="Resizable" />
        <CatalogPageGrid>
          <ResizableCatalogExamples />
        </CatalogPageGrid>
      </div>
    </AppShell>
  );
}
