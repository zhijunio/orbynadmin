import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { WhiteboardShowcase } from "@/components/blocks/application/whiteboard/whiteboard-showcase";

export const metadata = { title: "Whiteboard" };

export default function WhiteboardPage() {
  return <AppShell><WhiteboardShowcase /></AppShell>;
}
