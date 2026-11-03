import {
  IconArrowLeft,
  IconCircleDashed,
  IconDeviceFloppy,
} from "@tabler/icons-react";

import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { PageHeader } from "@/components/custom/docs/page-header";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { Button } from "@/components/ui/buttons/button";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input/input-group";
import { Kbd, KbdGroup } from "@/components/ui/kbd/kbd";
import { Separator } from "@/components/ui/divider/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip/tooltip";

const shortcuts = [
  { label: "Search workspace", keys: ["⌘", "K"] },
  { label: "Create project", keys: ["⌘", "N"] },
  { label: "Save changes", keys: ["⌘", "S"] },
  { label: "Undo action", keys: ["⌘", "Z"] },
  { label: "Redo action", keys: ["⌘", "⇧", "Z"] },
];

export default function KbdPage() {
  return (
    <AppShell>
      <div className="min-w-0 space-y-5">
        <PageHeader title="Keyboard Shortcuts" />
        <div className="grid min-w-0 gap-5 [&>*]:min-w-0 xl:grid-cols-2">
          <ComponentPreview title="Basic keyboard keys">
            <div className="flex w-full items-center justify-center gap-2">
              <Kbd>Ctrl</Kbd><Kbd>⌘K</Kbd><Kbd>Ctrl + B</Kbd>
            </div>
          </ComponentPreview>

          <ComponentPreview title="Keyboard keys grouped together">
            <div className="flex w-full items-center justify-center">
              <KbdGroup><Kbd>Ctrl</Kbd><Kbd>Shift</Kbd><Kbd>P</Kbd></KbdGroup>
            </div>
          </ComponentPreview>

          <ComponentPreview title="Keyboard keys combined with icons" className="xl:col-span-2">
            <div className="flex w-full items-center justify-center">
              <KbdGroup>
                <Kbd><IconArrowLeft className="size-3" /> Back</Kbd>
                <Kbd><IconCircleDashed className="size-3" /> Voice input</Kbd>
              </KbdGroup>
            </div>
          </ComponentPreview>

          <ComponentPreview title="Keyboard key within an input">
            <div className="flex w-full items-center justify-center">
              <InputGroup className="max-w-xs">
                <InputGroupInput aria-label="Search records" placeholder="Search records…" />
                <InputGroupAddon align="inline-end"><Kbd>Space</Kbd></InputGroupAddon>
              </InputGroup>
            </div>
          </ComponentPreview>

          <ComponentPreview title="Keyboard shortcut in a tooltip">
            <div className="flex w-full items-center justify-center">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" aria-label="Save changes"><IconDeviceFloppy /></Button>
                  </TooltipTrigger>
                  <TooltipContent><span>Save changes</span><Kbd>S</Kbd></TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </ComponentPreview>

          <ComponentPreview title="Keyboard shortcuts reference list" className="xl:col-span-2">
            <div className="mx-auto flex w-full max-w-md flex-col">
              <p className="mb-3 text-sm font-medium">Workspace shortcuts</p>
              <Separator />
              <div className="flex flex-col">
                {shortcuts.map((shortcut) => (
                  <div key={shortcut.label} className="flex items-center justify-between border-b py-2.5 last:border-b-0">
                    <span className="text-sm text-muted-foreground">{shortcut.label}</span>
                    <KbdGroup>{shortcut.keys.map((key) => <Kbd key={key}>{key}</Kbd>)}</KbdGroup>
                  </div>
                ))}
              </div>
            </div>
          </ComponentPreview>
        </div>
      </div>
    </AppShell>
  );
}
