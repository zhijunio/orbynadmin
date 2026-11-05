import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge/badge";
import { Frame, FramePanel } from "@/components/ui/frame/frame";
import { Switch } from "@/components/ui/switch/switch";

export function SettingRow({ title, detail, control, badge }: { title: string; detail?: ReactNode; control: ReactNode; badge?: string }) {
  return <div className="flex flex-wrap items-center justify-between gap-4 border-b py-3 last:border-b-0"><div className="min-w-48 flex-1"><div className="flex flex-wrap items-center gap-2 text-sm font-medium">{title}{badge && <Badge variant={badge === "Required" ? "warning-light" : badge === "Pro" ? "primary-light" : "secondary"}>{badge}</Badge>}</div>{detail && <p className="mt-1 text-sm text-muted-foreground">{detail}</p>}</div>{control}</div>;
}

export function SettingsFrame({ title, children, className = "" }: { title: string; children: ReactNode; className?: string }) {
  return <Frame className={className}><FramePanel><h3 className="mb-3 text-sm font-semibold">{title}</h3>{children}</FramePanel></Frame>;
}

export function ToggleRow({ title, detail, initial = false, disabled = false }: { title: string; detail?: string; initial?: boolean; disabled?: boolean }) {
  return <SettingRow title={title} detail={detail} control={<Switch defaultChecked={initial} disabled={disabled} aria-label={title} />} />;
}

export function StatusBadge({ status }: { status: string }) {
  const variant = status === "Connected" || status === "Delivering" || status === "Active" ? "success-light" : status === "Retrying" || status === "Needs review" ? "warning-light" : status === "Preview" ? "secondary" : "outline";
  return <Badge variant={variant}>{status}</Badge>;
}
