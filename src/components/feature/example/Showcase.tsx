import type { ReactNode } from "react";
import { PageHeader } from "@/components/page-header";

export function Showcase({ title, children }: { title: string; children: ReactNode }) {
  return <div className="min-w-0 space-y-5">
    <PageHeader title={title} />
    <div className="grid min-w-0 gap-5 xl:grid-cols-2 [&>*]:min-w-0">{children}</div>
  </div>;
}
