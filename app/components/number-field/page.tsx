"use client";

import ConsoleLayout from "@/components/custom/app-shell/console-layout";

import { useState } from "react";
import { NumberField } from "@/components/ui/number-field/number-field";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { PageHeader } from "@/components/custom/docs/page-header";

export default function NumberFieldPage() {
  const [seats, setSeats] = useState(8);
  const [budget, setBudget] = useState(1250);
  const [conversionRate, setConversionRate] = useState(0.25);
  const [weight, setWeight] = useState(4.5);
  return <ConsoleLayout>{<div className="min-w-0 space-y-5"><PageHeader title="Number Field" /><div className="grid min-w-0 gap-5 [&>*]:min-w-0 xl:grid-cols-2">
    <ComponentPreview title="Controlled Value and Limits"><div className="grid gap-2"><NumberField aria-label="Seats" min={1} max={25} value={seats} onValueChange={setSeats} /><p className="text-xs text-muted-foreground" aria-live="polite">{seats} seats selected</p></div></ComponentPreview>
    <ComponentPreview title="Custom Step Size"><NumberField aria-label="Discount percentage" min={0} max={100} step={5} defaultValue={15} /></ComponentPreview>
    <ComponentPreview title="Disabled State"><NumberField aria-label="Locked value" value={12} disabled /></ComponentPreview>
    <ComponentPreview title="Currency, Percentage, and Unit Formatting">
      <div className="grid w-full gap-4 sm:grid-cols-3">
        <div className="grid gap-2 text-sm font-medium">
          <label htmlFor="monthly-budget">Monthly budget</label>
          <NumberField
            id="monthly-budget"
            min={0}
            step={25}
            value={budget}
            onValueChange={setBudget}
            formatOptions={{ style: "currency", currency: "USD" }}
          />
        </div>
        <div className="grid gap-2 text-sm font-medium">
          <label htmlFor="conversion-rate">Conversion rate</label>
          <NumberField
            id="conversion-rate"
            min={0}
            max={1}
            step={0.01}
            value={conversionRate}
            onValueChange={setConversionRate}
            formatOptions={{ style: "percent", maximumFractionDigits: 0 }}
          />
        </div>
        <div className="grid gap-2 text-sm font-medium">
          <label htmlFor="package-weight">Package weight</label>
          <NumberField
            id="package-weight"
            min={0}
            step={0.1}
            value={weight}
            onValueChange={setWeight}
            formatOptions={{ style: "unit", unit: "kilogram", unitDisplay: "short", maximumFractionDigits: 1 }}
          />
        </div>
      </div>
    </ComponentPreview>
  </div></div>}</ConsoleLayout>;
}
