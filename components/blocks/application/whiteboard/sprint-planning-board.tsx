"use client";

import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { DndContext, KeyboardSensor, PointerSensor, closestCenter, useDraggable, useDroppable, useSensor, useSensors, type DragEndEvent } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { toast } from "sonner";
import { IconCheck, IconCopy, IconDownload, IconFileImport, IconGripVertical, IconLayoutBoard, IconMessageCircle, IconPresentation, IconShare3, IconUsers, IconX } from "@tabler/icons-react";
import { sceneCoordsToViewportCoords } from "@excalidraw/excalidraw";
import type { OrderedExcalidrawElement } from "@excalidraw/excalidraw/element/types";
import type { Zoom } from "@excalidraw/excalidraw/types";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar/avatar";
import { Badge } from "@/components/ui/badge/badge";
import { Button } from "@/components/ui/button/button";
import { WhiteboardEditor, exportBoard, openBoardFile, saveBoardFile, type BoardApi } from "@/components/blocks/application/whiteboard/excalidraw-editor";
import { createSprintScene, initialSprintTasks, sprintLanes, type SprintLane, type SprintLaneId, type SprintTask } from "@/components/blocks/application/whiteboard/whiteboard-data";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown/dropdown-menu";
import { demoAvatarUrl } from "@/utils/demo-avatar";

type SidebarTab = "plan" | "log";
type Decision = { id: string; text: string; author: string; time: string; taskId?: string };
type BoardViewport = { scrollX: number; scrollY: number; zoom: Zoom; offsetLeft: number; offsetTop: number };
type CardPosition = { x: number; y: number; width: number; height: number };
const decisionStorageKey = "nextrose-whiteboard-sprint-decisions-v2";
const taskStorageKey = "nextrose-whiteboard-sprint-tasks-v2";
const people = [
  { name: "Omar Farouk", initials: "OF", tone: "bg-primary text-primary-foreground" },
  { name: "Sofia Marino", initials: "SM", tone: "bg-success text-success-foreground" },
  { name: "Emma Lindgren", initials: "EL", tone: "bg-info text-info-foreground" },
];
const laneTones: Record<SprintLaneId, string> = {
  "express-pay": "#dbeafe",
  receipts: "#dcfce7",
  "offline-research": "#ede9fe",
  parked: "#f8fafc",
};

export function SprintPlanningBoard() {
  const prefersReducedMotion = useReducedMotion();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [api, setApi] = useState<BoardApi | null>(null);
  const [boardViewport, setBoardViewport] = useState<BoardViewport | null>(null);
  const [canvasOrigin, setCanvasOrigin] = useState({ left: 0, top: 0 });
  const canvasStageRef = useRef<HTMLElement>(null);
  const [saveState, setSaveState] = useState<"ready" | "saving" | "saved">("ready");
  const [tasks, setTasks] = useState<SprintTask[]>(readTasks);
  const [cardPositions, setCardPositions] = useState<Record<string, CardPosition>>({});
  const [laneCapacities, setLaneCapacities] = useState<Record<SprintLaneId, number>>(() => Object.fromEntries(sprintLanes.map((lane) => [lane.id, lane.capacity])) as Record<SprintLaneId, number>);
  const [selectedTask, setSelectedTask] = useState("SP-241");
  const [activeTab, setActiveTab] = useState<SidebarTab>("plan");
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(() => typeof window === "undefined" || window.innerWidth >= 1024);
  const [presenting, setPresenting] = useState(false);
  const [following, setFollowing] = useState<string | null>(null);
  const [vote, setVote] = useState<number | null>(null);
  const [decisionText, setDecisionText] = useState("");
  const [decisions, setDecisions] = useState<Decision[]>(() => readDecisions([
    { id: "d-1", text: "Keep the receipt QR code in the emailed and printed versions.", author: "Sofia Marino", time: "10:24" },
    { id: "d-2", text: "Verify the Apple Pay domain before enabling the rollout flag.", author: "Omar Farouk", time: "10:18" },
  ]));
  const [seed] = useState(() => createSprintScene());
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }), useSensor(KeyboardSensor));
  const selected = tasks.find((task) => task.id === selectedTask) ?? tasks[0];
  const filteredTasks = tasks.filter((task) => `${task.id} ${task.title} ${task.owner}`.toLowerCase().includes(search.toLowerCase()));
  const committed = tasks.filter((task) => task.lane !== "parked").reduce((sum, task) => sum + task.points, 0);
  const lanes = sprintLanes.map((lane) => ({ ...lane, capacity: laneCapacities[lane.id] }));
  const totalCapacity = lanes.filter((lane) => lane.id !== "parked").reduce((sum, lane) => sum + lane.capacity, 0);
  const consensus = selected ? median(selected.votes) : 0;
  const hasOutlier = selected ? selected.votes.some((points) => Math.abs(points - consensus) >= 3) : false;
  const reportBoardViewport = useCallback((scrollX: number, scrollY: number, zoom: Zoom, offsetLeft: number, offsetTop: number) => {
    setBoardViewport({ scrollX, scrollY, zoom, offsetLeft, offsetTop });
  }, []);

  const readCanvasTasks = useCallback((elements: readonly OrderedExcalidrawElement[]) => {
    if (!elements.length) return;
    const nextPositions = Object.fromEntries(elements.flatMap((element) => {
      if (element.type !== "rectangle" || element.customData?.boardItemPart !== "card" || typeof element.customData?.boardItemId !== "string") return [];
      const taskId = element.customData.boardItemId.replace(/^task-/, "");
      return [[taskId, { x: element.x, y: element.y, width: element.width, height: element.height }]];
    }));
    setCardPositions((current) => {
      const ids = Object.keys(nextPositions);
      if (ids.length === Object.keys(current).length && ids.every((id) => {
        const previous = current[id];
        const next = nextPositions[id] as CardPosition;
        return previous && previous.x === next.x && previous.y === next.y && previous.width === next.width && previous.height === next.height;
      })) return current;
      return nextPositions as Record<string, CardPosition>;
    });
    const frameElements = elements.filter((element) => element.type === "frame");
    setLaneCapacities((current) => {
      const next = { ...current };
      for (const element of frameElements) {
        const lane = sprintLanes.find((item) => item.title === element.name);
        const capacity = element.customData?.capacity;
        if (lane && typeof capacity === "number" && Number.isFinite(capacity) && capacity >= 0) next[lane.id] = capacity;
      }
      return sprintLanes.every((lane) => next[lane.id] === current[lane.id]) ? current : next;
    });
    setTasks((current) => {
      const frames = frameElements;
      const laneByFrame = new Map(frames.flatMap((element) => {
        const lane = sprintLanes.find((item) => item.title === element.name);
        return lane ? [[element.id, lane.id] as const] : [];
      }));
      const sceneTasks = new Map<string, Partial<SprintTask>>();
      for (const shape of elements) {
        const part = shape.customData?.boardItemPart;
        if (shape.type !== "rectangle" || typeof shape.customData?.boardItemId !== "string" || (part !== undefined && part !== "card")) continue;
        const taskId = shape.customData.boardItemId.replace(/^task-/, "");
        if (!current.some((task) => task.id === taskId)) continue;
        const label = elements.find((element) => element.type === "text" && element.customData?.boardItemId === shape.customData?.boardItemId && (element.customData?.boardItemPart === "label" || element.customData?.boardItemPart === undefined));
        const lines = label?.type === "text" ? label.text.split("\n").map((line) => line.trim()).filter(Boolean) : [];
        const pointMatch = lines.at(-1)?.match(/^(\d+)\s*pts?$/i);
        let lane = typeof shape.frameId === "string" ? laneByFrame.get(shape.frameId) : undefined;
        if (!lane) {
          const centerX = shape.x + shape.width / 2;
          const centerY = shape.y + shape.height / 2;
          const frame = frames.find((candidate) => centerX >= candidate.x && centerX <= candidate.x + candidate.width && centerY >= candidate.y && centerY <= candidate.y + candidate.height);
          lane = frame ? laneByFrame.get(frame.id) : undefined;
        }
        sceneTasks.set(taskId, {
          lane,
          title: lines[0] && !/^\d+\s*pts?$/i.test(lines[0]) ? lines[0] : undefined,
          points: pointMatch ? Number(pointMatch[1]) : undefined,
          owner: lines.length >= 3 ? lines[1] : undefined,
        });
      }
      const next = current.flatMap((task) => {
        const sceneTask = sceneTasks.get(task.id);
        if (!sceneTask) return [];
        const updated = { ...task, ...Object.fromEntries(Object.entries(sceneTask).filter(([, value]) => value !== undefined)) } as SprintTask;
        if (sceneTask.lane) updated.tone = laneTones[sceneTask.lane];
        return [updated];
      });
      return next.length === current.length && next.every((task, index) => task.lane === current[index].lane && task.title === current[index].title && task.points === current[index].points && task.owner === current[index].owner) ? current : next;
    });
  }, []);

  useEffect(() => {
    const stage = canvasStageRef.current;
    if (!stage) return;
    const measure = () => {
      const bounds = stage.getBoundingClientRect();
      setCanvasOrigin({ left: bounds.left, top: bounds.top });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  const syncCanvas = useCallback((nextTasks: SprintTask[]) => {
    if (!api) return;
    const fallbackFrameOffsets: Record<SprintLaneId, { x: number; y: number; width: number }> = {
      "express-pay": { x: 55, y: 363, width: 185 }, receipts: { x: 295, y: 363, width: 185 }, "offline-research": { x: 535, y: 363, width: 185 }, parked: { x: 775, y: 363, width: 170 },
    };
    const elements = api.getSceneElements().filter((element) => element.customData?.boardItemPart !== "avatar" && element.customData?.boardItemPart !== "avatar-label");
    const frameIds = new Map<SprintLaneId, string>();
    sprintLanes.forEach((lane) => {
      const frame = elements.find((element) => element.type === "frame" && "name" in element && element.name === lane.title);
      if (frame) frameIds.set(lane.id, frame.id);
    });
    const frameOffsets = Object.fromEntries(sprintLanes.map((lane) => {
      const frame = elements.find((element) => element.type === "frame" && "name" in element && element.name === lane.title);
      return [lane.id, frame ? { x: frame.x + 15, y: frame.y + 28, width: frame.width - 30 } : fallbackFrameOffsets[lane.id]];
    })) as Record<SprintLaneId, { x: number; y: number; width: number }>;
    const taskPosition = new Map<string, { x: number; y: number; width: number }>();
    for (const lane of sprintLanes) {
      nextTasks.filter((task) => task.lane === lane.id).forEach((task, index) => {
        taskPosition.set(task.id, { x: frameOffsets[lane.id].x, y: frameOffsets[lane.id].y + index * 70, width: frameOffsets[lane.id].width });
      });
    }
    const updatedElements = elements.map((element) => {
      if (element.type === "frame") {
        const lane = sprintLanes.find((item) => item.title === element.name);
        if (!lane) return element;
        const laneTasks = nextTasks.filter((task) => task.lane === lane.id);
        const owner = laneTasks.length ? [...new Set(laneTasks.map((task) => task.owner.split(" ")[0]))].join(", ") : "Unassigned";
        return { ...element, customData: { ...element.customData, laneId: lane.id, capacity: laneCapacities[lane.id], owner } };
      }
      const boardItemId = element.customData?.boardItemId;
      const task = nextTasks.find((item) => `task-${item.id}` === boardItemId);
      if (task) {
        const position = taskPosition.get(task.id);
        if (!position) return element;
        const part = element.customData?.boardItemPart;
        const offsets: Record<string, { x: number; y: number }> = {
          card: { x: 0, y: 0 },
          "presence-outline": { x: -4, y: -4 },
          "presence-tag": { x: 105, y: -16 },
          "presence-label": { x: 109, y: -13 },
        };
        const legacyCardElement = part === undefined;
        const offset = part === "label" ? { x: position.width / 2, y: 8 } : offsets[String(part)] ?? (legacyCardElement && element.type === "text" ? { x: 9, y: 8 } : { x: 0, y: 0 });
        const offsetX = offset.x;
        const offsetY = offset.y;
        const groupParts = ["card", "label", "presence-outline", "presence-tag", "presence-label"];
        const groupIds = groupParts.includes(String(part)) ? [...new Set([...element.groupIds, `task-${task.id}`])] : element.groupIds;
        const next = { ...element, x: position.x + offsetX, y: position.y + offsetY, frameId: frameIds.get(task.lane) ?? null, groupIds };
        if (part === "card" && next.type === "rectangle") return { ...next, backgroundColor: task.tone, strokeColor: task.tone };
        if (part === "label") return { ...next, text: `${task.title}\n${task.points} pts` };
        if (part === "avatar-label") return { ...next, text: task.initials };
        if (legacyCardElement && element.type === "text") return { ...next, text: `${task.title}\n${task.owner}\n${task.points} pts` };
        return next;
      }
      return element;
    });
    api.updateScene({ elements: updatedElements });
  }, [api, laneCapacities]);

  useEffect(() => syncCanvas(tasks), [syncCanvas, tasks]);
  useEffect(() => {
    try {
      window.localStorage.setItem(taskStorageKey, JSON.stringify(tasks));
    } catch {
      toast.error("Sprint changes could not be saved in this browser.");
    }
  }, [tasks]);
  useEffect(() => {
    try {
      window.localStorage.setItem(decisionStorageKey, JSON.stringify(decisions));
    } catch {
      toast.error("Decisions could not be saved in this browser.");
    }
  }, [decisions]);

  const updateTasks = (updater: (current: SprintTask[]) => SprintTask[]) => {
    setTasks(updater);
  };

  const moveTask = ({ active, over }: DragEndEvent) => {
    if (!over || !sprintLanes.some((lane) => lane.id === over.id)) return;
    const targetLane = over.id as SprintLaneId;
    updateTasks((current) => current.map((task) => task.id === active.id ? { ...task, lane: targetLane, tone: laneTones[targetLane] } : task));
  };

  const addDecision = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const text = decisionText.trim();
    if (!text) return;
    setDecisions((current) => [{ id: crypto.randomUUID(), text, author: "You", time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), taskId: selected?.id }, ...current]);
    setDecisionText("");
    toast.success("Decision added to this planning session");
  };

  const castVote = (points: number) => {
    if (!selected) return;
    setVote(points);
    updateTasks((current) => current.map((task) => task.id === selected.id ? { ...task, votes: [...task.votes.slice(0, 2), points] } : task));
    toast.success(`Vote recorded for ${selected.id}`);
  };

  const applyConsensus = () => {
    if (!selected) return;
    updateTasks((current) => current.map((task) => task.id === selected.id ? { ...task, points: consensus } : task));
    toast.success(`${selected.id} set to ${consensus} points`);
  };

  const copyPlan = async () => {
    const summary = [
      "# Sprint 42 plan",
      ...lanes.map((lane) => `\n## ${lane.title} · ${lanePoints(tasks, lane)}/${lane.capacity || "—"} pts\n${tasks.filter((task) => task.lane === lane.id).map((task) => `- ${task.id} · ${task.title} (${task.points} pts, ${task.owner})`).join("\n") || "- No tickets"}`),
      "\n## Decisions",
      ...decisions.map((decision) => `- ${decision.text} — ${decision.author}`),
    ].join("\n");
    try {
      await navigator.clipboard.writeText(summary);
      toast.success("Sprint plan copied as Markdown");
    } catch {
      toast.error("Clipboard access is unavailable. Select and copy the plan manually.");
    }
  };

  const avatarPositions = boardViewport ? tasks.flatMap((task) => {
    const card = cardPositions[task.id];
    if (!card) return [];
    const point = sceneCoordsToViewportCoords({ sceneX: card.x + card.width - 25, sceneY: card.y - 11 }, boardViewport);
    return [{ task, left: point.x - canvasOrigin.left, top: point.y - canvasOrigin.top, size: 26 * boardViewport.zoom.value }];
  }) : [];

  const handleOpenFile = async (file?: File) => {
    if (!presenting && file && api) await openBoardFile(api, file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const copyInvite = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Sprint board link copied");
    } catch {
      toast.error("Clipboard access is unavailable. Copy the page URL instead.");
    }
  };

  const focusTask = (taskId: string) => {
    const task = tasks.find((item) => item.id === taskId);
    if (!task) return;
    setSelectedTask(taskId);
    setVote(null);
    const elements = api?.getSceneElements().filter((element) => element.customData?.boardItemId === `task-${taskId}`) ?? [];
    if (elements.length) api?.scrollToContent(elements, { fitToContent: true, animate: true });
  };

  const followPerson = (name: string) => {
    if (following === name) {
      setFollowing(null);
      return;
    }
    setFollowing(name);
    const task = tasks.find((item) => item.owner === name);
    if (task) focusTask(task.id);
  };

  const togglePresentation = () => {
    if (presenting) {
      setPresenting(false);
      return;
    }
    if (selected) focusTask(selected.id);
    setPresenting(true);
  };
  const presentationFrame = presenting ? sprintLanes.find((lane) => lane.id === selected?.lane)?.title : undefined;

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col overflow-hidden bg-background">
      <header className="flex h-12 shrink-0 items-center justify-between gap-3 border-b px-4">
        <div className="flex min-w-0 flex-1 items-center gap-2"><h1 className="truncate text-sm font-medium">Sprint 42 Planning</h1><span className="hidden text-xs text-muted-foreground lg:inline">· Sep 28 to Oct 9</span><span className="inline-flex shrink-0 items-center gap-1.5 text-xs text-muted-foreground"><IconCheck className="size-3.5" /><span className="hidden sm:inline">{saveState === "saving" ? "Saving…" : "Saved"}</span></span></div>
        <div className="flex shrink-0 items-center gap-0.5 sm:gap-1">
          <div className="hidden -space-x-2 lg:flex" aria-label="Demo planning participants">{people.map((person) => <button key={person.initials} type="button" className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" title={`${following === person.name ? "Stop following" : "Follow"} ${person.name}`} aria-label={`${following === person.name ? "Stop following" : "Follow"} ${person.name}`} aria-pressed={following === person.name} onClick={() => followPerson(person.name)}><Avatar className={`size-7 border-2 border-background ${following === person.name ? "ring-2 ring-primary ring-offset-1" : ""}`}><AvatarFallback className={`text-[9px] ${person.tone}`}>{person.initials}</AvatarFallback></Avatar></button>)}</div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild><Button variant={following ? "secondary" : "ghost"} size="icon-sm" className="lg:hidden" aria-label="Follow a participant" aria-pressed={Boolean(following)}><IconUsers /></Button></DropdownMenuTrigger>
            <DropdownMenuContent align="end">{people.map((person) => <DropdownMenuItem key={person.name} onSelect={() => followPerson(person.name)}><Avatar className="size-6"><AvatarFallback className={`text-[9px] ${person.tone}`}>{person.initials}</AvatarFallback></Avatar><span>{following === person.name ? `Stop following ${person.name}` : `Follow ${person.name}`}</span>{following === person.name && <IconCheck className="ml-auto size-4" />}</DropdownMenuItem>)}</DropdownMenuContent>
          </DropdownMenu>
          {following && <span className="hidden text-[11px] text-muted-foreground lg:inline">Following {following.split(" ")[0]}</span>}
          <Button variant="outline" size="sm" className="px-2 lg:px-3" aria-label="Invite to board" onClick={() => void copyInvite()}><IconShare3 /><span className="hidden lg:inline">Invite</span></Button>
          <Button variant={presenting ? "secondary" : "outline"} size="sm" className="px-2 lg:px-3" aria-pressed={presenting} aria-label={presenting ? "Stop presenting" : "Present board"} onClick={togglePresentation}><IconPresentation /><span className="hidden lg:inline">{presenting ? "Presenting" : "Present"}</span></Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild><Button variant="ghost" size="icon-sm" aria-label="Export board"><IconDownload /></Button></DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem disabled={!api} onSelect={() => api && void exportBoard(api, "png", "sprint-42-planning")}>Export PNG</DropdownMenuItem>
              <DropdownMenuItem disabled={!api} onSelect={() => api && void exportBoard(api, "svg", "sprint-42-planning")}>Export SVG</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem disabled={!api} onSelect={() => api && saveBoardFile(api, "sprint-42-planning")}>Save board file</DropdownMenuItem>
              <DropdownMenuItem disabled={presenting} onSelect={() => fileInputRef.current?.click()}><IconFileImport />Open board file</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="ghost" size="icon-sm" aria-label={sidebarOpen ? "Hide planning panel" : "Show planning panel"} aria-pressed={sidebarOpen} onClick={() => setSidebarOpen((value) => !value)}><IconLayoutBoard /></Button>
        </div>
      </header>

      <div className="relative flex min-h-0 flex-1">
        <section ref={canvasStageRef} aria-label="Sprint planning canvas" className="relative min-h-0 min-w-0 flex-1">
          <WhiteboardEditor boardId="sprint-planning-v2" name="Sprint 42 Planning" seed={seed} onApi={setApi} onSaveState={setSaveState} onElementsChange={readCanvasTasks} onScrollChange={reportBoardViewport} presentationFrame={presentationFrame} readOnly={presenting} />
          <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden" aria-hidden="true">{avatarPositions.map(({ task, left, top, size }) => <Avatar key={task.id} data-task-avatar={task.id} className={`absolute border border-background shadow-sm motion-safe:transition-opacity motion-safe:duration-200 ${presenting && task.lane !== selected?.lane ? "opacity-60" : ""}`} style={{ left, top, width: size, height: size }}><AvatarImage src={demoAvatarUrl(task.owner)} alt="" /><AvatarFallback className={`text-[8px] ${task.lane === "express-pay" ? "bg-primary text-primary-foreground" : task.lane === "receipts" ? "bg-success text-success-foreground" : "bg-info text-info-foreground"}`}>{task.initials}</AvatarFallback></Avatar>)}</div>
        </section>
        {sidebarOpen && <aside className="absolute inset-y-0 right-0 z-20 flex w-[min(20rem,90vw)] shrink-0 flex-col border-l bg-background lg:static lg:w-[19rem]">
          <div className="flex h-11 shrink-0 items-center gap-1 border-b px-2">
            {(["plan", "log"] as SidebarTab[]).map((tab) => <button key={tab} type="button" role="tab" aria-selected={activeTab === tab} onClick={() => setActiveTab(tab)} className={`flex h-8 flex-1 items-center justify-center rounded-md text-xs font-medium transition-colors ${activeTab === tab ? "bg-muted text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>{tab === "plan" ? "Plan" : "Log"}</button>)}
            <button type="button" className="ml-1 grid size-7 place-items-center rounded-md text-muted-foreground hover:bg-muted lg:hidden" aria-label="Close planning panel" onClick={() => setSidebarOpen(false)}><IconX className="size-4" /></button>
          </div>
          <AnimatePresence initial={false} mode="wait">
          {activeTab === "plan" && <motion.div key="plan-panel" initial={prefersReducedMotion ? false : { opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={prefersReducedMotion ? undefined : { opacity: 0, y: -3 }} transition={{ duration: prefersReducedMotion ? 0 : 0.16, ease: "easeOut" }} className="min-h-0 flex-1 overflow-y-auto p-3">
            <label className="relative mb-3 block"><span className="sr-only">Find a card</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Find a card" className="h-8 w-full rounded-lg border bg-background px-3 text-xs outline-none focus-visible:ring-2 focus-visible:ring-ring" /></label>
            <div className="mb-4 px-1"><div className="flex items-center justify-between text-xs"><span className="text-muted-foreground">Committed</span><span className="font-semibold tabular-nums">{committed} of {totalCapacity} pts</span></div><div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted"><span className="block h-full rounded-full bg-foreground" style={{ width: `${Math.min(100, committed / totalCapacity * 100)}%` }} /></div><p className="mt-1.5 text-[11px] text-muted-foreground">{lanePoints(tasks, lanes[3])} pts parked</p></div>
            <h2 className="mb-1 px-1 text-[11px] font-medium text-muted-foreground">Lanes</h2>
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={moveTask}>
              <div className="grid gap-1">{lanes.map((lane) => <SprintLane key={lane.id} lane={lane} tasks={filteredTasks.filter((task) => task.lane === lane.id)} allTasks={tasks.filter((task) => task.lane === lane.id)} selectedTask={selectedTask} editable={!presenting} onSelect={focusTask} />)}</div>
            </DndContext>
            {selected && <section aria-label="Planning poker" className="mt-3 border-t pt-3">
              <div className="mb-2 flex items-center justify-between"><h2 className="text-xs font-semibold">Estimate together</h2><span className="text-[11px] text-muted-foreground">{selected.id}</span></div>
              <p className="mb-2 truncate text-[11px] text-muted-foreground">{selected.title}</p>
              <div className="flex gap-1" aria-label="Choose story points">{[1, 2, 3, 5, 8, 13].map((points) => <button key={points} type="button" disabled={presenting} aria-pressed={vote === points} onClick={() => castVote(points)} className={`grid size-7 place-items-center rounded-md border text-[11px] font-medium transition-colors disabled:opacity-50 ${vote === points ? "border-primary bg-primary text-primary-foreground" : "hover:bg-muted"}`}>{points}</button>)}</div>
              <div className="mt-2 flex items-center justify-between gap-2"><p className="truncate text-[10px] text-muted-foreground">Votes {selected.votes.join(" · ")} · median {consensus}{hasOutlier ? " · outlier" : ""}</p><Button variant="outline" size="xs" disabled={presenting} onClick={applyConsensus}>Use</Button></div>
            </section>}
            <Button variant="ghost" size="sm" className="mt-3 w-full justify-start" onClick={() => void copyPlan()}><IconCopy />Copy plan as Markdown</Button>
          </motion.div>}
          {activeTab === "log" && <motion.div key="log-panel" initial={prefersReducedMotion ? false : { opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={prefersReducedMotion ? undefined : { opacity: 0, y: -3 }} transition={{ duration: prefersReducedMotion ? 0 : 0.16, ease: "easeOut" }} className="min-h-0 flex-1 overflow-y-auto p-3">
            <div className="mb-3 flex items-center justify-between"><h2 className="flex items-center gap-2 text-xs font-semibold"><IconMessageCircle className="size-4" />Decision log</h2><Badge variant="outline" size="sm">{decisions.length}</Badge></div>
            <form onSubmit={addDecision} className="mb-3 flex gap-2"><input value={decisionText} onChange={(event) => setDecisionText(event.target.value)} aria-label="Add a decision" placeholder="Record a decision" disabled={presenting} className="h-9 min-w-0 flex-1 rounded-md border bg-background px-2.5 text-xs outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50" /><Button type="submit" size="icon-sm" aria-label="Add decision" disabled={presenting || !decisionText.trim()}><IconCheck /></Button></form>
            <ol className="grid gap-2">{decisions.map((decision) => <li key={decision.id} className="rounded-lg border p-3"><p className="text-xs leading-5">{decision.text}</p><div className="mt-2 flex items-center justify-between gap-2"><p className="text-[10px] text-muted-foreground">{decision.author} · {decision.time}</p>{decision.taskId && <button type="button" onClick={() => focusTask(decision.taskId!)} className="shrink-0 rounded px-1.5 py-1 text-[10px] font-medium text-primary hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">View {decision.taskId}</button>}</div></li>)}</ol>
            <p className="mt-4 text-[10px] text-muted-foreground">Decisions are saved in this browser and linked to the selected card.</p>
          </motion.div>}
          </AnimatePresence>
          <div className="flex h-11 shrink-0 items-center justify-between border-t px-3"><span className="text-[11px] text-muted-foreground">3 people here</span><Button variant="ghost" size="icon-sm" aria-label="Copy sprint plan" onClick={() => void copyPlan()}><IconCopy /></Button></div>
        </aside>}
      </div>
      <input ref={fileInputRef} className="sr-only" type="file" accept=".excalidraw,.json,application/json" onChange={(event) => void handleOpenFile(event.currentTarget.files?.[0])} />
    </div>
  );
}

function SprintLane({ lane, tasks, allTasks, selectedTask, onSelect, editable }: { lane: SprintLane; tasks: SprintTask[]; allTasks: SprintTask[]; selectedTask: string; onSelect: (id: string) => void; editable: boolean }) {
  const { setNodeRef, isOver } = useDroppable({ id: lane.id });
  const points = allTasks.reduce((sum, task) => sum + task.points, 0);
  const ownerSummary = lane.id === "parked" ? `${allTasks.length} cards` : [...new Set(allTasks.map((task) => task.owner.split(" ")[0]))].join(", ") || "No owner";
  return (
    <details ref={setNodeRef} className={`rounded-lg transition-colors ${isOver ? "bg-primary/5" : ""}`}>
      <summary className="list-none cursor-pointer rounded-lg px-2 py-2.5 hover:bg-muted/50 [&::-webkit-details-marker]:hidden">
        <div className="flex items-center justify-between gap-2"><span className="min-w-0 truncate text-xs font-medium">{lane.title}</span><span className="flex shrink-0 items-center gap-1.5 text-[11px] tabular-nums"><span className={lane.capacity && points > lane.capacity ? "text-destructive" : "text-muted-foreground"}>{ownerSummary} · {points}{lane.capacity ? ` of ${lane.capacity}` : ""} pts</span>{lane.capacity > 0 && points > lane.capacity && <span className="font-medium text-destructive">Over by {points - lane.capacity}</span>}</span></div>
        {lane.capacity > 0 && <div className="mt-2 h-1 overflow-hidden rounded-full bg-muted"><span className={`block h-full rounded-full ${points > lane.capacity ? "bg-destructive" : "bg-foreground"}`} style={{ width: `${Math.min(100, points / lane.capacity * 100)}%` }} /></div>}
      </summary>
      <div className="grid gap-1 px-1 pb-2">{tasks.map((task) => <DraggableTask key={task.id} task={task} selected={selectedTask === task.id} editable={editable} onSelect={() => onSelect(task.id)} />)}{!tasks.length && <p className="rounded-md border border-dashed px-2 py-2 text-center text-[11px] text-muted-foreground">No cards</p>}</div>
    </details>
  );
}

function DraggableTask({ task, selected, editable, onSelect }: { task: SprintTask; selected: boolean; editable: boolean; onSelect: () => void }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: task.id, data: { lane: task.lane }, disabled: !editable });
  const style = { transform: CSS.Translate.toString(transform) };
  return (
    <div ref={setNodeRef} style={style} className={`flex items-center gap-2 rounded-md px-1.5 py-2 transition-colors ${selected ? "bg-muted" : "hover:bg-muted/60"} ${isDragging ? "z-10 opacity-60" : ""}`}>
      <button type="button" aria-label={`Drag ${task.id}`} disabled={!editable} className="grid size-11 shrink-0 cursor-grab place-items-center touch-none text-muted-foreground active:cursor-grabbing disabled:opacity-50 sm:size-8" {...attributes} {...listeners}><IconGripVertical className="size-4" /></button>
      <button type="button" onClick={onSelect} className="min-w-0 flex-1 text-left"><span className="block truncate text-[11px] font-medium">{task.owner}</span><span className="block truncate text-[10px] text-muted-foreground">{task.title} · {task.points} pts</span></button>
      <span className="grid size-7 shrink-0 place-items-center rounded-md text-[10px] font-medium" style={{ backgroundColor: task.tone }}>{task.initials}</span>
    </div>
  );
}

function lanePoints(tasks: SprintTask[], lane: SprintLane) {
  return tasks.filter((task) => task.lane === lane.id).reduce((sum, task) => sum + task.points, 0);
}

function median(values: number[]) {
  if (!values.length) return 0;
  const sorted = [...values].sort((left, right) => left - right);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : Math.round((sorted[middle - 1] + sorted[middle]) / 2);
}

function readDecisions(fallback: Decision[]): Decision[] {
  if (typeof window === "undefined") return fallback;
  try {
    const stored = JSON.parse(window.localStorage.getItem(decisionStorageKey) ?? "null") as unknown;
    return Array.isArray(stored) ? stored as Decision[] : fallback;
  } catch {
    return fallback;
  }
}

function readTasks(): SprintTask[] {
  if (typeof window === "undefined") return initialSprintTasks;
  try {
    const savedTasks = window.localStorage.getItem(taskStorageKey);
    if (savedTasks === null) return readTaskLanesFromCanvas();
    const stored = JSON.parse(savedTasks) as unknown;
    if (!Array.isArray(stored)) return initialSprintTasks;
    const laneIds = new Set(sprintLanes.map((lane) => lane.id));
    return initialSprintTasks.flatMap((task) => {
      const saved = stored.find((item): item is Partial<SprintTask> => typeof item === "object" && item !== null && "id" in item && item.id === task.id);
      if (!saved) return [];
      return [{
        ...task,
        lane: typeof saved.lane === "string" && laneIds.has(saved.lane as SprintLaneId) ? saved.lane as SprintLaneId : task.lane,
        title: typeof saved.title === "string" ? saved.title : task.title,
        points: typeof saved.points === "number" && Number.isFinite(saved.points) && saved.points >= 0 ? saved.points : task.points,
        owner: typeof saved.owner === "string" ? saved.owner : task.owner,
        votes: Array.isArray(saved.votes) ? saved.votes.filter((vote): vote is number => typeof vote === "number" && Number.isFinite(vote) && vote >= 0) : task.votes,
      }];
    });
  } catch {
    return initialSprintTasks;
  }
}

function readTaskLanesFromCanvas(): SprintTask[] {
  try {
    const scene = JSON.parse(window.localStorage.getItem("nextrose-whiteboard-sprint-planning-v2") ?? "null") as { elements?: unknown[] } | null;
    if (!Array.isArray(scene?.elements)) return initialSprintTasks;
    const laneByFrameId = new Map<string, SprintLaneId>();
    const sceneFrames: { id: string; lane: SprintLaneId; x: number; y: number; width: number; height: number }[] = [];
    for (const element of scene.elements) {
      if (typeof element !== "object" || element === null || !("id" in element) || !("name" in element)) continue;
      const frame = element as { id?: unknown; name?: unknown; type?: unknown; x?: unknown; y?: unknown; width?: unknown; height?: unknown };
      if (frame.type !== "frame" || typeof frame.id !== "string" || typeof frame.name !== "string") continue;
      const lane = sprintLanes.find((candidate) => candidate.title === frame.name);
      if (lane) {
        laneByFrameId.set(frame.id, lane.id);
        if ([frame.x, frame.y, frame.width, frame.height].every((value) => typeof value === "number")) sceneFrames.push({ id: frame.id, lane: lane.id, x: frame.x as number, y: frame.y as number, width: frame.width as number, height: frame.height as number });
      }
    }
    const savedTasks = new Map<string, Partial<SprintTask>>();
    const storedElements = scene.elements as { type?: string; id?: string; frameId?: string | null; x?: number; y?: number; width?: number; height?: number; text?: string; customData?: { boardItemId?: unknown; boardItemPart?: unknown } }[];
    for (const shape of storedElements) {
      if (shape.type !== "rectangle" || typeof shape.customData?.boardItemId !== "string" || (shape.customData.boardItemPart !== undefined && shape.customData.boardItemPart !== "card")) continue;
      const taskId = shape.customData.boardItemId.replace(/^task-/, "");
      if (!initialSprintTasks.some((task) => task.id === taskId)) continue;
      const label = storedElements.find((element) => element.type === "text" && element.customData?.boardItemId === shape.customData?.boardItemId && (element.customData?.boardItemPart === "label" || element.customData?.boardItemPart === undefined));
      const lines = label?.text?.split("\n").map((line) => line.trim()).filter(Boolean) ?? [];
      const pointMatch = lines.at(-1)?.match(/^(\d+)\s*pts?$/i);
      let lane = typeof shape.frameId === "string" ? laneByFrameId.get(shape.frameId) : undefined;
      if (!lane && typeof shape.x === "number" && typeof shape.y === "number" && typeof shape.width === "number" && typeof shape.height === "number") {
        const centerX = shape.x + shape.width / 2;
        const centerY = shape.y + shape.height / 2;
        lane = sceneFrames.find((frame) => centerX >= frame.x && centerX <= frame.x + frame.width && centerY >= frame.y && centerY <= frame.y + frame.height)?.lane;
      }
      savedTasks.set(taskId, {
        lane,
        title: lines[0] && !/^\d+\s*pts?$/i.test(lines[0]) ? lines[0] : undefined,
        points: pointMatch ? Number(pointMatch[1]) : undefined,
        owner: lines.length >= 3 ? lines[1] : undefined,
      });
    }
    if (savedTasks.size === 0) return initialSprintTasks;
    return initialSprintTasks.flatMap((task) => {
      const saved = savedTasks.get(task.id);
      return saved ? [{ ...task, ...Object.fromEntries(Object.entries(saved).filter(([, value]) => value !== undefined)) }] : [];
    });
  } catch {
    return initialSprintTasks;
  }
}

