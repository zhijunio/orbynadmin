"use client";

import Link from "next/link";
import { IconArrowUpRight } from "@tabler/icons-react";
import { useTranslations } from "next-intl";

import ConsoleLayout from "@/components/custom/app-shell/console-layout";
import { PageHeader } from "@/components/custom/app-shell/page-header";
import { Card, CardContent, CardTitle } from "@/components/ui/card/card";

export type CatalogIndexItem = { title: string; href: string };

export function CatalogIndex({
  title,
  items,
}: {
  title: string;
  items: CatalogIndexItem[];
}) {
  const t = useTranslations("Navigation");
  const translate = (value: string) => (t.has(value) ? t(value) : value);

  return (
    <ConsoleLayout>
      <div className="mx-auto w-full max-w-[1440px] space-y-6">
        <PageHeader title={title} />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <Link key={item.href} href={item.href} className="group rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
              <Card className="h-full transition-colors group-hover:bg-muted/50">
                <CardContent className="flex min-h-20 items-center justify-between gap-4">
                  <CardTitle>{translate(item.title)}</CardTitle>
                  <IconArrowUpRight aria-hidden="true" className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </ConsoleLayout>
  );
}
