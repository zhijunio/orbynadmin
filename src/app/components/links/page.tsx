import ConsoleLayout from "@/components/custom/app-shell/console-layout";

import { PageHeader } from "@/components/custom/app-shell/page-header";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import Link from "next/link";

const variants = [
  { label: "Primary", className: "text-primary" },
  { label: "Secondary", className: "text-secondary-foreground" },
  { label: "Success", className: "text-emerald-600 dark:text-emerald-400" },
  { label: "Danger", className: "text-destructive" },
  { label: "Warning", className: "text-amber-600 dark:text-amber-400" },
  { label: "Info", className: "text-sky-600 dark:text-sky-400" },
  { label: "Light", className: "text-slate-400" },
  { label: "Dark", className: "text-slate-900 dark:text-slate-100" },
];

export default function LinksPage() {
  return <ConsoleLayout>{<div className="min-w-0 space-y-5"><PageHeader title="Links" /><div className="grid min-w-0 gap-5 [&>*]:min-w-0 xl:grid-cols-2">
    <ComponentPreview title="Colored Links"><div className="flex flex-wrap gap-x-6 gap-y-3">{variants.map((item) => <Link key={item.label} href="/components" className={`text-sm font-medium hover:underline ${item.className}`}>{item.label} link</Link>)}</div></ComponentPreview>
    <ComponentPreview title="Colored Custom Links with Underline"><div className="flex flex-wrap gap-x-6 gap-y-3">{variants.map((item) => <Link key={item.label} href="/components" className={`text-sm font-medium underline underline-offset-4 hover:opacity-80 ${item.className}`}>{item.label} custom link</Link>)}</div></ComponentPreview>
    <ComponentPreview title="Custom Link Opacity"><div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-primary">{[{ level: "10", style: "opacity-10" }, { level: "25", style: "opacity-25" }, { level: "50", style: "opacity-50" }, { level: "75", style: "opacity-75" }, { level: "100", style: "opacity-100" }].map((item) => <Link key={item.level} href="/components" className={item.style}>Link opacity {item.level}</Link>)}</div></ComponentPreview>
    <ComponentPreview title="Link Opacity Hover"><div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-primary">{[{ level: "10", style: "opacity-10" }, { level: "25", style: "opacity-25" }, { level: "50", style: "opacity-50" }, { level: "75", style: "opacity-75" }, { level: "100", style: "opacity-100" }].map((item) => <Link key={item.level} href="/components" className={`${item.style} hover:opacity-100`}>Link opacity {item.level}</Link>)}</div></ComponentPreview>
    <ComponentPreview title="Underline Styles"><div className="flex flex-wrap gap-x-6 gap-y-3"><Link href="/components" className="text-sm text-primary underline underline-offset-4">Always underlined</Link><Link href="/components" className="text-sm text-primary decoration-dotted underline-offset-4 hover:underline">Dotted on hover</Link><Link href="/components" className="text-sm text-primary decoration-2 underline-offset-4 hover:underline">Custom underline</Link></div></ComponentPreview>
  </div></div>}</ConsoleLayout>;
}
