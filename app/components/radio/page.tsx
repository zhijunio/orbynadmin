import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { RadioCatalogExamples } from "@/app/components/radio/radio-catalog-examples";
import { PageHeader } from "@/components/custom/docs/page-header";
import { CatalogPageGrid } from "@/components/custom/docs/catalog-sections";

export const metadata = { title: "Radio" };

export default function RadioPage() {
  return (
    <AppShell>
      <div className="min-w-0 space-y-5">
        <PageHeader title="Radio" />
        <CatalogPageGrid>
        <RadioCatalogExamples />
        </CatalogPageGrid>
      </div>
    </AppShell>
  );
}
