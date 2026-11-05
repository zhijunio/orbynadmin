import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { FileUploadCatalogExamples } from "@/app/components/file-upload/file-upload-catalog-examples";
import { PageHeader } from "@/components/custom/docs/page-header";
import { CatalogPageGrid } from "@/components/custom/docs/catalog-sections";

export const metadata = { title: "File Upload" };

export default function FileUploadPage() {
  return (
    <AppShell>
      <div className="min-w-0 space-y-5">
        <PageHeader title="File Upload" />
        <CatalogPageGrid>
        <FileUploadCatalogExamples />
        </CatalogPageGrid>
      </div>
    </AppShell>
  );
}
