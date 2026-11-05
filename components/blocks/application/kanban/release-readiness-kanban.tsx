"use client";

import { useState } from "react";
import {
  IconCalendarTime,
  IconCheck,
  IconFilter,
  IconPlus,
  IconWindow,
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

type Change = {
  id: string;
  title: string;
  risk: string;
  area: string;
  environment: string;
  date: string;
  owner: string;
  done: number;
  total: number;
};
type Stage = { id: string; title: string; tone: string; changes: Change[] };
const make = (
  id: string,
  title: string,
  risk: string,
  area: string,
  environment: string,
  date: string,
  owner: string,
  done: number,
  total: number,
): Change => ({ id, title, risk, area, environment, date, owner, done, total });
const initialStages: Stage[] = [
  {
    id: "intake",
    title: "Intake",
    tone: "bg-muted-foreground/40",
    changes: [
      make(
        "REL-8429",
        "Enable saved cards for guest checkout",
        "Medium",
        "Checkout",
        "Production",
        "Apr 30, 20:00 UTC",
        "Nina Santos",
        1,
        4,
      ),
      make(
        "REL-8427",
        "Add resend controls to login recovery",
        "Low",
        "Identity",
        "Staging",
        "May 1, 16:30 UTC",
        "Jonah Lee",
        2,
        4,
      ),
      make(
        "REL-8425",
        "Log receipt resend events for admins",
        "Low",
        "Billing",
        "Staging",
        "May 1, 19:00 UTC",
        "Theo Vincent",
        1,
        3,
      ),
    ],
  },
  {
    id: "review",
    title: "Review Needed",
    tone: "bg-violet-500",
    changes: [
      make(
        "REL-8421",
        "Split EU checkout traffic by processor",
        "Critical",
        "Checkout",
        "Production",
        "Apr 30, 22:00 UTC",
        "Maya Patel",
        2,
        5,
      ),
      make(
        "REL-8418",
        "Raise webhook retry ceiling for partners",
        "High",
        "Webhooks",
        "Production",
        "May 1, 18:30 UTC",
        "Omar Haddad",
        3,
        5,
      ),
      make(
        "REL-8417",
        "Confirm processor failover limits",
        "High",
        "Checkout",
        "Production",
        "May 1, 21:00 UTC",
        "Priya Menon",
        2,
        5,
      ),
    ],
  },
  {
    id: "blocked",
    title: "Blocked",
    tone: "bg-destructive",
    changes: [
      make(
        "REL-8416",
        "Rotate signing keys for session tokens",
        "High",
        "Identity",
        "Production",
        "May 2, 19:30 UTC",
        "Priya Menon",
        2,
        4,
      ),
      make(
        "REL-8413",
        "Rebuild analytics partitions for exports",
        "Critical",
        "Analytics",
        "Staging",
        "May 2, 23:00 UTC",
        "Theo Vincent",
        1,
        5,
      ),
    ],
  },
  {
    id: "scheduled",
    title: "Scheduled",
    tone: "bg-muted-foreground/60",
    changes: [
      make(
        "REL-8408",
        "Move invoice workers to new queues",
        "Medium",
        "Billing",
        "Staging",
        "May 3, 21:00 UTC",
        "Theo Vincent",
        4,
        5,
      ),
      make(
        "REL-8405",
        "Expand partner delivery event schema",
        "Medium",
        "Webhooks",
        "Production",
        "May 4, 17:30 UTC",
        "Omar Haddad",
        3,
        4,
      ),
      make(
        "REL-8402",
        "Reshard billing export queue",
        "Medium",
        "Billing",
        "Production",
        "May 4, 23:00 UTC",
        "Nina Santos",
        3,
        5,
      ),
    ],
  },
  {
    id: "ready",
    title: "Ready",
    tone: "bg-success",
    changes: [
      make(
        "REL-8399",
        "Open LATAM webhook fanout",
        "Low",
        "Webhooks",
        "Production",
        "May 5, 18:00 UTC",
        "Omar Haddad",
        5,
        5,
      ),
      make(
        "REL-8394",
        "Ship invoice PDF branding controls",
        "Low",
        "Billing",
        "Production",
        "May 5, 20:30 UTC",
        "Nina Santos",
        4,
        4,
      ),
    ],
  },
  {
    id: "shipped",
    title: "Shipped",
    tone: "bg-info",
    changes: [
      make(
        "REL-8379",
        "Reduce invite session TTL",
        "Low",
        "Identity",
        "Production",
        "Apr 29, 17:00 UTC",
        "Maya Patel",
        3,
        3,
      ),
      make(
        "REL-8372",
        "Archive legacy checkout experiment flags",
        "Low",
        "Checkout",
        "Production",
        "Apr 28, 15:00 UTC",
        "Jonah Lee",
        4,
        4,
      ),
    ],
  },
];
const riskTone: Record<string, string> = {
  Critical: "border-destructive/40 text-destructive",
  High: "border-warning/40 bg-warning/5 text-warning",
  Medium: "border-violet-500/40 text-violet-600",
  Low: "border-muted bg-muted text-muted-foreground",
};

export function ReleaseReadinessKanban() {
  const [stages, setStages] = useState(initialStages);
  const [filterOpen, setFilterOpen] = useState(false);
  const [windowsOpen, setWindowsOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [title, setTitle] = useState("");

  function addChange() {
    if (!title.trim()) return;
    const change = make(
      `REL-${Date.now().toString().slice(-4)}`,
      title.trim(),
      "Medium",
      "Checkout",
      "Staging",
      "May 6, 18:00 UTC",
      "Nina Santos",
      0,
      4,
    );
    setStages((current) =>
      current.map((stage) =>
        stage.id === "intake"
          ? { ...stage, changes: [...stage.changes, change] }
          : stage,
      ),
    );
    setTitle("");
    setDialogOpen(false);
  }

  function moveChange(id: string, targetId: string) {
    setStages((current) => {
      const source = current.find((stage) =>
        stage.changes.some((change) => change.id === id),
      );
      const target = current.find((stage) => stage.id === targetId);
      const change = source?.changes.find((item) => item.id === id);
      if (!source || !target || !change || source.id === target.id)
        return current;
      return current.map((stage) =>
        stage.id === source.id
          ? {
              ...stage,
              changes: stage.changes.filter((item) => item.id !== id),
            }
          : stage.id === target.id
            ? { ...stage, changes: [change, ...stage.changes] }
            : stage,
      );
    });
  }

  return (
    <section className="min-w-0 space-y-4">
      <header className="flex flex-wrap items-center gap-2">
        <h2 className="text-base font-semibold">Release Readiness Board</h2>
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
            onClick={() => setWindowsOpen((open) => !open)}
          >
            <IconWindow />
            Windows
          </Button>
          <Button size="sm" onClick={() => setDialogOpen(true)}>
            <IconPlus />
            New change
          </Button>
        </div>
      </header>
      {filterOpen && (
        <div className="rounded-lg border bg-card p-3">
          <Input
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            placeholder="Search changes"
          />
        </div>
      )}
      {windowsOpen && (
        <div className="flex items-center gap-2 rounded-lg border bg-card p-3">
          <IconCalendarTime className="size-4 text-muted-foreground" />
          <Input placeholder="Release window" defaultValue="Apr 30 – May 5" />
        </div>
      )}
      <div className="overflow-x-auto pb-3">
        <div className="flex min-w-max items-start gap-3">
          {stages.map((stage) => (
            <section
              key={stage.id}
              data-release-stage={stage.id}
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => {
                event.preventDefault();
                moveChange(event.dataTransfer.getData("text/plain"), stage.id);
              }}
              className="w-[304px] shrink-0 rounded-xl border bg-muted/20 p-1.5"
            >
              <header className="mb-2 flex items-center gap-2 px-1.5 py-1">
                <span className={`size-2.5 rounded-full ${stage.tone}`} />
                <h3 className="text-sm font-semibold">{stage.title}</h3>
                <span className="text-xs text-muted-foreground">
                  {stage.changes.length}
                </span>
              </header>
              <div className="grid content-start gap-2">
                {stage.changes
                  .filter((change) =>
                    `${change.id} ${change.title} ${change.area} ${change.owner} ${change.risk}`
                      .toLowerCase()
                      .includes(filter.toLowerCase()),
                  )
                  .map((change) => {
                    const percent = Math.round(
                      (change.done / change.total) * 100,
                    );
                    return (
                      <article
                        key={change.id}
                        draggable
                        onDragStart={(event) =>
                          event.dataTransfer.setData("text/plain", change.id)
                        }
                        className="rounded-xl border bg-card p-2.5"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[10px] text-muted-foreground">
                            {change.id}
                          </span>
                          <span
                            className={`ml-auto rounded-md border px-1.5 py-0.5 text-[10px] ${riskTone[change.risk]}`}
                          >
                            {change.risk}
                          </span>
                        </div>
                        <h4 className="mt-1.5 text-xs font-semibold leading-4">
                          {change.title}
                        </h4>
                        <div className="mt-2 flex items-center gap-2 text-[11px]">
                          <span className="truncate">{change.area}</span>
                          <span className="rounded border px-1.5 py-0.5 text-[10px]">
                            {change.environment}
                          </span>
                        </div>
                        <p className="mt-2 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                          <IconCalendarTime className="size-3.5" />
                          {change.date}
                        </p>
                        <div className="mt-2 flex items-center gap-1.5">
                          <Avatar className="size-5">
                            <AvatarImage
                              src={demoAvatarUrl(change.owner)}
                              alt=""
                            />
                            <AvatarFallback className="text-[8px]">
                              {change.owner
                                .split(" ")
                                .map((part) => part[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-[11px]">{change.owner}</span>
                        </div>
                        <div className="mt-2 flex items-center justify-between text-[11px] text-muted-foreground">
                          <span>Checklist</span>
                          <span>
                            {change.done}/{change.total} - {percent}%
                          </span>
                        </div>
                        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted">
                          <span
                            className={`block h-full ${percent === 100 ? "bg-success" : percent >= 50 ? "bg-warning" : "bg-muted-foreground/60"}`}
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                        <span className="sr-only">
                          <IconCheck /> checklist progress
                        </span>
                      </article>
                    );
                  })}
              </div>
            </section>
          ))}
        </div>
      </div>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New change</DialogTitle>
          </DialogHeader>
          <Input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Change title"
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={addChange}>Create change</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}
