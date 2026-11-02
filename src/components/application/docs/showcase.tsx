import type { ReactNode } from "react";
import { PageHeader } from "@/components/application/app-shell/page-header";

export function Showcase({ title, children, columns = 2 }: { title: string; children: ReactNode; columns?: 1 | 2 }) {
  return <div className="min-w-0 space-y-5">
    <PageHeader title={title} />
    <div className={`grid min-w-0 gap-5 [&>*]:min-w-0 ${columns === 1 ? "grid-cols-1" : "xl:grid-cols-2"}`}>{children}</div>
  </div>;
}
