"use client";

import { useState } from "react";

import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { PageHeader } from "@/components/custom/docs/page-header";
import { Slider } from "@/components/ui/slider/slider";
import { Meter, type MeterTone } from "@/components/ui/meter/meter";

function toneFor(value: number): MeterTone {
  if (value >= 90) return "error";
  if (value >= 75) return "warning";
  return "accent";
}

function MeterExamples() {
  const [used, setUsed] = useState(62);

  return (
    <>
      <ComponentPreview title="Usage and Quota Meters">
        <div className="grid w-full max-w-md gap-5">
          <Meter label="Storage" value={7.2} maxValue={10} valueLabel="7.2 of 10 GB" />
          <Meter
            label="Seats"
            value={19}
            maxValue={20}
            valueLabel="19 of 20"
            tone="warning"
            description="Add seats before inviting more teammates."
          />
          <Meter label="API requests this month" value={96} valueLabel="96%" tone="error" />
        </div>
      </ComponentPreview>

      <ComponentPreview title="Status Tones">
        <div className="grid w-full max-w-md gap-5">
          <Meter label="Accent" value={40} valueLabel="40%" />
          <Meter label="Success" value={55} valueLabel="55%" tone="success" />
          <Meter label="Warning" value={78} valueLabel="78%" tone="warning" />
          <Meter label="Error" value={94} valueLabel="94%" tone="error" />
        </div>
      </ComponentPreview>

      <ComponentPreview title="Interactive Thresholds">
        <div className="grid w-full max-w-md gap-4">
          <Meter label="Storage" value={used} valueLabel={`${used}%`} tone={toneFor(used)} />
          <div className="grid gap-2">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Used</span>
              <span className="tabular-nums">{used}</span>
            </div>
            <Slider
              aria-label="Used"
              min={0}
              max={100}
              step={1}
              value={used}
              onChange={setUsed}
              formatValue={(value) => `${value}%`}
            />
          </div>
        </div>
      </ComponentPreview>

    </>
  );
}

export default function MeterPage() {
  return (
    <AppShell>
      <div className="min-w-0 space-y-5"><PageHeader title="Meter" /><div className="grid min-w-0 grid-cols-1 gap-5 [&>*]:min-w-0">
        <MeterExamples />
      </div></div>
    </AppShell>
  );
}
