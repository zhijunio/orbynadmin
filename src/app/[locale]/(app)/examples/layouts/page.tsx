"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Book as IconBook, ChevronDown as IconChevronDown, PanelLeft as IconLayoutSidebar, Menu as IconMenu2, Search as IconSearch, Settings as IconSettings, Users as IconUsers } from "lucide-react";
import { PageHeader } from "@/components/feature/layout/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const layouts = [
  { id: "classic", title: "Classic Sidebar", icon: IconLayoutSidebar, nav: ["Dashboard", "Projects", "Settings"] },
  { id: "sectioned", title: "Sectioned Navigation", icon: IconMenu2, nav: ["Overview", "Workspaces", "Reports"] },
  { id: "collapsible", title: "Collapsible Sidebar", icon: IconChevronDown, nav: ["General", "Management", "Resources"] },
  { id: "nested", title: "Nested Navigation", icon: IconUsers, nav: ["Organization", "Teams", "Members"] },
  { id: "toggle", title: "Compact Toggle", icon: IconMenu2, nav: ["Home", "Activity", "Settings"] },
  { id: "docs", title: "Documentation", icon: IconBook, nav: ["Getting Started", "Components", "API Reference"] },
];

export default function LayoutExamplesPage() {
  const t = useTranslations("Examples.layoutChooser");
  const [active, setActive] = useState("classic");
  return <div className="space-y-6"><PageHeader title="Layout Examples" /><Card><CardHeader><CardTitle className="text-sm">{t("dashboardShells")}</CardTitle></CardHeader><CardContent className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{layouts.map((layout) => <button key={layout.id} type="button" onClick={() => setActive(layout.id)} className={`group rounded-xl border p-4 text-left transition-colors hover:border-primary/50 ${active === layout.id ? "border-primary bg-primary/[0.035] ring-1 ring-primary/20" : "bg-card"}`}><div className="mb-4 flex items-start justify-between"><span className={`flex size-10 items-center justify-center rounded-lg ${active === layout.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}><layout.icon className="size-5" /></span>{active === layout.id && <Badge>{t("selected")}</Badge>}</div><p className="font-medium">{t(layout.id)}</p><div className="mt-4 flex h-28 overflow-hidden rounded-lg border bg-muted/30"><div className={`flex flex-col gap-2 border-r bg-card p-2 ${layout.id === "toggle" ? "w-10 items-center" : "w-[38%]"}`}>{layout.id === "docs" && <div className="mb-1 flex h-5 items-center gap-1 rounded border px-1 text-[8px] text-muted-foreground"><IconSearch className="size-2.5" /> {t("search")}</div>}{layout.nav.map((item, index) => <span key={item} className={`flex h-5 items-center gap-1.5 rounded px-1.5 text-[8px] ${index === 0 ? "bg-primary/10 font-medium text-primary" : "text-muted-foreground"}`}><span className="size-2 rounded-sm bg-current opacity-70" />{layout.id !== "toggle" && (t.has(item) ? t(item) : item)}{layout.id === "collapsible" && index === 1 && <IconChevronDown className="ml-auto size-2.5" />}</span>)}</div><div className="flex-1 p-2.5"><div className="mb-2 flex items-center justify-between"><span className="h-2 w-14 rounded bg-foreground/15" /><span className="flex size-4 items-center justify-center rounded-full bg-primary/10 text-primary"><IconSettings className="size-2.5" /></span></div><div className="grid grid-cols-2 gap-1.5"><span className="h-8 rounded border bg-card" /><span className="h-8 rounded border bg-card" /><span className="col-span-2 h-9 rounded border bg-card" /></div></div></div></button>)}</CardContent></Card><div className="flex items-center justify-end"><Button variant="outline" onClick={() => toast.success(t("selectedLayout", { layout: t(active) }), { description: t("layoutReady") })}>{t("useLayout")}</Button></div></div>;
}
