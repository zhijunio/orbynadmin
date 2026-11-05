import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { AnnouncementCatalogExamples } from "@/app/components/announcement/announcement-catalog-examples";
import { PageHeader } from "@/components/custom/docs/page-header";
import { CatalogPageGrid } from "@/components/custom/docs/catalog-sections";

export const metadata = { title: "Announcement" };

export default function AnnouncementPage() {
  return (
    <AppShell>
      <div className="min-w-0 space-y-5">
        <PageHeader title="Announcement" />
        <CatalogPageGrid>
        <AnnouncementCatalogExamples />
        </CatalogPageGrid>
      </div>
    </AppShell>
  );
}
