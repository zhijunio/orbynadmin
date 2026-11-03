"use client";

import ConsoleLayout from "@/components/application/app-shell/console-layout";

import { useState } from "react";
import { SegmentedControl, SegmentedControlItem } from "@/components/base/segmented-control/segmented-control";
import { ComponentPreview } from "@/components/application/docs/component-preview";
import { PageHeader } from "@/components/application/app-shell/page-header";
import { IconLayoutGrid, IconList } from "@tabler/icons-react";

export default function SegmentedControlPage() {
  const [period, setPeriod] = useState("month");
  const [scope, setScope] = useState("all");
  const [view, setView] = useState("list");
  return <ConsoleLayout>{<div className="min-w-0 space-y-5"><PageHeader title="Segmented Control" /><div className="grid min-w-0 gap-5 [&>*]:min-w-0 xl:grid-cols-2">
    <ComponentPreview title="Controlled selection"><div className="grid gap-3"><SegmentedControl aria-label="Reporting period" value={period} onValueChange={(value) => value && setPeriod(value)}>{[["week", "Week"], ["month", "Month"], ["year", "Year"]].map(([value, label]) => <SegmentedControlItem key={value} value={value}>{label}</SegmentedControlItem>)}</SegmentedControl><p className="text-xs text-muted-foreground" aria-live="polite">Showing: {period}</p></div></ComponentPreview>
    <ComponentPreview title="Filter scope"><SegmentedControl aria-label="Filter projects" value={scope} onValueChange={(value) => value && setScope(value)}>{[["all", "All"], ["owned", "Owned"], ["shared", "Shared"]].map(([value, label]) => <SegmentedControlItem key={value} value={value}>{label}</SegmentedControlItem>)}</SegmentedControl></ComponentPreview>
    <ComponentPreview title="View Mode with Icons"><SegmentedControl aria-label="Project view" value={view} onValueChange={(value) => value && setView(value)}><SegmentedControlItem value="list" aria-label="List view"><IconList aria-hidden="true" className="size-4" /></SegmentedControlItem><SegmentedControlItem value="grid" aria-label="Grid view"><IconLayoutGrid aria-hidden="true" className="size-4" /></SegmentedControlItem></SegmentedControl></ComponentPreview>
    <ComponentPreview title="Disabled Option"><SegmentedControl aria-label="Report interval" defaultValue="week"><SegmentedControlItem value="day">Day</SegmentedControlItem><SegmentedControlItem value="week">Week</SegmentedControlItem><SegmentedControlItem value="quarter" disabled>Quarter</SegmentedControlItem></SegmentedControl></ComponentPreview>
  </div></div>}</ConsoleLayout>;
}
