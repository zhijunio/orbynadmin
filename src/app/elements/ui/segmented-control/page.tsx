"use client";

import ConsoleLayout from "@/components/application/app-shell/console-layout";

import { useState } from "react";
import { SegmentedControl, SegmentedControlItem } from "@/components/base/segmented-control/segmented-control";
import { ComponentPreview } from "@/components/application/docs/component-preview";
import { Showcase } from "@/components/application/docs/showcase";

export default function SegmentedControlPage() {
  const [period, setPeriod] = useState("month");
  const [scope, setScope] = useState("all");
  return <ConsoleLayout>{<Showcase title="Segmented Control">
    <ComponentPreview title="Controlled selection"><div className="grid gap-3"><SegmentedControl aria-label="Reporting period" value={period} onValueChange={(value) => value && setPeriod(value)}>{[["week", "Week"], ["month", "Month"], ["year", "Year"]].map(([value, label]) => <SegmentedControlItem key={value} value={value}>{label}</SegmentedControlItem>)}</SegmentedControl><p className="text-xs text-muted-foreground" aria-live="polite">Showing: {period}</p></div></ComponentPreview>
    <ComponentPreview title="Filter scope"><SegmentedControl aria-label="Filter projects" value={scope} onValueChange={(value) => value && setScope(value)}>{[["all", "All"], ["owned", "Owned"], ["shared", "Shared"]].map(([value, label]) => <SegmentedControlItem key={value} value={value}>{label}</SegmentedControlItem>)}</SegmentedControl></ComponentPreview>
  </Showcase>}</ConsoleLayout>;
}
