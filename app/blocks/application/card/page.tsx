import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { CardShowcase } from "@/components/blocks/application/card/card-showcase";

export const metadata = { title: "Cards" };

export default function CardBlocksPage() {
  return (
    <AppShell>
      <CardShowcase />
    </AppShell>
  );
}
