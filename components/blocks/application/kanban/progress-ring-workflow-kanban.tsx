"use client";

import { useState } from "react";
import {
  IconCalendar,
  IconColumns,
  IconFile,
  IconFilter,
  IconFlag,
  IconMessage,
  IconPlus,
  IconSquareCheck,
} from "@tabler/icons-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar/avatar";
import { Button } from "@/components/ui/button/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog/dialog";
import { Input } from "@/components/ui/input/input";
import { demoAvatarUrl } from "@/utils/demo-avatar";

type Task = {
  id: string;
  title: string;
  tag: string;
  state: string;
  owner: string;
  team: string;
  progress: number;
  files: number;
  events: number;
  notes: number;
  days: number;
};
type Column = { id: string; label: string; tone: string; tasks: Task[] };

const initialColumns: Column[] = [
  {
    id: "backlog",
    label: "BACKLOG",
    tone: "text-muted-foreground",
    tasks: [
      {
        id: "renewal-checklist",
        title: "Draft renewal checklist for strategic workspace rollouts",
        tag: "Prep",
        state: "Confirmed",
        owner: "Nora Lee",
        team: "Ops",
        progress: 61,
        files: 1,
        events: 4,
        notes: 2,
        days: 22,
      },
      {
        id: "admin-feedback",
        title: "Collect admin feedback on workspace handoff notes",
        tag: "Prep",
        state: "Risk",
        owner: "Elena Torres",
        team: "Review",
        progress: 56,
        files: 2,
        events: 3,
        notes: 1,
        days: 20,
      },
      {
        id: "regional-checklist",
        title: "Prepare checklist template for regional launch teams",
        tag: "Prep",
        state: "Ready",
        owner: "Marcus Chen",
        team: "Finance",
        progress: 69,
        files: 1,
        events: 5,
        notes: 2,
        days: 18,
      },
    ],
  },
  {
    id: "planned",
    label: "PLANNED",
    tone: "text-foreground",
    tasks: [
      {
        id: "migration-scope",
        title: "Estimate migration scope for enterprise tenant groups",
        tag: "Commercial",
        state: "Ready",
        owner: "Omar Haddad",
        team: "Planning",
        progress: 56,
        files: 2,
        events: 3,
        notes: 1,
        days: 16,
      },
      {
        id: "reviewer-roles",
        title: "Map reviewer roles for procurement policy updates",
        tag: "Legal",
        state: "Confirmed",
        owner: "Priya Shah",
        team: "Product",
        progress: 61,
        files: 1,
        events: 4,
        notes: 3,
        days: 13,
      },
    ],
  },
  {
    id: "in-progress",
    label: "IN PROGRESS",
    tone: "text-info",
    tasks: [
      {
        id: "audit-stream",
        title: "Connect workspace audit stream to the activity timeline",
        tag: "Commercial",
        state: "Finance",
        owner: "Priya Shah",
        team: "Product",
        progress: 83,
        files: 3,
        events: 6,
        notes: 4,
        days: 8,
      },
      {
        id: "approval-rules",
        title: "Tune procurement approval rules for finance reviewers",
        tag: "Finance",
        state: "Risk",
        owner: "Marcus Chen",
        team: "Finance",
        progress: 72,
        files: 2,
        events: 5,
        notes: 6,
        days: 5,
      },
      {
        id: "saved-view",
        title: "Refine saved view permissions for partner workspaces",
        tag: "Legal",
        state: "Ready",
        owner: "Liam Carter",
        team: "Quality",
        progress: 64,
        files: 2,
        events: 4,
        notes: 5,
        days: 6,
      },
    ],
  },
  {
    id: "paused",
    label: "PAUSED",
    tone: "text-warning",
    tasks: [
      {
        id: "invoice-csv",
        title: "Resolve invoice import edge cases",
        tag: "Finance",
        state: "Blocked",
        owner: "Mia Hart",
        team: "Ops",
        progress: 32,
        files: 1,
        events: 2,
        notes: 3,
        days: 9,
      },
      {
        id: "policy-review",
        title: "Review regional data retention policy",
        tag: "Legal",
        state: "Waiting",
        owner: "Eli Stone",
        team: "Review",
        progress: 45,
        files: 2,
        events: 3,
        notes: 2,
        days: 12,
      },
    ],
  },
  {
    id: "completed",
    label: "COMPLETED",
    tone: "text-success",
    tasks: [
      {
        id: "workspace-audit",
        title: "Publish workspace access audit",
        tag: "Security",
        state: "Complete",
        owner: "Nora Lee",
        team: "Ops",
        progress: 100,
        files: 2,
        events: 4,
        notes: 3,
        days: 2,
      },
      {
        id: "launch-guide",
        title: "Deliver enterprise launch guide",
        tag: "Prep",
        state: "Complete",
        owner: "Marcus Chen",
        team: "Finance",
        progress: 100,
        files: 3,
        events: 5,
        notes: 2,
        days: 1,
      },
      {
        id: "billing-sync",
        title: "Verify billing sync after migration",
        tag: "Finance",
        state: "Complete",
        owner: "Priya Shah",
        team: "Product",
        progress: 100,
        files: 1,
        events: 2,
        notes: 4,
        days: 1,
      },
    ],
  },
  {
    id: "cancelled",
    label: "CANCELLED",
    tone: "text-muted-foreground",
    tasks: [
      {
        id: "legacy-export",
        title: "Retire legacy export configuration",
        tag: "Platform",
        state: "Cancelled",
        owner: "Liam Carter",
        team: "Quality",
        progress: 0,
        files: 1,
        events: 1,
        notes: 2,
        days: 18,
      },
      {
        id: "old-intake",
        title: "Replace the original intake form",
        tag: "Prep",
        state: "Cancelled",
        owner: "Elena Torres",
        team: "Review",
        progress: 0,
        files: 2,
        events: 2,
        notes: 1,
        days: 23,
      },
    ],
  },
];

export function ProgressRingWorkflowKanban() {
  const [columns, setColumns] = useState(initialColumns);
  const [collapsed, setCollapsed] = useState(
    new Set(["paused", "completed", "cancelled"]),
  );
  const [columnsOpen, setColumnsOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [title, setTitle] = useState("");

  function addTask() {
    if (!title.trim()) return;
    const task: Task = {
      id: `task-${Date.now()}`,
      title: title.trim(),
      tag: "Prep",
      state: "Ready",
      owner: "Nora Lee",
      team: "Ops",
      progress: 0,
      files: 0,
      events: 0,
      notes: 0,
      days: 0,
    };
    setColumns((current) =>
      current.map((column) =>
        column.id === "backlog"
          ? { ...column, tasks: [task, ...column.tasks] }
          : column,
      ),
    );
    setTitle("");
    setDialogOpen(false);
  }

  function moveTask(taskId: string, columnId: string) {
    setColumns((current) => {
      const source = current.find((column) =>
        column.tasks.some((task) => task.id === taskId),
      );
      const target = current.find((column) => column.id === columnId);
      const task = source?.tasks.find((item) => item.id === taskId);
      if (!source || !target || !task || source.id === target.id)
        return current;
      return current.map((column) =>
        column.id === source.id
          ? {
              ...column,
              tasks: column.tasks.filter((item) => item.id !== taskId),
            }
          : column.id === target.id
            ? { ...column, tasks: [task, ...column.tasks] }
            : column,
      );
    });
  }

  return (
    <section className="min-w-0 space-y-4">
      <header className="flex flex-wrap items-center gap-2">
        <h2 className="text-base font-semibold">Workflow Board</h2>
        <div className="ml-auto flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setFilterOpen((open) => !open)}
          >
            <IconFilter />
            Filters
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setColumnsOpen((open) => !open)}
          >
            <IconColumns />
            Columns
          </Button>
          <Button size="sm" onClick={() => setDialogOpen(true)}>
            <IconPlus />
            New task
          </Button>
        </div>
      </header>
      {filterOpen && (
        <div className="rounded-lg border bg-card p-3">
          <Input
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            placeholder="Search tasks"
          />
        </div>
      )}
      {columnsOpen && (
        <div className="flex flex-wrap gap-2">
          {columns.map((column) => (
            <Button
              key={column.id}
              size="sm"
              variant={collapsed.has(column.id) ? "outline" : "secondary"}
              onClick={() =>
                setCollapsed((current) => {
                  const next = new Set(current);
                  if (next.has(column.id)) next.delete(column.id);
                  else next.add(column.id);
                  return next;
                })
              }
            >
              {column.label}
            </Button>
          ))}
        </div>
      )}
      <div className="overflow-x-auto pb-3">
        <div className="flex min-h-[430px] min-w-max items-start gap-2.5">
          {columns.map((column) =>
            collapsed.has(column.id) ? (
              <button
                key={column.id}
                type="button"
                onClick={() =>
                  setCollapsed(
                    (current) =>
                      new Set([...current].filter((id) => id !== column.id)),
                  )
                }
                className={`flex min-h-32 w-10 shrink-0 flex-col items-center gap-3 rounded-xl border bg-muted/30 py-3 ${column.tone}`}
              >
                <span
                  className="text-[10px] font-bold"
                  style={{ writingMode: "vertical-rl" }}
                >
                  {column.label}
                </span>
                <span className="text-xs text-muted-foreground">
                  {column.tasks.length}
                </span>
              </button>
            ) : (
              <section
                key={column.id}
                data-progress-column={column.id}
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => {
                  event.preventDefault();
                  moveTask(event.dataTransfer.getData("text/plain"), column.id);
                }}
                className="w-[260px] shrink-0 rounded-xl border bg-muted/20 p-2"
              >
                <header className="mb-2 flex items-center gap-2 px-1 py-1">
                  <span
                    className={`rounded-md border bg-background px-2 py-1 text-[10px] font-semibold ${column.tone}`}
                  >
                    {column.label}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {column.tasks.length}
                  </span>
                </header>
                <div className="grid content-start gap-2">
                  {column.tasks
                    .filter((task) =>
                      `${task.title} ${task.owner} ${task.tag}`
                        .toLowerCase()
                        .includes(filter.toLowerCase()),
                    )
                    .map((task) => (
                      <article
                        key={task.id}
                        draggable
                        onDragStart={(event) =>
                          event.dataTransfer.setData("text/plain", task.id)
                        }
                        className="rounded-xl border bg-card p-2.5"
                      >
                        <p className="text-xs font-medium leading-4">
                          {task.title}
                        </p>
                        <div className="mt-2 flex items-center gap-1.5 text-[10px]">
                          <span className="rounded border bg-muted px-1.5 py-0.5">
                            {task.tag}
                          </span>
                          <span
                            className={`size-1.5 rounded-full ${task.state === "Risk" || task.state === "Blocked" ? "bg-warning" : task.state === "Ready" || task.state === "Confirmed" ? "bg-success" : "bg-muted-foreground"}`}
                          />
                          <span className="truncate text-muted-foreground">
                            {task.state}
                          </span>
                        </div>
                        <div className="mt-2 flex items-center gap-2">
                          <Avatar className="size-6">
                            <AvatarImage
                              src={demoAvatarUrl(task.owner)}
                              alt=""
                            />
                            <AvatarFallback className="text-[8px]">
                              {task.owner
                                .split(" ")
                                .map((part) => part[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="min-w-0">
                            <p className="truncate text-[11px] font-medium">
                              {task.owner}
                            </p>
                            <p className="text-[10px] text-muted-foreground">
                              {task.team}
                            </p>
                          </div>
                          <div
                            className="ml-auto grid size-9 place-items-center rounded-full p-[2px]"
                            style={{
                              background: `conic-gradient(var(--color-primary) ${task.progress}%, var(--color-muted) 0)`,
                            }}
                          >
                            <span className="grid size-full place-items-center rounded-full bg-card text-[10px]">
                              {task.progress}
                            </span>
                          </div>
                        </div>
                        <footer className="mt-2 flex items-center gap-2 text-[10px] text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <IconFile className="size-3" />
                            {task.files}
                          </span>
                          <span className="flex items-center gap-1">
                            <IconCalendar className="size-3" />
                            {task.events}
                          </span>
                          <span className="flex items-center gap-1">
                            <IconFlag className="size-3" />
                            {task.notes}
                          </span>
                          <span className="ml-auto flex items-center gap-1">
                            <IconMessage className="size-3" />
                            <IconSquareCheck className="size-3" />
                            {task.days}d
                          </span>
                        </footer>
                      </article>
                    ))}
                </div>
              </section>
            ),
          )}
        </div>
      </div>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New task</DialogTitle>
          </DialogHeader>
          <Input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Task title"
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={addTask}>Create task</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}
