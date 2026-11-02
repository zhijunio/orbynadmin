"use client";

import { useState } from "react";

import ConsoleLayout from "@/components/application/app-shell/console-layout";
import { ComponentPreview } from "@/components/application/docs/component-preview";
import { Showcase } from "@/components/application/docs/showcase";
import { Slider } from "@/components/base/slider/slider";
import { Meter, type MeterTone } from "@/components/base/meter/meter";

function toneFor(value: number): MeterTone {
  if (value >= 90) return "error";
  if (value >= 75) return "warning";
  return "accent";
}

function MeterExamples() {
  const [used, setUsed] = useState(62);

  return (
    <>
      <ComponentPreview title="Preview">
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

      <ComponentPreview title="Anatomy">
        <div className="grid gap-3 text-sm leading-6 text-muted-foreground">
          <p>A meter describes a level within a known range, such as storage, seats, or a quota.</p>
          <p>Set the range with minValue and maxValue. Use valueLabel for the displayed reading and description for supporting guidance.</p>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Tones">
        <div className="grid w-full max-w-md gap-5">
          <Meter label="Accent" value={40} valueLabel="40%" />
          <Meter label="Success" value={55} valueLabel="55%" tone="success" />
          <Meter label="Warning" value={78} valueLabel="78%" tone="warning" />
          <Meter label="Error" value={94} valueLabel="94%" tone="error" />
        </div>
      </ComponentPreview>

      <ComponentPreview title="Thresholds">
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

      <ComponentPreview title="Accessibility">
        <p className="text-sm leading-6 text-muted-foreground">
          Each meter exposes its label, range, current value, and optional value text to assistive technology. Keep the reading visible so color is never the only signal.
        </p>
      </ComponentPreview>
    </>
  );
}

export default function MeterPage() {
  return (
    <ConsoleLayout>
      <Showcase title="Meter">
        <MeterExamples />
      </Showcase>
    </ConsoleLayout>
  );
}
