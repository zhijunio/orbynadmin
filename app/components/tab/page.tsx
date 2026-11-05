import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { TabCatalogExamples } from "@/app/components/tab/tab-catalog-examples";
import { PageHeader } from "@/components/custom/docs/page-header";
import { CatalogPageGrid } from "@/components/custom/docs/catalog-sections";

export const metadata = { title: "Tab" };

export default function TabsPage() {
  return (
    <AppShell>
      <div className="min-w-0 space-y-5">
        <PageHeader title="Tab" />
        <CatalogPageGrid>
          <TabCatalogExamples />
        </CatalogPageGrid>
      </div>
    </AppShell>
  );
}
