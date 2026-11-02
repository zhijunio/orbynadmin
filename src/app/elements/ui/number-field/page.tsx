"use client";

import ConsoleLayout from "@/components/application/app-shell/console-layout";

import { useState } from "react";
import { NumberField } from "@/components/base/number-field/number-field";
import { ComponentPreview } from "@/components/application/docs/component-preview";
import { Showcase } from "@/components/application/docs/showcase";

export default function NumberFieldPage() {
  const [seats, setSeats] = useState(8);
  return <ConsoleLayout>{<Showcase title="Number Field">
    <ComponentPreview title="Controlled with limits"><div className="grid gap-2"><NumberField aria-label="Seats" min={1} max={25} value={seats} onValueChange={setSeats} /><p className="text-xs text-muted-foreground" aria-live="polite">{seats} seats selected</p></div></ComponentPreview>
    <ComponentPreview title="Step and disabled"><div className="grid gap-3"><NumberField aria-label="Discount percentage" min={0} max={100} step={5} defaultValue={15} /><NumberField aria-label="Locked value" value={12} disabled /></div></ComponentPreview>
  </Showcase>}</ConsoleLayout>;
}
