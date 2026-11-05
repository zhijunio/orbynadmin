import Link from "next/link";
import { IconArrowUpRight } from "@tabler/icons-react";
import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { aiAgentCategories, aiAgentExamples } from "@/components/blocks/ai-agents/ai-agents-data";

export const metadata = { title: "AI & Agents" };

export default function AiAgentsPage() {
  return <AppShell>
    <main className="mx-auto w-full max-w-7xl space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div><h1 className="text-2xl font-semibold tracking-tight">AI &amp; Agents</h1><p className="mt-1 text-sm text-muted-foreground">{aiAgentExamples.length} examples</p></div>
      </header>
      {aiAgentCategories.map((category) => {
        const examples = aiAgentExamples.filter((example) => example.category === category.slug);
        return <section key={category.slug} className="space-y-3">
          <div className="flex items-center justify-between"><h2 className="text-lg font-semibold">{category.title}</h2><span className="text-sm text-muted-foreground">{examples.length}</span></div>
          <div className="overflow-hidden rounded-xl border bg-card">
            {examples.map((example, index) => <Link key={example.slug} href={"/blocks/ai-agents/" + example.slug} className={index ? "group flex items-center gap-3 border-t px-4 py-3 transition-colors hover:bg-muted/50" : "group flex items-center gap-3 px-4 py-3 transition-colors hover:bg-muted/50"}>
              <span className="w-7 shrink-0 text-sm tabular-nums text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>
              <span className="min-w-0 flex-1"><span className="block text-sm font-medium">{example.title}</span><span className="mt-0.5 block text-sm text-muted-foreground">{example.description}</span></span>
              <IconArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>)}
          </div>
        </section>;
      })}
    </main>
  </AppShell>;
}
