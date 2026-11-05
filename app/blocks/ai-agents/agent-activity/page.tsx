import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { AiAgentsCategoryPage } from "@/components/blocks/ai-agents/ai-agents-category-page";

export const metadata = { title: "Agent Activity" };

export default function AgentActivityCategoryPage() {
  return <AppShell><AiAgentsCategoryPage categorySlug="agent-activity" /></AppShell>;
}
