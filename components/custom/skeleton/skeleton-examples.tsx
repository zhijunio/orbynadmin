import { Skeleton } from "@/components/ui/skeleton/skeleton";
import { Separator } from "@/components/ui/divider/separator";

function TextLines() {
  return <div className="min-w-0 flex-1 space-y-2"><Skeleton className="h-4 w-3/4" /><Skeleton className="h-3 w-full" /><Skeleton className="h-3 w-1/2" /></div>;
}
function CardSkeleton() {
  return <div className="min-w-0 space-y-4 rounded-lg border p-4"><Skeleton className="aspect-video w-full" /><TextLines /><div className="flex justify-between gap-3"><Skeleton className="h-8 w-20" /><Skeleton className="size-8" /></div></div>;
}
export function SkeletonExample({ example, label }: { example: number; label: string }) {
  let content;
  if(example===1) content=<div className="flex items-center gap-4"><Skeleton className="size-12 rounded-full" /><TextLines /></div>;
  else if(example===2) content=<CardSkeleton />;
  else if(example===3) content=<div className="space-y-5"><Skeleton className="h-6 w-1/2" /><TextLines /><TextLines /></div>;
  else if(example===4) content=<div className="space-y-5">{[0,1,2].map(index=><div key={index} className="space-y-2"><Skeleton className="h-3 w-20" /><Skeleton className={index===2 ? "h-24 w-full" : "h-9 w-full"} /></div>)}<Skeleton className="h-9 w-24" /></div>;
  else if(example===5) content=<div className="overflow-hidden rounded-lg border"><div className="flex gap-4 border-b bg-muted/30 p-3">{[0,1,2].map(index=><Skeleton key={index} className="h-3 min-w-0 flex-1" />)}</div>{[0,1,2,3].map(index=><div key={index} className="flex items-center gap-4 border-b p-3 last:border-b-0"><Skeleton className="size-7 rounded-full" /><Skeleton className="h-3 min-w-0 flex-1" /><Skeleton className="h-3 w-1/4" /><Skeleton className="h-5 w-12" /></div>)}</div>;
  else if(example===6) content=<div className="grid grid-cols-3 gap-3">{[0,1,2].map(index=><div key={index} className="min-w-0 space-y-3 rounded-lg border p-3"><Skeleton className="h-3 w-3/4" /><Skeleton className="h-7 w-full" /><Skeleton className="h-3 w-2/3" /></div>)}</div>;
  else if(example===7) content=<div><div className="mb-4 flex justify-between"><Skeleton className="h-5 w-28" /><Skeleton className="h-8 w-20" /></div><Separator />{[0,1,2].map(index=><div key={index} className="flex items-center gap-3 border-b py-3 last:border-0"><Skeleton className="size-9 rounded-full" /><TextLines /><Skeleton className="h-7 w-12" /></div>)}</div>;
  else if(example===8) content=<div className="grid gap-4 sm:grid-cols-2"><CardSkeleton /><CardSkeleton /></div>;
  else if(example===9) content=<div className="space-y-5"><div className="flex flex-col items-center gap-3 rounded-lg border p-5"><Skeleton className="size-20 rounded-full" /><Skeleton className="h-5 w-32" /><Skeleton className="h-3 w-40" /><div className="mt-2 flex gap-5">{[0,1,2].map(index=><div key={index} className="space-y-2"><Skeleton className="h-5 w-10" /><Skeleton className="h-3 w-12" /></div>)}</div></div><div className="space-y-4 rounded-lg border p-4"><Skeleton className="h-4 w-24" /><Separator />{[0,1,2].map(index=><div key={index} className="flex justify-between gap-4"><Skeleton className="h-3 w-1/3" /><Skeleton className="h-3 w-1/2" /></div>)}</div></div>;
  else content=<div className="space-y-5 rounded-lg border p-4">{[0,1,2].map(index=><div key={index} className={index===1 ? "flex justify-end" : "flex gap-3"}>{index!==1 && <Skeleton className="size-8 rounded-full" />}<div className="w-3/4 space-y-2"><Skeleton className="h-3 w-16" /><Skeleton className={index===1 ? "h-12 w-full rounded-lg rounded-tr-none" : "h-16 w-full rounded-lg rounded-tl-none"} /><Skeleton className="h-2 w-10" /></div></div>)}<div className="flex gap-2"><Skeleton className="h-9 flex-1" /><Skeleton className="size-9" /></div></div>;
  return <div role="status" aria-label={label} aria-busy="true" className="w-full max-w-lg"><div aria-hidden="true">{content}</div><span className="sr-only">{label}</span></div>;
}
