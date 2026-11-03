"use client";

import { useTranslations } from "next-intl";
import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { PageHeader } from "@/components/custom/docs/page-header";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { FilterExample } from "@/components/custom/filters/filter-examples";

export default function FiltersPage() {
  const t = useTranslations("ComponentMigration.Filters");
  return <AppShell><div className="min-w-0 space-y-5"><PageHeader title="Filters" /><div className="grid min-w-0 gap-5">{Array.from({ length: 12 }, (_, index) => <ComponentPreview key={index} title={t(`examples.${index + 1}`)} previewClassName="block min-w-0"><FilterExample example={index + 1} /></ComponentPreview>)}</div></div></AppShell>;
}
