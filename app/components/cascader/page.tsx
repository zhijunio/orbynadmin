import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { CascaderCatalogExamples } from "@/app/components/cascader/cascader-catalog-examples";
import { PageHeader } from "@/components/custom/docs/page-header";
import { CatalogPageGrid } from "@/components/custom/docs/catalog-sections";

export const metadata = { title: "Cascader" };

export default function CascaderPage() {
  return (
    <AppShell>
      <div className="min-w-0 space-y-5">
        <PageHeader title="Cascader" />
        <CatalogPageGrid>
          <CascaderCatalogExamples />
        </CatalogPageGrid>
      </div>
    </AppShell>
  );
}
