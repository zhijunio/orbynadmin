import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { PopoverCatalogExamples } from "@/app/components/popover/popover-catalog-examples";
import { PageHeader } from "@/components/custom/docs/page-header";
import { CatalogPageGrid } from "@/components/custom/docs/catalog-sections";

export const metadata = { title: "Popovers" };

export default function PopoverPage() {
  return (
    <AppShell>
      <div className="min-w-0 space-y-5">
        <PageHeader title="Popovers" />
        <CatalogPageGrid>
          <PopoverCatalogExamples />
        </CatalogPageGrid>
      </div>
    </AppShell>
  );
}
