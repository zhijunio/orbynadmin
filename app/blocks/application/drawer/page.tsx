import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { DrawerShowcase } from "@/components/blocks/application/drawer/drawer-showcase";

export const metadata = { title: "Drawer" };

export default function DrawerBlocksPage() {
  return (
    <AppShell>
      <DrawerShowcase />
    </AppShell>
  );
}
