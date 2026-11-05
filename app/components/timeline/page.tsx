import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { TimelineCatalogExamples } from "@/app/components/timeline/timeline-catalog-examples";
import { PageHeader } from "@/components/custom/docs/page-header";
import { CatalogPageGrid } from "@/components/custom/docs/catalog-sections";

export const metadata = { title: "Timeline" };

export default function TimelinePage() {
  return (
    <AppShell>
      <div className="min-w-0 space-y-5">
        <PageHeader title="Timeline" />
        <CatalogPageGrid>
          <TimelineCatalogExamples />
        </CatalogPageGrid>
      </div>
    </AppShell>
  );
}
