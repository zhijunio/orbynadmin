"use client";

import { useState } from "react";
import { IconCopy, IconLock, IconPlayerPlay, IconPlus, IconRefresh, IconRocket, IconTargetArrow } from "@tabler/icons-react";
import { FlowCanvas, type FlowCanvasApi } from "@/components/blocks/application/flow/flow-canvas";
import { flowNode, type FlowEdge, type FlowNode } from "@/components/blocks/application/flow/flow-types";
import { Badge } from "@/components/ui/badge/badge";
import { Button } from "@/components/ui/button/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select/select";
import { Input } from "@/components/ui/input/input";
import { toast } from "sonner";

const workflowNodes: FlowNode[] = [
  flowNode("trigger", { x: 40, y: 210 }, { kind: "step", title: "Form submitted", subtitle: "Webhook: demo.request", icon: "webhook", status: "Success", app: "Webhook", duration: "0.2s" }),
  flowNode("score", { x: 350, y: 210 }, { kind: "step", title: "Plan is Enterprise", subtitle: "company.size > 200", icon: "branch", status: "Success", app: "Conditions", duration: "0.1s" }),
  flowNode("qualify", { x: 660, y: 90 }, { kind: "step", title: "Enrich company", subtitle: "Clearbit lookup", icon: "database", status: "Failed", app: "Clearbit", duration: "8.0s", branch: "Yes" }),
  flowNode("notify", { x: 970, y: 90 }, { kind: "step", title: "Create deal", subtitle: "HubSpot pipeline: Inbound", icon: "bolt", status: "Idle", app: "HubSpot", branch: "Yes" }),
  flowNode("archive", { x: 660, y: 350 }, { kind: "step", title: "Notify sales", subtitle: "Slack #inbound-leads", icon: "mail", status: "Skipped", app: "Slack", branch: "No" }),
];
const workflowEdges: FlowEdge[] = [
  { id: "w1", source: "trigger", target: "score", type: "smoothstep" },
  { id: "w2", source: "score", target: "qualify", type: "smoothstep", label: "Yes" },
  { id: "w3", source: "qualify", target: "notify", type: "smoothstep", label: "Qualified" },
  { id: "w4", source: "qualify", target: "archive", type: "smoothstep", label: "Needs review" },
];

export function AutomationBuilder() {
  return <FlowCanvas initialNodes={workflowNodes} initialEdges={workflowEdges} breadcrumbLabel="Workflows" title="Lead Routing" showHistory snapToGrid addButtonLabel={false} toolbar={(api) => <>
    <Button size="sm" variant="outline" disabled={api.locked} onClick={() => api.addNode({ kind: "step", title: "New action", subtitle: "Configure this step", icon: "bolt", status: "Idle" })}><IconPlus /> Add step</Button>
    <Button size="icon-sm" variant="outline" aria-label={api.locked ? "Unlock canvas" : "Lock canvas"} onClick={api.toggleLock}><IconLock className={api.locked ? "text-primary" : "text-muted-foreground"} /></Button>
    <Button size="sm" variant={api.dirty ? "default" : "outline"} disabled={!api.dirty} onClick={() => { api.markSaved(); toast.success("Workflow updated"); }}>Update</Button>
  </>} />;
}

const agentNodes: FlowNode[] = [
  flowNode("invoice", { x: 420, y: 20 }, { kind: "agent", title: "Stripe", subtitle: "Invoice 3 days overdue", icon: "stripe", status: "Passed", meta: "inv_9412 · EUR 4,180" }),
  flowNode("query", { x: 420, y: 180 }, { kind: "agent", title: "Neon", subtitle: "Runs query_db on invoices", icon: "neon", status: "Passed", meta: "1 row · 42ms" }),
  flowNode("intent", { x: 420, y: 340 }, { kind: "agent", title: "Claude Sonnet 5", subtitle: "Triages the account", icon: "brain", status: "Passed", meta: "1,842 tokens · USD 0.031" }),
  flowNode("guardrail", { x: 80, y: 520 }, { kind: "agent", title: "PII Guardrail", subtitle: "Scans outbound text", icon: "shield", status: "Passed", meta: "No sensitive data" , branch: "No reply"}),
  flowNode("plan", { x: 420, y: 520 }, { kind: "agent", title: "Stripe", subtitle: "Offers a payment plan", icon: "stripe", status: "Passed", meta: "3 installments · EUR 1,393", branch: "Promised" }),
  flowNode("evidence", { x: 760, y: 520 }, { kind: "agent", title: "Stripe", subtitle: "Pulls the dispute evidence", icon: "stripe", status: "Skipped", meta: "Branch not taken", branch: "Disputed" }),
  flowNode("slack", { x: 80, y: 700 }, { kind: "agent", title: "Slack", subtitle: "Posts to #collections", icon: "team", status: "Skipped", meta: "Upstream skipped" }),
  flowNode("resend", { x: 420, y: 700 }, { kind: "agent", title: "Resend", subtitle: "Emails the terms to Maren", icon: "mail", status: "Failed", meta: "Bounced · retry queued" }),
  flowNode("clickup", { x: 760, y: 700 }, { kind: "agent", title: "ClickUp", subtitle: "Assigns Hannah Berg", icon: "target", status: "Skipped", meta: "Upstream skipped" }),
];
const agentEdges: FlowEdge[] = [
  { id: "a1", source: "invoice", target: "query" }, { id: "a2", source: "query", target: "intent" },
  { id: "a3", source: "intent", target: "guardrail", label: "No reply" }, { id: "a4", source: "intent", target: "plan", label: "Promised" }, { id: "a5", source: "intent", target: "evidence", label: "Disputed" },
  { id: "a6", source: "guardrail", target: "slack" }, { id: "a7", source: "plan", target: "resend" }, { id: "a8", source: "evidence", target: "clickup" },
];

export function AIAgentBuilder() {
  const [model, setModel] = useState("sonnet");
  const [run, setRun] = useState(false);
  return <FlowCanvas initialNodes={agentNodes} initialEdges={agentEdges} direction="TB" autoLayoutOnMount addStepOnEdges breadcrumbLabel="Agents" title="Collections Agent" summaryLabel="9 steps, 3 paths" initialSelectedId="intent" inspectorTabs={["Settings", "Wiring"]} toolbar={(api) => <>
    <Select value={model} onValueChange={setModel}><SelectTrigger className="h-8 w-[132px] text-xs"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="sonnet">Claude Sonnet</SelectItem><SelectItem value="haiku">Claude Haiku</SelectItem><SelectItem value="gpt">GPT-4.1</SelectItem></SelectContent></Select>
    <Button size="sm" variant="outline" onClick={() => { setRun(true); api.setNodes((nodes) => nodes.map((node) => ({ ...node, data: { ...node.data, status: node.id === "resend" ? "Failed" : ["evidence", "clickup", "slack"].includes(node.id) ? "Skipped" : "Passed", meta: node.id === "resend" ? "Bounced · retry queued" : node.id === "clickup" || node.id === "slack" ? "Upstream skipped" : "Test run · 1.2s" } }))); if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) { api.setEdges((edges) => edges.map((edge) => ({ ...edge, animated: true }))); window.setTimeout(() => api.setEdges((edges) => edges.map((edge) => ({ ...edge, animated: false }))), 1600); } toast.message("Test completed with one failed path"); }}><IconPlayerPlay />{run ? "Run again" : "Run test"}</Button>
    <Button size="sm" variant="outline" onClick={() => { const used = new Set(api.nodes.map((node) => node.data.branch?.toLowerCase())); let count = 1; while (used.has(`path ${count}`)) count += 1; api.addNode({ kind: "agent", title: `New path ${count}`, subtitle: "Configure this branch", icon: "branch", status: "Idle", branch: `Path ${count}` }, "intent"); }}><IconPlus /> Add path</Button>
    <Button size="sm" onClick={() => api.addNode({ kind: "agent", title: "New agent step", subtitle: "Configure the agent", icon: "brain", status: "Idle" })}><IconPlus /> Add step</Button>
    <Button size="icon-sm" variant="ghost" aria-label="Copy agent flow as JSON" onClick={() => { void navigator.clipboard.writeText(JSON.stringify({ nodes: api.nodes, edges: api.edges }, null, 2)).then(() => toast.success("Agent flow copied as JSON")).catch(() => toast.error("Clipboard access is unavailable")); }}><IconCopy /></Button>
  </>} />;
}

const pipelineNodes: FlowNode[] = [
  flowNode("trigger", { x: 30, y: 250 }, { kind: "task", title: "Nightly", subtitle: "02:00 UTC", icon: "bolt", status: "Passed", duration: "Scheduled" }),
  flowNode("extract-stripe", { x: 340, y: 90 }, { kind: "task", title: "extract_stripe", subtitle: "Stripe transactions", icon: "stripe", status: "Passed", duration: "2m 10s" }),
  flowNode("extract-paypal", { x: 340, y: 410 }, { kind: "task", title: "extract_paypal", subtitle: "PayPal transactions", icon: "cloud", status: "Passed", duration: "1m 48s" }),
  flowNode("dedupe", { x: 660, y: 250 }, { kind: "task", title: "dedupe_payments", subtitle: "Merge duplicate payments", icon: "database", status: "Passed", duration: "3m 12s" }),
  flowNode("reconcile", { x: 970, y: 90 }, { kind: "task", title: "reconcile_ledger", subtitle: "Duplicate charge id", icon: "shield", status: "Failed", duration: "12s" }),
  flowNode("approval", { x: 1280, y: 410 }, { kind: "task", title: "publish_mrr", subtitle: "Awaiting approval", icon: "cloud", status: "Waiting", duration: "Approval" }),
  flowNode("stripe", { x: 340, y: 250 }, { kind: "attachment", title: "stripe_prod", icon: "stripe" }),
  flowNode("paypal", { x: 340, y: 570 }, { kind: "attachment", title: "paypal_eu", icon: "cloud" }),
  flowNode("test", { x: 660, y: 430 }, { kind: "attachment", title: "unique_charge", icon: "shield" }),
  flowNode("model", { x: 970, y: 410 }, { kind: "attachment", title: "ledger_v3", icon: "brain" }),
];
const pipelineEdges: FlowEdge[] = [
  { id: "p1", source: "trigger", target: "extract-stripe" }, { id: "p2", source: "trigger", target: "extract-paypal" },
  { id: "p3", source: "extract-stripe", target: "dedupe" }, { id: "p4", source: "extract-paypal", target: "dedupe" },
  { id: "p5", source: "dedupe", target: "reconcile" }, { id: "p6", source: "reconcile", target: "approval" },
  { id: "p7", source: "stripe", target: "extract-stripe", animated: true }, { id: "p8", source: "paypal", target: "extract-paypal", animated: true },
  { id: "p9", source: "test", target: "reconcile" }, { id: "p10", source: "model", target: "approval" },
];

export function PipelineRunMonitor() {
  const [undoVisible, setUndoVisible] = useState(false);
  const [release, setRelease] = useState(false);
  return <FlowCanvas initialNodes={pipelineNodes} initialEdges={pipelineEdges} breadcrumbLabel="Pipelines" title="Nightly Ledger Sync" showCounts={false} inspectorTabs={["Settings", "Wiring"]} lockedNodeIds={["approval"]} initialSelectedId="approval" addButtonLabel={false} toolbar={(api) => <>
    <span className="hidden items-center gap-1 sm:flex"><Badge variant="destructive-light">{api.nodes.filter((node) => node.data.status === "Failed").length} Failed</Badge><Badge variant="warning-light">{api.nodes.filter((node) => node.data.status === "In progress").length} Running</Badge><Badge variant="secondary">{api.nodes.filter((node) => node.data.status === "Waiting").length} Waiting</Badge><Badge variant="success-light">{api.nodes.filter((node) => node.data.status === "Passed").length} Passed</Badge></span>
    <Button size="sm" variant="outline" onClick={() => { api.addNode({ kind: "task", title: "New pipeline task", subtitle: "Configure task dependencies", icon: "bolt", status: "Waiting" }); }}><IconPlus /> Add task</Button>
    <Button size="sm" variant="outline" onClick={() => { api.setNodes((nodes) => nodes.map((node) => ({ ...node, data: { ...node.data, status: node.id === "reconcile" ? "In progress" : node.data.status } }))); if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) { api.setEdges((edges) => edges.map((edge) => ({ ...edge, animated: true }))); window.setTimeout(() => api.setEdges((edges) => edges.map((edge) => ({ ...edge, animated: false }))), 2000); } toast.message("Retrying failed task"); }}><IconRefresh /> Retry failed</Button>
    <Button size="sm" onClick={() => { api.setNodes((nodes) => nodes.map((node) => ({ ...node, data: { ...node.data, status: node.id === "reconcile" ? "Passed" : node.id === "approval" ? "Waiting" : node.data.status } }))); toast.success("Validation passed"); }}><IconPlayerPlay /> Run</Button>
  </>} inspectorExtras={(node, api) => node.id === "approval" ? <div className="grid gap-3 border-t pt-3"><label className="grid gap-1.5 text-xs font-medium">Service<Input defaultValue="Google Cloud" /></label><label className="grid gap-1.5 text-xs font-medium">Currency<Input defaultValue="USD" /></label><label className="grid gap-1.5 text-xs font-medium">Approver<Input defaultValue="finance-lead" /></label><p className="text-xs text-muted-foreground">Downstream tasks wait for approval.</p><Button size="sm" disabled={release} onClick={() => { setRelease(true); api.setNodes((nodes) => nodes.map((item) => ({ ...item, data: { ...item.data, status: item.id === "approval" ? "Passed" : item.data.status } }))); setUndoVisible(true); toast.success("Pipeline approved · Undo available for 8 seconds"); window.setTimeout(() => setUndoVisible(false), 8000); }}><IconRocket />{release ? "Approved" : "Approve and release"}</Button>{undoVisible && <Button size="sm" variant="outline" onClick={() => { setRelease(false); api.setNodes((nodes) => nodes.map((item) => ({ ...item, data: { ...item.data, status: item.id === "approval" ? "Waiting" : item.data.status } }))); setUndoVisible(false); toast.message("Approval undone"); }}>Undo approval</Button>}</div> : null} />;
}

const impactNodes: FlowNode[] = [
  flowNode("initiative-1", { x: 40, y: 90 }, { kind: "initiative", title: "Lifecycle campaigns", subtitle: "Increase repeat purchases", icon: "mail", status: "In progress", progress: 68, role: "Owner · Growth" }),
  flowNode("initiative-2", { x: 40, y: 310 }, { kind: "initiative", title: "Loyalty program", subtitle: "Reward returning customers", icon: "team", status: "To do", progress: 24, role: "Owner · Marketing" }),
  flowNode("initiative-3", { x: 40, y: 530 }, { kind: "initiative", title: "Loyalty upgrade email", subtitle: "Improve member engagement", icon: "mail", status: "Blocked", progress: 0, role: "Owner · Lifecycle" }),
  flowNode("metric-1", { x: 390, y: 70 }, { kind: "metric", title: "Repeat purchase rate", subtitle: "Returning customers", icon: "chart", status: "In progress", periodValue: "32.8%", change: "+4.2%", role: "Leading indicator", correlation: "r = 0.82" }),
  flowNode("metric-2", { x: 390, y: 250 }, { kind: "metric", title: "Average order value", subtitle: "Per completed order", icon: "target", status: "In progress", periodValue: "$68.50", change: "+2.1%", role: "Supporting metric", correlation: "r = 0.64" }),
  flowNode("metric-3", { x: 390, y: 450 }, { kind: "metric", title: "Customer retention", subtitle: "90-day retention", icon: "team", status: "To do", periodValue: "46.2%", change: "+1.8%", role: "Supporting metric", correlation: "r = 0.58" }),
  flowNode("north-star", { x: 760, y: 230 }, { kind: "metric", title: "Net revenue growth", subtitle: "North Star metric", icon: "target", status: "In progress", periodValue: "$2.4M", change: "+12.6%", role: "North Star", correlation: "Quarterly" }),
];
const impactEdges: FlowEdge[] = [
  { id: "g1", source: "initiative-1", target: "metric-1", label: "Drives" }, { id: "g2", source: "initiative-1", target: "metric-2", label: "Influences" },
  { id: "g3", source: "initiative-2", target: "metric-1", label: "Supports" }, { id: "g4", source: "initiative-2", target: "metric-3", label: "Drives" },
  { id: "g8", source: "initiative-3", target: "metric-2", label: "Influences" },
  { id: "g5", source: "metric-1", target: "north-star", label: "Correlates" }, { id: "g6", source: "metric-2", target: "north-star", label: "Correlates" }, { id: "g7", source: "metric-3", target: "north-star", label: "Correlates" },
];

export function GrowthImpactMap() {
  const [period, setPeriod] = useState("quarter");
  const [promoted, setPromoted] = useState(true);
  const [northStarId, setNorthStarId] = useState("north-star");
  const [newMetric, setNewMetric] = useState(0);
  const validateConnection = (connection: { source: string | null; target: string | null }, edges: FlowEdge[]) => {
    if (connection.source === connection.target) return "A metric cannot be linked to itself.";
    if (edges.some((edge) => edge.source === connection.source && edge.target === connection.target)) return "These metrics are already linked.";
    const graph = new Map<string, string[]>();
    edges.forEach((edge) => graph.set(edge.source, [...(graph.get(edge.source) ?? []), edge.target]));
    const pending = [connection.target ?? ""];
    const visited = new Set<string>();
    while (pending.length) {
      const current = pending.pop()!;
      if (current === connection.source) return "This link would create a cycle.";
      if (visited.has(current)) continue;
      visited.add(current);
      pending.push(...(graph.get(current) ?? []));
    }
    return undefined;
  };
  return <FlowCanvas initialNodes={impactNodes} initialEdges={impactEdges} direction="LR" autoLayoutOnMount breadcrumbLabel="Maps" title="Repeat Order Growth" showCounts={false} inspectorTabs={["Settings", "Links"]} initialSelectedId="north-star" addButtonLabel={false} toolbar={(api: FlowCanvasApi) => <>
    <div className="flex rounded-md border p-0.5">{[["week", "7 days"], ["month", "6 weeks"], ["quarter", "12 months"]].map(([value, label]) => <Button key={value} size="xs" variant={period === value ? "secondary" : "ghost"} onClick={() => { setPeriod(value); const values: Record<string, string[]> = { week: ["32.8%", "$68.50", "46.2%", "$2.4M"], month: ["31.6%", "$67.10", "44.8%", "$6.8M"], quarter: ["29.4%", "$64.20", "42.1%", "$24.1M"] }; let metricIndex = 0; api.setNodes((nodes) => nodes.map((node) => node.data.kind === "metric" ? { ...node, data: { ...node.data, role: `${label} · ${node.data.role?.split(" · ").at(-1) ?? "Metric"}`, periodValue: values[value][metricIndex++] } } : node)); }}>{label}</Button>)}</div>
    <Button size="sm" variant="outline" onClick={() => { const node = api.nodes.find((item) => item.id === "metric-1"); if (node) { const id = `metric-copy-${newMetric}`; api.setNodes((nodes) => [...nodes, { ...node, id, position: { x: node.position.x + 20, y: node.position.y + 130 }, data: { ...node.data, title: `New metric ${newMetric + 1}`, role: "Supporting metric" } }]); api.setEdges((edges) => [...edges, { id: `growth-copy-${newMetric}`, source: id, target: "north-star", label: "Correlates", type: "smoothstep" }]); setNewMetric((count) => count + 1); } }}><IconPlus /> Add metric</Button>
    <Button size="icon-sm" variant="ghost" aria-label="Copy map data" onClick={() => { void navigator.clipboard.writeText(JSON.stringify({ nodes: api.nodes, edges: api.edges }, null, 2)).then(() => toast.success("Map data copied")).catch(() => toast.error("Clipboard access is unavailable")); }}><IconCopy /></Button>
    <Button size="sm" onClick={() => { const nextPromoted = !promoted; setPromoted(nextPromoted); api.setNodes((nodes) => nodes.map((node) => node.id === northStarId ? { ...node, data: { ...node.data, role: nextPromoted ? "North Star metric" : "Supporting metric" } } : node)); toast.message(nextPromoted ? "Metric promoted to North Star" : "Metric moved to supporting metrics"); }}><IconTargetArrow />{promoted ? "Demote North Star" : "Promote to North Star"}</Button>
  </>} inspectorExtras={(node, api) => node.data.kind === "metric" ? <div className="grid gap-3 border-t pt-3"><label className="grid gap-1.5 text-xs font-medium">Role<Select value={node.data.role?.includes("North Star") ? "north-star" : "supporting"} onValueChange={(value) => { const promote = value === "north-star"; setPromoted(promote); if (promote) setNorthStarId(node.id); api.setNodes((nodes) => nodes.map((item) => item.data.kind === "metric" ? { ...item, data: { ...item.data, role: item.id === node.id && promote ? "North Star metric" : "Supporting metric" } } : item)); }}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="north-star">North Star</SelectItem><SelectItem value="supporting">Supporting metric</SelectItem></SelectContent></Select></label><div className="grid grid-cols-2 gap-2"><label className="grid gap-1.5 text-xs font-medium">Aggregation<Select defaultValue="sum"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="sum">Sum</SelectItem><SelectItem value="average">Average</SelectItem></SelectContent></Select></label><label className="grid gap-1.5 text-xs font-medium">Unit<Input defaultValue="Count" /></label></div><div className="grid grid-cols-3 gap-2 text-[10px] text-muted-foreground"><span>PERIOD</span><span>VALUE</span><span>CHANGE %</span>{["Past 7 days", "Past 6 weeks", "Past 12 months"].map((label, index) => <div key={label} className="col-span-3 grid grid-cols-3 items-center gap-2"><span>{label}</span><Input aria-label={`${label} value`} defaultValue={["3912", "22408", "168730"][index]} /><Input aria-label={`${label} change`} defaultValue={["0.9", "2.6", "31.8"][index]} /></div>)}</div></div> : null} onConnectAttempt={validateConnection} />;
}
