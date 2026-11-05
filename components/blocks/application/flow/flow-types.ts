import type { Edge, Node } from "@xyflow/react";

export type FlowNodeData = {
  kind: "step" | "agent" | "task" | "attachment" | "initiative" | "metric";
  title: string;
  subtitle?: string;
  app?: string;
  icon?: "webhook" | "branch" | "database" | "bolt" | "mail" | "stripe" | "neon" | "brain" | "shield" | "cloud" | "chart" | "target" | "team";
  status?: "Success" | "Failed" | "Idle" | "Skipped" | "Passed" | "Waiting" | "Blocked" | "In progress" | "To do";
  owner?: string;
  duration?: string;
  meta?: string;
  branch?: string;
  progress?: number;
  role?: string;
  periodValue?: string;
  change?: string;
  correlation?: string;
};

export type FlowNode = Node<FlowNodeData, "flowNode">;
export type FlowEdgeData = { addStep?: () => void };
export type FlowEdge = Edge<FlowEdgeData>;

export function flowNode(id: string, position: { x: number; y: number }, data: FlowNodeData): FlowNode {
  return { id, type: "flowNode", position, data, width: 248, height: data.kind === "initiative" || data.kind === "metric" ? 112 : 94 };
}
