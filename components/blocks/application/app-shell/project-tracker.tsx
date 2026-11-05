"use client";

import { useEffect, useState } from "react";
import { IconSearch, IconTicket } from "@tabler/icons-react";

import { AppShellDemoMenu } from "@/components/blocks/application/app-shell/app-shell-menu";
import { AppShellUserMenu, AppShellWorkspaceSelector } from "@/components/blocks/application/app-shell/app-shell-navigation";
import { appShellMenuSections, workspaces } from "@/components/custom/app-shell/config";
import { useThemeConfig } from "@/components/theme-customizer";
import { Button } from "@/components/ui/button/button";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb/breadcrumb";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command/command";
import { Meter } from "@/components/ui/meter/meter";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip/tooltip";

const projects = [
  { name: "Design System", progress: 76, color: "text-primary" },
  { name: "API Integration", progress: 54, color: "text-violet-500" },
  { name: "Mobile App", progress: 88, color: "text-success" },
  { name: "Analytics Dashboard", progress: 42, color: "text-warning" },
  { name: "Auth Module", progress: 63, color: "text-destructive" },
];

export function ProjectTracker() {
  const [activeWorkspace, setActiveWorkspace] = useState(workspaces[0]);
  const [activeItem, setActiveItem] = useState("Overview");
  const [searchOpen, setSearchOpen] = useState(false);
  const { config } = useThemeConfig();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setSearchOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="h-svh min-h-[24rem] min-w-0 overflow-hidden">
      <TooltipProvider delayDuration={0}>
        <SidebarProvider defaultOpen cookieName="nextrose-project-tracker-sidebar" disableShortcut className="h-full min-h-0 overflow-hidden rounded-xl bg-background">
          <Sidebar variant={config.sidebarVariant} collapsible={config.sidebarCollapsible} className="h-full">
            <SidebarHeader className="gap-2 p-2">
              <div className="flex min-w-0 items-center gap-1">
                <AppShellWorkspaceSelector activeWorkspace={activeWorkspace} onChange={setActiveWorkspace} brand sidebar className="w-full" />
              </div>
              <Button variant="outline" className="h-8 justify-start gap-2 px-2 text-muted-foreground shadow-none group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0" aria-label="Search" onClick={() => setSearchOpen(true)}>
                <IconSearch className="size-4 shrink-0" /><span className="min-w-0 flex-1 truncate text-left text-xs group-data-[collapsible=icon]:hidden">Search...</span><kbd className="rounded border bg-muted px-1 py-0.5 text-[10px] leading-none group-data-[collapsible=icon]:hidden">⌘K</kbd>
              </Button>
            </SidebarHeader>

            <SidebarContent className="gap-0">
              <AppShellDemoMenu />

              <SidebarGroup className="p-2 group-data-[collapsible=icon]:hidden">
                <SidebarGroupLabel>Active Projects</SidebarGroupLabel>
                <div className="grid gap-1">
                  {projects.map((project) => <button key={project.name} type="button" className="flex h-8 items-center gap-2 rounded-md px-2 text-left text-sm text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground" onClick={() => setActiveItem(`Projects/${project.name}`)}>
                    <ProjectProgress value={project.progress} className={project.color} />
                    <span className="truncate">{project.name}</span>
                  </button>)}
                </div>
              </SidebarGroup>

              <SidebarGroup className="mt-auto p-2 group-data-[collapsible=icon]:hidden">
                <div className="rounded-lg border bg-card p-3">
                  <div className="mb-3 flex items-center justify-between"><span className="text-sm font-medium">Spending Limit</span><IconTicket className="size-4 text-warning" /></div>
                  <Meter label="Monthly usage" value={72} valueLabel="$7,200 / $10,000" tone="warning" className="gap-2" />
                  <p className="mt-2 text-xs text-muted-foreground">Resets in 12 days</p>
                </div>
              </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="gap-2 p-2">
              <SidebarSeparator className="mx-0 w-full" />
              <AppShellUserMenu />
            </SidebarFooter>
          </Sidebar>

          <SidebarInset className="min-w-0 overflow-hidden bg-background">
            <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-background/80 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <SidebarTrigger className="-ml-1 size-7 shrink-0" />
              <div className="mr-1 h-5 w-px shrink-0 self-center bg-border" aria-hidden="true" />
              <Breadcrumb>
                <BreadcrumbList className="gap-2">
                  <BreadcrumbItem><BreadcrumbPage className="text-muted-foreground">Home</BreadcrumbPage></BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem><BreadcrumbPage className="font-medium">{activeItem}</BreadcrumbPage></BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </header>
            <main aria-label="Overview" className="min-h-0 flex-1" />
          </SidebarInset>
        </SidebarProvider>
      </TooltipProvider>
      <CommandDialog open={searchOpen} onOpenChange={setSearchOpen} title="Search projects">
        <CommandInput placeholder="Search projects and pages..." />
        <CommandList><CommandEmpty>No results found.</CommandEmpty><CommandGroup heading="Navigate">{appShellMenuSections.flatMap((section) => section.items.flatMap((item) => [item.title, ...(item.children ?? [])])).map((item) => <CommandItem key={item} onSelect={() => { setActiveItem(item); setSearchOpen(false); }}>{item}</CommandItem>)}</CommandGroup></CommandList>
      </CommandDialog>
    </div>
  );
}

function ProjectProgress({ value, className }: { value: number; className: string }) {
  const radius = 6;
  const circumference = 2 * Math.PI * radius;
  return (
    <svg viewBox="0 0 16 16" className={`size-4 shrink-0 ${className}`} role="img" aria-label={`${value}% complete`}>
      <circle cx="8" cy="8" r={radius} fill="none" stroke="currentColor" strokeOpacity="0.16" strokeWidth="2.5" />
      <circle cx="8" cy="8" r={radius} fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray={circumference} strokeDashoffset={circumference * (1 - value / 100)} strokeLinecap="round" transform="rotate(-90 8 8)" />
    </svg>
  );
}
