"use client";

import { useTranslations } from "next-intl";
import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { PageHeader } from "@/components/custom/docs/page-header";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { TraceExample } from "@/components/custom/trace/trace-examples";

export default function TracePage() {
  const t = useTranslations("ComponentMigration.Trace");
  return <AppShell><div className="min-w-0 space-y-5"><PageHeader title="Trace" /><div className="grid min-w-0 gap-5 xl:grid-cols-2">{Array.from({ length: 22 }, (_, index) => <ComponentPreview key={index} title={t(`examples.${index + 1}`)} previewClassName="block min-w-0"><TraceExample example={index + 1} /></ComponentPreview>)}</div></div></AppShell>;
}
