import Link from "next/link";
import { notFound } from "next/navigation";
import { aiAgentCategories, aiAgentExamples, type AiAgentCategory } from "@/components/blocks/ai-agents/ai-agents-data";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { AiAgentPreview } from "@/components/blocks/ai-agents/ai-agent-example";

export function AiAgentsCategoryPage({ categorySlug }: { categorySlug: AiAgentCategory }) {
  const category = aiAgentCategories.find((item) => item.slug === categorySlug);
  if (!category) notFound();
  const examples = aiAgentExamples.filter((example) => example.category === category.slug);

  return <main className="mx-auto w-full max-w-7xl space-y-5">
    <header className="flex flex-wrap items-end justify-between gap-3">
      <div><h1 className="text-2xl font-semibold tracking-tight">{category.title}</h1><p className="mt-1 text-sm text-muted-foreground">{examples.length} examples</p></div>
      <Link href="/blocks/ai-agents" className="text-sm text-muted-foreground hover:text-foreground">All AI Agents</Link>
    </header>
    <div className="space-y-6">
      {examples.map((example) => <ComponentPreview key={example.slug} title={example.title} className="w-full" previewClassName="w-full p-0">
        <AiAgentPreview example={example} />
      </ComponentPreview>)}
    </div>
  </main>;
}
