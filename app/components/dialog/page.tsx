import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { DialogCatalogExamples } from "@/app/components/dialog/dialog-catalog-examples";
import { PageHeader } from "@/components/custom/docs/page-header";
import { CatalogPageGrid } from "@/components/custom/docs/catalog-sections";

export const metadata = { title: "Dialog" };

export default function DialogPage() {
  return (
    <AppShell>
      <div className="min-w-0 space-y-5">
        <PageHeader title="Dialog" />
        <CatalogPageGrid>
          <DialogCatalogExamples />
        </CatalogPageGrid>
      </div>
    </AppShell>
  );
}
