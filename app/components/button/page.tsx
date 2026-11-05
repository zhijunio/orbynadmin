import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { ButtonCatalogExamples } from "@/app/components/button/button-catalog-examples";
import { PageHeader } from "@/components/custom/docs/page-header";
import { CatalogPageGrid } from "@/components/custom/docs/catalog-sections";

export const metadata = { title: "Button" };

export default function ButtonPage() {
  return (
    <AppShell>
      <div className="min-w-0 space-y-5">
        <PageHeader title="Button" />
        <CatalogPageGrid>
          <ButtonCatalogExamples />
        </CatalogPageGrid>
      </div>
    </AppShell>
  );
}
