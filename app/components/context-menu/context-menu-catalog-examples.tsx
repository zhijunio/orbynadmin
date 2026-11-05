"use client";
import { useState } from "react";
import { CatalogGridItems } from "@/components/custom/docs/catalog-page-grid";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { Button } from "@/components/ui/button/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog/dialog";
import {
  ContextMenu, ContextMenuCheckboxItem, ContextMenuContent, ContextMenuItem,
  ContextMenuLabel, ContextMenuRadioGroup, ContextMenuRadioItem, ContextMenuSeparator,
  ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuTrigger,
} from "@/components/ui/context-menu/context-menu";
import { IconCopy as Copy, IconCut as Cut, IconExternalLink as ExternalLink, IconPencil as Pencil, IconRefresh as Refresh, IconShare as Share, IconTrash as Trash } from "@tabler/icons-react";

const TriggerSurface = ({ children }: { children: React.ReactNode }) => <button type="button" className="flex h-32 w-full max-w-md items-center justify-center rounded-xl border border-dashed bg-muted/20 px-4 text-center text-sm text-muted-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring">{children}</button>;

export function ContextMenuCatalogExamples() {
const [compact, setCompact] = useState(false);
  const [showArchived, setShowArchived] = useState(true);
  const [view, setView] = useState("list");
  const [align, setAlign] = useState("right");

  return (
    <CatalogGridItems>

          <ComponentPreview title="Basic Menu">
            <ContextMenu><ContextMenuTrigger asChild><TriggerSurface>Right-click a workspace row</TriggerSurface></ContextMenuTrigger><ContextMenuContent><ContextMenuItem>Open</ContextMenuItem><ContextMenuItem disabled>Rename</ContextMenuItem><ContextMenuItem>Duplicate</ContextMenuItem></ContextMenuContent></ContextMenu>
          </ComponentPreview>

          <ComponentPreview title="Common Actions with Icons">
            <ContextMenu><ContextMenuTrigger asChild><TriggerSurface>Right-click to copy or move this report</TriggerSurface></ContextMenuTrigger><ContextMenuContent><ContextMenuItem><Copy />Copy</ContextMenuItem><ContextMenuItem><Cut />Move</ContextMenuItem><ContextMenuItem><ExternalLink />Open in new tab</ContextMenuItem><ContextMenuSeparator /><ContextMenuItem variant="destructive"><Trash />Delete</ContextMenuItem></ContextMenuContent></ContextMenu>
          </ComponentPreview>

          <ComponentPreview title="Keyboard Shortcuts">
            <ContextMenu><ContextMenuTrigger asChild><TriggerSurface>Right-click to see shortcut hints</TriggerSurface></ContextMenuTrigger><ContextMenuContent><ContextMenuItem><Refresh />Reload<kbd className="ml-auto text-xs text-muted-foreground">⌘R</kbd></ContextMenuItem><ContextMenuItem><Copy />Copy link<kbd className="ml-auto text-xs text-muted-foreground">⌘⇧C</kbd></ContextMenuItem><ContextMenuItem disabled><ExternalLink />Forward<kbd className="ml-auto text-xs text-muted-foreground">⌘]</kbd></ContextMenuItem></ContextMenuContent></ContextMenu>
          </ComponentPreview>

          <ComponentPreview title="Nested Submenus">
            <ContextMenu><ContextMenuTrigger asChild><TriggerSurface>Right-click to organize this file</TriggerSurface></ContextMenuTrigger><ContextMenuContent><ContextMenuItem><Copy />Copy</ContextMenuItem><ContextMenuItem><Cut />Move</ContextMenuItem><ContextMenuSub><ContextMenuSubTrigger>More tools</ContextMenuSubTrigger><ContextMenuSubContent><ContextMenuItem>Export as PDF</ContextMenuItem><ContextMenuItem>Export as CSV</ContextMenuItem><ContextMenuSeparator /><ContextMenuItem variant="destructive"><Trash />Delete export</ContextMenuItem></ContextMenuSubContent></ContextMenuSub><ContextMenuSeparator /><ContextMenuItem variant="destructive"><Trash />Delete file</ContextMenuItem></ContextMenuContent></ContextMenu>
          </ComponentPreview>

          <ComponentPreview title="Labels and Separators">
            <ContextMenu><ContextMenuTrigger asChild><TriggerSurface>Right-click for project actions</TriggerSurface></ContextMenuTrigger><ContextMenuContent><ContextMenuLabel>Project</ContextMenuLabel><ContextMenuItem>Open overview<kbd className="ml-auto text-xs text-muted-foreground">⌘O</kbd></ContextMenuItem><ContextMenuItem>Duplicate<kbd className="ml-auto text-xs text-muted-foreground">⌘D</kbd></ContextMenuItem><ContextMenuSeparator /><ContextMenuLabel>Display</ContextMenuLabel><ContextMenuItem>Pin to sidebar<kbd className="ml-auto text-xs text-muted-foreground">⌘P</kbd></ContextMenuItem><ContextMenuSeparator /><ContextMenuLabel>Danger zone</ContextMenuLabel><ContextMenuItem variant="destructive"><Trash />Delete project</ContextMenuItem></ContextMenuContent></ContextMenu>
          </ComponentPreview>

          <ComponentPreview title="Checkbox Items">
            <ContextMenu><ContextMenuTrigger asChild><TriggerSurface>Right-click to change the table view</TriggerSurface></ContextMenuTrigger><ContextMenuContent><ContextMenuLabel>Visible columns</ContextMenuLabel><ContextMenuCheckboxItem checked={showArchived} onCheckedChange={(checked) => setShowArchived(checked === true)}>Archived projects</ContextMenuCheckboxItem><ContextMenuCheckboxItem checked={compact} onCheckedChange={setCompact}>Compact rows</ContextMenuCheckboxItem><ContextMenuCheckboxItem defaultChecked>Owner</ContextMenuCheckboxItem></ContextMenuContent></ContextMenu><p className="mt-2 text-xs text-muted-foreground">{compact ? "Compact" : "Comfortable"} rows · archived {showArchived ? "shown" : "hidden"}</p>
          </ComponentPreview>

          <ComponentPreview title="Radio Items">
            <ContextMenu><ContextMenuTrigger asChild><TriggerSurface>Right-click to choose a layout or theme</TriggerSurface></ContextMenuTrigger><ContextMenuContent><ContextMenuLabel>Layout</ContextMenuLabel><ContextMenuRadioGroup value={view} onValueChange={setView}><ContextMenuRadioItem value="list">List view</ContextMenuRadioItem><ContextMenuRadioItem value="grid">Grid view</ContextMenuRadioItem></ContextMenuRadioGroup><ContextMenuSeparator /><ContextMenuLabel>Theme</ContextMenuLabel><ContextMenuRadioGroup defaultValue="system"><ContextMenuRadioItem value="light">Light</ContextMenuRadioItem><ContextMenuRadioItem value="dark">Dark</ContextMenuRadioItem><ContextMenuRadioItem value="system">System</ContextMenuRadioItem></ContextMenuRadioGroup></ContextMenuContent></ContextMenu><p className="mt-2 text-xs text-muted-foreground">Selected layout: {view}</p>
          </ComponentPreview>

          <ComponentPreview title="Record Actions">
            <ContextMenu><ContextMenuTrigger asChild><TriggerSurface>Right-click a customer record</TriggerSurface></ContextMenuTrigger><ContextMenuContent><ContextMenuItem><Pencil />Edit details</ContextMenuItem><ContextMenuItem><Share />Share record</ContextMenuItem><ContextMenuSeparator /><ContextMenuItem>Archive</ContextMenuItem><ContextMenuItem variant="destructive"><Trash />Delete record</ContextMenuItem></ContextMenuContent></ContextMenu>
          </ComponentPreview>

          <ComponentPreview title="Menu Placement Options">
            <div className="flex w-full max-w-lg flex-wrap gap-2">{(["top", "right", "bottom", "left", "inline-start", "inline-end"] as const).map((side) => { const resolvedSide = side === "inline-start" ? "left" : side === "inline-end" ? "right" : side; return <ContextMenu key={side}><ContextMenuTrigger asChild><Button type="button" variant={align === side ? "secondary" : "outline"} size="sm" onContextMenu={() => setAlign(side)}>{side}</Button></ContextMenuTrigger><ContextMenuContent side={resolvedSide}><ContextMenuItem>Open {side} menu</ContextMenuItem><ContextMenuItem>Copy link</ContextMenuItem></ContextMenuContent></ContextMenu>; })}</div><p className="mt-2 text-xs text-muted-foreground">Inline start/end resolve to left/right in this left-to-right page.</p>
          </ComponentPreview>

          <ComponentPreview title="Context Menu Inside a Dialog">
            <Dialog><DialogTrigger asChild><Button type="button" variant="outline">Open report details</Button></DialogTrigger><DialogContent><DialogHeader><DialogTitle>Quarterly report</DialogTitle></DialogHeader><ContextMenu><ContextMenuTrigger asChild><TriggerSurface>Right-click inside this dialog</TriggerSurface></ContextMenuTrigger><ContextMenuContent><ContextMenuItem><Copy />Copy report link</ContextMenuItem><ContextMenuSub><ContextMenuSubTrigger>Share with</ContextMenuSubTrigger><ContextMenuSubContent><ContextMenuItem>Project team</ContextMenuItem><ContextMenuItem>Workspace admins</ContextMenuItem></ContextMenuSubContent></ContextMenuSub><ContextMenuSeparator /><ContextMenuItem variant="destructive"><Trash />Delete report</ContextMenuItem></ContextMenuContent></ContextMenu></DialogContent></Dialog>
          </ComponentPreview>
    </CatalogGridItems>
  );
}
