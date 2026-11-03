"use client";

import { useState } from "react";
import AppShell from "@/components/blocks/application/app-shell/app-shell";
import {
  AppShellPrimaryNavigation,
  AppShellSectionMenu,
  AppShellUserMenu,
  AppShellWorkspaceSelector,
  type AppShellPrimarySection,
} from "@/components/blocks/application/app-shell/app-shell-navigation";
import { appShellPrimarySections, workspaces } from "@/components/custom/app-shell/config";
import { useThemeConfig } from "@/components/theme-customizer";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb/breadcrumb";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar/sidebar";

export function AppShell6Page() {
  const [activeSection, setActiveSection] = useState<AppShellPrimarySection>(appShellPrimarySections[0]);
  const [activeItem, setActiveItem] = useState("Overview");
  const [activeWorkspace, setActiveWorkspace] = useState(workspaces[0]);
  const { config } = useThemeConfig();

  function selectSection(section: AppShellPrimarySection) {
    setActiveSection(section);
    setActiveItem(section.items[0]?.title ?? "");
  }

  return (
    <AppShell>
      <div className="h-[calc(100svh-6rem)] min-h-[24rem] min-w-0 overflow-hidden">
        <div className="relative isolate flex h-full min-h-0 w-full transform-gpu overflow-hidden rounded-xl border bg-background">
          <aside className="hidden w-12 shrink-0 flex-col items-center gap-3 bg-foreground py-2 text-background md:flex" aria-label="Section rail">
            <AppShellPrimaryNavigation activeSection={activeSection.title} onSelect={selectSection} orientation="rail" />
            <div className="mt-auto flex w-full justify-center"><AppShellUserMenu compact /></div>
          </aside>

          <div className="relative isolate flex min-h-0 min-w-0 flex-1 transform-gpu overflow-hidden">
            <SidebarProvider cookieName="nextrose-app-shell-6-sidebar" disableShortcut className="flex h-full min-h-0 min-w-0 flex-1 overflow-hidden">
                <Sidebar variant={config.sidebarVariant} collapsible={config.sidebarCollapsible} className="h-full">
                <SidebarHeader className="gap-2 p-2">
                  <AppShellWorkspaceSelector
                    activeWorkspace={activeWorkspace}
                    onChange={setActiveWorkspace}
                    responsive
                    brand
                    className="sm:!w-full"
                  />
                  <div className="md:hidden">
                    <AppShellPrimaryNavigation activeSection={activeSection.title} onSelect={selectSection} />
                  </div>
                </SidebarHeader>
                <SidebarContent className="gap-0 px-1">
                  <AppShellSectionMenu section={activeSection} activeItem={activeItem} onSelect={setActiveItem} />
                </SidebarContent>
              </Sidebar>
  
              <SidebarInset className="min-w-0 overflow-hidden bg-background">
                <header className="flex h-10 shrink-0 items-center gap-2 border-b px-3">
                  <SidebarTrigger className="-ml-1 size-7 shrink-0" />
                  <Breadcrumb>
                    <BreadcrumbList className="gap-2 text-xs">
                      <BreadcrumbItem><BreadcrumbPage className="text-muted-foreground">{activeSection.title}</BreadcrumbPage></BreadcrumbItem>
                      <BreadcrumbSeparator className="[&>svg]:size-3" />
                      <BreadcrumbItem><BreadcrumbPage className="font-medium">{activeItem.split("/").at(-1)}</BreadcrumbPage></BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                </header>
                <main aria-label={`${activeSection.title} ${activeItem}`} className="min-h-0 flex-1" />
              </SidebarInset>
            </SidebarProvider>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
