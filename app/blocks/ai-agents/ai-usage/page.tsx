import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { AiAgentsCategoryPage } from "@/components/blocks/ai-agents/ai-agents-category-page";

export const metadata = { title: "AI Usage" };

export default function AiUsageCategoryPage() {
  return <AppShell><AiAgentsCategoryPage categorySlug="ai-usage" /></AppShell>;
}
