import type { ReactNode } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function TableCard({ title, description, action, children, flush = false }: { title?: string; description?: string; action?: ReactNode; children: ReactNode; flush?: boolean }) {
  return <Card className={flush ? "gap-0 overflow-hidden py-0" : "gap-0"}>
    {title && <CardHeader className="flex flex-row items-center justify-between gap-3 px-6 pt-5"><div className="min-w-0"><CardTitle className="text-sm font-medium">{title}</CardTitle>{description && <CardDescription className="mt-1">{description}</CardDescription>}</div>{action}</CardHeader>}
    <CardContent className={flush ? "overflow-x-auto p-0" : "overflow-x-auto px-0 pb-2 pt-4"}>{children}</CardContent>
  </Card>;
}
