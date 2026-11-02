import ConsoleLayout from "@/components/application/app-shell/console-layout";
import { ComponentPreview } from "@/components/application/docs/component-preview";
import { Showcase } from "@/components/application/docs/showcase";

import Link from "next/link";
import type { ElementType } from "react";
import { IconChartBar, IconChevronRight, IconHome, IconShieldLock, IconSlash, IconUserCircle } from "@tabler/icons-react";
import { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/base/breadcrumb/breadcrumb";

function BreadcrumbArrow() {
  return <BreadcrumbListExample divider="arrow" />;
}

const icons: Record<BreadcrumbIconName, ElementType> = {
  dashboard: IconHome,
  analytics: IconChartBar,
  profile: IconUserCircle,
  security: IconShieldLock,
};

type Divider = "arrow" | "slash" | "slash-icon";
function BreadcrumbListExample({ divider }: { divider: Divider }) {
  const rows = divider === "slash-icon" ? breadcrumbIconExamples : breadcrumbExamples;
  return <div className="flex w-full flex-col gap-5">{rows.map((items, row) => <Breadcrumb key={row}><BreadcrumbList>{items.map((item, index) => {
    if ("ellipsis" in item) {
      return <span key={`${item.label}-${index}`} className="contents">{index > 0 && <BreadcrumbSeparator>{divider === "arrow" ? <IconChevronRight /> : divider === "slash-icon" ? <IconSlash /> : "/"}</BreadcrumbSeparator>}<BreadcrumbItem><BreadcrumbEllipsis /></BreadcrumbItem></span>;
    }

    const Icon = icons[item.icon];
    const crumb = <>{divider === "slash-icon" && <Icon aria-hidden="true" className="size-4 shrink-0" />}<span>{item.label}</span></>;
    return <span key={`${item.href}-${index}`} className="contents">
      {index > 0 && <BreadcrumbSeparator>{divider === "arrow" ? <IconChevronRight /> : divider === "slash-icon" ? <IconSlash /> : "/"}</BreadcrumbSeparator>}
      <BreadcrumbItem>
        {index === items.length - 1 ? <BreadcrumbPage className="inline-flex items-center gap-1.5">{crumb}</BreadcrumbPage> : <BreadcrumbLink asChild><Link href={item.href} className="inline-flex items-center gap-1.5">{crumb}</Link></BreadcrumbLink>}
      </BreadcrumbItem>
    </span>;
  })}</BreadcrumbList></Breadcrumb>)}</div>;
}

type BreadcrumbIconName = "dashboard" | "analytics" | "profile" | "security";

type BreadcrumbExampleItem =
  | { label: string; href: string; icon: BreadcrumbIconName }
  | { label: "…"; ellipsis: true };

const breadcrumbExamples: BreadcrumbExampleItem[][] = [
  [
    { label: "Dashboard", href: "/dashboard", icon: "dashboard" },
    { label: "Analytics", href: "/dashboard", icon: "analytics" },
  ],
  [
    { label: "Dashboard", href: "/dashboard", icon: "dashboard" },
    { label: "…", ellipsis: true },
    { label: "Profile", href: "/user/settings/profile", icon: "profile" },
    { label: "Security", href: "/user/settings/security", icon: "security" },
  ],
];

const breadcrumbIconExamples = breadcrumbExamples;

function BreadcrumbSlash() {
  return <BreadcrumbListExample divider="slash" />;
}

function BreadcrumbSlashIcon() {
  return <BreadcrumbListExample divider="slash-icon" />;
}

export const metadata = { title: "Breadcrumbs" };

export default function BreadcrumbsPage() {
  return <ConsoleLayout>{(
    <Showcase title="Breadcrumbs">
      <ComponentPreview title="Breadcrumbs With Arrow Divider"><BreadcrumbArrow /></ComponentPreview>
      <ComponentPreview title="Breadcrumbs With Slash Divider"><BreadcrumbSlash /></ComponentPreview>
      <ComponentPreview title="Breadcrumbs With Slash Icon Divider"><BreadcrumbSlashIcon /></ComponentPreview>
    </Showcase>
  )}</ConsoleLayout>;
}
