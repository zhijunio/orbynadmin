"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  IconArrowUpRight as ArrowUpRight,
  IconFilePlus as FilePlus2,
  IconLayoutDashboard as LayoutDashboard,
  IconSearch as Search,
  IconSettings as Settings,
  IconUsers as Users,
} from "@tabler/icons-react";
import ConsoleLayout from "@/components/custom/app-shell/console-layout";
import { PageHeader } from "@/components/custom/app-shell/page-header";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { Button } from "@/components/ui/buttons/button";
import { Kbd, KbdGroup } from "@/components/ui/kbd/kbd";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command/command";
import { useIsMac } from "@/hooks/use-platform";

export default function CommandPage() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const isMac = useIsMac();

  function goTo(url: string) {
    setOpen(false);
    router.push(url);
  }

  function runAction(message: string) {
    setOpen(false);
    toast.success(message);
  }

  return (
    <ConsoleLayout>
      <div className="min-w-0 space-y-5"><PageHeader title="Command" /><div className="grid min-w-0 gap-5 [&>*]:min-w-0 xl:grid-cols-2">
        <ComponentPreview title="Command Palette" className="xl:col-span-2">
          <div className="flex w-full justify-center">
            <Button
              variant="outline"
              className="h-10 w-full max-w-lg justify-start gap-3 px-3 text-muted-foreground"
              onClick={() => setOpen(true)}
            >
              <Search aria-hidden="true" className="size-4" />
              <span>Search commands and pages...</span>
              <KbdGroup className="ml-auto">
                <Kbd>{isMac ? "⌘" : "Ctrl"}</Kbd>
                {!isMac && <span className="text-[11px] font-medium text-muted-foreground">+</span>}
                <Kbd>K</Kbd>
              </KbdGroup>
            </Button>
            <CommandDialog open={open} onOpenChange={setOpen} title="Search commands and pages">
              <CommandInput placeholder="Type a command or search..." />
              <CommandList>
                <CommandEmpty>No matching commands.</CommandEmpty>
                <CommandGroup heading="Navigation">
                  <CommandItem value="Overview dashboard" onSelect={() => goTo("/components")}>
                    <LayoutDashboard aria-hidden="true" />
                    <span className="min-w-0 flex-1 truncate">Dashboard</span>
                    <CommandShortcut>G D</CommandShortcut>
                  </CommandItem>
                  <CommandItem value="Team members" onSelect={() => goTo("/account/profile")}>
                    <Users aria-hidden="true" />
                    <span className="min-w-0 flex-1 truncate">Team members</span>
                    <CommandShortcut>G T</CommandShortcut>
                  </CommandItem>
                  <CommandItem value="Account settings" onSelect={() => goTo("/components")}>
                    <Settings aria-hidden="true" />
                    <span className="min-w-0 flex-1 truncate">Settings</span>
                    <CommandShortcut>G S</CommandShortcut>
                  </CommandItem>
                </CommandGroup>
                <CommandGroup heading="Actions">
                  <CommandItem onSelect={() => runAction("Project creation started")}>
                    <FilePlus2 aria-hidden="true" />
                    <span className="min-w-0 flex-1 truncate">Create a project</span>
                  </CommandItem>
                  <CommandItem onSelect={() => runAction("Recent report opened")}>
                    <ArrowUpRight aria-hidden="true" />
                    <span className="min-w-0 flex-1 truncate">Open recent report</span>
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </CommandDialog>
          </div>
        </ComponentPreview>
      </div></div>
    </ConsoleLayout>
  );
}
