"use client";
import { useState } from "react";
import {
  IconChevronDown as ChevronDown,
  IconCopy as Copy,
  IconDownload as Download,
  IconFileText as FileText,
  IconFolder as Folder,
  IconFolderOpen as FolderOpen,
  IconDotsVertical as More,
  IconPlus as Plus,
  IconTrash as Trash,
  IconUser as User,
} from "@tabler/icons-react";
import { CatalogGridItems } from "@/components/custom/docs/catalog-page-grid";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { Button } from "@/components/ui/button/button";
import { Checkbox } from "@/components/ui/checkbox/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible/collapsible";
import { Frame, FrameHeader, FramePanel, FrameTitle } from "@/components/ui/frame/frame";

const initialKeys = ["sk_live_83a1…", "sk_test_42f0…", "sk_live_3c9d…"];

export function CollapsibleCatalogExamples() {
const [controlledOpen, setControlledOpen] = useState(false);
  const [usageOpen, setUsageOpen] = useState(false);
  const [keys, setKeys] = useState(initialKeys);
  const [fileTab, setFileTab] = useState<"Explorer" | "Outline">("Explorer");
  const [selectedFile, setSelectedFile] = useState("settings.ts");

  return (
    <CatalogGridItems>

          <ComponentPreview title="Order Summary">
            <Collapsible className="w-full max-w-lg rounded-lg border px-4">
              <div className="flex items-center justify-between py-3 text-sm">
                <span className="font-medium">Order #OR-2048</span><span className="text-muted-foreground">$248.00</span>
              </div>
              <CollapsibleTrigger className="group flex w-full items-center justify-between border-t py-3 text-left text-sm text-muted-foreground">
                Shipping and items <ChevronDown className="size-4 transition-transform group-data-[state=open]:rotate-180" />
              </CollapsibleTrigger>
              <CollapsibleContent className="border-t pb-3 pt-2 text-sm text-muted-foreground">Shipping to Operations · 3 items · Expected Nov 12</CollapsibleContent>
            </Collapsible>
          </ComponentPreview>

          <ComponentPreview title="Notification Channel Settings">
            <Collapsible defaultOpen className="w-full max-w-lg">
              <CollapsibleTrigger className="group flex w-full items-center justify-between rounded-lg border px-4 py-3 text-sm font-medium">
                Notification channels <ChevronDown className="size-4 transition-transform group-data-[state=open]:rotate-180" />
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-3 px-4 pb-2 pt-4">
                {["Email alerts", "Product updates", "Weekly digest"].map((item, index) => <label key={item} className="flex items-center gap-2 text-sm"><Checkbox defaultChecked={index !== 1} /><span>{item}</span></label>)}
              </CollapsibleContent>
            </Collapsible>
          </ComponentPreview>

          <ComponentPreview title="Expandable Help Card">
            <Collapsible className="w-full max-w-lg rounded-xl border p-4">
              <CollapsibleTrigger className="group flex w-full items-center justify-between gap-4 text-left text-sm font-medium">
                How are API requests counted? <ChevronDown className="size-4 shrink-0 transition-transform group-data-[state=open]:rotate-180" />
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-3 text-sm leading-6 text-muted-foreground">Requests are counted when they reach an active endpoint. Retries that receive a response are included in your monthly usage.</CollapsibleContent>
            </Collapsible>
          </ComponentPreview>

          <ComponentPreview title="Usage Breakdown with Bottom Trigger">
            <div className="w-full max-w-lg pb-5">
              <div className="rounded-xl border p-4">
                <div className="flex items-center justify-between text-sm"><span className="font-medium">Monthly usage</span><span className="text-muted-foreground">90 / 100 GB</span></div>
                <div className="mt-3 h-2 rounded-full bg-muted"><div className="h-full w-[90%] rounded-full bg-primary" /></div>
                <Collapsible open={usageOpen} onOpenChange={setUsageOpen}>
                  <CollapsibleContent className="pt-4 text-sm text-muted-foreground">Storage 52 GB · Backups 24 GB · Attachments 14 GB</CollapsibleContent>
                  <CollapsibleTrigger asChild><Button type="button" variant="outline" size="icon" aria-label={usageOpen ? "Hide usage breakdown" : "Show usage breakdown"} className="mx-auto mt-3 flex size-8 rounded-full"><ChevronDown className={`size-4 transition-transform ${usageOpen ? "rotate-180" : ""}`} /></Button></CollapsibleTrigger>
                </Collapsible>
              </div>
            </div>
          </ComponentPreview>

          <ComponentPreview title="Expandable Form Fields">
            <div className="w-full max-w-lg">
              <div className="flex items-center gap-2"><label className="grid flex-1 gap-1 text-sm font-medium">Base price<input type="number" defaultValue="120" className="h-9 rounded-lg border border-input bg-background px-3 font-normal outline-none focus-visible:ring-2 focus-visible:ring-ring" /></label><Button type="button" variant="outline" size="icon" aria-label="Toggle tax and discount fields" aria-expanded={controlledOpen} onClick={() => setControlledOpen((open) => !open)}><ChevronDown className={`size-4 transition-transform ${controlledOpen ? "rotate-180" : ""}`} /></Button></div>
              <Collapsible open={controlledOpen} onOpenChange={setControlledOpen}>
                <CollapsibleContent className="grid grid-cols-2 gap-3 pt-3">{[["Tax rate", "8.5"], ["Discount", "10"]].map(([label, value]) => <label key={label} className="grid gap-1 text-sm font-medium">{label}<input type="number" defaultValue={value} className="h-9 rounded-lg border border-input bg-background px-3 font-normal outline-none focus-visible:ring-2 focus-visible:ring-ring" /></label>)}</CollapsibleContent>
              </Collapsible>
            </div>
          </ComponentPreview>

          <ComponentPreview title="Collapsible Frame">
            <Frame className="w-full max-w-lg" stacked>
              <FramePanel fit><Collapsible defaultOpen><CollapsibleTrigger className="group flex w-full items-center justify-between text-left"><FrameHeader className="px-0 py-0"><FrameTitle>Deployment status</FrameTitle></FrameHeader><ChevronDown className="size-4 transition-transform group-data-[state=open]:rotate-180" /></CollapsibleTrigger><CollapsibleContent className="pt-3 text-sm text-muted-foreground">Release 2.4.1 completed in all regions at 14:32 UTC.</CollapsibleContent></Collapsible></FramePanel>
              <FramePanel fit className="text-sm text-muted-foreground">All systems operational</FramePanel>
            </Frame>
          </ComponentPreview>

          <ComponentPreview title="API Keys with Row Actions">
            <Frame className="w-full max-w-lg" dense>
              <FramePanel fit><div className="flex items-center justify-between"><span className="text-sm font-semibold">API keys</span><Button type="button" variant="ghost" size="icon-sm" aria-label="Add API key" onClick={() => setKeys((items) => [...items, `sk_test_${Math.random().toString(16).slice(2, 6)}…`])}><Plus className="size-4" /></Button></div></FramePanel>
              {keys.map((key) => <FramePanel fit key={key}><div className="flex items-center gap-2 text-sm"><span className="min-w-0 flex-1 truncate font-mono">{key}</span><Button type="button" variant="ghost" size="icon-sm" aria-label={`Copy ${key}`} onClick={() => void navigator.clipboard?.writeText(key)}><Copy className="size-4" /></Button><Button type="button" variant="ghost" size="icon-sm" aria-label={`Delete ${key}`} onClick={() => setKeys((items) => items.filter((item) => item !== key))}><Trash className="size-4 text-destructive" /></Button></div></FramePanel>)}
            </Frame>
          </ComponentPreview>

          <ComponentPreview title="User Profile Details">
            <Collapsible defaultOpen className="w-full max-w-lg rounded-xl border p-4">
              <CollapsibleTrigger className="group flex w-full items-center justify-between"><span className="flex items-center gap-3 text-left"><span className="grid size-10 place-items-center rounded-full bg-muted"><User className="size-5 text-muted-foreground" /></span><span><span className="block text-sm font-medium">Maya Chen</span><span className="block text-xs text-muted-foreground">@maya.chen · Online</span></span></span><ChevronDown className="size-4 transition-transform group-data-[state=open]:rotate-180" /></CollapsibleTrigger>
              <CollapsibleContent className="ml-[52px] space-y-1 pt-3 text-sm text-muted-foreground"><p>Last active 8 minutes ago</p><p>Workspace: Product Operations</p><p>Location: Singapore</p></CollapsibleContent>
            </Collapsible>
          </ComponentPreview>

          <ComponentPreview title="Multi-Level Workspace Menu">
            <div className="w-full max-w-lg space-y-1 text-sm">
              <Collapsible defaultOpen><CollapsibleTrigger className="group flex w-full items-center gap-2 rounded-md px-2 py-2 text-left hover:bg-muted"><ChevronDown className="size-4 transition-transform group-data-[state=closed]:-rotate-90" /><FolderOpen className="size-4 text-primary" /><span className="font-medium">Projects</span></CollapsibleTrigger><CollapsibleContent className="ml-4 border-l pl-3"><Collapsible defaultOpen><CollapsibleTrigger className="group flex w-full items-center gap-2 rounded-md px-2 py-2 text-left hover:bg-muted"><ChevronDown className="size-4 transition-transform group-data-[state=closed]:-rotate-90" /><Folder className="size-4 text-muted-foreground" />Platform</CollapsibleTrigger><CollapsibleContent className="ml-4 space-y-1 border-l py-1 pl-3"><button type="button" className="w-full rounded-md px-2 py-1.5 text-left hover:bg-accent" onClick={() => setSelectedFile("Roadmap")}>Roadmap</button><button type="button" className="w-full rounded-md px-2 py-1.5 text-left hover:bg-accent" onClick={() => setSelectedFile("Sprint board")}>Sprint board</button></CollapsibleContent></Collapsible></CollapsibleContent></Collapsible>
              <p role="status" className="pl-8 text-xs text-muted-foreground">Selected: {selectedFile}</p>
            </div>
          </ComponentPreview>

          <ComponentPreview title="File Tree with Explorer and Outline Tabs">
            <div className="w-full max-w-lg">
              <div role="tablist" aria-label="File view" className="mb-2 flex gap-1 border-b">{(["Explorer", "Outline"] as const).map((tab) => <button key={tab} type="button" role="tab" aria-selected={fileTab === tab} onClick={() => setFileTab(tab)} className="border-b-2 px-3 py-2 text-sm aria-selected:border-primary aria-selected:font-medium aria-[selected=false]:border-transparent aria-[selected=false]:text-muted-foreground">{tab}</button>)}</div>
              {fileTab === "Explorer" ? <Collapsible defaultOpen><CollapsibleTrigger className="group flex items-center gap-2 py-2 text-sm font-medium"><ChevronDown className="size-4 transition-transform group-data-[state=closed]:-rotate-90" /><FolderOpen className="size-4 text-primary" />src</CollapsibleTrigger><CollapsibleContent className="ml-4 space-y-1 border-l pl-3"><Collapsible defaultOpen><CollapsibleTrigger className="group flex items-center gap-2 py-1.5 text-sm"><ChevronDown className="size-4 transition-transform group-data-[state=closed]:-rotate-90" /><Folder className="size-4" />settings</CollapsibleTrigger><CollapsibleContent className="ml-4 space-y-1 border-l pl-3">{["settings.ts", "profile.tsx"].map((file) => <div key={file} className="flex items-center gap-2"><button type="button" onClick={() => setSelectedFile(file)} className="flex min-w-0 flex-1 items-center gap-2 rounded px-2 py-1.5 text-left text-sm hover:bg-accent"><FileText className="size-4" />{file}</button><Button type="button" size="icon-sm" variant="ghost" aria-label={`Download ${file}`}><Download className="size-4" /></Button><Button type="button" size="icon-sm" variant="ghost" aria-label={`More actions for ${file}`}><More className="size-4" /></Button></div>)}</CollapsibleContent></Collapsible></CollapsibleContent></Collapsible> : <div className="space-y-2 rounded-lg border p-3 text-sm"><p className="font-medium">{selectedFile}</p><p className="text-muted-foreground">No symbols found in this file.</p></div>}
            </div>
          </ComponentPreview>
    </CatalogGridItems>
  );
}
