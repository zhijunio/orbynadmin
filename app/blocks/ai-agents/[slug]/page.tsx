import { notFound } from "next/navigation";
import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { AiAgentExampleView } from "@/components/blocks/ai-agents/ai-agent-example";
import { aiAgentExamples, getAiAgentExample } from "@/components/blocks/ai-agents/ai-agents-data";

export function generateStaticParams() {
  return aiAgentExamples.map(({ slug }) => ({ slug }));
}

export default async function AiAgentExamplePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const example = getAiAgentExample(slug);
  if (!example) notFound();

  return <AppShell><AiAgentExampleView example={example} /></AppShell>;
}
