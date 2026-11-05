"use client";

import { useState } from "react";
import {
  IconCalendar,
  IconCurrencyDollar,
  IconFilter,
  IconMapPin,
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

type Candidate = {
  id: string;
  name: string;
  role: string;
  score: number;
  location: string;
  zone: string;
  date: string;
  salary: string;
  status: string;
  flag?: string;
};
type Stage = {
  id: string;
  title: string;
  tone: string;
  candidates: Candidate[];
};
const candidate = (
  id: string,
  name: string,
  role: string,
  score: number,
  location: string,
  zone: string,
  date: string,
  salary: string,
  status: string,
  flag?: string,
): Candidate => ({
  id,
  name,
  role,
  score,
  location,
  zone,
  date,
  salary,
  status,
  flag,
});
const initialStages: Stage[] = [
  {
    id: "sourced",
    title: "Sourced",
    tone: "bg-muted-foreground/50",
    candidates: [
      candidate(
        "mina",
        "Mina Calder",
        "Staff Product Designer",
        46,
        "Toronto, CA",
        "ET",
        "May 7, 2026",
        "$178k-$204k",
        "Not started",
      ),
      candidate(
        "jon",
        "Jon Bell",
        "Senior Data Engineer",
        38,
        "Austin, US",
        "CT",
        "May 8, 2026",
        "$164k-$188k",
        "Draft",
      ),
      candidate(
        "amara",
        "Amara Finch",
        "Senior UX Researcher",
        31,
        "Portland, US",
        "PT",
        "May 10, 2026",
        "$132k-$150k",
        "Not started",
      ),
    ],
  },
  {
    id: "screen",
    title: "Screen",
    tone: "bg-info",
    candidates: [
      candidate(
        "priya",
        "Priya Rao",
        "Principal Frontend Engineer",
        58,
        "Seattle, US",
        "PT",
        "May 6, 2026",
        "$196k-$224k",
        "Ready",
      ),
      candidate(
        "luca",
        "Luca Marin",
        "Lifecycle Marketing Lead",
        34,
        "Madrid, ES",
        "CET",
        "May 9, 2026",
        "EUR120k-EUR138k",
        "Draft",
      ),
    ],
  },
  {
    id: "hiring-manager",
    title: "Hiring Manager",
    tone: "bg-blue-500",
    candidates: [
      candidate(
        "nadia",
        "Nadia Ellis",
        "Product Operations Manager",
        54,
        "Brooklyn, US",
        "ET",
        "May 10, 2026",
        "$142k-$164k",
        "Ready",
      ),
      candidate(
        "theo",
        "Theo Grant",
        "Security Engineering Manager",
        41,
        "Dublin, IE",
        "GMT",
        "May 11, 2026",
        "EUR154k-EUR176k",
        "Ready",
      ),
      candidate(
        "keon",
        "Keon Wallace",
        "GTM Systems Lead",
        45,
        "Atlanta, US",
        "ET",
        "May 14, 2026",
        "$138k-$158k",
        "Draft",
      ),
    ],
  },
  {
    id: "panel",
    title: "Panel",
    tone: "bg-violet-500",
    candidates: [
      candidate(
        "sara",
        "Sara Okafor",
        "Design Systems Engineer",
        48,
        "London, UK",
        "GMT",
        "May 12, 2026",
        "GBP118k-GBP136k",
        "Ready",
      ),
      candidate(
        "arun",
        "Arun Mehta",
        "Senior Platform Engineer",
        26,
        "Vancouver, CA",
        "PT",
        "May 13, 2026",
        "$170k-$192k",
        "Needs calibration",
        "Panel reschedule",
      ),
    ],
  },
  {
    id: "scorecard",
    title: "Scorecard",
    tone: "bg-cyan-500",
    candidates: [
      candidate(
        "elena",
        "Elena Torres",
        "Senior Recruiter",
        44,
        "Chicago, US",
        "CT",
        "May 5, 2026",
        "$126k-$146k",
        "Needs calibration",
        "Feedback due",
      ),
      candidate(
        "marco",
        "Marco Silva",
        "Revenue Systems Analyst",
        36,
        "Lisbon, PT",
        "WEST",
        "May 6, 2026",
        "EUR88k-EUR102k",
        "Draft",
      ),
      candidate(
        "mei",
        "Mei Watanabe",
        "People Analytics Manager",
        29,
        "Tokyo, JP",
        "JST",
        "May 8, 2026",
        "JPY16m-JPY19m",
        "Needs calibration",
        "Late feedback",
      ),
    ],
  },
  {
    id: "offer",
    title: "Offer",
    tone: "bg-success",
    candidates: [
      candidate(
        "iris",
        "Iris Chen",
        "Director of Product Design",
        56,
        "San Francisco, US",
        "PT",
        "May 14, 2026",
        "$242k-$286k",
        "Complete",
        "Comp gap",
      ),
      candidate(
        "owen",
        "Owen Price",
        "Staff Infrastructure Engineer",
        62,
        "Denver, US",
        "MT",
        "Starts Jun 1",
        "$214k-$238k",
        "Complete",
      ),
    ],
  },
];

export function RecruitingPipelineKanban() {
  const [stages, setStages] = useState(initialStages);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [name, setName] = useState("");

  function addCandidate() {
    if (!name.trim()) return;
    const newCandidate = candidate(
      `candidate-${Date.now()}`,
      name.trim(),
      "New candidate",
      0,
      "Remote",
      "UTC",
      "Add interview date",
      "Not set",
      "Not started",
    );
    setStages((current) =>
      current.map((stage) =>
        stage.id === "sourced"
          ? { ...stage, candidates: [...stage.candidates, newCandidate] }
          : stage,
      ),
    );
    setName("");
    setDialogOpen(false);
  }

  function moveCandidate(id: string, stageId: string) {
    setStages((current) => {
      const source = current.find((stage) =>
        stage.candidates.some((item) => item.id === id),
      );
      const target = current.find((stage) => stage.id === stageId);
      const item = source?.candidates.find((candidate) => candidate.id === id);
      if (!source || !target || !item || source.id === target.id)
        return current;
      return current.map((stage) =>
        stage.id === source.id
          ? {
              ...stage,
              candidates: stage.candidates.filter(
                (candidate) => candidate.id !== id,
              ),
            }
          : stage.id === target.id
            ? { ...stage, candidates: [item, ...stage.candidates] }
            : stage,
      );
    });
  }

  return (
    <section className="min-w-0 space-y-4">
      <header className="flex flex-wrap items-center gap-2">
        <h2 className="text-base font-semibold">Recruiting Pipeline</h2>
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
            Add candidate
          </Button>
        </div>
      </header>
      {filterOpen && (
        <div className="rounded-lg border bg-card p-3">
          <Input
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            placeholder="Search candidates or roles"
          />
        </div>
      )}
      <div className="overflow-x-auto pb-3">
        <div className="flex min-w-max items-start gap-3">
          {stages.map((stage) => (
            <section
              key={stage.id}
              data-recruiting-stage={stage.id}
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => {
                event.preventDefault();
                moveCandidate(
                  event.dataTransfer.getData("text/plain"),
                  stage.id,
                );
              }}
              className="w-[296px] shrink-0 rounded-xl border bg-muted/20 p-1.5"
            >
              <header className="mb-2 flex items-center gap-2 px-1.5 py-1">
                <span className={`size-2.5 rounded-full ${stage.tone}`} />
                <h3 className="text-sm font-semibold">{stage.title}</h3>
                <span className="text-xs text-muted-foreground">
                  {stage.candidates.length}
                </span>
              </header>
              <div className="grid content-start gap-2">
                {stage.candidates
                  .filter((item) =>
                    `${item.name} ${item.role} ${item.location} ${item.status}`
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
                      className="rounded-xl border bg-card p-2.5"
                    >
                      <div className="flex items-center gap-2">
                        <Avatar className="size-7">
                          <AvatarImage src={demoAvatarUrl(item.name)} alt="" />
                          <AvatarFallback className="text-[8px]">
                            {item.name
                              .split(" ")
                              .map((part) => part[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <h4 className="truncate text-sm font-medium">
                            {item.name}
                          </h4>
                          <p className="truncate text-xs text-muted-foreground">
                            {item.role}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">
                          Match score
                        </span>
                        <span
                          className={`font-semibold ${item.score >= 50 ? "text-info" : item.score >= 40 ? "text-violet-500" : item.score >= 30 ? "text-primary" : "text-warning"}`}
                        >
                          {item.score}%
                        </span>
                      </div>
                      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted">
                        <span
                          className={`block h-full ${item.score >= 50 ? "bg-info" : item.score >= 40 ? "bg-violet-500" : item.score >= 30 ? "bg-primary" : "bg-warning"}`}
                          style={{ width: `${item.score}%` }}
                        />
                      </div>
                      <div className="mt-2 grid gap-1.5 text-xs">
                        <span className="flex items-center gap-1.5">
                          <IconMapPin className="size-3.5 text-muted-foreground" />
                          {item.location}
                          <span className="text-muted-foreground">
                            {item.zone}
                          </span>
                        </span>
                        <span className="flex items-center gap-1.5">
                          <IconCalendar className="size-3.5 text-muted-foreground" />
                          {item.date}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <IconCurrencyDollar className="size-3.5 text-muted-foreground" />
                          {item.salary}
                        </span>
                      </div>
                      <footer className="mt-2 flex items-center gap-1.5">
                        <span className="rounded-md border px-1.5 py-0.5 text-[10px]">
                          {item.status}
                        </span>
                        {item.flag && (
                          <span className="ml-auto truncate rounded-md border border-warning/40 bg-warning/5 px-1.5 py-0.5 text-[10px] text-warning">
                            {item.flag}
                          </span>
                        )}
                      </footer>
                    </article>
                  ))}
              </div>
            </section>
          ))}
        </div>
      </div>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add candidate</DialogTitle>
          </DialogHeader>
          <Input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Candidate name"
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={addCandidate}>Add candidate</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}
