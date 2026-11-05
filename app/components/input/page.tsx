import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { InputCatalogExamples } from "@/app/components/input/input-catalog-examples";
import { PageHeader } from "@/components/custom/docs/page-header";
import { CatalogPageGrid } from "@/components/custom/docs/catalog-sections";

export const metadata = { title: "Input" };

export default function InputPage() {
  return (
    <AppShell>
      <div className="min-w-0 space-y-5">
        <PageHeader title="Input" />
        <CatalogPageGrid>
          <InputCatalogExamples />
        </CatalogPageGrid>
      </div>
    </AppShell>
  );
}
