import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { HoverCardCatalogExamples } from "@/app/components/hover-card/hover-card-catalog-examples";
import { PageHeader } from "@/components/custom/docs/page-header";
import { CatalogPageGrid } from "@/components/custom/docs/catalog-sections";

export const metadata = { title: "Hover Card" };

export default function HoverCardPage() {
  return (
    <AppShell>
      <div className="min-w-0 space-y-5">
        <PageHeader title="Hover Card" />
        <CatalogPageGrid>
          <HoverCardCatalogExamples />
        </CatalogPageGrid>
      </div>
    </AppShell>
  );
}
