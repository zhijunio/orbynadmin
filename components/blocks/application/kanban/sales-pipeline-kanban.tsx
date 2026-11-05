"use client";

import { useState } from "react";
import {
  IconCalendar,
  IconCheck,
  IconClock,
  IconCurrencyDollar,
  IconFile,
  IconFilter,
  IconMessage,
  IconPlus,
  IconStarFilled,
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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog/dialog";
import { Input } from "@/components/ui/input/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select/select";
import { demoAvatarUrl } from "@/utils/demo-avatar";

type Deal = {
  id: string;
  client: string;
  tag: string;
  amount: number;
  detail: string;
  next: string;
  date: string;
  owner: string;
  rating: number;
  files: number;
  tasks: number;
  comments: number;
  due: string;
  accent: string;
};
type Stage = { id: string; title: string; tone: string; deals: Deal[] };

const initialStages: Stage[] = [
  {
    id: "prospecting",
    title: "Prospecting",
    tone: "bg-muted-foreground/50",
    deals: [
      {
        id: "deal-supabase",
        client: "Supabase",
        tag: "Inbound",
        amount: 34800,
        detail: "Annual platform expansion",
        next: "Map technical buyer",
        date: "May 6, 2026",
        owner: "Mara Bell",
        rating: 4,
        files: 2,
        tasks: 3,
        comments: 5,
        due: "2d left",
        accent: "text-success",
      },
      {
        id: "deal-slack",
        client: "Slack",
        tag: "Partner",
        amount: 18400,
        detail: "Team workflow pilot",
        next: "Confirm champion criteria",
        date: "May 8, 2026",
        owner: "Jonas Park",
        rating: 3.5,
        files: 1,
        tasks: 2,
        comments: 3,
        due: "Today",
        accent: "text-violet-500",
      },
    ],
  },
  {
    id: "qualification",
    title: "Qualification",
    tone: "bg-foreground",
    deals: [
      {
        id: "deal-stripe",
        client: "Stripe",
        tag: "Expansion",
        amount: 52600,
        detail: "Usage-based billing layer",
        next: "Validate security review",
        date: "May 9, 2026",
        owner: "Lina Ortiz",
        rating: 5,
        files: 3,
        tasks: 5,
        comments: 4,
        due: "4d left",
        accent: "text-info",
      },
      {
        id: "deal-openai",
        client: "OpenAI",
        tag: "Strategic",
        amount: 41200,
        detail: "Research workspace rollout",
        next: "Align procurement path",
        date: "May 11, 2026",
        owner: "Theo Grant",
        rating: 4.5,
        files: 4,
        tasks: 4,
        comments: 7,
        due: "1d left",
        accent: "text-foreground",
      },
    ],
  },
  {
    id: "meeting",
    title: "Meeting",
    tone: "bg-warning",
    deals: [
      {
        id: "deal-zoom",
        client: "Zoom",
        tag: "Discovery",
        amount: 29600,
        detail: "Scheduling workspace pilot",
        next: "Run discovery call",
        date: "May 12, 2026",
        owner: "Mara Bell",
        rating: 4,
        files: 2,
        tasks: 3,
        comments: 4,
        due: "Booked",
        accent: "text-info",
      },
      {
        id: "deal-google-meet",
        client: "Google Meet",
        tag: "Exec",
        amount: 37900,
        detail: "Executive alignment session",
        next: "Prepare value map",
        date: "May 13, 2026",
        owner: "Theo Grant",
        rating: 4.5,
        files: 3,
        tasks: 4,
        comments: 5,
        due: "Tomorrow",
        accent: "text-success",
      },
    ],
  },
  {
    id: "proposal",
    title: "Proposal",
    tone: "bg-violet-500",
    deals: [
      {
        id: "deal-github",
        client: "GitHub",
        tag: "Legal",
        amount: 86900,
        detail: "Enterprise source control add-on",
        next: "Send implementation scope",
        date: "May 13, 2026",
        owner: "Mara Bell",
        rating: 4.5,
        files: 5,
        tasks: 6,
        comments: 8,
        due: "Review",
        accent: "text-foreground",
      },
      {
        id: "deal-loom",
        client: "Loom",
        tag: "Pilot",
        amount: 27300,
        detail: "Enablement content hub",
        next: "Share success plan",
        date: "May 14, 2026",
        owner: "Jonas Park",
        rating: 3,
        files: 2,
        tasks: 3,
        comments: 2,
        due: "2d left",
        accent: "text-violet-500",
      },
    ],
  },
  { id: "negotiation", title: "Negotiation", tone: "bg-warning", deals: [] },
  {
    id: "closed-won",
    title: "Closed Won",
    tone: "bg-success",
    deals: [
      {
        id: "deal-paypal",
        client: "PayPal",
        tag: "Procurement",
        amount: 118500,
        detail: "Global payout controls",
        next: "Resolve pricing carveout",
        date: "May 15, 2026",
        owner: "Lina Ortiz",
        rating: 5,
        files: 6,
        tasks: 7,
        comments: 11,
        due: "Escalated",
        accent: "text-info",
      },
      {
        id: "deal-dropbox",
        client: "Dropbox",
        tag: "Security",
        amount: 49700,
        detail: "Storage governance tier",
        next: "Finalize rollout owners",
        date: "May 18, 2026",
        owner: "Theo Grant",
        rating: 4,
        files: 3,
        tasks: 4,
        comments: 6,
        due: "3d left",
        accent: "text-violet-500",
      },
    ],
  },
];

export function SalesPipelineKanban() {
  const [stages, setStages] = useState(initialStages);
  const [ownerFilter, setOwnerFilter] = useState("All owners");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [dealDialogOpen, setDealDialogOpen] = useState(false);
  const [stageDialogOpen, setStageDialogOpen] = useState(false);
  const [newDeal, setNewDeal] = useState("");
  const [newStage, setNewStage] = useState("");
  const [targetStage, setTargetStage] = useState("prospecting");
  const [draggedStage, setDraggedStage] = useState<string | null>(null);
  const [feedback, setFeedback] = useState("");
  const owners = Array.from(
    new Set(stages.flatMap((stage) => stage.deals.map((deal) => deal.owner))),
  );
  const dealCount = stages.reduce(
    (count, stage) => count + stage.deals.length,
    0,
  );

  function moveDeal(dealId: string, stageId: string) {
    setStages((current) => {
      const from = current.find((stage) =>
        stage.deals.some((deal) => deal.id === dealId),
      );
      const to = current.find((stage) => stage.id === stageId);
      const deal = from?.deals.find((item) => item.id === dealId);
      if (!from || !to || !deal || from.id === to.id) return current;
      return current.map((stage) =>
        stage.id === from.id
          ? {
              ...stage,
              deals: stage.deals.filter((item) => item.id !== dealId),
            }
          : stage.id === to.id
            ? { ...stage, deals: [...stage.deals, deal] }
            : stage,
      );
    });
  }

  function reorderStage(targetId: string) {
    if (!draggedStage || draggedStage === targetId) return;
    setStages((current) => {
      const from = current.findIndex((stage) => stage.id === draggedStage);
      const to = current.findIndex((stage) => stage.id === targetId);
      if (from < 0 || to < 0) return current;
      const next = [...current];
      const [stage] = next.splice(from, 1);
      next.splice(to, 0, stage);
      return next;
    });
    setDraggedStage(null);
  }

  function createDeal() {
    if (!newDeal.trim()) return;
    const deal: Deal = {
      id: `deal-${Date.now()}`,
      client: newDeal.trim(),
      tag: "New",
      amount: 0,
      detail: "New opportunity",
      next: "Add next step",
      date: "May 20, 2026",
      owner: "Mara Bell",
      rating: 0,
      files: 0,
      tasks: 0,
      comments: 0,
      due: "Today",
      accent: "text-primary",
    };
    setStages((current) =>
      current.map((stage) =>
        stage.id === targetStage
          ? { ...stage, deals: [...stage.deals, deal] }
          : stage,
      ),
    );
    setNewDeal("");
    setDealDialogOpen(false);
    setFeedback("Deal added");
  }

  function createStage() {
    if (!newStage.trim()) return;
    setStages((current) => [
      ...current,
      {
        id: `stage-${Date.now()}`,
        title: newStage.trim(),
        tone: "bg-primary",
        deals: [],
      },
    ]);
    setNewStage("");
    setStageDialogOpen(false);
  }

  return (
    <section className="min-w-0 space-y-4">
      <header className="flex flex-wrap items-center gap-2">
        <h2 className="flex items-center gap-2 text-base font-semibold">
          Sales Pipeline{" "}
          <span className="rounded border px-1.5 py-0.5 text-xs text-muted-foreground">
            {dealCount}
          </span>
        </h2>
        <div className="ml-auto flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setFiltersOpen((open) => !open)}
          >
            <IconFilter />
            Filters
          </Button>
          <Button size="sm" onClick={() => setDealDialogOpen(true)}>
            <IconPlus />
            New deal
          </Button>
        </div>
      </header>
      {filtersOpen && (
        <div className="flex items-center gap-2 rounded-lg border bg-card p-3">
          <span className="text-sm">Owner</span>
          <Select value={ownerFilter} onValueChange={setOwnerFilter}>
            <SelectTrigger className="h-8 w-40">
              <span>{ownerFilter}</span>
            </SelectTrigger>
            <SelectContent position="popper" align="start">
              <SelectItem value="All owners">All owners</SelectItem>
              {owners.map((owner) => (
                <SelectItem key={owner} value={owner}>
                  {owner}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
      <div className="overflow-x-auto pb-3">
        <div className="flex min-w-max gap-6">
          {stages.map((stage) => {
            const deals = stage.deals.filter(
              (deal) =>
                ownerFilter === "All owners" || deal.owner === ownerFilter,
            );
            return (
              <section
                key={stage.id}
                data-stage={stage.id}
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => {
                  event.preventDefault();
                  if (event.dataTransfer.getData("stage-id"))
                    reorderStage(stage.id);
                  else
                    moveDeal(
                      event.dataTransfer.getData("text/plain"),
                      stage.id,
                    );
                }}
                className="w-[258px] shrink-0"
              >
                <header
                  draggable
                  onDragStart={(event) => {
                    setDraggedStage(stage.id);
                    event.dataTransfer.setData("stage-id", stage.id);
                  }}
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    reorderStage(stage.id);
                  }}
                  className="mb-3 flex cursor-grab items-center gap-2 px-2 py-1"
                >
                  <span className={`size-2.5 rounded-full ${stage.tone}`} />
                  <h3 className="text-sm font-semibold">{stage.title}</h3>
                  <span className="rounded border px-1.5 py-0.5 text-[10px] text-muted-foreground">
                    {deals.length}
                  </span>
                </header>
                <div className="grid content-start gap-2">
                  {deals.map((deal) => (
                    <article
                      key={deal.id}
                      draggable
                      onDragStart={(event) =>
                        event.dataTransfer.setData("text/plain", deal.id)
                      }
                      className="rounded-xl border bg-card p-4"
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`grid size-4 shrink-0 place-items-center text-sm font-semibold ${deal.accent}`}
                        >
                          {deal.client.slice(0, 1)}
                        </span>
                        <span className="truncate text-sm font-medium">
                          {deal.client}
                        </span>
                        <span className="ml-auto shrink-0 rounded-md border px-1.5 py-0.5 text-[10px]">
                          {deal.tag}
                        </span>
                      </div>
                      <div className="mt-3 flex min-w-0 items-center gap-2 text-xs">
                        <span className="flex shrink-0 items-center gap-1.5 font-medium">
                          <IconCurrencyDollar className="size-3.5 text-muted-foreground" />
                          {deal.amount.toLocaleString("en-US")}
                        </span>
                        <span className="truncate text-muted-foreground">
                          {deal.detail}
                        </span>
                      </div>
                      <div className="mt-3 flex min-w-0 items-center gap-1.5 text-xs">
                        <IconCalendar className="size-3.5 shrink-0 text-muted-foreground" />
                        <span className="truncate">{deal.next}</span>
                        <span className="truncate text-muted-foreground">
                          {deal.date}
                        </span>
                      </div>
                      <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Avatar className="size-5">
                          <AvatarImage src={demoAvatarUrl(deal.owner)} alt="" />
                          <AvatarFallback className="text-[8px]">
                            {deal.owner
                              .split(" ")
                              .map((part) => part[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="truncate">{deal.owner}</span>
                      </div>
                      <div
                        className="mt-3 flex items-center gap-0.5"
                        aria-label={`${deal.rating} out of 5 stars`}
                      >
                        <IconStarFilled className="mr-1 size-3.5 text-muted-foreground" />
                        {Array.from({ length: 5 }, (_, index) => (
                          <IconStarFilled
                            key={index}
                            className={`size-3.5 ${index + 1 <= deal.rating ? "text-warning" : index < deal.rating ? "text-warning/60" : "text-muted"}`}
                          />
                        ))}
                      </div>
                      <footer className="mt-3 flex items-center gap-2 text-[10px] text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <IconFile className="size-3.5" />
                          {deal.files}
                        </span>
                        <span className="flex items-center gap-1">
                          <IconCheck className="size-3.5" />
                          {deal.tasks}
                        </span>
                        <span className="flex items-center gap-1">
                          <IconMessage className="size-3.5" />
                          {deal.comments}
                        </span>
                        <span className="ml-auto flex items-center gap-1">
                          <IconClock className="size-3.5" />
                          {deal.due}
                        </span>
                      </footer>
                    </article>
                  ))}
                  {deals.length === 0 && stage.id === "negotiation" && (
                    <button
                      type="button"
                      onClick={() => {
                        setTargetStage(stage.id);
                        setDealDialogOpen(true);
                      }}
                      className="rounded-lg border border-dashed px-3 py-2 text-left text-xs text-muted-foreground hover:bg-muted"
                    >
                      Add negotiation
                    </button>
                  )}
                </div>
              </section>
            );
          })}
          <button
            type="button"
            onClick={() => setStageDialogOpen(true)}
            className="flex h-10 w-[180px] shrink-0 items-center gap-2 rounded-lg border border-dashed px-3 text-sm text-muted-foreground hover:bg-muted"
          >
            <IconPlus className="size-4" />
            Add Stage
          </button>
        </div>
      </div>
      {feedback && (
        <div role="status" className="sr-only">
          {feedback}
        </div>
      )}
      <Dialog open={dealDialogOpen} onOpenChange={setDealDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New deal</DialogTitle>
            <DialogDescription>
              Add an opportunity to the pipeline.
            </DialogDescription>
          </DialogHeader>
          <label className="grid gap-1.5 text-sm">
            Account
            <Input
              value={newDeal}
              onChange={(event) => setNewDeal(event.target.value)}
              placeholder="Company name"
            />
          </label>
          <label className="grid gap-1.5 text-sm">
            Stage
            <Select value={targetStage} onValueChange={setTargetStage}>
              <SelectTrigger>
                <span>
                  {stages.find((stage) => stage.id === targetStage)?.title}
                </span>
              </SelectTrigger>
              <SelectContent position="popper" align="start">
                {stages.map((stage) => (
                  <SelectItem key={stage.id} value={stage.id}>
                    {stage.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </label>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDealDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={createDeal}>Create deal</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={stageDialogOpen} onOpenChange={setStageDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Stage</DialogTitle>
            <DialogDescription>Add a pipeline stage.</DialogDescription>
          </DialogHeader>
          <label className="grid gap-1.5 text-sm">
            Stage name
            <Input
              value={newStage}
              onChange={(event) => setNewStage(event.target.value)}
              placeholder="Stage name"
            />
          </label>
          <DialogFooter>
            <Button variant="outline" onClick={() => setStageDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={createStage}>Create stage</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}
