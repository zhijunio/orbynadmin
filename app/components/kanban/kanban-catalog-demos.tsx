"use client";

import * as React from "react";
import { IconCircle, IconCircleCheck, IconCircleDot } from "@tabler/icons-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar/avatar";
import { Badge } from "@/components/ui/badge/badge";
import { Button } from "@/components/ui/button/button";
import { Card, CardContent } from "@/components/ui/card/card";
import { Frame, FrameDescription, FrameHeader, FramePanel, FrameTitle } from "@/components/ui/frame/frame";
import { Progress } from "@/components/ui/progress/progress";
import { KanbanBoard, type KanbanColumnConfig } from "@/components/custom/kanban/kanban-board";

const taskColumns: KanbanColumnConfig[] = [
  { id: "backlog", title: "Backlog" },
  { id: "inProgress", title: "In progress" },
  { id: "done", title: "Done" },
];
type Task = { id: string; title: string; priority: "low" | "medium" | "high"; description?: string; assignee?: string; due?: string };
const baseTasks: Record<string, Task[]> = {
  backlog: [
    { id: "task-a", title: "Add export guard", priority: "high", description: "Warn before an empty report is downloaded", assignee: "JL", due: "Nov 08" },
    { id: "task-b", title: "Update audit trail", priority: "medium", description: "Include saved-view changes in activity", assignee: "MK", due: "Nov 11" },
  ],
  inProgress: [
    { id: "task-c", title: "Billing CSV schema", priority: "high", description: "Add region and currency columns", assignee: "AR", due: "Nov 06" },
    { id: "task-d", title: "Invite flow polish", priority: "low", description: "Clarify role permissions before sending", assignee: "JL" },
  ],
  done: [{ id: "task-e", title: "Rotate API token", priority: "medium", description: "Complete service credential rotation", assignee: "MK", due: "Nov 02" }],
};
const statusColumns: KanbanColumnConfig[] = [
  { id: "todo", title: "To do" },
  { id: "doing", title: "In progress" },
  { id: "done", title: "Done" },
];
type StatusTask = { id: string; title: string; label: string };
const statusTasks: Record<string, StatusTask[]> = {
  todo: [
    { id: "status-1", title: "Review deployment plan", label: "Planning" },
    { id: "status-2", title: "Confirm API contract", label: "Review" },
  ],
  doing: [{ id: "status-3", title: "Build activity filters", label: "Engineering" }],
  done: [{ id: "status-4", title: "Audit export permissions", label: "Complete" }],
};
const progressColumns: KanbanColumnConfig[] = [
  { id: "planning", title: "Planning" },
  { id: "active", title: "In progress" },
  { id: "completed", title: "Completed" },
];
type ProgressTask = { id: string; title: string; progress: number; owner: string };
const progressTasks: Record<string, ProgressTask[]> = {
  planning: [{ id: "progress-1", title: "Map the onboarding journey", progress: 20, owner: "Alex" }],
  active: [
    { id: "progress-2", title: "Build the reporting dashboard", progress: 65, owner: "Sam" },
    { id: "progress-3", title: "Connect the billing API", progress: 40, owner: "Riley" },
  ],
  completed: [{ id: "progress-4", title: "Review access roles", progress: 100, owner: "Jordan" }],
};
const roadmapColumns: KanbanColumnConfig[] = [
  { id: "planned", title: "Planned" },
  { id: "building", title: "Building" },
  { id: "shipped", title: "Shipped" },
];
type Feature = { id: string; title: string; description: string; progress: number; votes: number };
const roadmap: Record<string, Feature[]> = {
  planned: [
    { id: "feature-1", title: "Saved report views", description: "Share reusable filters with workspace teams.", progress: 0, votes: 84 },
    { id: "feature-2", title: "Scheduled exports", description: "Send reports to a list of recipients.", progress: 0, votes: 63 },
  ],
  building: [{ id: "feature-3", title: "Workspace search", description: "Search projects, members and activity in one place.", progress: 65, votes: 132 }],
  shipped: [{ id: "feature-4", title: "Audit log filters", description: "Narrow events by actor, action and date.", progress: 100, votes: 49 }],
};


function PriorityBadge({ priority }: { priority: Task["priority"] }) {
  return (
    <Badge variant={priority === "high" ? "destructive" : priority === "medium" ? "secondary" : "outline"} className="capitalize">
      {priority}
    </Badge>
  );
}

function TaskCard({ task }: { task: Task }) {
  return (
    <Card className="shadow-none">
      <CardContent className="grid gap-2.5 p-3">
        <div className="flex items-start justify-between gap-2">
          <p className="min-w-0 text-sm font-medium">{task.title}</p>
          <PriorityBadge priority={task.priority} />
        </div>
        {task.description && <p className="text-xs text-muted-foreground">{task.description}</p>}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Avatar size="xs">
              <AvatarFallback>{task.assignee ?? "--"}</AvatarFallback>
            </Avatar>
            {task.assignee ? `Owner ${task.assignee}` : "Unassigned"}
          </span>
          {task.due && <time>Due {task.due}</time>}
        </div>
      </CardContent>
    </Card>
  );
}

export function KanbanDemo({ index }: { index: number }) {
  const [tasks, setTasks] = React.useState(baseTasks);
  const [statusBoard, setStatusBoard] = React.useState(statusTasks);
  const [roadmapBoard, setRoadmapBoard] = React.useState(roadmap);
  const [status, setStatus] = React.useState("Saved");
  const failNext = React.useRef(false);
  const saveId = React.useRef(0);
  const commitTasks = (next: Record<string, Task[]>) => {
    const previous = tasks;
    const id = ++saveId.current;
    setTasks(next);
    setStatus("Saving…");
    window.setTimeout(() => {
      if (saveId.current !== id) return;
      if (failNext.current) {
        setTasks(previous);
        setStatus("Save failed · changes rolled back");
        failNext.current = false;
      } else setStatus("Saved");
    }, 700);
  };

  if (index <= 1)
    return (
      <div className="grid w-full gap-4">
        <KanbanBoard
          columns={taskColumns}
          value={tasks}
          onValueChange={setTasks}
          itemLabel={(task) => `Move ${task.title}`}
          getItemValue={(task) => task.id}
          renderItem={(task) => <TaskCard task={task} />}
          renderColumnHeader={(column, count) => (
            <div className="flex min-w-0 items-center gap-2">
              <h3 className="truncate text-sm font-semibold">{column.title}</h3>
              <Badge variant="outline">{count}</Badge>
            </div>
          )}
        />
        <div role="img" aria-label={index === 0 ? "Placeholder overlay preview" : "Card overlay preview"} className="flex min-h-14 items-center">
          <span className="text-xs text-muted-foreground">{index === 0 ? "Placeholder overlay" : "Card overlay"}</span>
          {index === 0 ? (
            <div className="ml-3 h-14 w-64 rounded-xl border-2 border-dashed border-primary/40 bg-primary/5" />
          ) : (
            <div className="ml-3 w-64 rotate-1">
              <TaskCard task={baseTasks.backlog[0]} />
            </div>
          )}
        </div>
      </div>
    );
  if (index === 2)
    return (
      <KanbanBoard
        columns={statusColumns}
        value={statusBoard}
        onValueChange={setStatusBoard}
        itemLabel={(task) => `Move ${task.title}`}
        getItemValue={(task) => task.id}
        className="xl:grid-cols-3"
        renderColumnHeader={(column, count) => (
          <div className="flex min-w-0 items-center gap-2">
            {column.id === "todo" ? (
              <IconCircle className="size-4 text-muted-foreground" />
            ) : column.id === "doing" ? (
              <IconCircleDot className="size-4 text-primary" />
            ) : (
              <IconCircleCheck className="size-4 text-primary" />
            )}
            <h3 className="truncate text-sm font-semibold">{column.title}</h3>
            <Badge variant="outline">{count}</Badge>
          </div>
        )}
        renderItem={(task) => (
          <Frame variant="ghost" spacing="sm" className="p-0">
            <FramePanel className="grid gap-2 p-3">
              <span className="text-sm font-medium">{task.title}</span>
              <Badge variant="secondary" className="w-fit">
                {task.label}
              </Badge>
            </FramePanel>
          </Frame>
        )}
      />
    );
  if (index === 3)
    return (
      <div className="grid w-full gap-3 xl:grid-cols-3">
        {progressColumns.map((column) => (
          <Frame key={column.id} spacing="xs">
            <FrameHeader>
              <FrameTitle>{column.title}</FrameTitle>
              <FrameDescription>
                {column.id === "planning"
                  ? "Work queued for a future cycle"
                  : column.id === "active"
                    ? "Work currently in motion"
                    : "Recently completed work"}
              </FrameDescription>
            </FrameHeader>
            <FramePanel className="grid gap-2">
              {progressTasks[column.id].map((task) => (
                <Frame key={task.id} variant="ghost" spacing="sm">
                  <FramePanel className="grid gap-3 p-3">
                    <p className="text-sm font-medium">{task.title}</p>
                    <Progress value={task.progress} />
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{task.owner}</span>
                      <span>{task.progress}%</span>
                    </div>
                  </FramePanel>
                </Frame>
              ))}
            </FramePanel>
          </Frame>
        ))}
      </div>
    );
  if (index === 4)
    return (
      <KanbanBoard
        columns={roadmapColumns}
        value={roadmapBoard}
        onValueChange={setRoadmapBoard}
        itemLabel={(feature) => `Move ${feature.title}`}
        getItemValue={(feature) => feature.id}
        renderColumnHeader={(column, count) => (
          <div className="flex min-w-0 items-center gap-2">
            <span className="size-2 rounded-full bg-primary" />
            <h3 className="truncate text-sm font-semibold">{column.title}</h3>
            <Badge variant="outline">{count}</Badge>
          </div>
        )}
        renderItem={(feature) => (
          <Frame variant="ghost" spacing="sm" className="p-0">
            <FramePanel className="grid gap-2.5 p-3">
              <span className="text-sm font-medium">{feature.title}</span>
              <p className="line-clamp-2 text-xs text-muted-foreground">{feature.description}</p>
              <Progress value={feature.progress} />
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{feature.progress}% complete</span>
                <span>↑ {feature.votes}</span>
              </div>
            </FramePanel>
          </Frame>
        )}
      />
    );
  const moveFirstTask = () => {
    const current = tasks.backlog[0];
    if (!current) return;
    commitTasks({ ...tasks, backlog: tasks.backlog.slice(1), inProgress: [...tasks.inProgress, current] });
  };
  return (
    <div className="grid w-full gap-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm text-muted-foreground">Drag a card, or move the first task, to simulate a backend save.</p>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant={status === "Saved" ? "secondary" : status.startsWith("Save failed") ? "destructive" : "outline"}>{status}</Badge>
          <Button size="sm" variant="outline" onClick={() => { failNext.current = true; setStatus("Next save will fail"); }}>
            Simulate next save failure
          </Button>
          <Button size="sm" onClick={moveFirstTask} disabled={tasks.backlog.length === 0}>
            Move first task
          </Button>
        </div>
      </div>
      <KanbanBoard
        columns={taskColumns}
        value={tasks}
        onValueChange={commitTasks}
        itemLabel={(task) => `Move ${task.title}`}
        getItemValue={(task) => task.id}
        renderItem={(task) => (
          <Card>
            <CardContent className="flex items-center justify-between gap-2 p-3">
              <span className="text-sm font-medium">{task.title}</span>
              <PriorityBadge priority={task.priority} />
            </CardContent>
          </Card>
        )}
        renderColumnHeader={(column, count) => (
          <div className="flex min-w-0 items-center justify-between gap-2">
            <div className="flex min-w-0 items-center gap-2">
              <span className="text-sm font-semibold">{column.title}</span>
              <Badge variant="outline">{count}</Badge>
            </div>
          </div>
        )}
      />
    </div>
  );
}

