import {
  IconArrowLeft,
  IconCircleDashed,
  IconDeviceFloppy,
} from "@tabler/icons-react";

import { CatalogGridItems } from "@/components/custom/docs/catalog-page-grid";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { Button } from "@/components/ui/button/button";
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

export function KbdCatalogExamples() {
  return (
    <CatalogGridItems>
      <ComponentPreview title="Basic Keyboard Keys">
                  <div className="flex w-full items-center justify-center gap-2">
                    <Kbd>Ctrl</Kbd><Kbd>⌘K</Kbd><Kbd>Ctrl + B</Kbd>
                  </div>
                </ComponentPreview>

                <ComponentPreview title="Grouped Keyboard Keys">
                  <div className="flex w-full items-center justify-center">
                    <KbdGroup><Kbd>Ctrl</Kbd><Kbd>Shift</Kbd><Kbd>P</Kbd></KbdGroup>
                  </div>
                </ComponentPreview>

                <ComponentPreview title="Keyboard Keys with Icons" span={2}>
                  <div className="flex w-full items-center justify-center">
                    <KbdGroup>
                      <Kbd><IconArrowLeft className="size-3" /> Back</Kbd>
                      <Kbd><IconCircleDashed className="size-3" /> Voice input</Kbd>
                    </KbdGroup>
                  </div>
                </ComponentPreview>

                <ComponentPreview title="Keyboard Key in Input">
                  <div className="flex w-full items-center justify-center">
                    <InputGroup className="max-w-xs">
                      <InputGroupInput aria-label="Search records" placeholder="Search records…" />
                      <InputGroupAddon align="inline-end"><Kbd>Space</Kbd></InputGroupAddon>
                    </InputGroup>
                  </div>
                </ComponentPreview>

                <ComponentPreview title="Shortcut in Tooltip">
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

                <ComponentPreview title="Shortcuts Reference List" span={2}>
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
    </CatalogGridItems>
  );
}
