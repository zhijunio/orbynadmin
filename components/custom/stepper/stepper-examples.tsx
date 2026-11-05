"use client";

import { useState } from "react";
import { IconCheck, IconChevronRight, IconClipboardCheck, IconLoader2, IconMapPin, IconPackage, IconShieldCheck, IconTruck, IconUser, IconCreditCard, IconMoon, IconSun, IconGasStation } from "@tabler/icons-react";
import { Stepper, StepperContent, StepperDescription, StepperIndicator, StepperItem, StepperNav, StepperPanel, StepperSeparator, StepperTitle, StepperTrigger } from "@/components/ui/stepper/stepper";
import { Button } from "@/components/ui/button/button";
import { Checkbox } from "@/components/ui/checkbox/checkbox";
import { Badge } from "@/components/ui/badge/badge";
import { Frame, FramePanel } from "@/components/ui/frame/frame";
import { IconTile } from "@/components/ui/icon-tile/icon-tile";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible/collapsible";
import { cn } from "@/utils/cn";

const exampleTitles = ["Basic stepper", "Stepper with completed state", "Stepper with loading state", "Controlled stepper", "Stepper with title and indicator", "Stepper with progress bar indicator", "Stepper with icons and badges", "Stepper with descriptions", "Stepper with inline titles", "Stepper with content for each step", "Stepper with progress bar and titles", "Stepper with segmented progress bar", "Stepper with vertical orientation and descriptions", "Stepper with vertical orientation", "Stepper with vertical orientation and titles", "Stepper with delivery stops and ETAs", "Stepper with dotted progress", "Stepper with key-value stage details", "Stepper with icon tiles in a frame", "Stepper with purchase order checks", "Stepper with grouped security checks", "Stepper with color-coded bottom bars", "Stepper with top color bars and card art", "Stepper with icon tile rows", "Stepper with phase track", "Stepper with timestamped checkpoints", "Stepper with transit arrow", "Stepper with breadcrumb steps", "Stepper with compact inline progress", "Stepper with truck route and rest stops", "Stepper with icon tiles and chevrons", "Stepper with numbered chevron stages", "Stepper with filled status chevrons", "Stepper with outlined chevron plan", "Stepper with flat chevron plan", "Stepper with shipping route and stop details", "Stepper with horizontal step cards", "Stepper with shipment progress bar", "Stepper with vertical step cards", "Stepper with side rail and step icons", "Stepper with status list", "Stepper with vertical status bars", "Stepper with sub-steps in a collapsible card", "Stepper with right-aligned sub-steps"];


type StepVisual = "circle" | "progress" | "dot" | "tile" | "bar" | "rail" | "chevron" | "card" | "route" | "list";
const visuals: Record<number, StepVisual> = { 6: "progress", 7: "tile", 11: "progress", 12: "bar", 16: "route", 17: "dot", 19: "tile", 21: "list", 22: "bar", 23: "card", 24: "tile", 25: "rail", 26: "dot", 27: "route", 28: "chevron", 29: "dot", 30: "route", 31: "tile", 32: "chevron", 33: "chevron", 34: "chevron", 35: "chevron", 36: "route", 37: "card", 38: "progress", 39: "card", 40: "rail", 41: "list", 42: "bar", 43: "card", 44: "list" };
const verticalExamples = new Set([13, 14, 15, 20, 21, 24, 39, 40, 41, 42, 43, 44]);
function SubSteps({ side = false, complete }: { side?: boolean; complete: boolean }) {
  return <Collapsible defaultOpen className={cn("w-full rounded-md bg-muted/30 p-3", side && "sm:ml-auto sm:max-w-sm")}><CollapsibleTrigger className="group flex w-full items-center justify-between rounded text-left text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring">{"Sub-steps"}<IconChevronRight className="size-4 group-data-[state=open]:rotate-90 motion-safe:transition-transform" /></CollapsibleTrigger><CollapsibleContent><ul className="mt-3 space-y-3">{[["validate", "Validate records"], ["prepare", "Prepare changes"], ["publish", "Publish results"]].map(([key, label], index) => <li key={key} className="flex items-center gap-2 text-xs text-muted-foreground">{complete || index === 0 ? <IconCheck className="size-3.5 text-primary" /> : index === 1 ? <IconLoader2 className="size-3.5 motion-safe:animate-spin" /> : <span className="size-3 rounded-full border" />}{label}</li>)}</ul></CollapsibleContent></Collapsible>;
}
export function StepperExample({ example }: { example: number }) {
  const [step, setStep] = useState(example === 2 || example === 3 ? 2 : 1);
  const visual = visuals[example] ?? "circle";
  const vertical = verticalExamples.has(example);
  const delivery = example >= 16 && ![19, 20, 21, 23, 24, 31, 40, 41, 42, 43, 44].includes(example);
  const titles = example === 30 ? ["Pickup", "Overnight rest", "Back on the road", "Fuel stop", "Delivery"] : delivery ? ["Loaded", "In transit", "Delivery", "Return"] : example === 20 ? ["Request", "Approve", "Receive"] : example === 21 ? ["Identity checks", "Access checks", "Audit checks"] : ["User details", "Payment", "Confirmation"];
  const icons = example === 30 ? [IconPackage, IconMoon, IconSun, IconGasStation, IconTruck] : delivery ? [IconPackage, IconTruck, IconMapPin, IconClipboardCheck] : [IconUser, IconCreditCard, IconShieldCheck];
  const showTitles = ![1, 2, 3, 14].includes(example);
  const descriptions = [8, 13, 16, 18, 20, 21, 26, 30, 36, 37, 39, 40].includes(example);
  const details = [18, 20, 21, 23, 30, 36, 37, 39, 40, 42, 43, 44].includes(example);
  const framed = [19, 20, 21, 23, 24, 31, 37, 39, 40, 43].includes(example);
  const isChevron = visual === "chevron";
  const content = <Stepper value={step} onValueChange={setStep} orientation={vertical ? "vertical" : "horizontal"}>
    {visual === "progress" && <div role="progressbar" aria-label={"Step progress"} aria-valuenow={step} aria-valuemin={1} aria-valuemax={titles.length} className="h-1.5 overflow-hidden rounded-full bg-muted"><div className="h-full bg-primary motion-safe:transition-[width]" style={{ width: `${step / titles.length * 100}%` }} /></div>}
    {example === 23 && <div aria-hidden className="flex gap-1">{titles.map((title, index) => <span key={title} className="h-1 flex-1 rounded-full" style={{ background: `var(--chart-${index + 1})`, opacity: index + 1 <= step ? 1 : 0.25 }} />)}</div>}
    <StepperNav aria-label={exampleTitles[example - 1]} className={cn(!vertical && "flex-wrap sm:flex-nowrap", visual === "list" && "gap-4", isChevron && "gap-1", example === 9 && "justify-between")}>
      {titles.map((title, index) => {
        const current = index + 1;
        const Icon = icons[index % icons.length];
        return <StepperItem key={title} step={current} loading={example === 3 && current === 2} className={cn(vertical && "w-full", !vertical && "min-w-16", ["card", "list"].includes(visual) && "rounded-lg border p-3", visual === "card" && "data-[state=active]:border-primary/40 data-[state=active]:bg-primary/5", vertical && "flex-col", isChevron && "relative overflow-hidden border bg-muted/40 px-3 py-3 first:rounded-l-md last:rounded-r-md", isChevron && current <= step && "border-primary/40 bg-primary/5 text-foreground", isChevron && current === step && "ring-2 ring-primary/20", example === 35 && "border-0", visual === "rail" && "relative", isChevron && example !== 34 && "[clip-path:polygon(0_0,calc(100%-10px)_0,100%_50%,calc(100%-10px)_100%,0_100%,10px_50%)]")}>
          <StepperTrigger tabIndex={current === Math.min(step, titles.length) ? 0 : -1} className={cn("relative w-full", !vertical && ![9, 28, 29].includes(example) && "flex-col justify-center gap-2 text-center", vertical && "justify-start", visual === "route" && "items-center", isChevron && "justify-center gap-1 text-xs", example === 29 && "gap-1.5")}>
            {visual === "tile" || example === 40 ? <IconTile variant={current <= step ? "solid" : "outline"} size={example === 31 ? "sm" : "default"}><Icon /></IconTile> : visual === "bar" && example === 42 && current === step ? <span aria-hidden className="flex h-10 flex-col justify-between">{[1, 2, 3, 4].map((dash) => <span key={dash} className="h-1.5 w-1 rounded-full bg-primary" />)}</span> : visual === "bar" ? <span aria-hidden className={cn(vertical ? "h-10 w-1 rounded-full" : "h-1.5 w-full rounded-full", current <= step ? "bg-primary" : "bg-muted", example === 22 && "order-last")} style={example === 22 && current <= step ? { backgroundColor: `var(--chart-${current})` } : undefined} /> : visual === "dot" ? <span aria-hidden className={cn("flex size-5 items-center justify-center rounded-full border-2 border-dashed", current <= step ? "border-primary text-primary" : "border-muted-foreground/40")}>{current < step && <IconCheck className="size-3" />}</span> : visual === "route" ? <IconTile size="sm" variant={current === step ? "solid" : "outline"}><Icon /></IconTile> : isChevron ? (example === 33 ? (current < step ? <IconCheck className="size-3" /> : current === step ? <IconLoader2 className="size-3 motion-safe:animate-spin" /> : <span className="size-2 rounded-full border border-current" />) : example >= 32 ? <span className="text-xs tabular-nums">{current}.</span> : null) : <StepperIndicator className={visual === "rail" ? "ring-4 ring-card" : undefined} />}
            {showTitles && <span className="min-w-0"><StepperTitle className={cn(isChevron && "text-xs", [28, 29].includes(example) && "text-xs")}>{title}</StepperTitle>{descriptions && <StepperDescription className={cn("mt-1", isChevron && "text-current/70")}>{delivery ? `ETA ${["09:00", "10:15", "11:30", "12:00", "14:15"][index]}` : `Review the information for step ${current}.`}</StepperDescription>}</span>}
            {example === 7 && <Badge variant="secondary">{current === step ? "In progress" : current < step ? "Completed" : "Pending"}</Badge>}
          </StepperTrigger>
          {!vertical && !isChevron && !["bar", "progress", "card", "list"].includes(visual) && index < titles.length - 1 && (example === 27 || example === 31 ? <IconChevronRight aria-hidden className="hidden size-4 shrink-0 text-muted-foreground sm:block" /> : <StepperSeparator className={cn("hidden sm:block", ["dot", "route"].includes(visual) && "border-t border-dashed bg-transparent")} />)}
          {vertical && visual === "rail" && index < titles.length - 1 && <span aria-hidden className="pointer-events-none absolute top-12 bottom-0 left-4 w-px bg-border" />}
          {vertical && details && current === step && <div className="w-full pl-1">{example === 20 || example === 21 ? <CheckGroups grouped={example === 21} /> : example >= 43 ? <SubSteps side={example === 44} complete={step === titles.length} /> : <dl className="grid grid-cols-2 gap-2 rounded-md bg-muted/40 p-3 text-xs"><dt className="text-muted-foreground">{"Owner"}</dt><dd>Alex Morgan</dd><dt className="text-muted-foreground">{"Status"}</dt><dd>{(current < titles.length ? "In progress" : "Completed")}</dd></dl>}</div>}
        </StepperItem>;
      })}
    </StepperNav>
    {(example === 10 || details && !vertical) && <StepperPanel>{titles.map((title, index) => <StepperContent key={title} value={index + 1}><div className="space-y-2 rounded-lg bg-muted/40 p-4 text-sm">{example === 23 && <PaymentCardArt />}<p className="font-medium">{title}</p><p className="text-muted-foreground">{delivery ? "The next stop and its details are shown below." : `Review the information for step ${index + 1}.`}</p>{details && <dl className="grid grid-cols-2 gap-1 text-xs"><dt className="text-muted-foreground">{"Owner"}</dt><dd>Alex Morgan</dd><dt className="text-muted-foreground">{"Status"}</dt><dd>{"In progress"}</dd></dl>}</div></StepperContent>)}{example >= 16 && <StepperContent value={titles.length + 1}><p role="status" className="rounded-lg bg-primary/5 p-4 text-center text-sm text-primary">{"All steps completed"}</p></StepperContent>}</StepperPanel>}
    {example !== 3 && <div className="flex flex-wrap items-center justify-between gap-2"><div className="flex gap-2"><Button size="sm" variant="outline" onClick={() => setStep((value) => Math.max(1, value - 1))} disabled={step === 1}>{"Previous"}</Button><Button size="sm" variant="outline" onClick={() => setStep((value) => Math.min(titles.length + (example >= 16 ? 1 : 0), value + 1))} disabled={step === titles.length + (example >= 16 ? 1 : 0)}>{"Next"}</Button></div><output aria-live="polite" className="text-xs tabular-nums text-muted-foreground">{step > titles.length ? "All steps completed" : `${step}/${titles.length}`}</output></div>}
  </Stepper>;
  return framed ? <Frame spacing="sm" className="w-full"><FramePanel>{content}</FramePanel></Frame> : content;
}

function CheckGroups({ grouped }: { grouped: boolean }) {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const groups = grouped ? [{ id: "identity", label: "Identity checks" }, { id: "access", label: "Access checks" }] : [{ id: "purchaseChecks", label: "Purchase checks" }];
  return <div className="w-full space-y-2">{groups.map(({ id, label }) => <Collapsible key={id} defaultOpen className="rounded-md border p-3"><CollapsibleTrigger className="group flex w-full items-center justify-between text-left text-xs font-medium">{label}<IconChevronRight className="size-3 group-data-[state=open]:rotate-90" /></CollapsibleTrigger><CollapsibleContent><div className="mt-3 space-y-2">{[{ id: "validate", label: "Validate records" }, { id: "approve", label: "Approve" }].map(({ id: checkId, label: checkLabel }) => <label key={checkId} className="flex items-center gap-2 text-xs"><Checkbox checked={checked[`${id}-${checkId}`] ?? false} onCheckedChange={(value) => setChecked((current) => ({ ...current, [`${id}-${checkId}`]: value === true }))} />{checkLabel}</label>)}</div></CollapsibleContent></Collapsible>)}</div>;
}

function PaymentCardArt() {
  return (
    <svg
      className="mx-auto h-auto w-full max-w-48" width="200"
      height="130"
      viewBox="0 0 200 130"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="48"
        y="12"
        width="120"
        height="78"
        rx="10"
        transform="rotate(6 108 51)"
        className="fill-muted/50 dark:fill-muted/25"
      />
      <rect
        x="36"
        y="18"
        width="128"
        height="82"
        rx="10"
        strokeWidth="1.5"
        className="fill-background stroke-border"
      />
      <rect
        x="52"
        y="38"
        width="22"
        height="16"
        rx="3"
        className="fill-muted-foreground/15 stroke-muted-foreground/20"
      />
      <path
        d="M52 46H74M63 38V54"
        strokeWidth="0.8"
        className="stroke-muted-foreground/15"
      />
      <path
        d="M84 42Q87 46 84 50M88 40Q92 46 88 52M92 38Q97 46 92 54"
        strokeWidth="1.5"
        strokeLinecap="round"
        className="stroke-muted-foreground/20"
      />
      {[56, 64, 72, 80, 94, 102, 110, 118].map((cx) => (
        <circle
          key={cx}
          cx={cx}
          cy="68"
          r="2"
          className={
            cx < 90 ? "fill-muted-foreground/20" : "fill-muted-foreground/15"
          }
        />
      ))}
      <rect
        x="52"
        y="80"
        width="40"
        height="3"
        rx="1.5"
        className="fill-muted-foreground/12"
      />
      <rect
        x="120"
        y="80"
        width="28"
        height="3"
        rx="1.5"
        className="fill-muted-foreground/12"
      />
      <circle cx="140" cy="88" r="6" className="fill-muted-foreground/8" />
      <circle cx="150" cy="88" r="6" className="fill-muted-foreground/12" />
      <circle cx="26" cy="50" r="3" className="fill-primary/10" />
      <circle cx="180" cy="40" r="2" className="fill-primary/10" />
      <path d="M174 70L178 66V74Z" className="fill-muted-foreground/10" />
    </svg>
  )
}
