import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { FrameCatalogExamples } from "@/app/components/frame/frame-catalog-examples";
import { PageHeader } from "@/components/custom/docs/page-header";
import { CatalogPageGrid } from "@/components/custom/docs/catalog-sections";

export const metadata = { title: "Frame" };

export default function FramePage() {
  return (
    <AppShell>
      <div className="min-w-0 space-y-5">
        <PageHeader title="Frame" />
        <CatalogPageGrid>
          <FrameCatalogExamples />
        </CatalogPageGrid>
      </div>
    </AppShell>
  );
}
