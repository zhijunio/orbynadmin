import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { TooltipCatalogExamples } from "@/app/components/tooltip/tooltip-catalog-examples";
import { PageHeader } from "@/components/custom/docs/page-header";
import { CatalogPageGrid } from "@/components/custom/docs/catalog-sections";

export const metadata = { title: "Tooltips" };

export default function TooltipPage() {
  return (
    <AppShell>
      <div className="min-w-0 space-y-5">
        <PageHeader title="Tooltips" />
        <CatalogPageGrid>
          <TooltipCatalogExamples />
        </CatalogPageGrid>
      </div>
    </AppShell>
  );
}
