"use client";

import { useState } from "react";
import { IconComponents, IconSearch, IconSelector } from "@tabler/icons-react";

import { currentUser, workspaces } from "@/components/custom/app-shell/config";
import { useThemeConfig } from "@/components/theme-customizer";
import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { AppShellDemoFooterMenu, AppShellDemoMenu } from "@/components/blocks/application/app-shell/app-shell-menu";
import { AppShellAccountMenuItems } from "@/components/blocks/application/app-shell/app-shell-navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar/avatar";
import { Button } from "@/components/ui/buttons/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenuButton,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar/sidebar";

export function AppShell2Page() {
  const [activeWorkspace, setActiveWorkspace] = useState(workspaces[0]);
  const { config } = useThemeConfig();

  return (
    <AppShell>
      <div className="h-[calc(100svh-6rem)] min-h-[24rem] min-w-0 overflow-hidden">
      <div className="relative isolate h-full min-h-0 w-full transform-gpu overflow-hidden rounded-xl border bg-background">
        <SidebarProvider cookieName="nextrose-app-shell-2-sidebar" disableShortcut className="h-full min-h-0 overflow-hidden">
        <Sidebar variant={config.sidebarVariant} collapsible={config.sidebarCollapsible} className="h-full">
          <SidebarHeader className="gap-3 p-0">
            <div className="flex h-12 items-center gap-2 px-2 group-data-[collapsible=icon]:justify-center">
              <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground">
                <IconComponents className="size-5" aria-hidden="true" />
              </span>
              <span className="grid min-w-0 flex-1 leading-tight group-data-[collapsible=icon]:hidden">
                <span className="truncate text-sm font-semibold tracking-tight">NextRose</span>
                <span className="truncate text-xs text-muted-foreground">{activeWorkspace.plan}</span>
              </span>
              <SidebarTrigger className="size-7 text-muted-foreground group-data-[collapsible=icon]:hidden" />
            </div>
            <div className="hidden justify-center group-data-[collapsible=icon]:flex">
              <SidebarTrigger className="size-8 border bg-background text-muted-foreground shadow-none" />
            </div>
            <Button
              variant="outline"
              className="mx-2 h-8 justify-start gap-2 px-2 text-muted-foreground shadow-none group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0"
              aria-label="Search"
            >
              <IconSearch className="size-4 shrink-0" />
              <span className="min-w-0 flex-1 truncate text-left text-xs group-data-[collapsible=icon]:hidden">Search...</span>
              <kbd className="rounded border bg-muted px-1 py-0.5 text-[10px] leading-none text-muted-foreground group-data-[collapsible=icon]:hidden">⌘K</kbd>
            </Button>
          </SidebarHeader>

          <SidebarContent className="gap-0 px-2">
            <AppShellDemoMenu variant="floating" />
          </SidebarContent>

          <SidebarFooter className="gap-2 p-2">
            <AppShellDemoFooterMenu variant="floating" />
            <SidebarSeparator className="mx-0 w-full" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg" className="h-8 gap-2 px-2 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0">
                  <span className="grid size-6 shrink-0 place-items-center rounded-md bg-primary text-primary-foreground"><activeWorkspace.icon className="size-4" /></span>
                  <span className="min-w-0 flex-1 truncate text-left text-xs font-medium group-data-[collapsible=icon]:hidden">{activeWorkspace.name}</span>
                  <IconSelector className="size-4 text-muted-foreground group-data-[collapsible=icon]:hidden" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" align="start" className="w-56">
                <DropdownMenuLabel>Workspaces</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {workspaces.map((workspace) => (
                  <DropdownMenuItem key={workspace.name} onSelect={() => setActiveWorkspace(workspace)}>
                    <span className="grid size-6 place-items-center rounded-md border bg-background"><workspace.icon className="size-4" /></span>
                    <span className="grid"><span>{workspace.name}</span><span className="text-xs text-muted-foreground">{workspace.plan}</span></span>
                    {workspace.name === activeWorkspace.name && <span className="ml-auto text-xs text-muted-foreground">Selected</span>}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem>New Organization</DropdownMenuItem>
                <DropdownMenuSeparator />
                <AppShellAccountMenuItems />
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset className="min-w-0 bg-background">
          <header className="flex h-12 shrink-0 items-center gap-3 border-b px-3">
            <SidebarTrigger className="-ml-1 size-7 shrink-0 md:hidden" />
            <Breadcrumb>
              <BreadcrumbList className="gap-2">
                <BreadcrumbItem className="gap-1.5">
                  <span className="grid size-4 place-items-center rounded-full bg-primary text-primary-foreground"><activeWorkspace.icon className="size-2.5" /></span>
                  <BreadcrumbPage className="text-muted-foreground">Workspace</BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="[&>svg]:size-3" />
                <BreadcrumbItem className="gap-1.5">
                  <Avatar className="size-4"><AvatarImage src={currentUser.avatar} alt={currentUser.name} /><AvatarFallback>AM</AvatarFallback></Avatar>
                  <BreadcrumbPage className="text-muted-foreground">{currentUser.name}</BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="[&>svg]:size-3" />
                <BreadcrumbItem><BreadcrumbPage className="font-medium">Projects</BreadcrumbPage></BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          <main aria-label="Projects workspace" className="min-h-0 flex-1" />
        </SidebarInset>
        </SidebarProvider>
      </div>
      </div>
    </AppShell>
  );
}
