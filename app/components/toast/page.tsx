import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { ToastCatalogExamples } from "@/app/components/toast/toast-catalog-examples";
import { PageHeader } from "@/components/custom/docs/page-header";
import { CatalogPageGrid } from "@/components/custom/docs/catalog-sections";

export const metadata = { title: "Toast" };

export default function ToastPage() {
  return (
    <AppShell>
      <div className="min-w-0 space-y-5">
        <PageHeader title="Toast" />
        <CatalogPageGrid>
          <ToastCatalogExamples />
        </CatalogPageGrid>
      </div>
    </AppShell>
  );
}
