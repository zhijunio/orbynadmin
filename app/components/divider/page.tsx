import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { DividerCatalogExamples } from "@/app/components/divider/divider-catalog-examples";
import { PageHeader } from "@/components/custom/docs/page-header";
import { CatalogPageGrid } from "@/components/custom/docs/catalog-sections";

export const metadata = { title: "Divider" };

export default function DividerPage() {
  return (
    <AppShell>
      <div className="min-w-0 space-y-5">
        <PageHeader title="Divider" />
        <CatalogPageGrid>
          <DividerCatalogExamples />
        </CatalogPageGrid>
      </div>
    </AppShell>
  );
}
