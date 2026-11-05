import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { AlertDialogCatalogExamples } from "@/app/components/alert-dialog/alert-dialog-catalog-examples";
import { PageHeader } from "@/components/custom/docs/page-header";
import { CatalogPageGrid } from "@/components/custom/docs/catalog-sections";

export const metadata = { title: "Alert Dialog" };

export default function AlertDialogPage() {
  return (
    <AppShell>
      <div className="min-w-0 space-y-5">
        <PageHeader title="Alert Dialog" />
        <CatalogPageGrid>
        <AlertDialogCatalogExamples />
        </CatalogPageGrid>
      </div>
    </AppShell>
  );
}
