import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { MessageCatalogExamples } from "@/app/components/message/message-catalog-examples";
import { PageHeader } from "@/components/custom/docs/page-header";
import { CatalogPageGrid } from "@/components/custom/docs/catalog-sections";

export const metadata = { title: "Message" };

export default function MessagePage() {
  return (
    <AppShell>
      <div className="min-w-0 space-y-5">
        <PageHeader title="Message" />
        <CatalogPageGrid>
          <MessageCatalogExamples />
        </CatalogPageGrid>
      </div>
    </AppShell>
  );
}
