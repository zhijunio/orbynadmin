"use client";

import { useState } from "react";
import {
  IconCalendar,
  IconCheck,
  IconClock,
  IconFile,
  IconFilter,
  IconKey,
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog/dialog";
import { Input } from "@/components/ui/input/input";
import { demoAvatarUrl } from "@/utils/demo-avatar";

type Review = {
  id: string;
  organization: string;
  risk: string;
  code: string;
  resource: string;
  action: string;
  age: string;
  owner: string;
  rating: number;
  files: number;
  tasks: number;
  comments: number;
  due: string;
};
type Stage = { id: string; title: string; tone: string; reviews: Review[] };
const review = (
  id: string,
  organization: string,
  risk: string,
  code: string,
  resource: string,
  action: string,
  age: string,
  owner: string,
  rating: number,
  files: number,
  tasks: number,
  comments: number,
  due: string,
): Review => ({
  id,
  organization,
  risk,
  code,
  resource,
  action,
  age,
  owner,
  rating,
  files,
  tasks,
  comments,
  due,
});
const initialStages: Stage[] = [
  {
    id: "intake",
    title: "Intake",
    tone: "text-info",
    reviews: [
      review(
        "stripe",
        "Stripe",
        "Medium",
        "IAM-1021",
        "Billing admin",
        "Verify billing administrator grant",
        "18m ago",
        "Avery Stone",
        3,
        2,
        2,
        3,
        "Today",
      ),
      review(
        "support-console",
        "Support console",
        "Low",
        "IAM-1022",
        "Session replay",
        "Confirm support console impersonation role",
        "2h ago",
        "Talia Moss",
        2,
        1,
        2,
        1,
        "2d",
      ),
    ],
  },
  {
    id: "owner-review",
    title: "Owner Review",
    tone: "text-violet-500",
    reviews: [
      review(
        "snowflake",
        "Snowflake",
        "Medium",
        "IAM-1104",
        "Schema owner",
        "Attest warehouse schema owner access",
        "41m ago",
        "Dev Iqbal",
        3,
        3,
        2,
        2,
        "1d",
      ),
      review(
        "workspace-admin",
        "Workspace admin",
        "Low",
        "IAM-1107",
        "Org settings",
        "Review workspace owner permissions",
        "Yesterday",
        "Camila Reed",
        2,
        1,
        2,
        4,
        "3d",
      ),
    ],
  },
  {
    id: "risk-review",
    title: "Risk Review",
    tone: "text-destructive",
    reviews: [
      review(
        "github-enterprise",
        "GitHub Enterprise",
        "Critical",
        "IAM-1208",
        "Repository admin",
        "Remove dormant repository administrator",
        "44d ago",
        "Jonas Hart",
        5,
        4,
        2,
        7,
        "Overdue",
      ),
      review(
        "workday",
        "Workday",
        "High",
        "IAM-1212",
        "Payroll export",
        "Validate payroll export permission",
        "6d ago",
        "Freya Chen",
        4,
        2,
        2,
        5,
        "Today",
      ),
    ],
  },
  {
    id: "exception",
    title: "Exception",
    tone: "text-rose-500",
    reviews: [
      review(
        "okta",
        "Okta",
        "High",
        "IAM-1301",
        "Break-glass admin",
        "Time-box break-glass identity access",
        "12m ago",
        "Avery Stone",
        4,
        3,
        2,
        4,
        "12h",
      ),
    ],
  },
  {
    id: "removal",
    title: "Removal",
    tone: "text-amber-500",
    reviews: [
      review(
        "cdp",
        "Customer data platform",
        "Medium",
        "IAM-1416",
        "Audience export",
        "Queue marketing contractor data export removal",
        "19d ago",
        "Talia Moss",
        3,
        2,
        2,
        2,
        "Queued",
      ),
    ],
  },
  {
    id: "certified",
    title: "Certified",
    tone: "text-success",
    reviews: [
      review(
        "grc",
        "GRC workspace",
        "Low",
        "IAM-1505",
        "Audit evidence",
        "Certify audit evidence reader",
        "3h ago",
        "Mina Patel",
        2,
        1,
        2,
        1,
        "Done",
      ),
      review(
        "cicd",
        "CI/CD platform",
        "Low",
        "IAM-1511",
        "Deploy approval",
        "Certify production deploy approval",
        "Today",
        "Rowan Kim",
        3,
        2,
        2,
        3,
        "Done",
      ),
    ],
  },
];

export function AccessReviewKanban() {
  const [stages, setStages] = useState(initialStages);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [organization, setOrganization] = useState("");
  const [newStageOpen, setNewStageOpen] = useState(false);
  const [newStage, setNewStage] = useState("");

  function addReview() {
    if (!organization.trim()) return;
    const item = review(
      `IAM-${Date.now().toString().slice(-4)}`,
      organization.trim(),
      "Medium",
      "IAM-1600",
      "New access",
      "Review requested access",
      "Just now",
      "Avery Stone",
      0,
      0,
      0,
      0,
      "Today",
    );
    setStages((current) =>
      current.map((stage) =>
        stage.id === "intake"
          ? { ...stage, reviews: [...stage.reviews, item] }
          : stage,
      ),
    );
    setOrganization("");
    setDialogOpen(false);
  }

  function moveReview(id: string, stageId: string) {
    setStages((current) => {
      const source = current.find((stage) =>
        stage.reviews.some((item) => item.id === id),
      );
      const target = current.find((stage) => stage.id === stageId);
      const item = source?.reviews.find((candidate) => candidate.id === id);
      if (!source || !target || !item || source.id === target.id)
        return current;
      return current.map((stage) =>
        stage.id === source.id
          ? {
              ...stage,
              reviews: stage.reviews.filter((candidate) => candidate.id !== id),
            }
          : stage.id === target.id
            ? { ...stage, reviews: [...stage.reviews, item] }
            : stage,
      );
    });
  }

  function addStage() {
    if (!newStage.trim()) return;
    setStages((current) => [
      ...current,
      {
        id: `stage-${Date.now()}`,
        title: newStage.trim(),
        tone: "text-primary",
        reviews: [],
      },
    ]);
    setNewStage("");
    setNewStageOpen(false);
  }

  return (
    <section className="min-w-0 space-y-4">
      <header className="flex flex-wrap items-center gap-2">
        <h2 className="flex items-center gap-2 text-base font-semibold">
          Access Review{" "}
          <span className="rounded border px-1.5 py-0.5 text-xs text-muted-foreground">
            {stages.reduce((sum, stage) => sum + stage.reviews.length, 0)}
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
            New review
          </Button>
        </div>
      </header>
      {filterOpen && (
        <div className="rounded-lg border bg-card p-3">
          <Input
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            placeholder="Search reviews"
          />
        </div>
      )}
      <div className="overflow-x-auto pb-3">
        <div className="flex min-w-max items-start gap-3">
          {stages.map((stage) => (
            <section
              key={stage.id}
              data-access-stage={stage.id}
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => {
                event.preventDefault();
                moveReview(event.dataTransfer.getData("text/plain"), stage.id);
              }}
              className="w-[250px] shrink-0 rounded-xl border bg-muted/20 p-2"
            >
              <header className="mb-2 flex items-center gap-2 px-1 py-1">
                <span
                  className={`flex size-5 items-center justify-center rounded ${stage.tone}`}
                >
                  <IconKey className="size-3.5" />
                </span>
                <h3 className="text-sm font-semibold">{stage.title}</h3>
                <span className="text-xs text-muted-foreground">
                  {stage.reviews.length}
                </span>
              </header>
              <div className="grid content-start gap-2">
                {stage.reviews
                  .filter((item) =>
                    `${item.organization} ${item.code} ${item.resource} ${item.action} ${item.owner} ${item.risk}`
                      .toLowerCase()
                      .includes(filter.toLowerCase()),
                  )
                  .map((item) => (
                    <article
                      key={item.id}
                      draggable
                      onDragStart={(event) =>
                        event.dataTransfer.setData("text/plain", item.id)
                      }
                      className="min-w-0 rounded-xl border bg-card p-2.5"
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`size-2 rounded-full ${item.risk === "Critical" ? "bg-destructive" : item.risk === "High" ? "bg-rose-500" : item.risk === "Medium" ? "bg-warning" : "bg-success"}`}
                        />
                        <span className="min-w-0 flex-1 truncate text-sm font-medium">
                          {item.organization}
                        </span>
                        <span
                          className={`rounded-md border px-1.5 py-0.5 text-[10px] ${item.risk === "Critical" ? "border-destructive bg-destructive text-destructive-foreground" : item.risk === "High" ? "border-destructive/30 bg-destructive/5 text-destructive" : item.risk === "Medium" ? "border-warning/40 bg-warning/5 text-warning" : "border-success/30 bg-success/5 text-success"}`}
                        >
                          {item.risk}
                        </span>
                      </div>
                      <div className="mt-2 flex items-center gap-1.5 text-xs">
                        <IconKey className="size-3.5 shrink-0 text-muted-foreground" />
                        <span className="font-mono">{item.code}</span>
                        <span className="truncate text-muted-foreground">
                          {item.resource}
                        </span>
                      </div>
                      <div className="mt-2 flex min-w-0 items-center gap-1.5 text-xs">
                        <IconCalendar className="size-3.5 shrink-0 text-muted-foreground" />
                        <span className="truncate">{item.action}</span>
                        <span className="ml-auto shrink-0 text-muted-foreground">
                          {item.age}
                        </span>
                      </div>
                      <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Avatar className="size-5">
                          <AvatarImage src={demoAvatarUrl(item.owner)} alt="" />
                          <AvatarFallback className="text-[8px]">
                            {item.owner
                              .split(" ")
                              .map((part) => part[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="truncate">{item.owner}</span>
                      </div>
                      <div
                        className="mt-2 flex items-center gap-0.5"
                        aria-label={`${item.rating} out of 5 confidence stars`}
                      >
                        {Array.from({ length: 5 }, (_, index) => (
                          <IconStarFilled
                            key={index}
                            className={`size-3.5 ${index < item.rating ? "text-warning" : "text-muted"}`}
                          />
                        ))}
                      </div>
                      <footer className="mt-3 flex items-center gap-2 text-[10px] text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <IconFile className="size-3.5" />
                          {item.files}
                        </span>
                        <span className="flex items-center gap-1">
                          <IconCheck className="size-3.5" />
                          {item.tasks}
                        </span>
                        <span className="flex items-center gap-1">
                          <IconMessage className="size-3.5" />
                          {item.comments}
                        </span>
                        <span className="ml-auto flex items-center gap-1">
                          <IconClock className="size-3.5" />
                          {item.due}
                        </span>
                      </footer>
                    </article>
                  ))}
              </div>
              <button
                type="button"
                onClick={() => setDialogOpen(true)}
                className="mt-2 flex w-full items-center justify-center gap-1 rounded-md py-1.5 text-xs text-muted-foreground hover:bg-muted"
              >
                <IconPlus className="size-3.5" />
                Add {stage.title.toLowerCase()}
              </button>
            </section>
          ))}
          <button
            type="button"
            onClick={() => setNewStageOpen(true)}
            className="flex h-10 w-[150px] shrink-0 items-center gap-2 rounded-lg border border-dashed px-3 text-sm text-muted-foreground hover:bg-muted"
          >
            <IconPlus className="size-4" />
            Add Stage
          </button>
        </div>
      </div>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New review</DialogTitle>
          </DialogHeader>
          <Input
            value={organization}
            onChange={(event) => setOrganization(event.target.value)}
            placeholder="Organization"
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={addReview}>Create review</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={newStageOpen} onOpenChange={setNewStageOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Stage</DialogTitle>
          </DialogHeader>
          <Input
            value={newStage}
            onChange={(event) => setNewStage(event.target.value)}
            placeholder="Stage name"
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewStageOpen(false)}>
              Cancel
            </Button>
            <Button onClick={addStage}>Create stage</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}
