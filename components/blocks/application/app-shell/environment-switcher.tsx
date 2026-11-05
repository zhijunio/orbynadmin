"use client";

import * as React from "react";
import { IconActivity, IconBuilding, IconChevronDown, IconChevronRight, IconCommand, IconKey, IconSearch, IconShield, IconWebhook, IconUsers } from "@tabler/icons-react";
import { Button } from "@/components/ui/button/button";
import { Badge } from "@/components/ui/badge/badge";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command/command";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover/popover";

const navigation = [
  { label: "Overview", icon: IconActivity },
  { label: "Users", icon: IconUsers, children: ["All Users", "Invitations", "Roles"] },
  { label: "Organizations", icon: IconBuilding, children: ["Directory", "Teams"] },
  { label: "Security", icon: IconShield, children: ["Policies", "Audit Log"] },
  { label: "Webhooks", icon: IconWebhook },
  { label: "API Keys", icon: IconKey },
];

export function EnvironmentSwitcher() {
  const [organization, setOrganization] = React.useState("Acme Inc");
  const [application, setApplication] = React.useState("Web App");
  const [environment, setEnvironment] = React.useState("Production");
  const [active, setActive] = React.useState("Users/Roles");
  const [expanded, setExpanded] = React.useState(["Users"]);
  const [collapsed, setCollapsed] = React.useState(false);
  const [commandOpen, setCommandOpen] = React.useState(false);
  const [healthOpen, setHealthOpen] = React.useState(false);
  React.useEffect(()=>{const onKey=(event:KeyboardEvent)=>{if((event.metaKey||event.ctrlKey)&&event.key.toLowerCase()==="k"){event.preventDefault();setCommandOpen(true)}};window.addEventListener("keydown",onKey);return()=>window.removeEventListener("keydown",onKey)},[]);

  const choose=(label:string)=>{setActive(label);setCommandOpen(false)};
  return <div className="flex h-svh min-h-0 min-w-0 flex-col overflow-hidden bg-background">
    <header className="flex h-12 shrink-0 items-center gap-2 border-b px-3 sm:px-4"><span className="grid size-7 shrink-0 place-items-center rounded-lg bg-foreground text-background"><span className="text-sm font-semibold">N</span></span><ScopeSelector icon={<IconBuilding className="size-3.5 text-primary"/>} value={organization} items={["Acme Inc","Northwind","Vertex Labs"]} onChange={setOrganization}/><span className="text-muted-foreground">/</span><ScopeSelector value={application} items={["Web App","Admin Console","API Platform"]} onChange={setApplication}/><span className="hidden text-muted-foreground sm:inline">/</span><ScopeSelector value={environment} items={["Production","Staging","Development"]} onChange={setEnvironment}/><div className="ml-auto"><Popover open={healthOpen} onOpenChange={setHealthOpen}><PopoverTrigger asChild><Button type="button" variant="outline" className="h-8 gap-2 px-2 text-xs"><IconActivity className="size-4 text-success"/><span className="hidden sm:inline">System</span><Badge variant="outline" className="h-5 border-destructive/30 bg-destructive/10 px-1.5 text-[11px] text-foreground">Alert</Badge></Button></PopoverTrigger><PopoverContent align="end" className="w-72"><div className="mb-3 flex items-center justify-between"><span className="text-sm font-semibold">System health</span><Badge variant="outline" className="border-destructive/30 bg-destructive/10 text-foreground">Alert</Badge></div><div className="grid gap-3"><Metric label="API availability" value="99.98%"/><Metric label="Worker capacity" value="72%"/><Metric label="Queue latency" value="128 ms"/></div></PopoverContent></Popover></div></header>
    <div className="flex min-h-0 flex-1">
      <aside className={`flex shrink-0 flex-col border-r transition-[width] ${collapsed?"w-14":"w-64"}`} aria-label="Application navigation"><div className="flex items-center gap-2 p-3">{!collapsed&&<Button type="button" variant="outline" onClick={()=>setCommandOpen(true)} className="h-8 min-w-0 flex-1 justify-start gap-2 px-2 text-xs text-muted-foreground"><IconSearch className="size-3.5"/><span className="flex-1 text-left">Search...</span><kbd className="flex items-center gap-0.5 rounded border px-1 py-0.5 text-[11px]"><IconCommand className="size-3"/>K</kbd></Button>}<Button type="button" variant="ghost" size="icon" aria-label={collapsed?"Expand sidebar":"Collapse sidebar"} onClick={()=>setCollapsed(value=>!value)} className="size-8 shrink-0"><IconChevronRight className={`size-4 transition-transform ${collapsed?"":"rotate-180"}`}/></Button></div><nav className="grid content-start gap-0.5 px-3" aria-label="Platform"><p className={`px-2 pb-1 text-xs font-medium text-muted-foreground ${collapsed?"sr-only":""}`}>Platform</p>{navigation.map(({label,icon:Icon,children})=>{const open=expanded.includes(label);const selected=active===label||active.startsWith(`${label}/`);return <div key={label}><button type="button" aria-label={label} aria-current={selected?"page":undefined} aria-expanded={children?open:undefined} onClick={()=>{setActive(label);if(children&&!collapsed)setExpanded(items=>open?items.filter(item=>item!==label):[...items,label])}} className={`flex h-8 w-full items-center gap-2 rounded-md px-2 text-sm ${selected?"bg-muted font-medium text-foreground":"text-muted-foreground hover:bg-muted hover:text-foreground"}`}><Icon className="size-4 shrink-0"/>{!collapsed&&<><span className="min-w-0 flex-1 truncate text-left">{label}</span>{children&&<IconChevronRight className={`size-3.5 transition-transform ${open?"rotate-90":""}`}/>}</>}</button>{children&&open&&!collapsed&&<div className="ml-3 border-l pl-2">{children.map(child=><button key={child} type="button" aria-current={active===`${label}/${child}`?"page":undefined} onClick={()=>choose(`${label}/${child}`)} className={`block h-8 w-full rounded-md px-2 text-left text-sm ${active===`${label}/${child}`?"bg-muted text-foreground":"text-muted-foreground hover:bg-muted hover:text-foreground"}`}>{child}</button>)}</div>}</div>})}</nav><div className="mt-auto p-3">{!collapsed&&<div className="relative rounded-xl border bg-card p-3 pt-4"><span aria-hidden="true" className="absolute inset-x-2 -top-2 h-full rounded-xl border bg-card"/><span aria-hidden="true" className="absolute inset-x-1 -top-1 h-full rounded-xl border bg-card"/><div className="relative"><p className="text-sm font-medium">Theme presets</p><div aria-hidden="true" className="mt-3 h-20 rounded-lg bg-gradient-to-br from-primary via-accent to-secondary"/></div></div>}</div></aside>
      <main aria-label={`${application} ${active}`} className="grid min-h-0 min-w-0 flex-1 grid-rows-[9.5rem_minmax(0,1fr)] gap-4 p-4"></main>
    </div>
    <CommandDialog open={commandOpen} onOpenChange={setCommandOpen} title="Search workspace" description="Jump to a platform section"><CommandInput placeholder="Search pages and actions..."/><CommandList><CommandEmpty>No results found.</CommandEmpty><CommandGroup heading="Navigate">{navigation.flatMap(item=>[item.label,...(item.children??[]).map(child=>`${item.label}/${child}`)]).map(item=><CommandItem key={item} value={item} onSelect={()=>choose(item)}>{item.replace("/"," · ")}</CommandItem>)}</CommandGroup></CommandList></CommandDialog>
  </div>;
}

function ScopeSelector({icon,value,items,onChange}:{icon?:React.ReactNode;value:string;items:string[];onChange:(value:string)=>void}){return <DropdownMenu><DropdownMenuTrigger asChild><Button type="button" variant="ghost" className="h-8 min-w-0 gap-1 px-1.5 text-xs sm:gap-2 sm:px-2">{icon}<span className="max-w-20 truncate sm:max-w-24">{value}</span><IconChevronDown className="size-3 shrink-0 text-muted-foreground"/></Button></DropdownMenuTrigger><DropdownMenuContent align="start" className="w-44">{items.map(item=><DropdownMenuItem key={item} onSelect={()=>onChange(item)} aria-selected={value===item}>{item}</DropdownMenuItem>)}</DropdownMenuContent></DropdownMenu>}
function Metric({label,value}:{label:string;value:string}){return <div className="flex items-center justify-between gap-3 text-xs"><span className="text-muted-foreground">{label}</span><span className="font-medium tabular-nums">{value}</span></div>}
