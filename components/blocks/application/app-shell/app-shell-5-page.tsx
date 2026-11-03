"use client";

import { useState } from "react";
import {
  IconActivity,
  IconApps,
  IconChevronRight,
  IconHome2,
  IconServer,
} from "@tabler/icons-react";

import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { AppShellDemoFooterMenu, AppShellDemoMenu } from "@/components/blocks/application/app-shell/app-shell-menu";
import {
  AppShellUserMenu,
  AppShellWorkspaceSelector,
} from "@/components/blocks/application/app-shell/app-shell-navigation";
import { workspaces } from "@/components/custom/app-shell/config";
import { useThemeConfig } from "@/components/theme-customizer";
import { Badge } from "@/components/ui/badges/badge";
import { Button } from "@/components/ui/buttons/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover/popover";
import { Progress } from "@/components/ui/progress/progress";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar/sidebar";

const applications = ["Admin Console", "Component Library", "API Platform"];
const environments = ["Production", "Staging", "Development"];

export function AppShell5Page() {
  const [activeWorkspace, setActiveWorkspace] = useState(workspaces[0]);
  const [application, setApplication] = useState(applications[0]);
  const [environment, setEnvironment] = useState(environments[0]);
  const { config } = useThemeConfig();

  return (
    <AppShell>
      <div className="h-[calc(100svh-6rem)] min-h-[24rem] min-w-0 overflow-hidden">
        <div className="relative isolate flex h-full min-h-0 w-full transform-gpu flex-col overflow-hidden rounded-xl border bg-background">
          <header className="flex min-h-12 shrink-0 items-center gap-1 border-b px-2 sm:gap-2 sm:px-3">
            <AppShellWorkspaceSelector
              activeWorkspace={activeWorkspace}
              onChange={setActiveWorkspace}
              responsive
              className="sm:!w-[var(--sidebar-width)]"
            />
            <IconChevronRight className="size-3 shrink-0 text-muted-foreground" aria-hidden="true" />
            <ContextSelector label="Application" value={application} options={applications} icon={IconApps} onChange={setApplication} />
            <IconChevronRight className="size-3 shrink-0 text-muted-foreground" aria-hidden="true" />
            <ContextSelector label="Environment" value={environment} options={environments} icon={IconServer} onChange={setEnvironment} />
            <div className="ml-auto flex shrink-0 items-center gap-1"><SystemStatus /></div>
          </header>

          <div className="relative isolate flex min-h-0 flex-1 transform-gpu overflow-hidden">
            <SidebarProvider cookieName="nextrose-app-shell-5-sidebar" disableShortcut className="flex h-full min-h-0 flex-1 overflow-hidden">
              <Sidebar variant={config.sidebarVariant} collapsible={config.sidebarCollapsible} className="h-full">
                <SidebarHeader className="gap-2 p-2">
                  <div className="flex h-12 items-center justify-end group-data-[collapsible=icon]:justify-center">
                    <SidebarTrigger className="size-8 shrink-0 text-muted-foreground" />
                  </div>
                </SidebarHeader>
                <SidebarContent className="gap-0 px-2">
                  <AppShellDemoMenu variant="inset" />
                </SidebarContent>
                <SidebarFooter className="gap-2 p-2">
                  <AppShellDemoFooterMenu variant="inset" />
                  <div className="border-t pt-2 group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center">
                    <AppShellUserMenu />
                  </div>
                </SidebarFooter>
              </Sidebar>
  
              <SidebarInset className="min-w-0 overflow-hidden bg-background">
                <header className="flex h-10 shrink-0 items-center gap-2 border-b px-3">
                  <SidebarTrigger className="-ml-1 size-7 shrink-0 md:hidden" />
                  <div className="flex items-center gap-1.5 text-xs">
                    <IconHome2 className="size-4 text-muted-foreground" aria-hidden="true" />
                    <span className="text-muted-foreground">Home</span>
                    <span className="text-muted-foreground">/</span>
                    <span className="font-medium">Overview</span>
                  </div>
                </header>
                <main aria-label="Overview" className="min-h-0 flex-1" />
              </SidebarInset>
            </SidebarProvider>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function ContextSelector({
  label,
  value,
  options,
  icon: Icon,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  icon: typeof IconApps;
  onChange: (value: string) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 min-w-0 shrink-0 gap-1 px-1.5 text-xs sm:gap-2 sm:px-2" aria-label={`${label}: ${value}`}>
          <Icon className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
          <span className="hidden max-w-32 truncate sm:inline">{value}</span>
          <span className="sr-only sm:hidden">{label}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-52">
        <DropdownMenuLabel className="text-xs text-muted-foreground">{label}</DropdownMenuLabel>
        {options.map((option) => (
          <DropdownMenuItem key={option} onSelect={() => onChange(option)} aria-selected={option === value}>
            {option}
            {option === value && <span className="ml-auto text-xs text-primary">Selected</span>}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function SystemStatus() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="h-8 shrink-0 gap-1.5 px-2 text-xs" aria-label="System status: healthy">
          <IconActivity className="size-4 text-emerald-600" aria-hidden="true" />
          <span className="hidden sm:inline">System</span>
          <Badge variant="outline" className="h-5 border-emerald-500/20 bg-emerald-500/10 px-1.5 text-[10px] text-emerald-700">Healthy</Badge>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-64">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">System status</span>
          <Badge variant="outline" className="border-emerald-500/20 bg-emerald-500/10 text-emerald-700">Healthy</Badge>
        </div>
        <StatusMeter label="API availability" value={99} />
        <StatusMeter label="Worker capacity" value={72} />
        <p className="text-[11px] text-muted-foreground">Sample status · updated just now</p>
      </PopoverContent>
    </Popover>
  );
}

function StatusMeter({ label, value }: { label: string; value: number }) {
  return (
    <div className="grid gap-1">
      <div className="flex justify-between text-xs"><span>{label}</span><span className="text-muted-foreground">{value}%</span></div>
      <Progress value={value} className="h-1.5" />
    </div>
  );
}
