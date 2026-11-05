import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { LabelCatalogExamples } from "@/app/components/label/label-catalog-examples";
import { PageHeader } from "@/components/custom/docs/page-header";
import { CatalogPageGrid } from "@/components/custom/docs/catalog-sections";

export const metadata = { title: "Label" };

export default function LabelPage() {
  return (
    <AppShell>
      <div className="min-w-0 space-y-5">
        <PageHeader title="Label" />
        <CatalogPageGrid>
          <LabelCatalogExamples />
        </CatalogPageGrid>
      </div>
    </AppShell>
  );
}
