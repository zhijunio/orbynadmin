"use client";

import ConsoleLayout from "@/components/application/app-shell/console-layout";

import { useState } from "react";
import { Time } from "@internationalized/date";
import { ComponentPreview } from "@/components/application/docs/component-preview";
import { Showcase } from "@/components/application/docs/showcase";
import { TimeField } from "@/components/base/time-field/time-field";

export default function TimeFieldPage() {
  const [time, setTime] = useState<Time | null>(new Time(9, 0));

  return <ConsoleLayout>{<Showcase title="Time Field">
      <ComponentPreview title="Default">
        <TimeField label="Meeting time" defaultValue={new Time(9, 30)} />
      </ComponentPreview>
      <ComponentPreview title="Controlled and constrained">
        <div className="grid w-full max-w-sm gap-2">
          <TimeField label="Support starts" value={time} onChange={setTime} minValue={new Time(8)} maxValue={new Time(18)} />
          <p className="text-xs text-muted-foreground">Allowed hours: 08:00–18:00 · Current value: {time?.toString() ?? "—"}</p>
        </div>
      </ComponentPreview>
      <ComponentPreview title="Locale-formatted time">
        <TimeField label="Appointment" defaultValue={new Time(14, 15)} />
      </ComponentPreview>
      <ComponentPreview title="Disabled">
        <TimeField aria-label="Locked schedule" value={new Time(12)} isDisabled />
      </ComponentPreview>
      <ComponentPreview title="Read only">
        <TimeField label="Published schedule" value={new Time(16, 45)} isReadOnly />
      </ComponentPreview>
    </Showcase>}</ConsoleLayout>;
}
