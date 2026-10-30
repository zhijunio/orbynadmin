import { Showcase } from "@/components/feature/example/Showcase";
import { ComponentPreview } from "@/components/feature/example/ComponentPreview";
import Link from "next/link";

const variants = [
  { label: "Primary", className: "text-primary" },
  { label: "Secondary", className: "text-secondary-foreground" },
  { label: "Success", className: "text-emerald-600 dark:text-emerald-400" },
  { label: "Danger", className: "text-destructive" },
  { label: "Warning", className: "text-amber-600 dark:text-amber-400" },
  { label: "Info", className: "text-sky-600 dark:text-sky-400" },
];

export default function LinksPage() {
  return <Showcase title="Links">
    <ComponentPreview title="Colored Links"><div className="flex flex-wrap gap-x-6 gap-y-3">{variants.map((item) => <Link key={item.label} href="/dashboard/analytics" className={`text-sm font-medium hover:underline ${item.className}`}>{item.label} link</Link>)}</div></ComponentPreview>
    <ComponentPreview title="Underline Styles"><div className="flex flex-wrap gap-x-6 gap-y-3"><Link href="/dashboard/analytics" className="text-sm text-primary underline underline-offset-4">Always underlined</Link><Link href="/dashboard/analytics" className="text-sm text-primary decoration-dotted underline-offset-4 hover:underline">Dotted on hover</Link><Link href="/dashboard/analytics" className="text-sm text-primary decoration-2 underline-offset-4 hover:underline">Custom underline</Link></div></ComponentPreview>
    <ComponentPreview title="Opacity Levels"><div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-primary">{[{ level: "10", style: "opacity-10" }, { level: "25", style: "opacity-25" }, { level: "50", style: "opacity-50" }, { level: "75", style: "opacity-75" }, { level: "100", style: "opacity-100" }].map((item) => <Link key={item.level} href="/dashboard/analytics" className={`${item.style} hover:opacity-100`}>Opacity {item.level}</Link>)}</div></ComponentPreview>
  </Showcase>;
}
