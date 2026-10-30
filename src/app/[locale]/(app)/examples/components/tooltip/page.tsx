import { ComponentPreview } from "@/components/feature/example/ComponentPreview";
import { Showcase } from "@/components/feature/example/Showcase";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

function TooltipsPositions() {
  return (
    <TooltipProvider delayDuration={0}>
      <div className="flex w-full flex-wrap gap-10 py-2">
        {tooltipPositionsData.map(({ id, position, title }) => (
          <Tooltip key={id}>
            <TooltipTrigger className="text-sm font-normal text-foreground transition-colors hover:text-foreground">
              {title}
            </TooltipTrigger>
            <TooltipContent
              side={position}
              sideOffset={10}
              arrowClassName="!bg-white !fill-white dark:!bg-zinc-800 dark:!fill-zinc-800"
              className="rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-sm font-medium text-zinc-600 shadow-md dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 [&>svg]:!bg-white [&>svg]:!fill-white dark:[&>svg]:!bg-zinc-800 dark:[&>svg]:!fill-zinc-800"
            >
              This is a tooltip
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}

const tooltipPositionsData = [
  { id: 1, position: "top", title: "Top Tooltip" },
  { id: 2, position: "left", title: "Left Tooltip" },
  { id: 3, position: "bottom", title: "Bottom Tooltip" },
  { id: 4, position: "right", title: "Right Tooltip" },
] as const;

export const metadata = { title: "Tooltips" };

export default function TooltipsPage() {
  return <Showcase title="Tooltips">
    <ComponentPreview title="Tooltip Positions" className="xl:col-span-2"><TooltipsPositions /></ComponentPreview>
    <ComponentPreview title="Icon and Action Tooltips">
      <TooltipProvider delayDuration={0}>
        <div className="flex flex-wrap items-center gap-5">
          {[
            { label: "Edit", description: "Edit this item" },
            { label: "Share", description: "Share with your team" },
            { label: "More", description: "More options" },
          ].map((item) => <Tooltip key={item.label}><TooltipTrigger className="flex size-10 items-center justify-center rounded-lg border text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">{item.label.slice(0, 1)}</TooltipTrigger><TooltipContent>{item.description}</TooltipContent></Tooltip>)}
          <Tooltip><TooltipTrigger className="rounded-md bg-muted px-3 py-2 text-sm text-muted-foreground">Need help?</TooltipTrigger><TooltipContent side="right" className="max-w-56">Contact your workspace admin if you need access to this feature.</TooltipContent></Tooltip>
        </div>
      </TooltipProvider>
    </ComponentPreview>
    <ComponentPreview title="Tooltip with Shortcut">
      <TooltipProvider delayDuration={0}>
        <div className="flex flex-wrap items-center gap-4">
          <Tooltip><TooltipTrigger className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-muted">Save changes</TooltipTrigger><TooltipContent className="flex items-center gap-3"><span>Save</span><kbd className="rounded border border-white/20 px-1.5 py-0.5 text-[10px]">⌘ S</kbd></TooltipContent></Tooltip>
          <Tooltip><TooltipTrigger className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-muted">Open search</TooltipTrigger><TooltipContent className="flex items-center gap-3"><span>Search</span><kbd className="rounded border border-white/20 px-1.5 py-0.5 text-[10px]">⌘ K</kbd></TooltipContent></Tooltip>
        </div>
      </TooltipProvider>
    </ComponentPreview>
  </Showcase>;
}
