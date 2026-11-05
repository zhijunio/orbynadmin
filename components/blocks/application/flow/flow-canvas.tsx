"use client";

import "@xyflow/react/dist/style.css";
import { useCallback, useEffect, useMemo, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";
import dagre from "@dagrejs/dagre";
import { addEdge, applyEdgeChanges, applyNodeChanges, Background, BackgroundVariant, ConnectionLineType, Controls, EdgeLabelRenderer, BaseEdge, getSmoothStepPath, MiniMap, ReactFlow, ReactFlowProvider, reconnectEdge, useReactFlow, type Connection, type NodeChange, type EdgeChange, type EdgeProps } from "@xyflow/react";
import { IconCopy, IconDots, IconPlus, IconArrowForwardUp, IconTrash, IconArrowBackUp, IconX } from "@tabler/icons-react";
import { flowNodeTypes } from "@/components/blocks/application/flow/flow-node";
import type { FlowEdge, FlowNode, FlowNodeData } from "@/components/blocks/application/flow/flow-types";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/dialog/alert-dialog";
import { Button } from "@/components/ui/button/button";
import { Input } from "@/components/ui/input/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tab/tabs";
import { toast } from "sonner";

export type FlowCanvasApi = {
  nodes: FlowNode[];
  edges: FlowEdge[];
  setNodes: Dispatch<SetStateAction<FlowNode[]>>;
  setEdges: Dispatch<SetStateAction<FlowEdge[]>>;
  addNode: (data?: Partial<FlowNodeData>, afterId?: string) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  fitView: () => void;
  layout: (direction?: "TB" | "LR") => void;
  locked: boolean;
  toggleLock: () => void;
  dirty: boolean;
  markSaved: () => void;
  addStepOnEdge: (edgeId: string) => void;
};

type FlowSnapshot = { nodes: FlowNode[]; edges: FlowEdge[] };

type Props = {
  initialNodes: FlowNode[];
  initialEdges: FlowEdge[];
  direction?: "TB" | "LR";
  minMap?: boolean;
  showHistory?: boolean;
  inspectorTabs?: string[];
  toolbar?: (api: FlowCanvasApi) => ReactNode;
  inspectorExtras?: (node: FlowNode, api: FlowCanvasApi) => ReactNode;
  heightClassName?: string;
  onConnectAttempt?: (connection: Connection, edges: FlowEdge[]) => string | undefined;
  lockedNodeIds?: string[];
  locked?: boolean;
  snapToGrid?: boolean;
  initialSelectedId?: string;
  breadcrumbLabel?: string;
  title?: string;
  addButtonLabel?: string | false;
  summaryLabel?: string;
  showCounts?: boolean;
  autoLayoutOnMount?: boolean;
  addStepOnEdges?: boolean;
};

function FlowConnectorEdge({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, markerEnd, style, label, labelStyle, data }: EdgeProps<FlowEdge>) {
  const [edgePath, labelX, labelY] = getSmoothStepPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition });
  return <>
    <BaseEdge id={id} path={edgePath} markerEnd={markerEnd} style={style} />
    <EdgeLabelRenderer><div className="pointer-events-none absolute left-0 top-0" style={{ transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)` }}>
      {label && <span className="pointer-events-auto rounded bg-background px-1.5 py-0.5 text-[10px] text-muted-foreground" style={labelStyle}>{label}</span>}
      {data?.addStep && <button type="button" aria-label="Add step to connection" className="nodrag nopan pointer-events-auto absolute left-1/2 top-1/2 grid size-5 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border bg-background text-muted-foreground opacity-0 shadow-sm motion-safe:transition-opacity motion-reduce:transition-none hover:text-foreground hover:opacity-100 focus-visible:opacity-100" onClick={data.addStep}><IconPlus className="size-3" /></button>}
    </div></EdgeLabelRenderer>
  </>;
}

const flowEdgeTypes = { flowConnector: FlowConnectorEdge };

function autoLayout(nodes: FlowNode[], edges: FlowEdge[], direction: "TB" | "LR") {
  const graph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
  graph.setGraph({ rankdir: direction, nodesep: 64, ranksep: 92, marginx: 40, marginy: 40 });
  for (const node of nodes) graph.setNode(node.id, { width: node.width ?? 248, height: node.height ?? 94 });
  for (const edge of edges) graph.setEdge(edge.source, edge.target);
  dagre.layout(graph);
  return nodes.map((node) => {
    const position = graph.node(node.id);
    return { ...node, position: { x: position.x - (node.width ?? 248) / 2, y: position.y - (node.height ?? 94) / 2 } };
  });
}

function FlowCanvasContent({ initialNodes, initialEdges, direction = "LR", minMap = true, showHistory = false, inspectorTabs = ["Settings"], toolbar, inspectorExtras, heightClassName = "h-[680px] sm:h-[740px]", onConnectAttempt, lockedNodeIds = [], locked: initialLocked = false, snapToGrid = true, initialSelectedId, breadcrumbLabel, title, addButtonLabel, summaryLabel, showCounts = true, autoLayoutOnMount = false, addStepOnEdges = false }: Props) {
  const [nodes, setNodes] = useState(() => autoLayoutOnMount ? autoLayout(initialNodes, initialEdges, direction) : initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [selectedId, setSelectedId] = useState<string | undefined>(initialSelectedId);
  const [activeInspectorTab, setActiveInspectorTab] = useState(inspectorTabs[0]);
  const [deleteId, setDeleteId] = useState<string>();
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; id: string }>();
  const [branchError, setBranchError] = useState("");
  const [linkTarget, setLinkTarget] = useState("");
  const [locked, setLocked] = useState(initialLocked);
  const [dirty, setDirty] = useState(false);
  const [past, setPast] = useState<FlowSnapshot[]>([]);
  const [future, setFuture] = useState<FlowSnapshot[]>([]);
  const reactFlow = useReactFlow<FlowNode, FlowEdge>();
  const selectedNode = nodes.find((node) => node.id === selectedId);
  const nodeTypesConfig = useMemo(() => ({ nodeTypes: flowNodeTypes }), []);

  const saveNodes = useCallback((next: SetStateAction<FlowNode[]>) => {
    setNodes((current) => typeof next === "function" ? next(current) : next);
    setDirty(true);
  }, []);
  const saveEdges = useCallback((next: SetStateAction<FlowEdge[]>) => {
    setEdges((current) => typeof next === "function" ? next(current) : next);
    setDirty(true);
  }, []);
  const record = useCallback((next: FlowNode[], nextEdges: FlowEdge[] = edges) => {
    setPast((history) => [...history.slice(-49), { nodes, edges }]);
    setFuture([]);
    setNodes(next);
    setEdges(nextEdges);
    setDirty(true);
  }, [edges, nodes]);
  const addNode = useCallback((data: Partial<FlowNodeData> = {}, afterId?: string) => {
    const source = nodes.find((node) => node.id === afterId);
    const node: FlowNode = { id: `step-${Date.now()}`, type: "flowNode", position: source ? { x: source.position.x + 310, y: source.position.y + 150 } : { x: 420, y: 260 }, width: 248, height: 94, data: { kind: "step", title: "New action", subtitle: "Configure this step", icon: "bolt", status: "Idle", ...data } };
    const nextEdges = source ? [...edges, { id: `edge-${source.id}-${node.id}`, source: source.id, target: node.id, type: "smoothstep" as const }] : edges;
    record([...nodes, node], nextEdges);
    setSelectedId(node.id);
  }, [edges, nodes, record]);
  const addStepOnEdge = useCallback((edgeId: string) => {
    const edge = edges.find((candidate) => candidate.id === edgeId);
    if (!edge) return;
    const source = nodes.find((node) => node.id === edge.source);
    const target = nodes.find((node) => node.id === edge.target);
    if (!source || !target) return;
    const id = `step-${Date.now()}`;
    const kind = source.data.kind === "agent" ? "agent" : source.data.kind === "task" ? "task" : "step";
    const node: FlowNode = { id, type: "flowNode", position: { x: (source.position.x + target.position.x) / 2, y: (source.position.y + target.position.y) / 2 }, width: 248, height: 94, data: { kind, title: "New step", subtitle: "Configure this step", icon: "bolt", status: "Idle" } };
    const nextEdges = edges.flatMap((candidate) => candidate.id === edgeId ? [{ ...candidate, target: id }, { id: `edge-${id}-${target.id}`, source: id, target: target.id, type: "smoothstep" as const }] : [candidate]);
    record([...nodes, node], nextEdges);
    setSelectedId(id);
  }, [edges, nodes, record]);
  const undo = useCallback(() => {
    setPast((history) => {
      if (!history.length) return history;
      setFuture((later) => [{ nodes, edges }, ...later]);
      setNodes(history[history.length - 1].nodes);
      setEdges(history[history.length - 1].edges);
      setDirty(true);
      return history.slice(0, -1);
    });
  }, [edges, nodes]);
  const redo = useCallback(() => {
    setFuture((history) => {
      if (!history.length) return history;
      setPast((older) => [...older, { nodes, edges }]);
      setNodes(history[0].nodes);
      setEdges(history[0].edges);
      setDirty(true);
      return history.slice(1);
    });
  }, [edges, nodes]);
  const fitView = useCallback(() => { void reactFlow.fitView({ padding: 0.24, duration: 250 }); }, [reactFlow]);
  const toggleLock = useCallback(() => setLocked((value) => !value), []);
  const layout = useCallback((rankdir: "TB" | "LR" = direction) => { record(autoLayout(nodes, edges, rankdir)); requestAnimationFrame(fitView); }, [direction, edges, fitView, nodes, record]);
  const api: FlowCanvasApi = { nodes, edges, setNodes: saveNodes, setEdges: saveEdges, addNode, undo, redo, canUndo: past.length > 0, canRedo: future.length > 0, fitView, layout, locked, toggleLock, dirty, markSaved: () => setDirty(false), addStepOnEdge };
  const renderedEdges = addStepOnEdges ? edges.map((edge) => ({ ...edge, type: "flowConnector", data: { ...edge.data, addStep: () => addStepOnEdge(edge.id) } })) : edges;
  const onNodesChange = useCallback((changes: NodeChange<FlowNode>[]) => {
    if (changes.some((change) => change.type === "position" && !change.dragging)) {
      setPast((history) => [...history.slice(-49), { nodes, edges }]);
      setFuture([]);
      setDirty(true);
    }
    setNodes((current) => applyNodeChanges(changes, current) as FlowNode[]);
  }, [edges, nodes]);
  const onEdgesChange = useCallback((changes: EdgeChange<FlowEdge>[]) => setEdges((current) => applyEdgeChanges(changes, current) as FlowEdge[]), []);
  const onConnect = useCallback((connection: Connection) => {
    const error = onConnectAttempt?.(connection, edges);
    if (error) { toast.warning(error); return; }
    record(nodes, addEdge({ ...connection, type: "smoothstep", animated: false }, edges));
  }, [edges, nodes, onConnectAttempt, record]);
  const onReconnect = useCallback((oldEdge: FlowEdge, connection: Connection) => {
    const error = onConnectAttempt?.(connection, edges.filter((edge) => edge.id !== oldEdge.id));
    if (error) { toast.warning(error); return; }
    record(nodes, reconnectEdge(oldEdge, connection, edges));
  }, [edges, nodes, onConnectAttempt, record]);
  const updateNode = (patch: Partial<FlowNodeData>) => {
    if (!selectedId) return;
    if (patch.branch) {
      const duplicate = nodes.some((node) => node.id !== selectedId && node.data.branch?.toLowerCase() === patch.branch?.toLowerCase());
      if (duplicate) { setBranchError("This branch name is already in use."); return; }
      setBranchError("");
    }
    record(nodes.map((node) => node.id === selectedId ? { ...node, data: { ...node.data, ...patch } } : node), edges);
  };
  const runDelete = () => {
    if (!deleteId) return;
    record(nodes.filter((node) => node.id !== deleteId), edges.filter((edge) => edge.source !== deleteId && edge.target !== deleteId));
    setSelectedId(undefined);
    setDeleteId(undefined);
  };
  const duplicate = (id: string) => {
    const source = nodes.find((node) => node.id === id);
    if (!source) return;
    const node = { ...source, id: `${source.id}-copy-${Date.now()}`, position: { x: source.position.x + 32, y: source.position.y + 130 }, data: { ...source.data, title: `${source.data.title} copy` } };
    record([...nodes, node], edges);
    setSelectedId(node.id);
    setContextMenu(undefined);
  };
  const remove = (id: string) => {
    if (lockedNodeIds.includes(id)) { toast.message("This gate is required by the pipeline."); return; }
    setDeleteId(id);
    setContextMenu(undefined);
  };
  useEffect(() => { const dismiss = () => setContextMenu(undefined); window.addEventListener("click", dismiss); return () => window.removeEventListener("click", dismiss); }, []);

  return (
    <div className={`relative flex w-full min-w-0 flex-col overflow-hidden rounded-lg border bg-background ${heightClassName}`} onClick={() => contextMenu && setContextMenu(undefined)}>
      <header className="z-10 flex min-h-12 flex-wrap items-center justify-between gap-2 border-b bg-background px-3 py-2">
        <div className="flex min-w-0 items-center gap-2 text-xs"><span className="text-muted-foreground">{breadcrumbLabel ?? (direction === "LR" ? "Workflows" : "Agents")}</span><span className="text-muted-foreground">›</span><strong className="truncate text-foreground">{title ?? (direction === "LR" ? "Lead Routing" : "Collections Agent")}</strong>{(summaryLabel || showCounts) && <span className="hidden text-muted-foreground sm:inline">{summaryLabel ?? `${nodes.length} steps, ${edges.length} connections`}</span>}</div>
        <div className="flex shrink-0 items-center gap-1">{showHistory && <><Button size="icon-sm" variant="ghost" disabled={!api.canUndo} aria-label="Undo" onClick={api.undo}><IconArrowBackUp /></Button><Button size="icon-sm" variant="ghost" disabled={!api.canRedo} aria-label="Redo" onClick={api.redo}><IconArrowForwardUp /></Button><span className="mx-1 h-5 border-l" /></>}{toolbar?.(api)}{addButtonLabel !== false && (addButtonLabel || direction !== "TB") && <Button size="sm" disabled={locked} onClick={() => addNode()}><IconPlus /> {typeof addButtonLabel === "string" ? addButtonLabel : "Add step"}</Button>}</div>
      </header>
      <div className="relative min-h-0 flex-1" onContextMenu={(event) => { if ((event.target as HTMLElement).closest(".react-flow__node")) return; event.preventDefault(); }}>
        <ReactFlow nodes={nodes} edges={renderedEdges} nodeTypes={nodeTypesConfig.nodeTypes} edgeTypes={flowEdgeTypes} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} onConnect={onConnect} onReconnect={onReconnect} onNodeClick={(_, node) => { setSelectedId(node.id); setContextMenu(undefined); }} onPaneClick={() => { setSelectedId(undefined); setContextMenu(undefined); }} onNodeContextMenu={(event, node) => { event.preventDefault(); setSelectedId(node.id); setContextMenu({ x: event.clientX, y: event.clientY, id: node.id }); }} onNodeDoubleClick={(_, node) => setSelectedId(node.id)} connectionLineType={ConnectionLineType.SmoothStep} connectOnClick defaultEdgeOptions={{ type: "smoothstep", style: { stroke: "var(--border)", strokeWidth: 1.5 }, labelStyle: { fill: "var(--muted-foreground)", fontSize: 10 }, labelBgStyle: { fill: "var(--background)" } }} snapToGrid={snapToGrid && !locked} snapGrid={[16, 16]} nodesDraggable={!locked} nodesConnectable={!locked} fitView fitViewOptions={{ padding: 0.22 }} minZoom={0.25} maxZoom={1.5}>
          <Background variant={BackgroundVariant.Dots} gap={18} size={1} color="var(--border)" />
          <Controls position="bottom-left" orientation="horizontal" showInteractive onInteractiveChange={(interactive) => setLocked(!interactive)} />
          {minMap && <MiniMap position="bottom-right" pannable zoomable nodeColor={(node) => { const data = node.data as FlowNodeData; return data.status === "Failed" || data.status === "Blocked" ? "var(--destructive)" : data.status === "Success" || data.status === "Passed" ? "var(--chart-2)" : "var(--muted-foreground)"; }} maskColor="color-mix(in srgb, var(--background) 75%, transparent)" />}
        </ReactFlow>
        {contextMenu && <div className="fixed z-[80] min-w-44 rounded-lg border bg-popover p-1 text-popover-foreground shadow-lg" style={{ left: contextMenu.x, top: contextMenu.y }} onClick={(event) => event.stopPropagation()}><button className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm hover:bg-muted" onClick={() => { addNode({}, contextMenu.id); setContextMenu(undefined); }}><IconPlus className="size-4" />Add step after</button><button className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm hover:bg-muted" onClick={() => duplicate(contextMenu.id)}><IconCopy className="size-4" />Duplicate</button><button className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm hover:bg-muted" onClick={() => { setSelectedId(contextMenu.id); setContextMenu(undefined); }}><IconDots className="size-4" />Edit details</button><button className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm text-destructive hover:bg-destructive/10" onClick={() => remove(contextMenu.id)}><IconTrash className="size-4" />Delete</button></div>}
        {selectedNode && <aside className="absolute inset-2 z-20 flex flex-col overflow-hidden rounded-xl border bg-popover text-popover-foreground shadow-xl sm:inset-y-2 sm:left-auto sm:right-2 sm:w-[340px]">
          <header className="flex items-center gap-2 border-b p-3"><span className="min-w-0 flex-1"><span className="block truncate text-sm font-semibold">{selectedNode.data.title}</span><span className="block text-xs text-muted-foreground">{selectedNode.data.status ?? selectedNode.data.kind}</span></span><Button variant="ghost" size="icon-sm" aria-label="Close inspector" onClick={() => setSelectedId(undefined)}><IconX /></Button></header>
          <Tabs value={activeInspectorTab} onValueChange={setActiveInspectorTab} className="min-h-0 flex-1 gap-0"><TabsList variant="line" className="h-10 w-full justify-start rounded-none border-b px-3">{inspectorTabs.map((tab) => <TabsTrigger key={tab} value={tab} className="flex-none px-3">{tab}</TabsTrigger>)}</TabsList><div className="min-h-0 flex-1 overflow-y-auto p-3">
            {activeInspectorTab === "Links" || activeInspectorTab === "Wiring" ? <section className="space-y-3"><h3 className="text-xs font-semibold">{activeInspectorTab === "Wiring" ? "Task dependencies" : "Connected steps"}</h3>{edges.filter((edge) => edge.source === selectedNode.id || edge.target === selectedNode.id).map((edge) => { const neighborId = edge.source === selectedNode.id ? edge.target : edge.source; return <div key={edge.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2 rounded-lg border p-2 text-xs"><Select value={neighborId} onValueChange={(nextId) => { const connection: Connection = edge.source === selectedNode.id ? { source: selectedNode.id, target: nextId, sourceHandle: edge.sourceHandle ?? null, targetHandle: edge.targetHandle ?? null } : { source: nextId, target: selectedNode.id, sourceHandle: edge.sourceHandle ?? null, targetHandle: edge.targetHandle ?? null }; const remainingEdges = edges.filter((candidate) => candidate.id !== edge.id); const error = onConnectAttempt?.(connection, remainingEdges); if (error) { toast.warning(error); return; } record(nodes, edges.map((candidate) => candidate.id === edge.id ? { ...candidate, ...connection } : candidate)); toast.success("Link updated"); }}><SelectTrigger className="h-8 min-w-0"><SelectValue /></SelectTrigger><SelectContent>{nodes.filter((node) => node.id !== selectedNode.id).map((node) => <SelectItem key={node.id} value={node.id}>{node.data.title}</SelectItem>)}</SelectContent></Select><span className="text-muted-foreground">{edge.label ?? "Connected"}</span></div>; })}{!edges.some((edge) => edge.source === selectedNode.id || edge.target === selectedNode.id) && <p className="text-xs text-muted-foreground">No linked steps yet.</p>}<div className="grid gap-2 border-t pt-3"><label className="grid gap-1.5 text-xs font-medium">Connect to<Select value={linkTarget} onValueChange={setLinkTarget}><SelectTrigger><SelectValue placeholder="Choose a step" /></SelectTrigger><SelectContent>{nodes.filter((node) => node.id !== selectedNode.id).map((node) => <SelectItem key={node.id} value={node.id}>{node.data.title}</SelectItem>)}</SelectContent></Select></label><Button size="sm" variant="outline" disabled={!linkTarget} onClick={() => { const connection: Connection = { source: selectedNode.id, target: linkTarget, sourceHandle: null, targetHandle: null }; const error = onConnectAttempt?.(connection, edges); if (error) { toast.warning(error); return; } record(nodes, addEdge({ ...connection, type: "smoothstep" }, edges)); setLinkTarget(""); toast.success("Steps linked"); }}>Add link</Button></div></section> : <div className="space-y-3"><label className="grid gap-1.5 text-xs font-medium">Title<Input value={selectedNode.data.title} onChange={(event) => updateNode({ title: event.target.value })} /></label>{selectedNode.data.subtitle !== undefined && <label className="grid gap-1.5 text-xs font-medium">Details<Input value={selectedNode.data.subtitle ?? ""} onChange={(event) => updateNode({ subtitle: event.target.value })} /></label>}{selectedNode.data.branch !== undefined && <label className="grid gap-1.5 text-xs font-medium">Branch name<Input value={selectedNode.data.branch} onChange={(event) => updateNode({ branch: event.target.value })} aria-invalid={Boolean(branchError)} />{branchError && <span className="text-destructive">{branchError}</span>}</label>}{selectedNode.data.status && <label className="grid gap-1.5 text-xs font-medium">Status<Select value={selectedNode.data.status} onValueChange={(value) => updateNode({ status: value as FlowNodeData["status"] })}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{["Success", "Failed", "Idle", "Skipped", "Passed", "Waiting", "Blocked", "In progress", "To do"].map((status) => <SelectItem key={status} value={status}>{status}</SelectItem>)}</SelectContent></Select></label>}{inspectorExtras?.(selectedNode, api)}</div>}
          </div></Tabs>
          <footer className="flex items-center justify-between gap-2 border-t p-3"><Button variant="outline" size="sm" onClick={() => remove(selectedNode.id)} disabled={lockedNodeIds.includes(selectedNode.id)}><IconTrash /> Delete</Button><Button size="sm" onClick={() => { setSelectedId(undefined); toast.success("Changes saved"); }}>Save changes</Button></footer>
        </aside>}
      </div>
      <AlertDialog open={Boolean(deleteId)} onOpenChange={(open) => !open && setDeleteId(undefined)}><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Delete this step?</AlertDialogTitle><AlertDialogDescription>This step and its connections will be removed from the canvas.</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction variant="destructive" onClick={runDelete}>Delete step</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog>
    </div>
  );
}

export function FlowCanvas(props: Props) {
  return <ReactFlowProvider><FlowCanvasContent {...props} /></ReactFlowProvider>;
}
