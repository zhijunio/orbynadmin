import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { FileTypeCatalogExamples } from "@/app/components/file-type/file-type-catalog-examples";
import { PageHeader } from "@/components/custom/docs/page-header";
import { CatalogPageGrid } from "@/components/custom/docs/catalog-sections";

export const metadata = { title: "File Type" };

export default function FileTypePage() {
  return (
    <AppShell>
      <div className="min-w-0 space-y-5">
        <PageHeader title="File Type" />
        <CatalogPageGrid>
          <FileTypeCatalogExamples />
        </CatalogPageGrid>
      </div>
    </AppShell>
  );
}
