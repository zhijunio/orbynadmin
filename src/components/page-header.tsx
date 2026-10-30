"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

export function PageHeader({
  title,
  description,
  children,
  className,
}: {
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  const t = useTranslations("PageTitles");
  const localizedTitle = t.has(title) ? t(title) : title;
  const localizedDescription = description && t.has(description) ? t(description) : description;

  return (
    <div
      className={cn(
        "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
        className
      )}
    >
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">{localizedTitle}</h1>
        {localizedDescription && (
          <p className="text-sm text-muted-foreground">{localizedDescription}</p>
        )}
      </div>
      {children && (
        <div className="flex items-center gap-2 [&_[data-slot=button]]:h-9">
          {children}
        </div>
      )}
    </div>
  );
}
