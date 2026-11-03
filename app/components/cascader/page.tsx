"use client"

import { useMemo, useState } from "react"
import { IconBuilding, IconCheck, IconUser } from "@tabler/icons-react"
import AppShell from "@/components/blocks/application/app-shell/app-shell"
import { ComponentPreview } from "@/components/custom/docs/component-preview"
import { PageHeader } from "@/components/custom/docs/page-header"
import { Cascader, CascaderPanel, type CascaderNode } from "@/components/ui/cascader/cascader"
import { Button } from "@/components/ui/buttons/button"

const options: CascaderNode[] = [
  { value: "engineering", label: "Engineering", children: [{ value: "platform", label: "Platform", children: [{ value: "api", label: "API team" }, { value: "infra", label: "Infrastructure" }] }, { value: "product", label: "Product", children: [{ value: "web", label: "Web app" }, { value: "mobile", label: "Mobile" }] }] },
  { value: "operations", label: "Operations", children: [{ value: "support", label: "Customer support" }, { value: "finance", label: "Finance" }] },
  { value: "design", label: "Design", children: [{ value: "brand", label: "Brand" }, { value: "research", label: "Research" }] },
]
const roles: CascaderNode[] = [{ value: "workspace", label: "Workspace", children: [{ value: "admin", label: "Administrator", description: "Manage members and settings", badge: "Full access", tone: "success" }, { value: "editor", label: "Editor", description: "Create and update content", badge: "Standard" }, { value: "viewer", label: "Viewer", description: "Read-only access", disabled: true, badge: "Restricted" }] }]
const flatOptions: CascaderNode[] = [{ value: "north", label: "North America", parentId: null }, { value: "us", label: "United States", parentId: "north" }, { value: "ca", label: "Canada", parentId: "north" }, { value: "west", label: "West", parentId: "us" }, { value: "east", label: "East", parentId: "us" }, { value: "ny", label: "New York", parentId: "east" }, { value: "sf", label: "San Francisco", parentId: "west" }]

export default function CascaderPage() {
  const [selected, setSelected] = useState<string[][]>([])
  const [multi, setMulti] = useState<string[][]>([])
  const [query, setQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [locale, setLocale] = useState<"en" | "zh">("en")
  const [asyncOptions, setAsyncOptions] = useState<CascaderNode[]>([{ value: "regions", label: "Regions", hasChildren: true }])
  const [lazySelected, setLazySelected] = useState<string[][]>([])
  const many = useMemo(() => Array.from({ length: 2500 }, (_, index) => ({ value: `team-${index}`, label: `Team ${String(index + 1).padStart(4, "0")}` })), [])
  return <AppShell><div className="min-w-0 space-y-5"><PageHeader title="Cascader" /><div className="grid min-w-0 gap-5 [&>*]:min-w-0 xl:grid-cols-2">
    <ComponentPreview title="Nested Drill-Down"><Cascader options={options} aria-label="Choose a team" /></ComponentPreview>
    <ComponentPreview title="Multi-Select with Selection Limit"><div className="grid w-full gap-2"><Cascader options={options} multiple maxSelections={2} selectedPaths={multi} onSelectionChange={setMulti} /><p className="text-xs text-muted-foreground">Choose up to two teams. {multi.length}/2 selected.</p></div></ComponentPreview>
    <ComponentPreview title="Search by Deep Path"><Cascader options={options} searchScope="deep" searchable searchPlaceholder="Search teams and departments..." /></ComponentPreview>
    <ComponentPreview title="Pinned Footer Action"><Cascader options={options} footer={<div className="flex items-center justify-between"><span className="text-xs text-muted-foreground">Browse all teams</span><Button size="sm" variant="outline">Manage teams</Button></div>} /></ComponentPreview>
    <ComponentPreview title="Custom Avatar and Role Rows"><Cascader options={roles} renderOption={(node) => <span className="flex min-w-0 flex-1 items-center gap-2"><span className="grid size-7 place-items-center rounded-full bg-muted"><IconUser className="size-4" /></span><span className="min-w-0 flex-1"><span className="block">{node.label}</span>{node.description && <span className="block truncate text-xs text-muted-foreground">{node.description}</span>}</span>{node.badge && <span className="text-[10px] text-muted-foreground">{node.badge}</span>}</span>} /></ComponentPreview>
    <ComponentPreview title="Path Formatting"><div className="grid w-full gap-3"><Cascader options={options} defaultSelectedPaths={[["engineering", "platform", "api"]]} valueDisplay="path" /><Cascader options={options} defaultSelectedPaths={[["engineering", "platform", "api"]]} valueDisplay="leaf" /><Cascader options={options} defaultSelectedPaths={[["engineering", "platform", "api"]]} valueDisplay="count" collapsePath="start" /></div></ComponentPreview>
    <ComponentPreview title="Embedded Cascader Panel"><CascaderPanel options={options} selectedPath={selected[0]} onSelect={(path) => setSelected([path])} /></ComponentPreview>
    <ComponentPreview title="Flat Options with Parent References"><Cascader options={flatOptions} placeholder="Choose a sales region..." /></ComponentPreview>
    <ComponentPreview title="Controlled Path, Value, Query, and Open State"><div className="grid w-full gap-2"><Cascader options={options} open={isOpen} onOpenChange={setIsOpen} query={query} onQueryChange={setQuery} selectedPaths={selected} onSelectionChange={setSelected} /><p className="text-xs text-muted-foreground">Open: {String(isOpen)} · Search: {query || "empty"} · Value: {selected[0]?.join(" / ") || "none"}</p></div></ComponentPreview>
    <ComponentPreview title="Localized Labels"><div className="grid w-full gap-2"><div className="flex gap-2"><Button size="sm" variant={locale === "en" ? "default" : "outline"} onClick={() => setLocale("en")}>English</Button><Button size="sm" variant={locale === "zh" ? "default" : "outline"} onClick={() => setLocale("zh")}>简体中文</Button></div><Cascader options={locale === "zh" ? [{ value: "sales", label: "销售", children: [{ value: "apac", label: "亚太区" }, { value: "emea", label: "欧洲中东非洲" }] }] : options} placeholder={locale === "zh" ? "选择团队…" : "Choose a team…"} searchPlaceholder={locale === "zh" ? "搜索团队…" : "Search teams…"} /></div></ComponentPreview>
    <ComponentPreview title="Descriptions and Disabled Options"><Cascader options={roles} /></ComponentPreview>
    <ComponentPreview title="Native Form Field"><form className="grid w-full gap-3" onSubmit={(event) => event.preventDefault()}><label className="grid gap-2 text-sm">Team assignment<Cascader options={options} name="team" placeholder="Select a team for this user..." /></label><Button type="submit" size="sm">Save assignment</Button></form></ComponentPreview>
    <ComponentPreview title="Column Navigation"><Cascader options={options} mode="columns" /></ComponentPreview>
    <ComponentPreview title="Tree Navigation"><Cascader options={options} mode="tree" multiple /></ComponentPreview>
    <ComponentPreview title="Asynchronous Children"><div className="grid w-full gap-2"><Cascader options={asyncOptions} selectedPaths={lazySelected} onSelectionChange={setLazySelected} onLoadChildren={async () => { await new Promise((resolve) => setTimeout(resolve, 250)); const children = [{ value: "na", label: "North America", children: [{ value: "us", label: "United States" }, { value: "ca", label: "Canada" }] }, { value: "eu", label: "Europe", children: [{ value: "de", label: "Germany" }, { value: "uk", label: "United Kingdom" }] }]; setAsyncOptions([{ value: "regions", label: "Regions", children }]); return children }} /><span className="text-xs text-muted-foreground">Children load when a region is opened.</span></div></ComponentPreview>
    <ComponentPreview title="Virtualized Large List"><Cascader options={[{ value: "teams", label: "All teams", children: many }]} virtualize searchable searchScope="level" /></ComponentPreview>
    <ComponentPreview title="Removable Selection Chips"><div className="grid w-full gap-3"><Cascader options={options} multiple selectedPaths={multi} onSelectionChange={setMulti} /><div className="flex flex-wrap gap-1">{multi.map((path) => <span key={path.join("/")} className="rounded-full bg-muted px-2 py-1 text-xs">{path.join(" / ")}</span>)}</div></div></ComponentPreview>
    <ComponentPreview title="Tree Multi-Select"><Cascader options={options} mode="tree" multiple selectedPaths={multi} onSelectionChange={setMulti} /></ComponentPreview>
    <ComponentPreview title="Status and Tone Indicators"><Cascader options={[{ value: "active", label: "Production", badge: "Active", tone: "success" }, { value: "review", label: "In review", badge: "Review", tone: "warning" }, { value: "paused", label: "Paused", badge: "Blocked", tone: "destructive" }]} /></ComponentPreview>
    <ComponentPreview title="Inherited Branch Color"><Cascader options={[{ value: "healthy", label: "Healthy services", icon: <IconCheck className="size-4 text-primary" />, children: [{ value: "api", label: "Public API", badge: "99.99%", tone: "success" }, { value: "worker", label: "Workers", badge: "99.95%", tone: "success" }] }, { value: "watch", label: "Needs attention", icon: <IconBuilding className="size-4 text-muted-foreground" />, children: [{ value: "queue", label: "Job queue", badge: "Delayed", tone: "warning" }] }]} /></ComponentPreview>
    <ComponentPreview title="Global Search from a Nested Level"><Cascader options={options} searchScope="global" /></ComponentPreview>
  </div></div></AppShell>
}
