import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { EmptyStateShowcase } from "@/components/blocks/application/empty-state/empty-state-showcase";

export const metadata = { title: "Empty State" };

export default function EmptyStateBlocksPage() {
  return (
    <AppShell>
      <EmptyStateShowcase />
    </AppShell>
  );
}
