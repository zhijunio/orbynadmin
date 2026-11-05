import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { SwitchCatalogExamples } from "@/app/components/switch/switch-catalog-examples";
import { PageHeader } from "@/components/custom/docs/page-header";
import { CatalogPageGrid } from "@/components/custom/docs/catalog-sections";

export const metadata = { title: "Switch" };

export default function SwitchPage() {
  return (
    <AppShell>
      <div className="min-w-0 space-y-5">
        <PageHeader title="Switch" />
        <CatalogPageGrid>
        <SwitchCatalogExamples />
        </CatalogPageGrid>
      </div>
    </AppShell>
  );
}
