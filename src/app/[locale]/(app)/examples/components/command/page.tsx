"use client";

import { Showcase } from "@/components/feature/example/Showcase";

import { useState } from "react";
import { ArrowUpRight, FilePlus2, LayoutDashboard, Search, Settings, Users } from "lucide-react";
import { ComponentPreview } from "@/components/feature/example/ComponentPreview";
import { Button } from "@/components/ui/button";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from "@/components/ui/command";

function CommandExamples() {
  const [open, setOpen] = useState(false);
  const runCommand = () => setOpen(false);

  return (
    <>
      <ComponentPreview title="Command Palette" className="xl:col-span-2">
        <div className="flex w-full justify-center">
          <Button variant="outline" className="h-10 w-full max-w-lg justify-start gap-3 px-3 text-muted-foreground" onClick={() => setOpen(true)}>
            <Search className="size-4" /><span>Search commands and pages...</span>
            <KbdGroup className="ml-auto"><Kbd>⌘</Kbd><Kbd>K</Kbd></KbdGroup>
          </Button>
          <CommandDialog open={open} onOpenChange={setOpen} title="Search commands and pages">
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandEmpty>No matching commands.</CommandEmpty>
              <CommandGroup heading="Navigation">
                <CommandItem onSelect={runCommand}><LayoutDashboard />Dashboard<CommandShortcut>G D</CommandShortcut></CommandItem>
                <CommandItem onSelect={runCommand}><Users />Team members<CommandShortcut>G T</CommandShortcut></CommandItem>
                <CommandItem onSelect={runCommand}><Settings />Settings<CommandShortcut>G S</CommandShortcut></CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Actions">
                <CommandItem onSelect={runCommand}><FilePlus2 />Create a project</CommandItem>
                <CommandItem onSelect={runCommand}><ArrowUpRight />Open recent report</CommandItem>
              </CommandGroup>
            </CommandList>
          </CommandDialog>
        </div>
      </ComponentPreview>
    </>
  );
}

export default function CommandPage() {
  return <Showcase title="Command"><CommandExamples /></Showcase>;
}
