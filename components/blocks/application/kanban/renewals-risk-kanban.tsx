"use client";

import { useState } from "react";
import {
  IconCalendarStats,
  IconCurrencyDollar,
  IconFilter,
  IconPlus,
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

type Renewal = {
  id: string;
  company: string;
  risk: string;
  arr: string;
  date: string;
  health: number;
  owner: string;
  role: string;
  days: number;
  mark: string;
};
type Stage = { id: string; title: string; tone: string; renewals: Renewal[] };

const initialStages: Stage[] = [
  {
    id: "upcoming",
    title: "Upcoming",
    tone: "bg-info",
    renewals: [
      {
        id: "google",
        company: "Google",
        risk: "Warning",
        arr: "$184K",
        date: "May 15",
        health: 66,
        owner: "Ava Morgan",
        role: "Strategic CSM",
        days: 15,
        mark: "G",
      },
      {
        id: "zoom",
        company: "Zoom",
        risk: "Clear",
        arr: "$126K",
        date: "May 21",
        health: 74,
        owner: "Eli Ramos",
        role: "Enterprise AM",
        days: 21,
        mark: "Z",
      },
      {
        id: "dropbox",
        company: "Dropbox",
        risk: "Clear",
        arr: "$158K",
        date: "Jun 3",
        health: 71,
        owner: "Priya Shah",
        role: "Commercial CSM",
        days: 34,
        mark: "D",
      },
    ],
  },
  {
    id: "save-plan",
    title: "Save Plan",
    tone: "bg-rose-500",
    renewals: [
      {
        id: "slack",
        company: "Slack",
        risk: "Critical",
        arr: "$342K",
        date: "May 6",
        health: 32,
        owner: "Nora Singh",
        role: "Renewals Lead",
        days: 6,
        mark: "S",
      },
      {
        id: "stripe",
        company: "Stripe",
        risk: "Critical",
        arr: "$278K",
        date: "May 10",
        health: 42,
        owner: "Ava Morgan",
        role: "Strategic CSM",
        days: 10,
        mark: "S",
      },
    ],
  },
  {
    id: "executive-review",
    title: "Executive Review",
    tone: "bg-amber-500",
    renewals: [
      {
        id: "openai",
        company: "OpenAI",
        risk: "Warning",
        arr: "$515K",
        date: "May 13",
        health: 59,
        owner: "Miles Chen",
        role: "Global CSM",
        days: 13,
        mark: "AI",
      },
      {
        id: "anthropic",
        company: "Anthropic",
        risk: "Warning",
        arr: "$228K",
        date: "May 22",
        health: 64,
        owner: "Priya Shah",
        role: "Commercial CSM",
        days: 22,
        mark: "A",
      },
    ],
  },
  {
    id: "security-legal",
    title: "Security/Legal",
    tone: "bg-violet-500",
    renewals: [
      {
        id: "github",
        company: "GitHub",
        risk: "Warning",
        arr: "$397K",
        date: "May 8",
        health: 48,
        owner: "Eli Ramos",
        role: "Enterprise AM",
        days: 8,
        mark: "GH",
      },
      {
        id: "supabase",
        company: "Supabase",
        risk: "Warning",
        arr: "$448K",
        date: "May 18",
        health: 57,
        owner: "Nora Singh",
        role: "Renewals Lead",
        days: 18,
        mark: "S",
      },
      {
        id: "nvidia",
        company: "NVIDIA",
        risk: "Clear",
        arr: "$302K",
        date: "May 27",
        health: 72,
        owner: "Miles Chen",
        role: "Global CSM",
        days: 27,
        mark: "N",
      },
    ],
  },
  {
    id: "procurement",
    title: "Procurement",
    tone: "bg-orange-500",
    renewals: [
      {
        id: "paypal",
        company: "PayPal",
        risk: "Warning",
        arr: "$305K",
        date: "May 19",
        health: 61,
        owner: "Miles Chen",
        role: "Global CSM",
        days: 19,
        mark: "P",
      },
      {
        id: "onedrive",
        company: "Microsoft OneDrive",
        risk: "Clear",
        arr: "$264K",
        date: "Jun 2",
        health: 76,
        owner: "Priya Shah",
        role: "Commercial CSM",
        days: 33,
        mark: "M",
      },
    ],
  },
  { id: "renewed", title: "Renewed", tone: "bg-success", renewals: [] },
];

export function RenewalsRiskKanban() {
  const [stages, setStages] = useState(initialStages);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [company, setCompany] = useState("");

  function addRenewal(stageId = "upcoming") {
    if (!company.trim()) return;
    const renewal: Renewal = {
      id: `renewal-${Date.now()}`,
      company: company.trim(),
      risk: "Warning",
      arr: "$0",
      date: "Jun 15",
      health: 50,
      owner: "Ava Morgan",
      role: "Strategic CSM",
      days: 30,
      mark: company.trim().slice(0, 2).toUpperCase(),
    };
    setStages((current) =>
      current.map((stage) =>
        stage.id === stageId
          ? { ...stage, renewals: [...stage.renewals, renewal] }
          : stage,
      ),
    );
    setCompany("");
    setDialogOpen(false);
  }

  function moveRenewal(id: string, stageId: string) {
    setStages((current) => {
      const source = current.find((stage) =>
        stage.renewals.some((renewal) => renewal.id === id),
      );
      const target = current.find((stage) => stage.id === stageId);
      const renewal = source?.renewals.find((item) => item.id === id);
      if (!source || !target || !renewal || source.id === target.id)
        return current;
      return current.map((stage) =>
        stage.id === source.id
          ? {
              ...stage,
              renewals: stage.renewals.filter((item) => item.id !== id),
            }
          : stage.id === target.id
            ? { ...stage, renewals: [...stage.renewals, renewal] }
            : stage,
      );
    });
  }

  return (
    <section className="min-w-0 space-y-4">
      <header className="flex flex-wrap items-center gap-2">
        <h2 className="flex items-center gap-2 text-base font-semibold">
          Renewals Risk Board{" "}
          <span className="rounded border px-1.5 py-0.5 text-xs text-muted-foreground">
            {stages.reduce((sum, stage) => sum + stage.renewals.length, 0)}
          </span>
        </h2>
        <div className="ml-auto flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setFilterOpen((open) => !open)}
          >
            <IconFilter />
            Filters
          </Button>
          <Button size="sm" onClick={() => setDialogOpen(true)}>
            <IconPlus />
            New renewal
          </Button>
        </div>
      </header>
      {filterOpen && (
        <div className="rounded-lg border bg-card p-3">
          <Input
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            placeholder="Search accounts or owners"
          />
        </div>
      )}
      <div className="overflow-x-auto pb-3">
        <div className="flex min-w-max items-start gap-3">
          {stages.map((stage) => (
            <section
              key={stage.id}
              data-renewal-stage={stage.id}
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => {
                event.preventDefault();
                moveRenewal(event.dataTransfer.getData("text/plain"), stage.id);
              }}
              className="w-[282px] shrink-0"
            >
              <header className="mb-3 flex items-center gap-2 px-1 py-1">
                <span className={`size-2.5 rounded-full ${stage.tone}`} />
                <h3 className="text-sm font-semibold">{stage.title}</h3>
                <span className="rounded border px-1.5 py-0.5 text-[10px] text-muted-foreground">
                  {stage.renewals.length}
                </span>
              </header>
              {stage.renewals.length === 0 ? (
                <div className="grid min-h-44 place-content-center justify-items-center rounded-xl border border-dashed p-4 text-center">
                  <p className="text-sm font-medium">No renewals here</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Drop an account here when this stage is ready.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setDialogOpen(true);
                      setCompany("");
                    }}
                    className="mt-3 text-xs text-primary hover:underline"
                  >
                    Add renewed account
                  </button>
                </div>
              ) : (
                <div className="grid content-start gap-2">
                  {stage.renewals
                    .filter((renewal) =>
                      `${renewal.company} ${renewal.owner} ${renewal.role} ${renewal.risk}`
                        .toLowerCase()
                        .includes(filter.toLowerCase()),
                    )
                    .map((renewal) => (
                      <article
                        key={renewal.id}
                        draggable
                        onDragStart={(event) =>
                          event.dataTransfer.setData("text/plain", renewal.id)
                        }
                        className="rounded-xl border bg-card p-3"
                      >
                        <header className="flex items-center gap-2">
                          <span
                            className={`grid size-6 place-items-center rounded-md text-xs font-bold ${renewal.id === "google" ? "bg-info/10 text-info" : "bg-muted text-foreground"}`}
                          >
                            {renewal.mark}
                          </span>
                          <h4 className="min-w-0 flex-1 truncate text-sm font-medium">
                            {renewal.company}
                          </h4>
                          <span
                            className={`rounded-md border px-1.5 py-0.5 text-[10px] ${renewal.risk === "Critical" ? "border-destructive/40 text-destructive" : renewal.risk === "Warning" ? "border-warning/40 text-warning" : "border-success/40 text-success"}`}
                          >
                            {renewal.risk}
                          </span>
                        </header>
                        <div className="mt-3 grid grid-cols-2 gap-2">
                          <div className="rounded-lg border bg-muted/20 p-2">
                            <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                              <IconCurrencyDollar className="size-3" />
                              ARR
                            </span>
                            <strong className="text-sm">{renewal.arr}</strong>
                          </div>
                          <div className="rounded-lg border bg-muted/20 p-2">
                            <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                              <IconCalendarStats className="size-3" />
                              Renews
                            </span>
                            <strong className="text-sm">{renewal.date}</strong>
                          </div>
                        </div>
                        <div className="mt-3 flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">Health</span>
                          <span className="font-medium">{renewal.health}%</span>
                        </div>
                        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                          <span
                            className={`block h-full ${renewal.health < 45 ? "bg-destructive" : renewal.health < 70 ? "bg-warning" : "bg-success"}`}
                            style={{ width: `${renewal.health}%` }}
                          />
                        </div>
                        <div className="mt-3 flex items-center gap-2">
                          <Avatar className="size-7">
                            <AvatarImage
                              src={demoAvatarUrl(renewal.owner)}
                              alt=""
                            />
                            <AvatarFallback className="text-[8px]">
                              {renewal.owner
                                .split(" ")
                                .map((part) => part[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="min-w-0">
                            <p className="truncate text-xs font-medium">
                              {renewal.owner}
                            </p>
                            <p className="text-[10px] text-muted-foreground">
                              {renewal.role}
                            </p>
                          </div>
                          <span className="ml-auto text-xs text-muted-foreground">
                            {renewal.days}d left
                          </span>
                        </div>
                      </article>
                    ))}
                </div>
              )}
            </section>
          ))}
        </div>
      </div>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New renewal</DialogTitle>
          </DialogHeader>
          <Input
            value={company}
            onChange={(event) => setCompany(event.target.value)}
            placeholder="Account name"
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => addRenewal()}>Create renewal</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}
