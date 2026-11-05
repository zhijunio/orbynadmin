import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { ToggleGroupCatalogExamples } from "@/app/components/toggle-group/toggle-group-catalog-examples";
import { PageHeader } from "@/components/custom/docs/page-header";
import { CatalogPageGrid } from "@/components/custom/docs/catalog-sections";

export const metadata = { title: "Toggle Group" };

export default function ToggleGroupPage() {
  return (
    <AppShell>
      <div className="min-w-0 space-y-5">
        <PageHeader title="Toggle Group" />
        <CatalogPageGrid>
          <ToggleGroupCatalogExamples />
        </CatalogPageGrid>
      </div>
    </AppShell>
  );
}
