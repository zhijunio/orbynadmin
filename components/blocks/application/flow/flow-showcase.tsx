import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { AIAgentBuilder, AutomationBuilder, GrowthImpactMap, PipelineRunMonitor } from "@/components/blocks/application/flow/flow-examples";
import { ComponentPreview } from "@/components/custom/docs/component-preview";

const examples = [
  ["Automation Builder", AutomationBuilder],
  ["AI Agent Builder", AIAgentBuilder],
  ["Pipeline Run Monitor", PipelineRunMonitor],
  ["Growth Impact Map", GrowthImpactMap],
] as const;

export function FlowShowcase() {
  return <AppShell><main className="mx-auto w-full max-w-[1440px] pb-8"><div className="space-y-6">{examples.map(([title, Example]) => <ComponentPreview key={title} title={title} previewClassName="w-full items-start justify-center"><div className="w-full"><Example /></div></ComponentPreview>)}</div></main></AppShell>;
}
