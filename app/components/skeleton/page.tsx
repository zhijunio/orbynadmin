import ConsoleLayout from "@/components/custom/app-shell/console-layout";

export const metadata = { title: "Skeletons" };




import { PageHeader } from "@/components/custom/docs/page-header";

import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { Skeleton } from "@/components/ui/skeleton/skeleton";
import { SkeletonLoadingExample } from "@/app/components/skeleton/skeleton-loading-example";

function SkeletonExamples() {
  return <>
    <ComponentPreview title="Loading Into Content" className="xl:col-span-2">
      <SkeletonLoadingExample />
    </ComponentPreview>
    <ComponentPreview title="Settings Form Loading">
      <div className="grid w-full max-w-lg gap-5">
        <div className="grid gap-2"><Skeleton className="h-3 w-28" /><Skeleton className="h-10 w-full rounded-md" /></div>
        <div className="grid gap-2"><Skeleton className="h-3 w-20" /><Skeleton className="h-24 w-full rounded-md" /></div>
        <Skeleton className="h-9 w-28 rounded-md" />
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



export default function SkeletonsPage() {
  return <ConsoleLayout>{<div className="min-w-0 space-y-5"><PageHeader title="Skeletons" /><div className="grid min-w-0 gap-5 [&>*]:min-w-0 xl:grid-cols-2"><SkeletonExamples /></div></div>}</ConsoleLayout>;
}
