"use client";

import { Fragment } from "react";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { isLocale } from "@/i18n/routing";

import { AppHeaderActions } from "@/components/application/app-shell/app-header-actions";
import { CommandPalette } from "@/components/application/app-shell/command-palette";
import { SidebarTrigger } from "@/components/base/sidebar/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/base/breadcrumb/breadcrumb";

const CRUMB_LABELS: Record<string, string> = {
  kanban: "Board",
  hr: "HR",
  crm: "CRM",
  api: "API",
  otp: "OTP",
  faq: "FAQ",
  "loading-state": "Loading States",
  layouts: "Layouts",
  one: "Layout One",
  two: "Layout Two",
  three: "Layout Three",
  four: "Layout Four",
  five: "Layout Five",
  six: "Layout Six",
  saas: "SaaS",
  ai: "AI",
  stocks: "Stocks",
  "real-estate": "Real Estate",
  ecommerce: "E-Commerce",
  elements: "Components",
};

function useBreadcrumb() {
  const pathname = usePathname();
  const navTranslations = useTranslations("Navigation");
  const segments = pathname.split("/").filter(Boolean);
  if (isLocale(segments[0])) segments.shift();
  return segments.map((segment) => {
    const label = CRUMB_LABELS[segment]
      ?? segment.replace(/-/g, " ").replace(/\b\w/g, (character) => character.toUpperCase());
    return navTranslations.has(label) ? navTranslations(label) : label;
  });
}

export function AppHeader() {
  const crumbs = useBreadcrumb();

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-2 border-b bg-background/80 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <SidebarTrigger className="-ml-1" />
      <div className="mr-1 h-5 w-px shrink-0 self-center bg-border" />
      <Breadcrumb className="hidden sm:block">
        <BreadcrumbList>
          {crumbs.map((crumb, index) => (
            <Fragment key={`${index}-${crumb}`}>
              <BreadcrumbItem>
                <BreadcrumbPage className={index < crumbs.length - 1 ? "text-muted-foreground" : ""}>
                  {crumb}
                </BreadcrumbPage>
              </BreadcrumbItem>
              {index < crumbs.length - 1 && <BreadcrumbSeparator />}
            </Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
      <div className="ml-auto flex items-center gap-1.5">
        <CommandPalette />
        <AppHeaderActions />
      </div>
    </header>
  );
}
