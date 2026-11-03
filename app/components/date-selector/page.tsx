"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { IconCalendarEvent } from "@tabler/icons-react";
import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { PageHeader } from "@/components/custom/docs/page-header";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { DateSelector, formatDateSelectorValue, type DateSelectorLabels, type DateSelectorValue } from "@/components/ui/date-picker/date-selector";
import { Button } from "@/components/ui/buttons/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover/popover";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown/dropdown-menu";

function DateSelectorExample({ presentation }: { presentation: "inline" | "popover" | "dialog" | "dropdown" }) {
  const t = useTranslations("ComponentMigration.DateSelector");
  const c = useTranslations("ComponentMigration.Common");
  const locale = useLocale();
  const [value, setValue] = useState<DateSelectorValue>();
  const [draft, setDraft] = useState<DateSelectorValue>();
  const [open, setOpen] = useState(false);
  const labels = Object.fromEntries(["period", "filter", "from", "to", "choose", "quick", "hint", "empty", "today", "clear", "day", "month", "quarter", "half-year", "year", "is", "before", "after", "between"].map((key) => [key, t(key)])) as DateSelectorLabels;
  const selector = <DateSelector value={presentation === "inline" ? value : draft} onChange={presentation === "inline" ? setValue : setDraft} labels={labels} locale={locale} label={t("date")} inputHint={t("placeholder")} />;
  function changeOpen(next: boolean) { if (next) setDraft(value); setOpen(next); }
  const trigger = <Button variant="outline" className="max-w-full justify-start"><IconCalendarEvent />{value ? formatDateSelectorValue(value, locale, labels) : t("selectDate")}</Button>;
  const editor = <div className="w-full min-w-0 space-y-4 p-3">{selector}<div className="flex justify-end gap-2 border-t pt-3"><Button variant="outline" onClick={() => { setDraft(value); setOpen(false); }}>{c("cancel")}</Button><Button onClick={() => { setValue(draft); setOpen(false); }}>{t("apply")}</Button></div></div>;
  if (presentation === "inline") return selector;
  if (presentation === "popover") return <Popover open={open} onOpenChange={changeOpen}><PopoverTrigger asChild>{trigger}</PopoverTrigger><PopoverContent align="start" className="w-[min(28rem,calc(100vw-2rem))] p-0">{editor}</PopoverContent></Popover>;
  if (presentation === "dialog") return <Dialog open={open} onOpenChange={changeOpen}><DialogTrigger asChild>{trigger}</DialogTrigger><DialogContent className="max-w-lg"><DialogHeader><DialogTitle>{t("selectDate")}</DialogTitle><DialogDescription>{t("dialogHint")}</DialogDescription></DialogHeader>{editor}</DialogContent></Dialog>;
  return <DropdownMenu open={open} onOpenChange={changeOpen}><DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger><DropdownMenuContent align="start" className="w-[min(28rem,calc(100vw-2rem))] p-0">{editor}</DropdownMenuContent></DropdownMenu>;
}
export default function DateSelectorPage() {
  const t = useTranslations("ComponentMigration.DateSelector");
  return <AppShell><div className="min-w-0 space-y-5"><PageHeader title="Date Selector" /><div className="grid min-w-0 gap-5 xl:grid-cols-2">{(["inline", "popover", "dialog", "dropdown"] as const).map((presentation, index) => <ComponentPreview key={presentation} title={t(`examples.${index + 1}`)} previewClassName="min-w-0 min-h-28"><DateSelectorExample presentation={presentation} /></ComponentPreview>)}</div></div></AppShell>;
}
