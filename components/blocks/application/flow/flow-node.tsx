"use client";

import { memo } from "react";
import type { NodeProps } from "@xyflow/react";
import { Handle, Position } from "@xyflow/react";
import { IconBolt, IconBrandStripe, IconChartLine, IconCloud, IconDatabase, IconFilter, IconGitBranch, IconMail, IconShieldCheck, IconTarget, IconUsers } from "@tabler/icons-react";
import type { FlowNode, FlowNodeData } from "@/components/blocks/application/flow/flow-types";
import { Badge } from "@/components/ui/badge/badge";
import { Progress } from "@/components/ui/progress/progress";

const icons = {
  webhook: IconGitBranch,
  branch: IconFilter,
  database: IconDatabase,
  bolt: IconBolt,
  mail: IconMail,
  stripe: IconBrandStripe,
  neon: IconDatabase,
  brain: IconChartLine,
  shield: IconShieldCheck,
  cloud: IconCloud,
  chart: IconChartLine,
  target: IconTarget,
  team: IconUsers,
} as const;

function statusTone(status?: FlowNodeData["status"]) {
  if (status === "Success" || status === "Passed") return "bg-emerald-500";
  if (status === "Failed" || status === "Blocked") return "bg-destructive";
  if (status === "Waiting" || status === "In progress") return "bg-amber-500";
  if (status === "Skipped") return "bg-muted-foreground";
  return "bg-border";
}

function FlowNodeCard({ data, selected }: NodeProps<FlowNode>) {
  const Icon = icons[data.icon ?? "bolt"];
  if (data.kind === "attachment") {
    return <div className="relative rounded-full border bg-background px-3 py-2 text-center shadow-sm"><Handle type="target" position={Position.Top} className="!size-1.5 !border-0 !bg-foreground" /><Icon className="mx-auto size-4 text-muted-foreground" /><span className="mt-1 block text-[10px] font-medium text-muted-foreground">{data.title}</span><Handle type="source" position={Position.Bottom} className="!size-1.5 !border-0 !bg-foreground" /></div>;
  }

  const initiative = data.kind === "initiative";
  const metric = data.kind === "metric";
  return (
    <div className={`relative min-w-[228px] overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm motion-safe:transition-[border-color,box-shadow] motion-safe:duration-150 motion-reduce:transition-none ${selected ? "border-primary ring-2 ring-primary/15" : "border-border"}`}>
      <Handle type="target" position={Position.Left} className="!size-1.5 !border-0 !bg-foreground" />
      <div className="flex items-start gap-2.5 px-3 py-2.5">
        <span className={`grid size-8 shrink-0 place-items-center rounded-lg border ${data.status === "Failed" ? "border-destructive/30 bg-destructive/5 text-destructive" : "border-border bg-muted/50 text-foreground"}`}><Icon className="size-4" /></span>
        <span className="min-w-0 flex-1"><span className="block truncate text-xs font-semibold">{data.title}</span>{data.subtitle && <span className="mt-0.5 block truncate text-[11px] text-muted-foreground">{data.subtitle}</span>}</span>
        {data.status && <span className={`mt-1 size-2 shrink-0 rounded-full ${statusTone(data.status)}`} aria-label={data.status} />}
      </div>
      {initiative && <div className="px-3 pb-2.5"><div className="mb-1 flex items-center justify-between text-[10px]"><span className="font-medium">{data.progress}%</span><Badge variant={data.status === "Blocked" ? "destructive-light" : data.status === "In progress" ? "primary-light" : "secondary"}>{data.status}</Badge></div><Progress value={data.progress} className="h-1.5" /></div>}
      {metric && <div className="flex items-center justify-between border-t px-3 py-2 text-[10px]"><span className="font-semibold">{data.periodValue}</span><span className={data.change?.startsWith("-") ? "text-destructive" : "text-emerald-600"}>{data.change}</span></div>}
      {data.kind === "step" && <div className="flex items-center justify-between gap-2 border-t px-3 py-2 text-[10px] text-muted-foreground"><span className="truncate">{data.owner ?? data.app ?? "Not run"}{data.duration ? ` · ${data.duration}` : ""}</span>{data.status && <Badge variant={data.status === "Success" || data.status === "Passed" ? "success-light" : data.status === "Failed" ? "destructive-light" : data.status === "Waiting" ? "warning-light" : "secondary"}>{data.status}</Badge>}</div>}
      {data.kind === "agent" && <div className="flex items-center gap-2 border-t px-3 py-2 text-[10px] text-muted-foreground"><span className={`size-1.5 rounded-full ${statusTone(data.status)}`} />{data.meta ?? data.status ?? "Not run"}</div>}
      {data.kind === "task" && <div className="flex items-center justify-between border-t px-3 py-2 text-[10px] text-muted-foreground"><span>{data.duration ?? "—"}</span>{data.status && <Badge variant={data.status === "Passed" ? "success-light" : data.status === "Failed" ? "destructive-light" : data.status === "Waiting" ? "warning-light" : data.status === "Blocked" ? "destructive-light" : "secondary"}>{data.status}</Badge>}</div>}
      {(initiative || metric) && data.role && <div className="border-t px-3 py-1.5 text-[10px] text-muted-foreground">{data.role}{data.correlation && <span className="float-right font-medium text-foreground">{data.correlation}</span>}</div>}
      <Handle type="source" position={Position.Right} className="!size-1.5 !border-0 !bg-foreground" />
      {(initiative || metric) && <Handle type="source" position={Position.Bottom} id="bottom" className="!size-1.5 !border-0 !bg-foreground" />}
    </div>
  );
}

export const flowNodeTypes = { flowNode: memo(FlowNodeCard) };
