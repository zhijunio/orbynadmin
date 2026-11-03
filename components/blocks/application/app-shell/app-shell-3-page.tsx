"use client";

import { useState } from "react";
import {
  IconChevronDown,
  IconComponents,
  IconHome2,
  IconPlus,
  IconSearch,
  IconSelector,
} from "@tabler/icons-react";

import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { AppShellDemoMenu } from "@/components/blocks/application/app-shell/app-shell-menu";
import { AppShellAccountMenuItems } from "@/components/blocks/application/app-shell/app-shell-navigation";
import { workspaces } from "@/components/custom/app-shell/config";
import { useThemeConfig } from "@/components/theme-customizer";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb/breadcrumb";
import { Button } from "@/components/ui/buttons/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown/dropdown-menu";
import { Progress } from "@/components/ui/progress/progress";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar/sidebar";

const activeProjects = [
  { name: "Design System", progress: 72, color: "text-blue-500" },
  { name: "API Integration", progress: 46, color: "text-violet-500" },
  { name: "Mobile App", progress: 89, color: "text-emerald-500" },
  { name: "Analytics Dashboard", progress: 28, color: "text-amber-500" },
  { name: "Auth Module", progress: 61, color: "text-rose-500" },
];

export function AppShell3Page() {
  const [activeWorkspace, setActiveWorkspace] = useState(workspaces[0]);
  const { config } = useThemeConfig();

  return (
    <AppShell>
      <div className="h-[calc(100svh-6rem)] min-h-[24rem] min-w-0 overflow-hidden">
        <div className="relative isolate h-full min-h-0 w-full transform-gpu overflow-hidden rounded-xl border bg-background">
          <SidebarProvider cookieName="nextrose-app-shell-3-sidebar" disableShortcut className="h-full min-h-0 overflow-hidden">
            <Sidebar variant={config.sidebarVariant} collapsible={config.sidebarCollapsible} className="h-full">
              <SidebarHeader className="gap-2 p-0">
                <div className="flex h-12 items-center gap-1 px-2 group-data-[collapsible=icon]:h-auto group-data-[collapsible=icon]:flex-col group-data-[collapsible=icon]:gap-2 group-data-[collapsible=icon]:px-0">
                  <div className="flex min-w-0 flex-1 items-center gap-2 group-data-[collapsible=icon]:hidden">
                    <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground">
                      <IconComponents className="size-5" aria-hidden="true" />
                    </span>
                    <span className="grid min-w-0 leading-tight">
                      <span className="truncate text-sm font-semibold tracking-tight">NextRose</span>
                      <span className="truncate text-xs text-muted-foreground">{activeWorkspace.plan}</span>
                    </span>
                  </div>
                  <span className="hidden size-9 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground group-data-[collapsible=icon]:grid">
                    <IconComponents className="size-5" aria-hidden="true" />
                  </span>
                  <div className="flex items-center gap-1 group-data-[collapsible=icon]:flex-col">
                    <SidebarTrigger className="size-6 shrink-0 text-muted-foreground" />
                  </div>
                </div>
                <Button variant="outline" className="mx-2 h-8 justify-start gap-2 px-2 text-muted-foreground shadow-none group-data-[collapsible=icon]:mx-0 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0" aria-label="Search">
                  <IconSearch className="size-4 shrink-0" />
                  <span className="min-w-0 flex-1 truncate text-left text-xs group-data-[collapsible=icon]:hidden">Search...</span>
                  <kbd className="rounded border bg-muted px-1 py-0.5 text-[10px] leading-none text-muted-foreground group-data-[collapsible=icon]:hidden">⌘K</kbd>
                </Button>
              </SidebarHeader>

              <SidebarContent className="gap-0 px-2">
                <AppShellDemoMenu variant="inset" />
                <ActiveProjects />
              </SidebarContent>

              <SidebarFooter className="gap-2 p-2">
                <SpendingLimit />
                <WorkspaceSwitcher activeWorkspace={activeWorkspace} onWorkspaceChange={setActiveWorkspace} />
              </SidebarFooter>
            </Sidebar>

            <SidebarInset className="min-w-0 overflow-hidden bg-background">
              <header className="flex h-12 shrink-0 items-center border-b px-3">
                <SidebarTrigger className="-ml-1 mr-1 size-7 shrink-0 md:hidden" />
                <Breadcrumb>
                  <BreadcrumbList className="gap-2">
                    <BreadcrumbItem className="gap-1.5"><IconHome2 className="size-4 text-muted-foreground" /><BreadcrumbPage className="text-muted-foreground">Home</BreadcrumbPage></BreadcrumbItem>
                    <BreadcrumbSeparator className="[&>svg]:size-3"><span className="px-1 text-muted-foreground">–</span></BreadcrumbSeparator>
                    <BreadcrumbItem><BreadcrumbPage className="font-medium">Overview</BreadcrumbPage></BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </header>
              <main aria-label="Overview" className="min-h-0 flex-1" />
            </SidebarInset>
          </SidebarProvider>
        </div>
      </div>
    </AppShell>
  );
}

function ActiveProjects() {
  const [open, setOpen] = useState(true);

  return (
    <SidebarGroup className="p-0 pt-2 group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel asChild className="px-2 text-[11px]">
        <button type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} className="w-full justify-between">
          Active Projects
          <IconChevronDown className={`size-4 transition-transform ${open ? "" : "-rotate-90"}`} />
        </button>
      </SidebarGroupLabel>
      {open && <SidebarMenu>
        {activeProjects.map((project) => (
          <SidebarMenuItem key={project.name}>
            <SidebarMenuButton tooltip={`${project.name}: ${project.progress}% complete`} className="h-7 gap-2 px-2 text-[13px]">
              <ProjectProgressRing progress={project.progress} color={project.color} />
              <span>{project.name}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>}
    </SidebarGroup>
  );
}

function ProjectProgressRing({ progress, color }: { progress: number; color: string }) {
  const radius = 7;
  const circumference = 2 * Math.PI * radius;

  return (
    <svg role="img" aria-label={`${progress}% complete`} viewBox="0 0 18 18" className={`size-4 shrink-0 -rotate-90 ${color}`}>
      <circle cx="9" cy="9" r={radius} fill="none" stroke="currentColor" strokeOpacity="0.18" strokeWidth="2" />
      <circle cx="9" cy="9" r={radius} fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray={circumference} strokeDashoffset={circumference * (1 - progress / 100)} strokeLinecap="round" />
    </svg>
  );
}

function SpendingLimit() {
  return (
    <section className="rounded-lg border bg-background p-2 group-data-[collapsible=icon]:hidden" aria-label="Monthly spending limit">
      <div className="mb-1 text-[10px] font-medium text-amber-600">Spending Limit</div>
      <p className="mb-2 text-[10px] leading-4 text-muted-foreground">Consumption and balance reset at the end of the month</p>
      <Progress value={82} aria-label="82 percent of monthly spending limit used" className="h-1.5 bg-muted [&_[data-slot=progress-indicator]]:bg-emerald-500" />
      <div className="mt-1 flex justify-between text-[10px] text-muted-foreground"><span><strong className="font-medium text-foreground">82%</strong> Used</span><span><strong className="font-medium text-foreground">18%</strong> Free</span></div>
    </section>
  );
}

function WorkspaceSwitcher({
  activeWorkspace,
  onWorkspaceChange,
}: {
  activeWorkspace: (typeof workspaces)[number];
  onWorkspaceChange: (workspace: (typeof workspaces)[number]) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton className="h-8 gap-2 px-1.5 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0">
          <span className="grid size-6 shrink-0 place-items-center rounded-md bg-primary text-primary-foreground"><activeWorkspace.icon className="size-4" /></span>
          <span className="min-w-0 flex-1 truncate text-left text-xs font-medium group-data-[collapsible=icon]:hidden">{activeWorkspace.name}</span>
          <IconSelector className="size-4 shrink-0 text-muted-foreground group-data-[collapsible=icon]:hidden" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="top" align="start" className="w-60">
        <DropdownMenuLabel className="px-2 text-xs text-muted-foreground">Organizations</DropdownMenuLabel>
        {workspaces.map((workspace) => (
          <DropdownMenuItem key={workspace.name} onSelect={() => onWorkspaceChange(workspace)}>
            <span className="grid size-7 place-items-center rounded-md border bg-background"><workspace.icon className="size-4" /></span>
            <span className="grid min-w-0"><span className="truncate text-sm font-medium">{workspace.name}</span><span className="truncate text-xs text-muted-foreground">{workspace.plan}</span></span>
            {workspace.name === activeWorkspace.name && <span className="ml-auto text-muted-foreground" aria-label="Selected">✓</span>}
          </DropdownMenuItem>
        ))}
        <DropdownMenuItem><IconPlus className="size-4" />New Organization</DropdownMenuItem>
        <DropdownMenuSeparator />
        <AppShellAccountMenuItems />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
