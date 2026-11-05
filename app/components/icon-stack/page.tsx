import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { IconStackCatalogExamples } from "@/app/components/icon-stack/icon-stack-catalog-examples";
import { PageHeader } from "@/components/custom/docs/page-header";
import { CatalogPageGrid } from "@/components/custom/docs/catalog-sections";

export const metadata = { title: "Icon Stack" };

export default function IconStackPage() {
  return (
    <AppShell>
      <div className="min-w-0 space-y-5">
        <PageHeader title="Icon Stack" />
        <CatalogPageGrid>
          <IconStackCatalogExamples />
        </CatalogPageGrid>
      </div>
    </AppShell>
  );
}
