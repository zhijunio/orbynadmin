import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { ListShowcase } from "@/components/blocks/application/list/list-showcase";

export const metadata = { title: "Lists" };

export default function ListBlocksPage() {
  return <AppShell><ListShowcase /></AppShell>;
}
