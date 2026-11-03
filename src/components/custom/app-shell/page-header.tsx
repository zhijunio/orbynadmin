"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/utils/cn";

type PageHeaderProps = {
  title: string;
  children?: React.ReactNode;
  className?: string;
  size?: "compact" | "default";
};

export function PageHeader({
  title,
  children,
  className,
  size = "default",
}: PageHeaderProps) {
  const titles = useTranslations("PageTitles");
  const localizedTitle = titles.has(title) ? titles(title) : title;

  return (
    <div
      className={cn(
        "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
        className
      )}
    >
      <h1 className={cn(size === "compact" ? "text-xl" : "text-2xl", "font-semibold tracking-tight")}>{localizedTitle}</h1>
      {children && (
        <div className="flex items-center gap-2 [&_[data-slot=button]]:h-9">
          {children}
        </div>
      )}
    </div>
  );
}

export function CompactPageHeader(props: Omit<PageHeaderProps, "size">) {
  return <PageHeader {...props} size="compact" />;
}
