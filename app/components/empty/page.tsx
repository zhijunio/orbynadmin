import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { EmptyCatalogExamples } from "@/app/components/empty/empty-catalog-examples";
import { PageHeader } from "@/components/custom/docs/page-header";
import { CatalogPageGrid } from "@/components/custom/docs/catalog-sections";

export const metadata = { title: "Empty State" };

export default function EmptyPage() {
  return (
    <AppShell>
      <div className="min-w-0 space-y-5">
        <PageHeader title="Empty State" />
        <CatalogPageGrid>
          <EmptyCatalogExamples />
        </CatalogPageGrid>
      </div>
    </AppShell>
  );
}
