"use client";

import dynamic from "next/dynamic";

const DesignReviewBoard = dynamic(
  () => import("@/components/blocks/application/whiteboard/design-review-board").then((module) => module.DesignReviewBoard),
  { ssr: false, loading: () => <div className="grid min-h-[32rem] flex-1 place-items-center text-sm text-muted-foreground">Preparing design review…</div> },
);
const SprintPlanningBoard = dynamic(
  () => import("@/components/blocks/application/whiteboard/sprint-planning-board").then((module) => module.SprintPlanningBoard),
  { ssr: false, loading: () => <div className="grid min-h-[32rem] flex-1 place-items-center text-sm text-muted-foreground">Preparing sprint board…</div> },
);

export function DesignReviewBoardRoute() {
  return <DesignReviewBoard />;
}

export function SprintPlanningBoardRoute() {
  return <SprintPlanningBoard />;
}
