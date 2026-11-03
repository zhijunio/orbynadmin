"use client";

import { demoAvatarUrl } from "@/utils/demo-avatar";

import ConsoleLayout from "@/components/application/app-shell/console-layout";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { toast } from "sonner";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCorners,
  useDroppable,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  IconPlus,
  IconDotsVertical,
  IconCopy,
  IconTrash,
  IconSortDescending,
  IconAdjustmentsHorizontal,
  IconLayoutSidebarRight,
  IconInbox,
  IconArrowUp,
  IconChevronRight,
  IconFolder,
  IconLink,
  IconStar,
  IconDots,
  IconX,
  IconCircle,
  IconFlag,
  IconCalendar,
  IconUser,
  IconGripVertical,
} from "@tabler/icons-react";

import { PageHeader } from "@/components/application/app-shell/page-header";
import { Button } from "@/components/base/buttons/button";
import { Card } from "@/components/base/card/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/base/avatar/avatar";
import { Badge } from "@/components/base/badges/badge";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { Input } from "@/components/base/input/input";
import { Label } from "@/components/base/input/label";
import { Textarea } from "@/components/base/textarea/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/base/dialog/dialog";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/base/sheet/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/base/select/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/base/dropdown/dropdown-menu";
import { cn } from "@/utils/cn";
import { customers } from "@/data";
type Priority = "Low" | "Medium" | "High" | "Urgent";

type Assignee = { id: string; name: string; avatar: string };
type TaskComment = { id: string; author: Assignee; time: string; text: string };

type Task = {
  id: string;
  code: string;
  project: string;
  title: string;
  details: string;
  createdBy: Assignee;
  label: { text: string; className: string };
  priority: Priority;
  assignees: Assignee[];
  date: string;
  dueDate: string | null;
  comments: TaskComment[];
  favorite: boolean;
};

type Column = { id: string; name: string; limit: number; tasks: Task[] };

const labels = {
  vibl: { text: "vibl", className: "bg-violet-500/10 text-violet-600 dark:text-violet-400" },
  firstview: { text: "firstview", className: "bg-primary/10 text-primary dark:text-primary" },
  design: { text: "Design", className: "bg-amber-500/10 text-amber-600 dark:text-amber-400" },
};

type LabelKey = keyof typeof labels;

const priorityBadgeStyles: Record<Priority, string> = {
  Low: "border-transparent bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300",
  Medium: "border-transparent bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300",
  High: "border-transparent bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-300",
  Urgent: "border-transparent bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300",
};

const priorities: Priority[] = ["Low", "Medium", "High", "Urgent"];
const dueDates = ["Today", "Tomorrow", "This week"] as const;
const team: Record<string, Assignee> = {
  maya: { id: "maya", name: "Maya Chen", avatar: demoAvatarUrl("Maya Chen") },
  priya: { id: "priya", name: "Priya Shah", avatar: demoAvatarUrl("Priya Shah") },
  elif: { id: "elif", name: "Elif Kaya", avatar: demoAvatarUrl("Elif Kaya") },
  daniel: { id: "daniel", name: "Daniel Kim", avatar: demoAvatarUrl("Daniel Kim") },
  noah: { id: "noah", name: "Noah Williams", avatar: demoAvatarUrl("Noah Williams") },
};
const assigneeChoices: Assignee[] = [...Object.values(team), ...customers].filter((assignee, index, all) => all.findIndex((candidate) => candidate.id === assignee.id) === index);
function task(id: string, code: string, project: string, title: string, label: Task["label"], priority: Priority, assignees: (keyof typeof team)[], date: string, completed = false): Task {
  const assigned = assignees.map((key) => team[key]);
  return { id, code, project, title, details: "", createdBy: assigned[0], label, priority, assignees: assigned, date: `${completed ? "Completed" : "Since"} ${date}`, dueDate: null, comments: [], favorite: false };
}

function withCompletionDate(date: string, completed: boolean) {
  return `${completed ? "Completed" : "Since"} ${date.replace(/^(Since|Completed)\s+/, "")}`;
}

const initialColumns: Column[] = [
  {
    id: "backlog",
    name: "Backlog",
    limit: 8,
    tasks: [
      task("t1", "DS-38", "Agent handoff", "Explore approval cards for agent handoffs", labels.vibl, "Low", ["maya", "priya"], "14 Sep"),
      task("t2", "FE-86", "Board", "Add saved views for each project team", labels.firstview, "Low", ["elif"], "13 Sep"),
      task("t3", "BE-23", "Activity API", "Record an audit trail for agent actions", labels.vibl, "Medium", ["daniel"], "12 Sep"),
    ],
  },
  {
    id: "todo",
    name: "To do",
    limit: 5,
    tasks: [
      task("t4", "DS-34", "Foundations", "Define semantic tokens for elevated surfaces", labels.design, "High", ["maya"], "12 Sep"),
      task("t5", "FE-82", "Composer", "Add keyboard navigation to model picker", labels.firstview, "Low", ["noah", "elif"], "11 Sep"),
      task("t6", "BE-19", "Usage API", "Return rolling limits with reset timestamps", labels.vibl, "Low", ["daniel"], "10 Sep"),
    ],
  },
  {
    id: "progress",
    name: "In progress",
    limit: 4,
    tasks: [
      task("t7", "FE-79", "Agent progress", "Animate nested task groups as they stream", labels.firstview, "Medium", ["elif", "noah"], "9 Sep"),
      task("t8", "DS-31", "Dark mode", "Tune chart contrast on dark dashboard cards", labels.design, "Urgent", ["maya"], "8 Sep"),
    ],
  },
  {
    id: "review",
    name: "Review",
    limit: 3,
    tasks: [
      task("t9", "FE-76", "Questionnaire", "Polish the transition between plan questions", labels.vibl, "Low", ["priya"], "7 Sep"),
    ],
  },
  {
    id: "done",
    name: "Done",
    limit: 6,
    tasks: [
      task("t10", "DS-27", "Avatars", "Ship overlapping avatar groups for cards", labels.design, "Low", ["maya"], "6 Sep", true),
      task("t11", "FE-71", "Studio canvas", "Keep generated screens aligned while zooming", labels.firstview, "Medium", ["noah", "daniel"], "5 Sep", true),
      task("t12", "BE-16", "Registry", "Validate template dependencies during build", labels.design, "Low", ["daniel"], "4 Sep", true),
      task("t13", "DS-25", "Motion", "Document reduced-motion behavior for blocks", labels.design, "Low", ["priya"], "3 Sep", true),
    ],
  },
];

export default function KanbanPage() {
  const [columns, setColumns] = useState<Column[]>(initialColumns);
  const prefersReducedMotion = useReducedMotion();
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates, keyboardCodes: { start: ["Space"], cancel: ["Escape"], end: ["Space"] } }),
  );

  // Add-task dialog state.
  const [addOpen, setAddOpen] = useState(false);
  const [keepCreating, setKeepCreating] = useState(false);
  const [addColumn, setAddColumn] = useState<string>(initialColumns[0].id);
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [animatingTaskId, setAnimatingTaskId] = useState<string | null>(null);
  const [selectedTask, setSelectedTask] = useState<{ task: Task; columnId: string; columnName: string } | null>(null);
  const [commentDraft, setCommentDraft] = useState("");
  const [priority, setPriority] = useState<Priority>("Medium");
  const [labelKey, setLabelKey] = useState<LabelKey>("vibl");
  const [assigneeIndex, setAssigneeIndex] = useState("0");
  const [dueDate, setDueDate] = useState<(typeof dueDates)[number]>("Tomorrow");
  const [priorityFilter, setPriorityFilter] = useState<Priority | "all">("all");
  const [projectFilter, setProjectFilter] = useState<LabelKey | "all">("all");
  const [sortOrder, setSortOrder] = useState<"manual" | "priority" | "title">("manual");
  const [showDoneColumn, setShowDoneColumn] = useState(true);
  const [fillWideScreens, setFillWideScreens] = useState(true);

  useEffect(() => {
    if (!animatingTaskId) return;
    const timeoutId = window.setTimeout(() => setAnimatingTaskId(null), 250);
    return () => window.clearTimeout(timeoutId);
  }, [animatingTaskId]);

  function openAdd(columnId: string) {
    setKeepCreating(false);
    setAddColumn(columnId);
    setTitle("");
    setDetails("");
    setPriority("Medium");
    setLabelKey("vibl");
    setAssigneeIndex("0");
    setDueDate("Tomorrow");
    setAddOpen(true);
  }

  function submitTask() {
    const t = title.trim();
    if (!t) return;
    const timestamp = Date.now();
    const newTask: Task = {
      id: `t-${timestamp}`,
      code: `TK-${String(timestamp).slice(-4)}`,
      project: "New ticket",
      title: t,
      details: details.trim(),
      createdBy: customers[Number(assigneeIndex)],
      label: labels[labelKey],
      priority,
      assignees: [customers[Number(assigneeIndex)]],
      date: "Since Today",
      dueDate,
      comments: [],
      favorite: false,
    };
    setAnimatingTaskId(newTask.id);
    setColumns((prev) =>
      prev.map((c) =>
        c.id === addColumn ? { ...c, tasks: [newTask, ...c.tasks] } : c,
      ),
    );
    if (keepCreating) {
      setTitle("");
      setDetails("");
    } else {
      setAddOpen(false);
    }
    const columnName = columns.find((c) => c.id === addColumn)?.name ?? "board";
    toast.success("Ticket added", { description: `“${t}” added to ${columnName}.` });
  }

  function openTaskDetails(item: Task, columnId: string) {
    const columnName = columns.find((column) => column.id === columnId)?.name ?? "Board";
    setSelectedTask({ task: item, columnId, columnName });
    setCommentDraft("");
  }

  function updateTask(taskId: string, changes: Partial<Task>) {
    setColumns((current) => current.map((column) => ({
      ...column,
      tasks: column.tasks.map((item) => item.id === taskId ? { ...item, ...changes } : item),
    })));
    setSelectedTask((current) => current?.task.id === taskId
      ? { ...current, task: { ...current.task, ...changes } }
      : current);
  }

  function moveSelectedTask(targetColumnId: string) {
    if (!selectedTask) return;
    moveTask(selectedTask.task.id, targetColumnId);
    const columnName = columns.find((column) => column.id === targetColumnId)?.name ?? "Board";
    const changedCompletion = (selectedTask.columnId === "done") !== (targetColumnId === "done");
    setSelectedTask((current) => current ? {
      ...current,
      columnId: targetColumnId,
      columnName,
      task: changedCompletion ? { ...current.task, date: withCompletionDate(current.task.date, targetColumnId === "done") } : current.task,
    } : current);
  }

  function addComment() {
    if (!selectedTask || !commentDraft.trim()) return;
    const comment: TaskComment = {
      id: `comment-${Date.now()}`,
      author: customers[Number(assigneeIndex)],
      time: "Just now",
      text: commentDraft.trim(),
    };
    updateTask(selectedTask.task.id, { comments: [...selectedTask.task.comments, comment] });
    setCommentDraft("");
  }

  function copyTaskLink() {
    if (!selectedTask) return;
    navigator.clipboard.writeText(`${window.location.origin}/apps/kanban#${selectedTask.task.code}`)
      .then(() => toast.success("Task link copied"))
      .catch(() => toast.error("Could not copy task link"));
  }

  function duplicateTask(columnId: string, source: Task) {
    const timestamp = Date.now();
    const copy: Task = { ...source, id: `t-${timestamp}`, code: `TK-${String(timestamp).slice(-4)}`, title: `${source.title} (copy)` };
    setAnimatingTaskId(copy.id);
    setColumns((prev) =>
      prev.map((c) =>
        c.id === columnId ? { ...c, tasks: [copy, ...c.tasks] } : c,
      ),
    );
    toast.success("Task duplicated");
  }

  function deleteTask(columnId: string, taskId: string) {
    setColumns((prev) =>
      prev.map((c) =>
        c.id === columnId ? { ...c, tasks: c.tasks.filter((t) => t.id !== taskId) } : c,
      ),
    );
    toast.success("Task deleted");
  }

  function moveTask(taskId: string, targetColumnId: string) {
    setColumns((current) => {
      const source = current.find((column) => column.tasks.some((item) => item.id === taskId));
      const moving = source?.tasks.find((item) => item.id === taskId);
      if (!source || !moving) return current;
      const updated = source.id === targetColumnId || (source.id !== "done" && targetColumnId !== "done")
        ? moving
        : { ...moving, date: withCompletionDate(moving.date, targetColumnId === "done") };
      return current.map((column) => {
        const remaining = column.tasks.filter((item) => item.id !== taskId);
        return column.id === targetColumnId ? { ...column, tasks: [updated, ...remaining] } : { ...column, tasks: remaining };
      });
    });
  }

  function sortTasks(sortBy: "title" | "priority" | "date", columnId?: string) {
    const priorityOrder: Record<Priority, number> = { Urgent: 0, High: 1, Medium: 2, Low: 3 };
    setColumns((current) => current.map((column) => columnId && column.id !== columnId ? column : ({
      ...column,
      tasks: [...column.tasks].sort((a, b) => sortBy === "title"
        ? a.title.localeCompare(b.title)
        : sortBy === "priority"
          ? priorityOrder[a.priority] - priorityOrder[b.priority]
          : Number.parseInt(a.date.match(/\d+/)?.[0] ?? "0", 10) - Number.parseInt(b.date.match(/\d+/)?.[0] ?? "0", 10)),
    })));
  }

  function changeSortOrder(next: "manual" | "priority" | "title") {
    setSortOrder(next);
    if (next !== "manual") sortTasks(next);
  }

  function handleDragEnd({ active, over }: DragEndEvent) {
    if (!over || active.id === over.id) return;
    const overId = String(over.id);
    const source = columns.find((column) => column.tasks.some((item) => item.id === active.id));
    const target = columns.find((column) =>
      column.id === overId.replace(/^column:/, "") || column.tasks.some((item) => item.id === overId),
    );
    if (!source || !target) return;
    const sourceIndex = source.tasks.findIndex((item) => item.id === active.id);
    const targetIndex = target.tasks.findIndex((item) => item.id === overId);

    setColumns((current) => {
      if (source.id === target.id) {
        return current.map((column) => column.id === source.id
          ? { ...column, tasks: arrayMove(column.tasks, sourceIndex, targetIndex < 0 ? column.tasks.length - 1 : targetIndex) }
          : column);
      }
      const moving = source.tasks[sourceIndex];
      if (!moving) return current;
      const updated = source.id === target.id || (source.id !== "done" && target.id !== "done")
        ? moving
        : { ...moving, date: withCompletionDate(moving.date, target.id === "done") };
      return current.map((column) => {
        if (column.id === source.id) return { ...column, tasks: column.tasks.filter((item) => item.id !== moving.id) };
        if (column.id === target.id) {
          const tasks = [...column.tasks];
          tasks.splice(targetIndex < 0 ? tasks.length : targetIndex, 0, updated);
          return { ...column, tasks };
        }
        return column;
      });
    });
  }

  return <ConsoleLayout>{<div className="flex h-[calc(100svh-8rem)] min-h-[520px] flex-col gap-6 overflow-hidden">
      <PageHeader title="看板" className="[&>h1]:text-[22px] [&>h1]:font-medium [&>h1]:tracking-normal">
        <Button variant="outline" size="icon" className="rounded-lg shadow-sm" aria-label="Open project inbox"><IconInbox className="size-5" /></Button>
        <div role="group" aria-label="Board controls" className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="relative rounded-lg shadow-sm" aria-label="Sort tickets">
                <IconSortDescending className="size-5" />
                {sortOrder !== "manual" && <span aria-hidden="true" className="absolute -right-0.5 -top-0.5 size-2 rounded-full bg-primary ring-2 ring-background" />}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              <DropdownMenuRadioGroup value={sortOrder} onValueChange={(value) => changeSortOrder(value as "manual" | "priority" | "title")}>
                <DropdownMenuRadioItem value="manual">Manual order</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="priority">Priority</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="title">Title</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="relative rounded-lg shadow-sm" aria-label="Filter tickets">
                <IconAdjustmentsHorizontal className="size-5" />
                {(priorityFilter !== "all" || projectFilter !== "all") && <span aria-hidden="true" className="absolute -right-0.5 -top-0.5 size-2 rounded-full bg-primary ring-2 ring-background" />}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              <DropdownMenuLabel>Priority</DropdownMenuLabel>
              <DropdownMenuRadioGroup value={priorityFilter} onValueChange={(value) => setPriorityFilter(value as Priority | "all")}>
                <DropdownMenuRadioItem value="all">All priorities</DropdownMenuRadioItem>
                {priorities.map((item) => <DropdownMenuRadioItem key={item} value={item}>{item}</DropdownMenuRadioItem>)}
              </DropdownMenuRadioGroup>
              <DropdownMenuLabel>Project</DropdownMenuLabel>
              <DropdownMenuRadioGroup value={projectFilter} onValueChange={(value) => setProjectFilter(value as LabelKey | "all")}>
                <DropdownMenuRadioItem value="all">All projects</DropdownMenuRadioItem>
                {(Object.keys(labels) as LabelKey[]).map((key) => <DropdownMenuRadioItem key={key} value={key}>{labels[key].text}</DropdownMenuRadioItem>)}
              </DropdownMenuRadioGroup>
              {(priorityFilter !== "all" || projectFilter !== "all") && <DropdownMenuItem onSelect={() => { setPriorityFilter("all"); setProjectFilter("all"); }}>Clear filters</DropdownMenuItem>}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-lg shadow-sm" aria-label="Display options"><IconLayoutSidebarRight className="size-5" /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuCheckboxItem checked={showDoneColumn} onCheckedChange={setShowDoneColumn}>Show done column</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked={fillWideScreens} onCheckedChange={setFillWideScreens}>Fill wide screens</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Button className="rounded-lg px-3 shadow-sm" onClick={() => openAdd(columns[0].id)}>
          <IconPlus className="size-5" /> New ticket
        </Button>
      </PageHeader>

      <DndContext sensors={sensors} collisionDetection={closestCorners} onDragStart={() => setSortOrder("manual")} onDragEnd={handleDragEnd}>
      <div className="-mx-3 min-h-0 flex-1 overflow-x-auto overflow-y-hidden overscroll-x-contain px-3 [scrollbar-width:thin] md:-mx-6 md:px-6 xl:-me-8 xl:pe-8" role="region" aria-label="Board columns" tabIndex={0}>
      <div className={cn("grid h-full grid-flow-col gap-2", fillWideScreens ? "w-max auto-cols-[273px] min-[1441px]:auto-cols-[minmax(273px,1fr)] min-[1441px]:w-[max(100%,1449px)]" : "w-max auto-cols-[273px]")}>
        {columns.filter((column) => showDoneColumn || column.id !== "done").map((col) => {
          const visibleTasks = col.tasks.filter((item) =>
            (priorityFilter === "all" || item.priority === priorityFilter) &&
            (projectFilter === "all" || item.label === labels[projectFilter]),
          );
          return <DroppableColumn key={col.id} id={col.id} className="flex h-full min-h-0 min-w-0 flex-col overflow-hidden rounded-[20px] bg-muted/40 pt-3 ring-2 ring-inset ring-transparent">
            <div className="flex h-5 shrink-0 items-center justify-between px-3">
              <div className="flex min-w-0 items-center gap-1.5">
                <h2 className="truncate text-sm font-medium">{col.name}</h2>
                <span className="text-sm font-medium tabular-nums text-muted-foreground">
                {col.tasks.length}/{col.limit}
                </span>
              </div>
              <div className="flex items-center gap-1">
              <DropdownMenu>
                <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="size-5" aria-label={`More options for ${col.name}`}><IconDotsVertical className="size-5" /></Button></DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Sort column</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => sortTasks("title", col.id)}>Title A–Z</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => sortTasks("priority", col.id)}>Priority</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => sortTasks("date", col.id)}>Date</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                variant="ghost"
                size="icon"
                className="size-5"
                onClick={() => openAdd(col.id)}
                aria-label={`Add task to ${col.name}`}
              >
                <IconPlus className="size-5" />
              </Button>
              </div>
            </div>

            <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-y-contain px-1.5 pt-2 [scrollbar-width:thin]">
            <div className="flex flex-col gap-1.5">
              <SortableContext items={visibleTasks.map((item) => item.id)} strategy={verticalListSortingStrategy}>
              {visibleTasks.map((t) => (
                <SortableTaskCard key={t.id} task={t} columnId={col.id} onViewDetails={openTaskDetails} isNew={t.id === animatingTaskId} prefersReducedMotion={prefersReducedMotion} />
              ))}
              </SortableContext>
              {visibleTasks.length === 0 && (priorityFilter !== "all" || projectFilter !== "all") && (
                <motion.p initial={prefersReducedMotion === false ? { opacity: 0, y: 4 } : false} animate={{ opacity: 1, y: 0 }} transition={{ duration: prefersReducedMotion === false ? 0.2 : 0, ease: "easeOut" }} className="rounded-lg border border-dashed px-3 py-4 text-center text-xs text-muted-foreground">No matching tickets</motion.p>
              )}

              <Button
                variant="ghost"
                className="w-full justify-start gap-2 text-muted-foreground"
                onClick={() => openAdd(col.id)}
              >
                <IconPlus className="size-5" /> Add task
              </Button>
            </div>
            </div>
          </DroppableColumn>;
        })}
      </div>
      </div>
      </DndContext>

      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent size="lg" overlayClassName="bg-black/15 backdrop-blur-sm motion-reduce:duration-0 motion-reduce:animate-none" className="gap-2 rounded-[24px] p-4 shadow-xl sm:!max-w-[560px]">
          <DialogHeader className="gap-0">
            <p className="text-[13px] leading-[18px] text-muted-foreground">看板 <IconChevronRight className="inline size-3.5" /> New ticket</p>
            <DialogTitle className="sr-only">New ticket</DialogTitle>
            <DialogDescription className="sr-only">Create a ticket and add it to a board column.</DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <div>
              <Label className="sr-only" htmlFor="task-title">Task title</Label>
              <Input
                id="task-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter ticket title"
                autoFocus
                className="h-7 rounded-none border-0 px-0 text-base shadow-none focus-visible:border-transparent focus-visible:ring-0"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.nativeEvent.isComposing) submitTask();
                }}
              />
            </div>
            <div>
              <Label className="sr-only" htmlFor="task-details">Details</Label>
              <Textarea id="task-details" value={details} onChange={(event) => setDetails(event.target.value)} placeholder="Description area" rows={1} maxRows={4} className="min-h-5 resize-none rounded-none border-0 px-0 py-0 text-sm shadow-none focus-visible:border-transparent focus-visible:ring-0" />
            </div>
            <div className="space-y-2">
            <div className="grid grid-cols-3 gap-2">
              <div>
                <Label className="sr-only" htmlFor="task-column">Column</Label>
                <Select value={addColumn} onValueChange={setAddColumn}>
                  <SelectTrigger id="task-column" aria-label="Column" className="h-8 w-full justify-start gap-2 rounded-md border-0 bg-transparent px-2 text-sm shadow-none hover:bg-muted"><IconCircle className="size-3.5 text-muted-foreground" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {columns.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="sr-only" htmlFor="task-category">Tag</Label>
                <Select value={labelKey} onValueChange={(v) => setLabelKey(v as LabelKey)}>
                  <SelectTrigger id="task-category" aria-label="Tag" className="h-8 w-full justify-start gap-2 rounded-md border-0 bg-transparent px-2 text-sm shadow-none hover:bg-muted"><IconFolder className="size-3.5 text-muted-foreground" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {(Object.keys(labels) as LabelKey[]).map((k) => (
                      <SelectItem key={k} value={k}>
                        {labels[k].text}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="sr-only" htmlFor="task-priority">Priority</Label>
                <Select value={priority} onValueChange={(v) => setPriority(v as Priority)}>
                  <SelectTrigger id="task-priority" aria-label="Priority" className="h-8 w-full justify-start gap-2 rounded-md border-0 bg-transparent px-2 text-sm shadow-none hover:bg-muted"><IconFlag className="size-3.5 text-muted-foreground" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {priorities.map((p) => (
                      <SelectItem key={p} value={p}>
                        {p}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="sr-only" htmlFor="task-due-date">Due date</Label>
                <Select value={dueDate} onValueChange={(value) => setDueDate(value as (typeof dueDates)[number])}>
                  <SelectTrigger id="task-due-date" aria-label="Due date" className="h-8 w-full justify-start gap-2 rounded-md border-0 bg-transparent px-2 text-sm shadow-none hover:bg-muted"><IconCalendar className="size-3.5 text-muted-foreground" /><SelectValue /></SelectTrigger>
                  <SelectContent>{dueDates.map((value) => <SelectItem key={value} value={value}>{value}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <Label className="sr-only" htmlFor="task-assignee">Assignee</Label>
                <Select value={assigneeIndex} onValueChange={setAssigneeIndex}>
                  <SelectTrigger id="task-assignee" aria-label="Assignee" className="h-8 w-full justify-start gap-2 rounded-md border-0 bg-transparent px-2 text-sm shadow-none hover:bg-muted"><IconUser className="size-3.5 text-muted-foreground" /><SelectValue /></SelectTrigger>
                  <SelectContent>{customers.map((customer, index) => <SelectItem key={customer.id} value={String(index)}>{customer.name}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </div>
            </div>
          </div>
          <DialogFooter className="m-0 border-0 bg-transparent p-0">
            <div className="mr-auto flex items-center gap-2">
              <Checkbox id="keep-creating" checked={keepCreating} onCheckedChange={(checked) => setKeepCreating(checked === true)} />
              <Label htmlFor="keep-creating" className="text-sm font-normal text-muted-foreground">Keep creating</Label>
            </div>
            <Button variant="outline" onClick={() => setAddOpen(false)}>
              Cancel
            </Button>
            <Button onClick={submitTask} disabled={!title.trim()}>
              Create ticket
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Sheet open={selectedTask !== null} onOpenChange={(open) => { if (!open) setSelectedTask(null); }}>
        <SheetContent side="right" showCloseButton={false} overlayClassName="bg-black/15 backdrop-blur-sm motion-reduce:duration-0 motion-reduce:animate-none" className="!right-0 !top-0 !bottom-0 !w-full !max-w-none gap-0 overflow-hidden rounded-[24px] border-0 bg-background p-0 shadow-2xl motion-reduce:duration-0 motion-reduce:animate-none motion-reduce:transition-none sm:!right-3 sm:!top-3 sm:!bottom-3 sm:!w-[min(640px,calc(100vw-24px))]">
          {selectedTask && <>
            <SheetHeader className="gap-5 px-6 pb-4 pt-6">
              <div className="flex min-w-0 flex-col gap-3 pr-12 text-sm text-muted-foreground sm:flex-row sm:items-center sm:pr-20">
                <nav aria-label="Task location" className="flex min-w-0 flex-1 flex-wrap items-center gap-x-2 gap-y-1">
                  <span className="shrink-0">看板</span><IconChevronRight className="size-4 shrink-0" />
                  <span className="shrink-0">{selectedTask.task.code}</span><IconChevronRight className="size-4 shrink-0" />
                  <span className="min-w-0 basis-full truncate sm:basis-auto">{selectedTask.task.project}</span>
                </nav>
                <div className="flex shrink-0 items-center gap-1">
                  <Button variant="outline" size="icon-sm" aria-label={selectedTask.task.favorite ? "Remove from favorites" : "Add to favorites"} onClick={() => updateTask(selectedTask.task.id, { favorite: !selectedTask.task.favorite })}>
                    <IconStar className={cn("size-4", selectedTask.task.favorite && "fill-amber-400 text-amber-500")} />
                  </Button>
                  <Button variant="outline" size="icon-sm" aria-label="Copy task link" onClick={copyTaskLink}><IconLink className="size-4" /></Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild><Button variant="outline" size="icon-sm" aria-label="More task actions"><IconDots className="size-4" /></Button></DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => duplicateTask(selectedTask.columnId, selectedTask.task)}><IconCopy className="size-4" /> Duplicate</DropdownMenuItem>
                      <DropdownMenuItem variant="destructive" onClick={() => { deleteTask(selectedTask.columnId, selectedTask.task.id); setSelectedTask(null); }}><IconTrash className="size-4" /> Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <SheetClose asChild><Button variant="secondary" size="icon-sm" className="absolute right-6 top-6 size-9 rounded-full" aria-label="Close task details"><IconX className="size-4" /></Button></SheetClose>
              <div className="mt-5 flex items-center gap-2 text-sm font-medium">
                <span className="text-muted-foreground">Created by</span>
                <Avatar className="size-[18px]"><AvatarImage src={selectedTask.task.createdBy.avatar} alt="" /><AvatarFallback>{selectedTask.task.createdBy.name.slice(0, 2)}</AvatarFallback></Avatar>
                <span className="font-medium">{selectedTask.task.createdBy.name}</span>
              </div>
              <SheetTitle className="text-base font-medium leading-[22px]">{selectedTask.task.title}</SheetTitle>
              <SheetDescription className={cn("max-w-4xl text-sm leading-5", !selectedTask.task.details && "sr-only")}>
                {selectedTask.task.details || `Details for ${selectedTask.task.code}`}
              </SheetDescription>
            </SheetHeader>
            <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-6 pb-5">
              <div className="flex flex-wrap items-center gap-2.5 py-2">
                <span className="mr-1 text-sm font-medium text-muted-foreground">Properties</span>
                <Select value={selectedTask.columnId} onValueChange={moveSelectedTask}>
                <SelectTrigger aria-label="Task status" className="h-8 w-auto min-w-28 gap-2 rounded-md border-0 bg-transparent px-2 text-sm shadow-none hover:bg-muted"><span className="size-3.5 rounded-full border-2 border-muted-foreground/60" /><SelectValue /></SelectTrigger>
                  <SelectContent>{columns.map((column) => <SelectItem key={column.id} value={column.id}>{column.name}</SelectItem>)}</SelectContent>
                </Select>
                <Select value={selectedTask.task.priority} onValueChange={(value) => updateTask(selectedTask.task.id, { priority: value as Priority })}>
                  <SelectTrigger aria-label="Task priority" className={cn("h-8 w-auto min-w-20 rounded-md border-0 px-2 text-sm shadow-none", priorityBadgeStyles[selectedTask.task.priority])}><SelectValue /></SelectTrigger>
                  <SelectContent>{priorities.map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent>
                </Select>
                <Select value={selectedTask.task.assignees[0]?.id ?? ""} onValueChange={(value) => {
                  const assignee = assigneeChoices.find((item) => item.id === value);
                  if (assignee) updateTask(selectedTask.task.id, { assignees: [assignee] });
                }}>
                  <SelectTrigger aria-label="Task assignee" className="h-8 w-auto max-w-48 gap-2 rounded-md border-0 bg-transparent px-2 text-sm shadow-none hover:bg-muted"><Avatar className="size-5"><AvatarImage src={selectedTask.task.assignees[0]?.avatar} alt="" /><AvatarFallback>{selectedTask.task.assignees[0]?.name.slice(0, 2)}</AvatarFallback></Avatar><SelectValue /></SelectTrigger>
                  <SelectContent>{assigneeChoices.map((assignee) => <SelectItem key={assignee.id} value={assignee.id}>{assignee.name}</SelectItem>)}</SelectContent>
                </Select>
                <Select value={(Object.keys(labels) as LabelKey[]).find((key) => labels[key].text === selectedTask.task.label.text) ?? "vibl"} onValueChange={(value) => updateTask(selectedTask.task.id, { label: labels[value as LabelKey] })}>
                  <SelectTrigger aria-label="Task tag" className="h-8 w-auto min-w-28 gap-2 rounded-md border-0 bg-transparent px-2 text-sm shadow-none hover:bg-muted"><IconFolder className="size-3.5 text-muted-foreground" /><SelectValue /></SelectTrigger>
                  <SelectContent>{(Object.keys(labels) as LabelKey[]).map((key) => <SelectItem key={key} value={key}>{labels[key].text}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <section className="mt-24 space-y-5 pb-4 pt-8">
                <div className="space-y-6 border-l border-border pl-6">
                  {selectedTask.task.comments.map((comment) => <article key={comment.id} className="relative">
                    <Avatar className="absolute -left-[39px] top-0 size-8 border-2 border-background"><AvatarImage src={comment.author.avatar} alt="" /><AvatarFallback>{comment.author.name.slice(0, 2)}</AvatarFallback></Avatar>
                    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5"><span className="text-sm font-medium">{comment.author.name}</span><span className="text-[13px] text-muted-foreground">{comment.time}</span></div>
                    <p className="mt-1 text-sm font-medium leading-5 text-muted-foreground">{comment.text}</p>
                  </article>)}
                </div>
              </section>
            </div>
            <form className="shrink-0 px-4 pb-4 sm:px-5" onSubmit={(event) => { event.preventDefault(); addComment(); }}>
              <div className="relative rounded-xl bg-muted/60 p-1.5">
                <Textarea aria-label="Add a comment" value={commentDraft} onChange={(event) => setCommentDraft(event.target.value)} placeholder="Enter your comment" rows={2} autoResize={false} className="min-h-16 resize-none border-0 bg-transparent pr-14 text-sm shadow-none hover:border-transparent focus-visible:border-transparent focus-visible:ring-0" />
                <Button type="submit" size="icon-sm" disabled={!commentDraft.trim()} className="absolute bottom-2.5 right-2.5 size-8 rounded-full" aria-label="Send comment"><IconArrowUp className="size-4" /></Button>
              </div>
            </form>
          </>}
        </SheetContent>
      </Sheet>
    </div>}</ConsoleLayout>;
}

function DroppableColumn({ id, className, children }: { id: string; className: string; children: React.ReactNode }) {
  const { setNodeRef, isOver } = useDroppable({ id: `column:${id}` });
  return <div ref={setNodeRef} className={cn(className, isOver && "ring-2 ring-primary/30")}>{children}</div>;
}

function SortableTaskCard({ task, columnId, onViewDetails, isNew, prefersReducedMotion }: {
  task: Task;
  columnId: string;
  onViewDetails: (task: Task, columnId: string) => void;
  isNew: boolean;
  prefersReducedMotion: boolean | null;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: task.id });
  return <div ref={setNodeRef} style={{ transform: CSS.Transform.toString(transform), transition }}>
    <motion.div initial={isNew && prefersReducedMotion === false ? { opacity: 0, y: 8, scale: 0.98 } : false} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: prefersReducedMotion === false ? 0.2 : 0, ease: "easeOut" }}>
    <Card
      {...attributes}
      {...listeners}
      role="button"
      aria-label={`Open ${task.code}: ${task.title}`}
      aria-haspopup="dialog"
      className={cn("relative flex cursor-grab flex-col gap-2 rounded-[12px] border-0 bg-card p-3 text-start shadow-[0_1px_1px_rgb(0_0_0/0.05)] ring-[2.5px] ring-transparent transition-[box-shadow,ring-color,background-color] duration-200 ease-out hover:bg-background hover:shadow-sm hover:ring-foreground/20 focus-visible:outline-none focus-visible:ring-foreground/25 active:cursor-grabbing motion-reduce:transition-none dark:bg-card/60", isDragging && "z-10 opacity-60")}
      onClick={() => onViewDetails(task, columnId)}
      onKeyUp={(event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          onViewDetails(task, columnId);
        }
      }}
    >
      <div className="flex min-h-[22px] items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-1.5">
          <IconGripVertical aria-hidden="true" className="size-4 shrink-0 text-muted-foreground/55" />
          <span className="flex min-w-0 items-center gap-1.5 text-[13px] leading-[18px] font-medium text-muted-foreground">
            <span className="shrink-0">{task.code}</span><IconChevronRight className="size-[15px] shrink-0" /><span className="truncate font-normal">{task.project}</span>
          </span>
        </div>
        <AssigneeAvatars assignees={task.assignees} size="sm" />
      </div>
      <div className="flex flex-col items-start gap-2">
        <div className="flex items-center gap-1.5 text-xs">
          <Badge className={cn("h-[22px] rounded-md px-1.5 py-0.5 text-[13px] leading-[18px] font-medium", priorityBadgeStyles[task.priority])}>{task.priority}</Badge>
          <span className="inline-flex h-[22px] max-w-32 items-center gap-1 truncate rounded-md border bg-background px-1.5 text-[13px] leading-[18px] text-muted-foreground"><IconFolder className="size-[13px] shrink-0 opacity-30" />{task.label.text}</span>
        </div>
        <div className="flex w-full flex-col gap-[5px]">
          <p className="text-sm font-medium leading-5 text-foreground">{task.title}</p>
          <p className="text-[13px] font-medium leading-[18px] text-muted-foreground">{task.date}</p>
        </div>
      </div>
    </Card>
    </motion.div>
    </div>;
}

function AssigneeAvatars({ assignees, size }: { assignees: Task["assignees"]; size: "sm" | "md" }) {
  const avatarSize = size === "md" ? "size-7" : "size-[22px]";

  return (
    <div className="flex items-center ps-1" role="img" aria-label={assignees.map((assignee) => assignee.name).join(", ")}>
      {assignees.map((assignee, index) => (
        <Avatar key={assignee.id} className={cn(avatarSize, "border-2 border-card", index > 0 && "-ms-1.5")} aria-hidden="true">
          <AvatarImage src={assignee.avatar} alt="" />
          <AvatarFallback>{assignee.name.slice(0, 2)}</AvatarFallback>
        </Avatar>
      ))}
    </div>
  );
}
