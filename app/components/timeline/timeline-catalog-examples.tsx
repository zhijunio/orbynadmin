"use client";

import * as React from "react";
import { IconCheck, IconCircleDashed, IconRocket, IconUser } from "@tabler/icons-react";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar/avatar";
import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "@/components/ui/timeline/timeline";
import { cn } from "@/utils/cn";
import { demoAvatarUrl } from "@/utils/demo-avatar";

const timelineShowcase = [
  { title: "Basic Timeline", index: 0, description: "Default vertical steps with neutral track and completed segments." },
  { title: "Order Status", index: 2, description: "Completed steps use a filled check indicator." },
  { title: "Pipeline Steps", index: 5, description: "Muted pending steps with semantic icons for CI stages." },
  { title: "Deployment Log", index: 9, description: "Neutral connector with semantic deploy nodes." },
  { title: "Activity Feed", index: 10, description: "Avatar indicators instead of primary dots." },
  { title: "Horizontal Labels", index: 8, description: "Horizontal layout with date labels above steps." },
] as const;

type Entry = { date: string; title: string; description?: string; icon?: React.ReactNode };

const sets: Entry[][] = [
  [
    { date: "Today · 09:00", title: "Project created", description: "Workspace initialized by Alex Morgan." },
    { date: "Today · 10:30", title: "Team invited", description: "Four members joined the project." },
    { date: "Today · 13:15", title: "First update", description: "The launch plan is ready for review." },
  ],
  [
    { date: "Week 1", title: "Planning", description: "Scope and owners confirmed." },
    { date: "Week 2", title: "Design", description: "Prototype approved by stakeholders." },
    { date: "Week 4", title: "Development", description: "Core implementation in progress." },
  ],
  [
    { date: "09:42", title: "Order received", description: "Order #OR-2841 was placed." },
    { date: "09:45", title: "Payment confirmed", description: "Card payment authorized." },
    { date: "10:12", title: "Ready to ship", description: "Package handed to the carrier." },
  ],
  [
    { date: "2 hours ago", title: "Merge pull request #482", description: "Release settings and deployment workflow." },
    { date: "Yesterday", title: "Fix billing export", description: "Commit 7d90a1c · Jamie Chen." },
    { date: "Nov 1", title: "Add audit events", description: "Commit 12bc314 · Alex Morgan." },
  ],
  [
    { date: "Nov 04", title: "Design review", description: "Review the updated dashboard." },
    { date: "Nov 12", title: "Beta release", description: "Invite the first customer cohort." },
    { date: "Dec 02", title: "General availability", description: "Launch to all workspaces." },
  ],
  [
    { date: "Completed", title: "Build", description: "Artifacts compiled successfully.", icon: <IconCheck /> },
    { date: "Running", title: "Test", description: "Integration suite is running.", icon: <IconCircleDashed /> },
    { date: "Pending", title: "Deploy", description: "Waiting for test results.", icon: <IconRocket /> },
  ],
  [
    { date: "Sprint 14", title: "Design system", description: "Shared patterns and tokens." },
    { date: "Sprint 15", title: "Workspace settings", description: "Role and access controls." },
    { date: "Sprint 16", title: "Usage analytics", description: "Adoption and activity metrics." },
  ],
  [
    { date: "08:30", title: "Deployment started", description: "Production · us-east-1" },
    { date: "08:34", title: "Health checks passed", description: "All services are healthy." },
    { date: "08:36", title: "Release complete", description: "Version 2.8.1 is live." },
  ],
  [
    { date: "Phase 1", title: "Discover", description: "Collect needs." },
    { date: "Phase 2", title: "Build", description: "Ship the solution." },
    { date: "Phase 3", title: "Improve", description: "Measure and iterate." },
  ],
  [
    { date: "10:02:14", title: "Build #184 started", description: "main · 2m 31s" },
    { date: "10:04:45", title: "Tests passed", description: "128 checks · no failures" },
    { date: "10:05:02", title: "Deployed to production", description: "us-east-1 · v2.8.1", icon: <IconRocket /> },
  ],
  [
    { date: "5 min ago", title: "Jamie Chen updated the brief", description: "Added the launch checklist.", icon: <IconUser /> },
    { date: "1 hour ago", title: "Riley Park commented", description: "Looks ready for the next review." },
    { date: "Yesterday", title: "Alex Morgan created the project", description: "Q4 Product Launch workspace." },
  ],
  [
    { date: "Nov 04", title: "Design", description: "Review" },
    { date: "Nov 12", title: "Beta", description: "Invite users" },
    { date: "Dec 02", title: "Launch", description: "General availability" },
  ],
];

const defaultActiveByExample = [2, 2, 3, 3, 3, 3, 0, 2, 2, 3, 5, 3] as const;
const horizontalExamples = new Set([1, 4, 5, 8, 11]);
const interactiveExamples = new Set([0, 1, 2, 3, 4, 5, 6, 7, 9, 10]);

const roadmapDotColors = ["bg-primary", "bg-success", "bg-info"] as const;
const activityPeople = ["Jamie Chen", "Riley Park", "Alex Morgan"] as const;

function TimelineDemo({ index }: { index: number }) {
  const [active, setActive] = React.useState<number>(() => defaultActiveByExample[index] ?? 2);
  const horizontal = horizontalExamples.has(index);
  const data = sets[index];
  const itemClassName = cn(
    index === 11 && "mt-6",
    (index === 2 || index === 3 || index === 5 || index === 9 || index === 10) && "ms-10",
    index === 6 && "group-data-[orientation=vertical]/timeline:not-last:pb-0",
  );
  const separatorClassName = cn(
    index === 8 && "-top-[1.35rem]",
    (index === 2 || index === 3 || index === 5 || index === 9) &&
      "group-data-[orientation=vertical]/timeline:-left-7 group-data-[orientation=vertical]/timeline:h-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=vertical]/timeline:translate-y-6.5",
    index === 10 &&
      "bg-input group-data-[orientation=vertical]/timeline:-left-8 group-data-[orientation=vertical]/timeline:top-2 group-data-[orientation=vertical]/timeline:h-[calc(100%-2.5rem)] group-data-[orientation=vertical]/timeline:translate-y-7",
    index === 9 && "bg-input",
    index === 6 && "group-data-[orientation=vertical]/timeline:bg-foreground/20",
  );

  return (
    <div className="w-full overflow-x-auto py-2">
      <Timeline orientation={horizontal ? "horizontal" : "vertical"} value={active} className={cn("list-none p-0", horizontal && "min-w-[34rem]")}>
        {data.map((entry, stepIndex) => {
          const step = stepIndex + 1;
          const pipelineStatus = index === 5 ? (stepIndex === 0 ? "completed" : stepIndex === 1 ? "active" : "pending") : null;
          const deploySuccess = index === 9 ? stepIndex < 2 : true;

          const indicatorClassName = cn(
            index === 2 &&
              "flex size-6 items-center justify-center border-none group-data-completed/timeline-item:bg-primary group-data-completed/timeline-item:text-primary-foreground group-data-[orientation=vertical]/timeline:-left-7",
            index === 3 &&
              "flex size-6 items-center justify-center border-none bg-primary/10 text-foreground group-data-completed/timeline-item:bg-primary group-data-completed/timeline-item:text-primary-foreground group-data-[orientation=vertical]/timeline:-left-7",
            index === 5 &&
              cn(
                "flex size-6 items-center justify-center border-none bg-muted text-muted-foreground group-data-completed/timeline-item:bg-primary group-data-completed/timeline-item:text-primary-foreground group-data-[orientation=vertical]/timeline:-left-7",
                pipelineStatus === "active" && "ring-2 ring-primary/20",
              ),
            index === 6 && cn("size-2 border-none", roadmapDotColors[stepIndex] ?? "bg-muted"),
            index === 9 &&
              cn(
                "flex size-6 items-center justify-center border-none group-data-[orientation=vertical]/timeline:-left-7",
                deploySuccess ? "bg-emerald-500 text-white" : "bg-destructive text-white",
              ),
            index === 10 && "size-8 overflow-hidden rounded-full border-none group-data-[orientation=vertical]/timeline:-left-8",
          );

          const indicatorContent =
            index === 2 ? (
              <IconCheck className="size-4 group-not-data-completed/timeline-item:hidden" />
            ) : index === 10 ? (
              <Avatar className="size-8">
                <AvatarImage src={demoAvatarUrl(activityPeople[stepIndex] ?? "User")} alt={activityPeople[stepIndex] ?? "User"} />
                <AvatarFallback className="text-[10px]">
                  {(activityPeople[stepIndex] ?? "U")
                    .split(" ")
                    .map((part) => part[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            ) : (
              entry.icon
            );

          return (
            <TimelineItem key={`${entry.title}-${stepIndex}`} step={step} className={itemClassName}>
              <TimelineHeader className={horizontal ? "min-h-20" : undefined}>
                <TimelineSeparator className={separatorClassName} />
                <TimelineDate className={cn(index === 6 && "mb-0 text-[10px] font-semibold uppercase text-muted-foreground/60", index === 11 && "text-xs")}>
                  {entry.date}
                </TimelineDate>
                <TimelineTitle className={index === 11 ? "text-xs" : undefined}>{entry.title}</TimelineTitle>
                <TimelineIndicator className={indicatorClassName}>{indicatorContent}</TimelineIndicator>
              </TimelineHeader>
              {entry.description && (
                <TimelineContent className={cn(horizontal && "max-w-40 text-xs", index === 6 && "font-medium text-foreground")}>
                  {entry.description}
                </TimelineContent>
              )}
            </TimelineItem>
          );
        })}
      </Timeline>
      {interactiveExamples.has(index) && (
        <div className="mt-3 flex flex-wrap gap-2">
          {data.map((entry, stepIndex) => (
            <button
              key={entry.title}
              type="button"
              onClick={() => setActive(stepIndex + 1)}
              aria-pressed={active === stepIndex + 1}
              className="rounded-md border border-border px-2 py-1 text-xs text-muted-foreground hover:bg-muted aria-pressed:bg-primary aria-pressed:text-primary-foreground"
            >
              Set {entry.title}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function TimelineCatalogExamples() {
  return (
    <>
      {timelineShowcase.map(({ title, index, description }) => (
        <ComponentPreview key={title} title={title} description={description} layout="panel" span={index === 8 ? 2 : 1}>
          <TimelineDemo index={index} />
        </ComponentPreview>
      ))}
    </>
  );
}
