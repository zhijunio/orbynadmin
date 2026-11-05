import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { BubbleCatalogExamples } from "@/app/components/bubble/bubble-catalog-examples";
import { PageHeader } from "@/components/custom/docs/page-header";
import { CatalogPageGrid } from "@/components/custom/docs/catalog-sections";

export const metadata = { title: "Bubble" };

export default function BubblePage() {
  return (
    <AppShell>
      <div className="min-w-0 space-y-5">
        <PageHeader title="Bubble" />
        <CatalogPageGrid>
        <BubbleCatalogExamples />
        </CatalogPageGrid>
      </div>
    </AppShell>
  );
}
