import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { VideoCatalogExamples } from "@/app/components/video/video-catalog-examples";
import { PageHeader } from "@/components/custom/docs/page-header";
import { CatalogPageGrid } from "@/components/custom/docs/catalog-sections";

export const metadata = { title: "Videos" };

export default function VideoPage() {
  return (
    <AppShell>
      <div className="min-w-0 space-y-5">
        <PageHeader title="Videos" />
        <CatalogPageGrid>
          <VideoCatalogExamples />
        </CatalogPageGrid>
      </div>
    </AppShell>
  );
}
