"use client";

import { useState } from "react";

import AppShell from "@/components/blocks/application/app-shell/app-shell";
import {
  AppShellPrimaryNavigation,
  AppShellSectionTabs,
  AppShellUserSummary,
  AppShellWorkspaceSelector,
  type AppShellPrimarySection,
} from "@/components/blocks/application/app-shell/app-shell-navigation";
import { appShellPrimarySections, workspaces } from "@/components/custom/app-shell/config";

export function AppShell8Page() {
  const [activeSection, setActiveSection] = useState<AppShellPrimarySection>(appShellPrimarySections[0]);
  const [activeItem, setActiveItem] = useState("Overview");
  const [activeWorkspace, setActiveWorkspace] = useState(workspaces[0]);

  function selectSection(section: AppShellPrimarySection) {
    setActiveSection(section);
    setActiveItem(section.items[0]?.title ?? "");
  }

  return (
    <AppShell>
      <div className="h-[calc(100svh-6rem)] min-h-[24rem] min-w-0 overflow-hidden">
        <div className="relative isolate flex h-full min-h-0 w-full transform-gpu flex-col overflow-hidden rounded-xl border bg-background">
          <header className="flex min-h-12 shrink-0 items-center gap-2 border-b px-2 sm:px-3">
            <AppShellWorkspaceSelector activeWorkspace={activeWorkspace} onChange={setActiveWorkspace} responsive brand />
            <div className="min-w-0 flex-1">
              <AppShellPrimaryNavigation activeSection={activeSection.title} onSelect={selectSection} />
            </div>
            <AppShellUserSummary compact />
          </header>
          <div className="flex min-h-11 shrink-0 items-center gap-3 border-b px-3 sm:px-4">
            <h1 className="shrink-0 text-sm font-semibold">{activeSection.title}</h1>
            <div className="min-w-0 flex-1">
              <AppShellSectionTabs section={activeSection} activeItem={activeItem} onSelect={setActiveItem} />
            </div>
          </div>
          <main aria-label={`${activeSection.title} ${activeItem}`} className="min-h-0 flex-1" />
        </div>
      </div>
    </AppShell>
  );
}
