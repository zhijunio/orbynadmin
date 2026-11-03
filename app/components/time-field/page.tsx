"use client";

import AppShell from "@/components/blocks/application/app-shell/app-shell";

import { useState } from "react";
import { Time } from "@internationalized/date";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { PageHeader } from "@/components/custom/docs/page-header";
import { TimeField } from "@/components/ui/time-field/time-field";

export default function TimeFieldPage() {
  const [time, setTime] = useState<Time | null>(new Time(9, 0));
  const [departure, setDeparture] = useState<Time | null>(new Time(14, 15, 30));

  return <AppShell>{<div className="min-w-0 space-y-5"><PageHeader title="Time Field" /><div className="grid min-w-0 gap-5 [&>*]:min-w-0 xl:grid-cols-2">
      <ComponentPreview title="Basic Time Input">
        <TimeField label="Meeting time" defaultValue={new Time(9, 30)} />
      </ComponentPreview>
      <ComponentPreview title="Controlled Value and Time Range">
        <div className="grid w-full max-w-sm gap-2">
          <TimeField label="Support starts" value={time} onChange={setTime} minValue={new Time(8)} maxValue={new Time(18)} />
          <p className="text-xs text-muted-foreground">Allowed hours: 08:00–18:00 · Current value: {time?.toString() ?? "—"}</p>
        </div>
      </ComponentPreview>
      <ComponentPreview title="12-Hour Format">
        <TimeField label="Appointment time" defaultValue={new Time(9, 30)} hourCycle={12} />
      </ComponentPreview>
      <ComponentPreview title="24-Hour Format with Seconds">
        <div className="grid gap-2">
          <TimeField
            label="Departure time"
            value={departure}
            onChange={setDeparture}
            hourCycle={24}
            granularity="second"
          />
          <p className="text-xs text-muted-foreground" aria-live="polite">
            Value: {departure?.toString() ?? "—"}
          </p>
        </div>
      </ComponentPreview>
      <ComponentPreview title="Disabled Time Field">
        <TimeField aria-label="Locked schedule" value={new Time(12)} isDisabled />
      </ComponentPreview>
      <ComponentPreview title="Read-only Time Field">
        <TimeField label="Published schedule" value={new Time(16, 45)} isReadOnly />
      </ComponentPreview>
    </div></div>}</AppShell>;
}
