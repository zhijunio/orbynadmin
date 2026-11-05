import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { NotificationCatalogExamples } from "@/app/components/notification/notification-catalog-examples";
import { PageHeader } from "@/components/custom/docs/page-header";
import { CatalogPageGrid } from "@/components/custom/docs/catalog-sections";

export const metadata = { title: "Notification" };

export default function NotificationsPage() {
  return (
    <AppShell>
      <div className="min-w-0 space-y-5">
        <PageHeader title="Notification" />
        <CatalogPageGrid>
          <NotificationCatalogExamples />
        </CatalogPageGrid>
      </div>
    </AppShell>
  );
}
