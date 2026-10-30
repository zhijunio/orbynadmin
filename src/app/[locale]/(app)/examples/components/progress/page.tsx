import { ComponentPreview } from "@/components/feature/example/ComponentPreview";
import { Showcase } from "@/components/feature/example/Showcase";
import { Progress } from "@/components/ui/progress";

const examples = [
  { value: 55, color: "[&>div]:bg-primary" },
  { value: 85, color: "[&>div]:bg-emerald-500" },
  { value: 35, color: "[&>div]:bg-amber-500" },
];

function OutsideLabels() {
  return <div className="w-full space-y-5">{[40, 70, 30].map((value) => <div key={value} className="flex items-center gap-4"><Progress value={value} aria-label={`${value}% complete`} className="h-2 flex-1 bg-muted [&>div]:bg-primary" /><span className="w-10 text-right text-sm font-medium text-muted-foreground">{value}%</span></div>)}</div>;
}

function InsideLabels() {
  return <div className="w-full space-y-5">{[40, 70, 30].map((value) => <div key={value} className="relative"><Progress value={value} aria-label={`${value}% complete`} className="h-6 bg-muted [&>div]:bg-primary" /><span className="pointer-events-none absolute inset-0 flex items-center justify-center text-xs font-semibold text-primary-foreground">{value}%</span></div>)}</div>;
}

function MultipleSizes() {
  return <div className="w-full space-y-5">{[
    { label: "Small", className: "h-1" },
    { label: "Medium", className: "h-2" },
    { label: "Large", className: "h-3" },
    { label: "Extra large", className: "h-4" },
  ].map((size, index) => <div key={size.label} className="space-y-2"><div className="flex justify-between text-xs text-muted-foreground"><span>{size.label}</span><span>{examples[index % examples.length].value}%</span></div><Progress value={examples[index % examples.length].value} aria-label={`${size.label} progress`} className={`${size.className} bg-muted [&>div]:bg-primary`} /></div>)}</div>;
}

function StatusProgress() {
  return <div className="w-full space-y-5">{[
    { label: "Storage used", value: 62, color: "[&>div]:bg-primary" },
    { label: "Completed tasks", value: 84, color: "[&>div]:bg-emerald-500" },
    { label: "API quota", value: 38, color: "[&>div]:bg-amber-500" },
  ].map((item) => <div key={item.label} className="space-y-2"><div className="flex items-center justify-between gap-4 text-sm"><span className="font-medium">{item.label}</span><span className="text-muted-foreground">{item.value}%</span></div><Progress value={item.value} aria-label={`${item.label}: ${item.value}%`} className={`h-2 bg-muted ${item.color}`} /></div>)}</div>;
}

export const metadata = { title: "Progressbar" };

export default function ProgressPage() {
  return <Showcase title="Progressbar">
    <ComponentPreview title="Default Progress Bar"><div className="w-full space-y-5">{examples.map((item) => <Progress key={item.value} value={item.value} aria-label={`${item.value}% complete`} className={`h-2 bg-muted ${item.color}`} />)}</div></ComponentPreview>
    <ComponentPreview title="Progress Bar in Multiple Sizes"><MultipleSizes /></ComponentPreview>
    <ComponentPreview title="Progress Bar with Outside Label"><OutsideLabels /></ComponentPreview>
    <ComponentPreview title="Progress Bar with Inside Label"><InsideLabels /></ComponentPreview>
    <ComponentPreview title="Progress with Status Labels" className="xl:col-span-2"><StatusProgress /></ComponentPreview>
  </Showcase>;
}
