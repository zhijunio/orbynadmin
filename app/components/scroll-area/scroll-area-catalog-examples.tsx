import { CatalogGridItems } from "@/components/custom/docs/catalog-page-grid";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { ScrollArea } from "@/components/ui/scroll-area/scroll-area";



const rows = Array.from({length:18},(_,index)=>({id:index+1,name:["Maya Chen","Alex Rivera","Sam Patel"][index%3],action:["updated project brief","reviewed a pull request","shared a workspace file"][index%3],time:`${9+Math.floor(index/3)}:${String((index*7)%60).padStart(2,"0")}`}));
const projects=["Website refresh","Mobile app","Design system","Q4 planning","Customer portal","Analytics"];

export function ScrollAreaCatalogExamples() {
  return (
    <CatalogGridItems>
      <ComponentPreview title={"Basic"}><ScrollArea aria-label={"Activity feed"} className="h-64 w-full rounded-lg border"><ul className="divide-y px-4">{rows.map(row=><li key={row.id} className="flex items-center justify-between gap-4 py-3"><p className="min-w-0 text-sm"><span className="font-medium">{row.name}</span> <span className="text-muted-foreground">{` ${row.action}`}</span></p><time className="shrink-0 text-xs text-muted-foreground">{row.time}</time></li>)}</ul></ScrollArea></ComponentPreview>
          <ComponentPreview title={"Horizontal"}><ScrollArea orientation="horizontal" aria-label={"Project strip"} className="h-36 w-full rounded-lg border"><div className="flex h-full w-max items-center gap-3 p-3">{projects.map((project,index)=><div key={project} className="flex h-24 w-48 flex-col justify-between rounded-lg border bg-card p-3"><span className="text-sm font-medium">{project}</span><span className="text-xs text-muted-foreground">{index+2} {"open tasks"}</span></div>)}</div></ScrollArea></ComponentPreview>
          <ComponentPreview title={"Both Scrollbars"}><ScrollArea orientation="both" aria-label={"Scrollable grid"} className="h-56 w-full rounded-lg border"><div className="grid w-[760px] grid-cols-6 gap-2 p-3">{Array.from({length:48},(_,index)=><div key={index} className="rounded border p-3 text-sm">{`Cell ${index+1}`}</div>)}</div></ScrollArea></ComponentPreview>
          <ComponentPreview title={"Fade Edges"}><div className="relative w-full"><ScrollArea aria-label={"Directory"} className="h-56 w-full rounded-lg border"><div className="p-2">{[..."ABCDEFGH"].map(letter=><section key={letter} className="mb-2"><h3 className="sticky top-0 bg-background px-2 py-1 text-xs font-semibold text-muted-foreground">{letter}</h3>{["lex Morgan","very Chen"].map(name=><p key={name} className="rounded-md px-2 py-2 text-sm">{letter}{name}</p>)}</section>)}</div></ScrollArea><div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-background to-transparent" /><div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-background to-transparent" /></div></ComponentPreview>
          <ComponentPreview title={"Scrollbar Gutter"}><ScrollArea aria-label={"Directory"} className="h-56 w-full rounded-lg border"><ol className="divide-y px-3">{Array.from({length:20},(_,index)=><li key={index} className="py-2 text-sm">{index+1}. {rows[index % rows.length].name} · {rows[index % rows.length].action}</li>)}</ol></ScrollArea></ComponentPreview>
    </CatalogGridItems>
  );
}
