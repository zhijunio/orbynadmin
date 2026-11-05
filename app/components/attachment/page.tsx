import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { AttachmentCatalogExamples } from "@/app/components/attachment/attachment-catalog-examples";
import { PageHeader } from "@/components/custom/docs/page-header";
import { CatalogPageGrid } from "@/components/custom/docs/catalog-sections";

export const metadata = { title: "Attachment" };

export default function AttachmentPage() {
  return (
    <AppShell>
      <div className="min-w-0 space-y-5">
        <PageHeader title="Attachment" />
        <CatalogPageGrid>
          <AttachmentCatalogExamples />
        </CatalogPageGrid>
      </div>
    </AppShell>
  );
}
