import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { DialogGallery } from "@/components/blocks/application/dialog/dialog-gallery";

export const metadata = { title: "Dialogs" };

export default function DialogBlocksPage() {
  return <AppShell><DialogGallery /></AppShell>;
}
