import { Showcase } from "@/components/feature/example/Showcase";

import { ComponentPreview } from "@/components/feature/example/ComponentPreview";
import { Skeleton } from "@/components/ui/skeleton";

function SkeletonExamples() {
  return <>
    <ComponentPreview title="Profile Loading">
      <div className="flex w-full items-center gap-4">
        <Skeleton className="size-12 rounded-full" />
        <div className="flex-1 space-y-2"><Skeleton className="h-4 w-36" /><Skeleton className="h-3 w-52 max-w-full" /></div>
      </div>
    </ComponentPreview>
    <ComponentPreview title="Metric Cards">
      <div className="grid w-full grid-cols-2 gap-4">
        {[1, 2].map((item) => <div key={item} className="space-y-3 rounded-lg border p-4"><Skeleton className="h-3 w-24" /><Skeleton className="h-7 w-32" /><Skeleton className="h-2 w-full" /></div>)}
      </div>
    </ComponentPreview>
    <ComponentPreview title="Table Rows" className="xl:col-span-2">
      <div className="w-full divide-y rounded-lg border px-4">
        {[1, 2, 3, 4].map((item) => <div key={item} className="flex items-center gap-4 py-3"><Skeleton className="size-9 rounded-full" /><div className="flex-1 space-y-2"><Skeleton className="h-3.5 w-40 max-w-full" /><Skeleton className="h-3 w-64 max-w-full" /></div><Skeleton className="h-8 w-20" /></div>)}
      </div>
    </ComponentPreview>
  </>;
}

export const metadata = { title: "Skeletons" };

export default function SkeletonsPage() {
  return <Showcase title="Skeletons"><SkeletonExamples /></Showcase>;
}
