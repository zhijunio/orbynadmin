import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { NativeSelectCatalogExamples } from "@/app/components/native-select/native-select-catalog-examples";
import { PageHeader } from "@/components/custom/docs/page-header";
import { CatalogPageGrid } from "@/components/custom/docs/catalog-sections";

export const metadata = { title: "Native Select" };

export default function NativeSelectPage() {
  return (
    <AppShell>
      <div className="min-w-0 space-y-5">
        <PageHeader title="Native Select" />
        <CatalogPageGrid>
          <NativeSelectCatalogExamples />
        </CatalogPageGrid>
      </div>
    </AppShell>
  );
}
