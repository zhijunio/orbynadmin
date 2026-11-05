"use client";

import { useState } from "react";
import { IconCheck, IconChevronDown } from "@tabler/icons-react";

import {
  AppShellUserSummary,
  AppShellWorkspaceSelector,
  type AppShellPrimarySection,
} from "@/components/blocks/application/app-shell/app-shell-navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown/dropdown-menu";
import { appShellPrimarySections, workspaces } from "@/components/custom/app-shell/config";
import { Button } from "@/components/ui/button/button";

export function DropdownTopNavigation() {
  const [activeSection, setActiveSection] = useState<AppShellPrimarySection>(appShellPrimarySections[0]);
  const [activeItem, setActiveItem] = useState(appShellPrimarySections[0].items[0]?.title ?? "");
  const [activeWorkspace, setActiveWorkspace] = useState(workspaces[0]);

  function selectItem(section: AppShellPrimarySection, item: string) {
    setActiveSection(section);
    setActiveItem(item);
  }

  return (
    <div className="h-svh min-h-[24rem] min-w-0 overflow-hidden">
      <div className="relative isolate flex h-full min-h-0 w-full flex-col overflow-hidden rounded-xl bg-background">
        <header className="flex min-h-16 shrink-0 items-center gap-3 border-b bg-background/80 px-3 backdrop-blur supports-[backdrop-filter]:bg-background/60 sm:px-4">
          <AppShellWorkspaceSelector activeWorkspace={activeWorkspace} onChange={setActiveWorkspace} responsive brand />
          <nav aria-label="Primary sections" className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto">
            {appShellPrimarySections.map((section) => {
              const SectionIcon = section.icon;
              const active = activeSection.title === section.title;

              return (
                <DropdownMenu key={section.title}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      aria-haspopup="menu"
                      className={`h-9 shrink-0 gap-2 px-3 text-sm ${active ? "bg-muted text-foreground" : "text-muted-foreground"}`}
                    >
                      <SectionIcon className="size-4 shrink-0" aria-hidden="true" />
                      <span>{section.title}</span>
                      <IconChevronDown className="size-3.5 shrink-0" aria-hidden="true" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="min-w-48">
                    <DropdownMenuLabel>{section.title}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {section.items.map((item) => {
                      if (item.children?.length) {
                        return (
                          <DropdownMenuSub key={item.title}>
                            <DropdownMenuSubTrigger>{item.title}</DropdownMenuSubTrigger>
                            <DropdownMenuSubContent>
                              {item.children.map((child) => {
                                const value = `${item.title}/${child}`;
                                const selected = active && activeItem === value;

                                return (
                                  <DropdownMenuItem key={child} onSelect={() => selectItem(section, value)}>
                                    <span className="min-w-0 flex-1">{child}</span>
                                    {selected && <IconCheck className="size-4 text-primary" aria-hidden="true" />}
                                  </DropdownMenuItem>
                                );
                              })}
                            </DropdownMenuSubContent>
                          </DropdownMenuSub>
                        );
                      }

                      const selected = active && activeItem === item.title;

                      return (
                        <DropdownMenuItem key={item.title} onSelect={() => selectItem(section, item.title)}>
                          <span className="min-w-0 flex-1">{item.title}</span>
                          {selected && <IconCheck className="size-4 text-primary" aria-hidden="true" />}
                        </DropdownMenuItem>
                      );
                    })}
                  </DropdownMenuContent>
                </DropdownMenu>
              );
            })}
          </nav>
          <AppShellUserSummary compact />
        </header>
        <main aria-label={`${activeSection.title} ${activeItem}`} className="min-h-0 flex-1" />
      </div>
    </div>
  );
}
