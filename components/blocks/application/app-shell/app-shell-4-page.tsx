"use client";

import { useState } from "react";
import { IconChevronRight } from "@tabler/icons-react";

import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { AppShellDemoFooterMenu, AppShellDemoMenu } from "@/components/blocks/application/app-shell/app-shell-menu";
import {
  AppShellUserMenu,
  AppShellUserSummary,
  AppShellWorkspaceSelector,
} from "@/components/blocks/application/app-shell/app-shell-navigation";
import { workspaces } from "@/components/custom/app-shell/config";
import { useThemeConfig } from "@/components/theme-customizer";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb/breadcrumb";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar/sidebar";

export function AppShell4Page() {
  const [activeWorkspace, setActiveWorkspace] = useState(workspaces[0]);
  const { config } = useThemeConfig();

  return (
    <AppShell>
      <div className="h-[calc(100svh-6rem)] min-h-[24rem] min-w-0 overflow-hidden">
        <div className="relative isolate h-full min-h-0 w-full transform-gpu overflow-hidden rounded-xl border bg-background">
          <SidebarProvider cookieName="nextrose-app-shell-4-sidebar" disableShortcut className="h-full min-h-0 overflow-hidden">
            <Sidebar variant={config.sidebarVariant} collapsible={config.sidebarCollapsible} className="h-full">
              <SidebarHeader className="gap-2 p-2">
                <div className="group-data-[collapsible=icon]:hidden">
                  <AppShellWorkspaceSelector activeWorkspace={activeWorkspace} onChange={setActiveWorkspace} brand className="w-full" />
                </div>
                <div className="hidden justify-center group-data-[collapsible=icon]:flex">
                  <AppShellWorkspaceSelector activeWorkspace={activeWorkspace} onChange={setActiveWorkspace} compact brand />
                </div>
              </SidebarHeader>
              <SidebarContent className="gap-0 px-2">
                <AppShellDemoMenu variant="floating" />
              </SidebarContent>
              <SidebarFooter className="gap-2 p-2">
                <AppShellDemoFooterMenu variant="floating" />
                <SidebarSeparator className="mx-0 w-full" />
                <AppShellUserMenu />
              </SidebarFooter>
            </Sidebar>

            <SidebarInset className="min-w-0 overflow-hidden bg-background">
              <header className="flex h-12 shrink-0 items-center gap-2 border-b px-3">
                <SidebarTrigger className="-ml-1 size-8 shrink-0" />
                <span className="h-5 w-px shrink-0 bg-border" aria-hidden="true" />
                <Breadcrumb>
                  <BreadcrumbList className="gap-2 text-sm">
                    <BreadcrumbItem><BreadcrumbPage className="text-muted-foreground">Home</BreadcrumbPage></BreadcrumbItem>
                    <IconChevronRight className="size-3 text-muted-foreground" aria-hidden="true" />
                    <BreadcrumbItem><BreadcrumbPage className="font-medium">Overview</BreadcrumbPage></BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
                <div className="ml-auto"><AppShellUserSummary compact /></div>
              </header>
              <main aria-label="Overview" className="min-h-0 flex-1" />
            </SidebarInset>
          </SidebarProvider>
        </div>
      </div>
    </AppShell>
  );
}
