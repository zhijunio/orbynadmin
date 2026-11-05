import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { MessageScrollerCatalogExamples } from "@/app/components/message-scroller/message-scroller-catalog-examples";
import { PageHeader } from "@/components/custom/docs/page-header";
import { CatalogPageGrid } from "@/components/custom/docs/catalog-sections";

export const metadata = { title: "Message Scroller" };

export default function MessageScrollerPage() {
  return (
    <AppShell>
      <div className="min-w-0 space-y-5">
        <PageHeader title="Message Scroller" />
        <CatalogPageGrid>
          <MessageScrollerCatalogExamples />
        </CatalogPageGrid>
      </div>
    </AppShell>
  );
}
