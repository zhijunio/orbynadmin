"use client";

import ConsoleLayout from "@/components/application/app-shell/console-layout";

import { ContextMenu, ContextMenuCheckboxItem, ContextMenuContent, ContextMenuItem, ContextMenuLabel, ContextMenuRadioGroup, ContextMenuRadioItem, ContextMenuSeparator, ContextMenuTrigger } from "@/components/base/context-menu/context-menu";
import { ComponentPreview } from "@/components/application/docs/component-preview";
import { Showcase } from "@/components/application/docs/showcase";

export default function ContextMenuPage() {
  return <ConsoleLayout>{<Showcase title="Context Menu">
    <ComponentPreview title="Actions and destructive action"><ContextMenu><ContextMenuTrigger asChild><button type="button" className="flex h-36 w-full max-w-md items-center justify-center rounded-xl border border-dashed bg-muted/20 text-sm text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Right-click this workspace</button></ContextMenuTrigger><ContextMenuContent><ContextMenuLabel>Workspace</ContextMenuLabel><ContextMenuItem>Open overview</ContextMenuItem><ContextMenuItem>Duplicate</ContextMenuItem><ContextMenuSeparator /><ContextMenuItem variant="destructive">Delete workspace</ContextMenuItem></ContextMenuContent></ContextMenu></ComponentPreview>
    <ComponentPreview title="Checkbox and radio options"><ContextMenu><ContextMenuTrigger asChild><button type="button" className="flex h-36 w-full max-w-md items-center justify-center rounded-xl border border-dashed bg-muted/20 text-sm text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Right-click to change the view</button></ContextMenuTrigger><ContextMenuContent><ContextMenuLabel>Display</ContextMenuLabel><ContextMenuCheckboxItem defaultChecked>Show archived</ContextMenuCheckboxItem><ContextMenuCheckboxItem>Compact rows</ContextMenuCheckboxItem><ContextMenuSeparator /><ContextMenuRadioGroup defaultValue="list"><ContextMenuRadioItem value="list">List view</ContextMenuRadioItem><ContextMenuRadioItem value="grid">Grid view</ContextMenuRadioItem></ContextMenuRadioGroup></ContextMenuContent></ContextMenu></ComponentPreview>
  </Showcase>}</ConsoleLayout>;
}
