import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { InputGroupCatalogExamples } from "@/app/components/input-group/input-group-catalog-examples";
import { PageHeader } from "@/components/custom/docs/page-header";
import { CatalogPageGrid } from "@/components/custom/docs/catalog-sections";

export const metadata = { title: "Input Group" };

export default function InputGroupPage() {
  return (
    <AppShell>
      <div className="min-w-0 space-y-5">
        <PageHeader title="Input Group" />
        <CatalogPageGrid>
          <InputGroupCatalogExamples />
        </CatalogPageGrid>
      </div>
    </AppShell>
  );
}
