"use client";

import ConsoleLayout from "@/components/application/app-shell/console-layout";

import { Meter } from "@/components/base/meter/meter";
import { ComponentPreview } from "@/components/application/docs/component-preview";
import { Showcase } from "@/components/application/docs/showcase";

export default function MeterPage() {
  return <ConsoleLayout>{<Showcase title="Meter">
    <ComponentPreview title="Usage thresholds"><div className="grid w-full max-w-lg gap-5"><Meter label="Storage" value={32} low={40} high={80} optimum={20} showValue /><Meter label="Seats" value={64} low={25} high={85} optimum={60} showValue /><Meter label="API requests" value={92} low={30} high={80} optimum={50} showValue /></div></ComponentPreview>
    <ComponentPreview title="Custom scale"><div className="grid w-full max-w-lg gap-5"><Meter label="Import jobs" value={7} min={0} max={10} low={3} high={8} optimum={6} showValue /><Meter label="No value yet" value={0} min={0} max={10} showValue /></div></ComponentPreview>
  </Showcase>}</ConsoleLayout>;
}
