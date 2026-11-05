import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { AiAgentsCategoryPage } from "@/components/blocks/ai-agents/ai-agents-category-page";

export const metadata = { title: "AI Chat" };

export default function AiChatCategoryPage() {
  return <AppShell><AiAgentsCategoryPage categorySlug="ai-chat" /></AppShell>;
}
