
import { CatalogGridItems } from "@/components/custom/docs/catalog-page-grid";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import Link from "next/link";


const variants = [
  { label: "Primary", className: "text-primary" },
  { label: "Secondary", className: "text-secondary-foreground" },
  { label: "Success", className: "text-success-foreground" },
  { label: "Danger", className: "text-destructive" },
  { label: "Warning", className: "text-warning-foreground" },
  { label: "Info", className: "text-info-foreground" },
  { label: "Light", className: "text-muted-foreground" },
  { label: "Dark", className: "text-foreground" },
];

export function LinkCatalogExamples() {
  return (
    <CatalogGridItems>
      <ComponentPreview title="Colored Links"><div className="flex flex-wrap gap-x-6 gap-y-3">{variants.map((item) => <Link key={item.label} href="/components/button" className={`text-sm font-medium hover:underline ${item.className}`}>{item.label} link</Link>)}</div></ComponentPreview>
          <ComponentPreview title="Custom Link Colors"><div className="flex flex-wrap gap-x-6 gap-y-3">{variants.map((item) => <Link key={item.label} href="/components/button" className={`text-sm font-medium underline underline-offset-4 hover:opacity-80 ${item.className}`}>{item.label} custom link</Link>)}</div></ComponentPreview>
          <ComponentPreview title="Custom Link Opacity"><div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-primary">{[{ level: "10", style: "opacity-10" }, { level: "25", style: "opacity-25" }, { level: "50", style: "opacity-50" }, { level: "75", style: "opacity-75" }, { level: "100", style: "opacity-100" }].map((item) => <Link key={item.level} href="/components/button" className={item.style}>Link opacity {item.level}</Link>)}</div></ComponentPreview>
          <ComponentPreview title="Link Opacity Hover"><div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-primary">{[{ level: "10", style: "opacity-10" }, { level: "25", style: "opacity-25" }, { level: "50", style: "opacity-50" }, { level: "75", style: "opacity-75" }, { level: "100", style: "opacity-100" }].map((item) => <Link key={item.level} href="/components/button" className={`${item.style} hover:opacity-100`}>Link opacity {item.level}</Link>)}</div></ComponentPreview>
          <ComponentPreview title="Underline Styles"><div className="flex flex-wrap gap-x-6 gap-y-3"><Link href="/components/button" className="text-sm text-primary underline underline-offset-4">Always underlined</Link><Link href="/components/button" className="text-sm text-primary decoration-dotted underline-offset-4 hover:underline">Dotted on hover</Link><Link href="/components/button" className="text-sm text-primary decoration-2 underline-offset-4 hover:underline">Custom underline</Link></div></ComponentPreview>
    </CatalogGridItems>
  );
}
