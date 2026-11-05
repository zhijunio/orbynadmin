import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { KbdCatalogExamples } from "@/app/components/kbd/kbd-catalog-examples";
import { PageHeader } from "@/components/custom/docs/page-header";
import { CatalogPageGrid } from "@/components/custom/docs/catalog-sections";

export const metadata = { title: "Keyboard Shortcuts" };

export default function KbdPage() {
  return (
    <AppShell>
      <div className="min-w-0 space-y-5">
        <PageHeader title="Keyboard Shortcuts" />
        <CatalogPageGrid>
          <KbdCatalogExamples />
        </CatalogPageGrid>
      </div>
    </AppShell>
  );
}
