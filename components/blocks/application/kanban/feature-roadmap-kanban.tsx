"use client";

import { useState } from "react";
import { IconCheck, IconFilter, IconPlus } from "@tabler/icons-react";

import { Button } from "@/components/ui/button/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog/dialog";
import { Input } from "@/components/ui/input/input";

type Feature = {
  id: string;
  title: string;
  tag: string;
  description: string;
  metric: string;
  status: string;
  progress: number;
  votes: number;
  comments: number;
  tone: string;
};
type RoadmapStage = {
  id: string;
  title: string;
  subtitle: string;
  tone: string;
  features: Feature[];
};

const progressLabels: Record<string, string> = {
  "intake-routing": "Scoring",
  "slack-capture": "Reviewing",
  "signal-clustering": "Clustering",
  "account-search": "Discovery",
  webhooks: "Pending scope",
  "report-builder": "Prototype",
  entitlements: "Spec",
  "renewal-timeline": "Wireframe",
  coedit: "Dependency",
  "api-migration": "At risk",
  "audit-export": "Complete",
  "offline-mode": "Research",
};

const initialStages: RoadmapStage[] = [
  {
    id: "triage",
    title: "Triage",
    subtitle: "New customer signals",
    tone: "bg-muted-foreground/50",
    features: [
      {
        id: "intake-routing",
        title: "Smart intake routing",
        tag: "Intake",
        description:
          "Classify incoming requests by segment, account value, and urgency.",
        metric: "23 accounts",
        status: "Needs signal",
        progress: 20,
        votes: 83,
        comments: 14,
        tone: "bg-muted-foreground/40",
      },
      {
        id: "slack-capture",
        title: "Slack request capture",
        tag: "Workflow",
        description:
          "Turn product feedback threads into deduplicated roadmap signals.",
        metric: "18 teams",
        status: "Q3 review",
        progress: 24,
        votes: 67,
        comments: 10,
        tone: "bg-info",
      },
      {
        id: "signal-clustering",
        title: "Customer signal clustering",
        tag: "Signals",
        description:
          "Group related feedback by account segment and recent revenue motion.",
        metric: "12 accounts",
        status: "Signal review",
        progress: 18,
        votes: 52,
        comments: 7,
        tone: "bg-muted-foreground/40",
      },
    ],
  },
  {
    id: "planned",
    title: "Planned",
    subtitle: "Queued for scope",
    tone: "bg-sky-500",
    features: [
      {
        id: "account-search",
        title: "AI account search",
        tag: "Search",
        description:
          "Permission-aware search across tickets, call notes, and docs.",
        metric: "$72k pipeline",
        status: "Q3 pilot",
        progress: 30,
        votes: 142,
        comments: 18,
        tone: "bg-sky-500",
      },
      {
        id: "webhooks",
        title: "Outbound webhooks",
        tag: "Platform",
        description:
          "Reliable event delivery for billing, seats, and lifecycle changes.",
        metric: "14 accounts",
        status: "Q3 scope",
        progress: 28,
        votes: 98,
        comments: 6,
        tone: "bg-cyan-500",
      },
    ],
  },
  {
    id: "shaping",
    title: "Shaping",
    subtitle: "Solution design",
    tone: "bg-cyan-500",
    features: [
      {
        id: "report-builder",
        title: "Custom report builder",
        tag: "Reports",
        description:
          "Saved metrics, scoped filters, and reusable executive views.",
        metric: "$81k ARR",
        status: "Design review",
        progress: 34,
        votes: 156,
        comments: 21,
        tone: "bg-cyan-500",
      },
      {
        id: "entitlements",
        title: "Entitlement rules",
        tag: "Billing",
        description:
          "Plan-aware capability gates with account overrides and audit notes.",
        metric: "$63k ARR",
        status: "Tech plan",
        progress: 38,
        votes: 132,
        comments: 3,
        tone: "bg-violet-500",
      },
      {
        id: "renewal-timeline",
        title: "Renewal timeline view",
        tag: "Lifecycle",
        description:
          "Unify renewal notes, owner changes, and risk events in one history.",
        metric: "$49k ARR",
        status: "Design review",
        progress: 36,
        votes: 118,
        comments: 12,
        tone: "bg-cyan-500",
      },
    ],
  },
  {
    id: "building",
    title: "Building",
    subtitle: "Actively in progress",
    tone: "bg-amber-500",
    features: [
      {
        id: "coedit",
        title: "Co-edit workspace",
        tag: "Teams",
        description:
          "Shared editing with presence, conflict recovery, and audit history.",
        metric: "$118k ARR",
        status: "May beta",
        progress: 42,
        votes: 234,
        comments: 24,
        tone: "bg-amber-500",
      },
      {
        id: "api-migration",
        title: "API v2 migration",
        tag: "API",
        description:
          "Typed REST contract, migration helpers, and staged partner rollout.",
        metric: "$54k ARR",
        status: "Partner beta",
        progress: 36,
        votes: 176,
        comments: 11,
        tone: "bg-rose-500",
      },
    ],
  },
  {
    id: "launched",
    title: "Launched",
    subtitle: "Recently delivered",
    tone: "bg-emerald-500",
    features: [
      {
        id: "audit-export",
        title: "Audit log export",
        tag: "Security",
        description:
          "Export workspace activity with retention controls and filters.",
        metric: "31 accounts",
        status: "Released",
        progress: 100,
        votes: 191,
        comments: 16,
        tone: "bg-emerald-500",
      },
    ],
  },
  {
    id: "parked",
    title: "Parked",
    subtitle: "Revisit later",
    tone: "bg-muted-foreground/40",
    features: [
      {
        id: "offline-mode",
        title: "Offline workspace mode",
        tag: "Platform",
        description:
          "Keep key project views available when connectivity drops.",
        metric: "9 teams",
        status: "Revisit Q4",
        progress: 12,
        votes: 46,
        comments: 5,
        tone: "bg-muted-foreground/40",
      },
    ],
  },
];

export function FeatureRoadmapKanban() {
  const [stages, setStages] = useState(initialStages);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newFeature, setNewFeature] = useState("");
  const [dragged, setDragged] = useState<string | null>(null);

  function addFeature() {
    if (!newFeature.trim()) return;
    const feature: Feature = {
      id: `feature-${Date.now()}`,
      title: newFeature.trim(),
      tag: "New",
      description: "Add a feature summary.",
      metric: "New request",
      status: "Needs signal",
      progress: 0,
      votes: 0,
      comments: 0,
      tone: "bg-primary",
    };
    setStages((current) =>
      current.map((stage) =>
        stage.id === "triage"
          ? { ...stage, features: [feature, ...stage.features] }
          : stage,
      ),
    );
    setNewFeature("");
    setDialogOpen(false);
  }

  function moveFeature(featureId: string, stageId: string) {
    setStages((current) => {
      const source = current.find((stage) =>
        stage.features.some((feature) => feature.id === featureId),
      );
      const target = current.find((stage) => stage.id === stageId);
      const feature = source?.features.find((item) => item.id === featureId);
      if (!source || !target || !feature || source.id === target.id)
        return current;
      return current.map((stage) =>
        stage.id === source.id
          ? {
              ...stage,
              features: stage.features.filter((item) => item.id !== featureId),
            }
          : stage.id === target.id
            ? { ...stage, features: [feature, ...stage.features] }
            : stage,
      );
    });
  }

  function vote(featureId: string) {
    setStages((current) =>
      current.map((stage) => ({
        ...stage,
        features: stage.features.map((feature) =>
          feature.id === featureId
            ? { ...feature, votes: feature.votes + 1 }
            : feature,
        ),
      })),
    );
  }

  return (
    <section className="min-w-0 space-y-4">
      <header className="flex flex-wrap items-center gap-2">
        <h2 className="text-base font-semibold">Feature Roadmap</h2>
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
            New feature
          </Button>
        </div>
      </header>
      {filterOpen && (
        <div className="rounded-lg border bg-card p-3">
          <Input
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            placeholder="Search features"
          />
        </div>
      )}
      <div className="overflow-x-auto pb-3">
        <div className="flex min-w-max gap-3">
          {stages.map((stage) => {
            const features = stage.features.filter((feature) =>
              `${feature.title} ${feature.tag} ${feature.description}`
                .toLowerCase()
                .includes(filter.toLowerCase()),
            );
            return (
              <section
                key={stage.id}
                data-roadmap-stage={stage.id}
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => {
                  event.preventDefault();
                  moveFeature(
                    event.dataTransfer.getData("text/plain"),
                    stage.id,
                  );
                }}
                className="w-[290px] shrink-0 rounded-xl border bg-muted/30 p-1.5"
              >
                <header className="mb-2 flex items-start gap-2 px-1.5 pt-1">
                  <span
                    className={`mt-1.5 size-2.5 shrink-0 rounded-full ${stage.tone}`}
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold">{stage.title}</h3>
                      <span className="rounded border bg-background px-1.5 py-0.5 text-[10px] text-muted-foreground">
                        {features.length}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {stage.subtitle}
                    </p>
                  </div>
                </header>
                <div className="grid content-start gap-2">
                  {features.map((feature) => (
                    <article
                      key={feature.id}
                      draggable
                      onDragStart={(event) => {
                        setDragged(feature.id);
                        event.dataTransfer.setData("text/plain", feature.id);
                      }}
                      onDragEnd={() => setDragged(null)}
                      className={`rounded-xl border bg-card p-3 ${dragged === feature.id ? "opacity-50" : ""}`}
                    >
                      <div className="flex items-start gap-2">
                        <h4 className="min-w-0 flex-1 text-sm font-medium leading-5">
                          {feature.title}
                        </h4>
                        <span className="shrink-0 rounded-md border px-1.5 py-0.5 text-[10px]">
                          {feature.tag}
                        </span>
                      </div>
                      <p className="mt-2 min-h-9 text-xs leading-4 text-muted-foreground">
                        {feature.description}
                      </p>
                      <div className="mt-2 flex items-center gap-1.5 text-xs">
                        <span className="font-medium">{feature.metric}</span>
                        <span className="text-muted-foreground">•</span>
                        <span className="truncate text-muted-foreground">
                          {feature.status}
                        </span>
                      </div>
                      <div className="mt-2 h-1 overflow-hidden rounded-full bg-muted">
                        <span
                          className={`block h-full ${feature.tone}`}
                          style={{ width: `${feature.progress}%` }}
                        />
                      </div>
                      <footer className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                        <span className="truncate">
                          {progressLabels[feature.id] ?? "Triage"}
                        </span>
                        <span>•</span>
                        <span>{feature.progress}%</span>
                        <button
                          type="button"
                          onClick={() => vote(feature.id)}
                          aria-label={`Vote for ${feature.title}`}
                          className="ml-auto"
                        >
                          {feature.votes} votes
                        </button>
                        <span className="flex items-center gap-1 text-emerald-600">
                          <IconCheck className="size-3.5" />
                          {feature.comments}
                        </span>
                      </footer>
                    </article>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New feature</DialogTitle>
          </DialogHeader>
          <Input
            autoFocus
            value={newFeature}
            onChange={(event) => setNewFeature(event.target.value)}
            placeholder="Feature name"
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={addFeature}>Create feature</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}
