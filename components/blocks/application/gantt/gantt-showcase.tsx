import { GanttExample } from "@/components/custom/gantt/gantt-examples";
import { ResourceCapacity } from "@/components/blocks/application/gantt/resource-capacity";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { ProjectTimeline } from "@/components/blocks/application/gantt/project-timeline";
import { TechnicianDispatch } from "@/components/blocks/application/gantt/technician-dispatch";
import { AgentPlaybook } from "@/components/blocks/application/gantt/agent-playbook";

const examples = [
  ["project-timeline", "Project Timeline", 1],
  ["technician-dispatch", "Technician Dispatch", 0],
  ["resource-order", "Resource Schedule", 2],
  ["quarter-roadmap", "Quarter Roadmap", 3],
  ["capacity-plan", "Resource Capacity", 4],
  ["agent-playbook", "Agent Playbook", 7],
] as const;

export function GanttShowcase() {
  return <main className="mx-auto w-full max-w-7xl space-y-8 pb-8">
    <header><h1 className="text-2xl font-semibold tracking-tight">Gantt</h1></header>
    <div className="space-y-5">
      {examples.map(([id, title, example]) => <ComponentPreview key={id} title={title} previewClassName="w-full items-start">{example === 1 ? <ProjectTimeline /> : example === 4 ? <ResourceCapacity /> : example === 0 ? <TechnicianDispatch /> : example === 7 ? <AgentPlaybook /> : <GanttExample example={example} />}</ComponentPreview>)}
    </div>
  </main>;
}
