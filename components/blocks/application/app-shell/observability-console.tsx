"use client";

import * as React from "react";
import { IconActivity, IconChevronDown, IconChevronRight, IconClipboard, IconDatabase, IconDeviceDesktopAnalytics, IconGauge, IconHome, IconList, IconNetwork, IconPin, IconSearch, IconServer, IconSettings, IconTopologyStar3, IconX } from "@tabler/icons-react";
import { Button } from "@/components/ui/button/button";
import { Input } from "@/components/ui/input/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet/sheet";

const basePages = [
  { name: "Home", group: "", icon: IconHome },
  { name: "Endpoints", group: "Observe", icon: IconTopologyStar3 },
  { name: "Hosts", group: "Observe", icon: IconServer },
  { name: "Topology", group: "Observe", icon: IconNetwork },
  { name: "Explorer", group: "Investigate", icon: IconDeviceDesktopAnalytics, children: ["Traces", "Logs", "Sessions"] },
  { name: "Queries", group: "Investigate", icon: IconDatabase },
  { name: "Checkout Latency", group: "Pinned", icon: IconGauge },
  { name: "Cache Hit Ratio", group: "Pinned", icon: IconDatabase },
  { name: "Queue Backlog", group: "Pinned", icon: IconList },
  { name: "Billing Workers", group: "Pinned", icon: IconActivity },
];
const workspaces = ["Nimbus Core", "Edge Services", "Payments Platform"];

export function ObservabilityConsole() {
  const [workspace, setWorkspace] = React.useState(workspaces[0]);
  const [page, setPage] = React.useState("Home");
  const [query, setQuery] = React.useState("");
  const [pinned, setPinned] = React.useState(["Checkout Latency", "Cache Hit Ratio", "Queue Backlog", "Billing Workers"]);
  const [explorerOpen, setExplorerOpen] = React.useState(true);
  const [notice, setNotice] = React.useState("");
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const searchRef = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    const handler = (event: KeyboardEvent) => { if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "f") { event.preventDefault(); searchRef.current?.focus(); } };
    window.addEventListener("keydown", handler); return () => window.removeEventListener("keydown", handler);
  }, []);
  const pinnedPages = pinned.map((name) => basePages.find((item) => item.name === name) ?? { name, group: "Pinned", icon: IconGauge });
  const pages = [...basePages.filter((item) => item.group !== "Pinned"), ...pinnedPages];
  const matches = (name: string) => !query || name.toLowerCase().includes(query.toLowerCase());
  const setPinnedPage = () => {
    if (pinned.includes(page)) { setPinned((current) => current.filter((name) => name !== page)); setNotice(`${page} unpinned`); }
    else { setPinned((current) => [...current, page]); setNotice(`${page} pinned`); }
  };
  const sidebar = <><DropdownMenu><DropdownMenuTrigger asChild><button className="flex w-full items-center gap-2 rounded-xl border bg-card px-2.5 py-2 text-left hover:bg-muted/50"><span className="grid size-6 place-items-center rounded-lg bg-teal-600 text-white"><IconActivity className="size-4" /></span><span className="min-w-0 flex-1"><span className="block truncate text-xs font-medium">{workspace}</span><span className="block text-[10px] text-muted-foreground">Production · EU West</span></span><IconChevronDown className="size-4 text-muted-foreground" /></button></DropdownMenuTrigger><DropdownMenuContent align="start" className="w-56"><DropdownMenuLabel>Switch workspace</DropdownMenuLabel><DropdownMenuSeparator />{workspaces.map((item) => <DropdownMenuItem key={item} onSelect={() => setWorkspace(item)}>{item}</DropdownMenuItem>)}</DropdownMenuContent></DropdownMenu><div className="relative mt-2"><IconSearch className="absolute left-2 top-2 size-4 text-muted-foreground" /><Input ref={searchRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search" className="h-8 pl-8 pr-10 text-xs" /><kbd className="absolute right-2 top-1.5 rounded border px-1 text-[10px] text-muted-foreground">⌘F</kbd></div><nav className="mt-3 space-y-3">{["", "Observe", "Investigate", "Pinned"].map((group) => { const groupItems=pages.filter((item)=>item.group===group&&matches(item.name)); if(!groupItems.length)return null; return <section key={group}>{group&&<div className="flex items-center justify-between px-2 py-1.5 text-xs text-muted-foreground">{group}{group==="Pinned"&&<span className="rounded border px-1.5 py-0.5 text-[10px]">{groupItems.length}</span>}</div>}{groupItems.map((item)=>{const Icon=item.icon;return <React.Fragment key={item.name}><div className={`group flex h-8 items-center gap-2 rounded-md px-2 text-xs ${page===item.name?"bg-muted font-medium":"text-muted-foreground hover:bg-muted/60"}`}>{item.children&&<button aria-label={`${explorerOpen?"Collapse":"Expand"} ${item.name}`} onClick={()=>setExplorerOpen(!explorerOpen)}>{explorerOpen?<IconChevronDown className="size-3.5"/>:<IconChevronRight className="size-3.5"/>}</button>}<button onClick={()=>{setPage(item.name);setMobileOpen(false)}} className="flex min-w-0 flex-1 items-center gap-2 text-left"><Icon className="size-4 shrink-0"/>{item.name}</button>{item.group==="Pinned"&&<button aria-label={`Unpin ${item.name}`} className="opacity-0 hover:opacity-100 group-hover:opacity-100" onClick={()=>{setPinned((current)=>current.filter((name)=>name!==item.name));setNotice(`${item.name} unpinned`)}}><IconX className="size-3"/></button>}</div>{item.children&&explorerOpen&&item.children.filter(matches).map((child)=>{const ChildIcon=child==="Traces"?IconActivity:child==="Logs"?IconList:IconDeviceDesktopAnalytics;return <button key={child} onClick={()=>{setPage(child);setMobileOpen(false)}} className={`ml-5 flex h-8 w-[calc(100%-1.25rem)] items-center gap-2 rounded-md px-2 text-xs ${page===child?"bg-muted font-medium":"text-muted-foreground hover:bg-muted/60"}`}><ChildIcon className="size-3.5"/>{child}</button>})}</React.Fragment>})}</section>})}</nav><div className="mt-4 border-t pt-3"><button onClick={()=>setNotice("Workspace settings opened")} className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-xs text-muted-foreground hover:bg-muted"><IconSettings className="size-4"/>Workspace settings</button></div></>;
  return <section className="grid h-svh min-h-0 grid-rows-[minmax(0,1fr)] grid-cols-[15rem_minmax(0,1fr)] overflow-hidden bg-background text-foreground max-md:grid-cols-[minmax(0,1fr)]"><aside className="min-h-0 overflow-y-auto border-r p-3 max-md:hidden">{sidebar}</aside><main className="min-h-0 min-w-0 overflow-y-auto"><header className="flex h-12 items-center gap-2 border-b px-3"><Button variant="ghost" size="icon" className="size-7 md:hidden" aria-label="Open navigation" onClick={()=>setMobileOpen(true)}><IconList className="size-4"/></Button><IconNetwork className="hidden size-4 text-muted-foreground sm:block"/><span className="text-xs text-muted-foreground">Workspace</span><IconChevronRight className="size-3 text-muted-foreground"/><span className="text-sm font-medium">{page}</span><div className="ml-auto flex gap-2"><Button variant="outline" size="sm" className="h-7 text-xs" onClick={setPinnedPage}><IconPin className={`size-3.5 ${pinned.includes(page)?"fill-current":""}`}/>{pinned.includes(page)?"Pinned":"Pin"}</Button><Button variant="outline" size="sm" className="h-7 text-xs" onClick={()=>setNotice("Link copied")}><IconClipboard className="size-3.5"/>Copy Link</Button></div></header><div className="grid gap-4 p-4 xl:grid-cols-2">{Array.from({length:8},(_,index)=><article key={index} className={`rounded-2xl border bg-card p-4 ${index<4?"h-[8.125rem]":"h-[18.5rem]"}`}><div className="space-y-2"><div className="h-4 rounded-full bg-muted"/><div className="h-4 rounded-full bg-muted"/></div><div className={`mt-5 rounded-xl bg-muted/80 ${index<4?"h-8":"h-48"}`}/></article>)}</div>{notice&&<div role="status" className="fixed bottom-5 right-5 z-20 flex items-center gap-3 rounded-lg border bg-card px-4 py-3 text-sm shadow-lg">{notice}{notice.endsWith("unpinned")&&<button onClick={()=>{const name=notice.replace(" unpinned","");setPinned((current)=>[...current,name]);setNotice(`${name} pinned`)}} className="font-medium text-primary">Undo</button>}<button aria-label="Dismiss notification" onClick={()=>setNotice("")}><IconX className="size-4"/></button></div>}</main><Sheet open={mobileOpen} onOpenChange={setMobileOpen}><SheetContent side="left" className="w-72"><SheetHeader><SheetTitle>Workspace navigation</SheetTitle></SheetHeader><div className="p-3">{sidebar}</div></SheetContent></Sheet></section>;
}
