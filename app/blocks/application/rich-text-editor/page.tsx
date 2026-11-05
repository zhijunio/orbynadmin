import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { RichTextShowcase } from "@/components/blocks/application/rich-text-editor/rich-text-showcase";

export const metadata = { title: "Rich Text Editor" };

export default function RichTextEditorBlocksPage() {
  return <AppShell><RichTextShowcase /></AppShell>;
}
