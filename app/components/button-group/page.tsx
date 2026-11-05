import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { ButtonGroupCatalogExamples } from "@/app/components/button-group/button-group-catalog-examples";
import { PageHeader } from "@/components/custom/docs/page-header";
import { CatalogPageGrid } from "@/components/custom/docs/catalog-sections";

export const metadata = { title: "Button Group" };

export default function ButtonGroupPage() {
  return (
    <AppShell>
      <div className="min-w-0 space-y-5">
        <PageHeader title="Button Group" />
        <CatalogPageGrid>
          <ButtonGroupCatalogExamples />
        </CatalogPageGrid>
      </div>
    </AppShell>
  );
}
