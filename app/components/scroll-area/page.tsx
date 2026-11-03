import ConsoleLayout from "@/components/custom/app-shell/console-layout";

export const metadata = { title: "Scroll Areas" };




import { PageHeader } from "@/components/custom/docs/page-header";

import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { ScrollArea } from "@/components/ui/scroll-area/scroll-area";

function ScrollAreaExamples() {
  return <>
    <ComponentPreview title="Activity Feed">
      <ScrollArea className="h-64 w-full rounded-lg border">
        <div className="divide-y px-4">
          {activity.map(([name, action, time]) => <div key={`${name}-${action}`} className="flex items-center justify-between gap-4 py-3"><p className="min-w-0 text-sm"><span className="font-medium">{name}</span> <span className="text-muted-foreground">{action}</span></p><time className="shrink-0 text-xs text-muted-foreground">{time}</time></div>)}
        </div>
      </ScrollArea>
    </ComponentPreview>
    <ComponentPreview title="Scrollable Directory">
      <ScrollArea className="h-64 w-full rounded-lg border">
        <div className="p-2">{[..."ABCDEFGH"].map((letter) => <section key={letter} className="mb-2"><h3 className="sticky top-0 bg-background px-2 py-1 text-xs font-semibold text-muted-foreground">{letter}</h3><div className="space-y-1">{[1, 2].map((index) => <div key={index} className="rounded-md px-2 py-2 text-sm hover:bg-muted">{letter}lex Morgan {index === 2 && "· Product Design"}</div>)}</div></section>)}</div>
      </ScrollArea>
    </ComponentPreview>
    <ComponentPreview title="Horizontal Project Strip" className="xl:col-span-2">
      <ScrollArea orientation="horizontal" className="h-36 w-full rounded-lg border">
        <div className="flex h-full w-max items-center gap-3 p-3">
          {["Website refresh", "Mobile app", "Design system", "Q4 planning", "Customer portal", "Analytics"].map((project, index) => (
            <div key={project} className="flex h-24 w-48 flex-col justify-between rounded-lg border bg-card p-3">
              <span className="text-sm font-medium">{project}</span>
              <span className="text-xs text-muted-foreground">{index + 2} open tasks</span>
            </div>
          ))}
        </div>
      </ScrollArea>
    </ComponentPreview>
  </>;
}

const activity = [
  ["Wei Zhang", "created the project", "10:42 AM"],
  ["Maya Chen", "updated the project brief", "10:15 AM"],
  ["Wei Zhang", "completed a task", "9:58 AM"],
  ["Sam Rivera", "shared a new file", "9:34 AM"],
  ["Taylor Brooks", "joined the workspace", "Yesterday"],
  ["Morgan Diaz", "commented on a task", "Yesterday"],
  ["Riley Kim", "changed the due date", "Yesterday"],
  ["Casey Park", "closed an issue", "Oct 14"],
];



export default function ScrollAreasPage() {
  return <ConsoleLayout>{<div className="min-w-0 space-y-5"><PageHeader title="Scroll Areas" /><div className="grid min-w-0 gap-5 [&>*]:min-w-0 xl:grid-cols-2"><ScrollAreaExamples /></div></div>}</ConsoleLayout>;
}
