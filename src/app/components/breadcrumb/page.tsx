import ConsoleLayout from "@/components/custom/app-shell/console-layout";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { PageHeader } from "@/components/custom/app-shell/page-header";

import Link from "next/link";
import type { ElementType } from "react";
import { IconChevronRight, IconComponents, IconHome, IconSlash, IconUserCircle } from "@tabler/icons-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar/avatar";
import { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb/breadcrumb";

function BreadcrumbArrow() {
  return <BreadcrumbListExample divider="arrow" />;
}

const icons: Record<BreadcrumbIconName, ElementType> = {
  home: IconHome,
  kits: IconComponents,
  avatar: IconUserCircle,
};

type Divider = "arrow" | "slash" | "slash-icon";
function BreadcrumbListExample({ divider, examples }: { divider: Divider; examples?: BreadcrumbExampleItem[][] }) {
  const rows = examples ?? (divider === "slash-icon" ? breadcrumbIconExamples : breadcrumbExamples);
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

type BreadcrumbIconName = "home" | "kits" | "avatar";

type BreadcrumbExampleItem =
  | { label: string; href: string; icon: BreadcrumbIconName }
  | { label: "…"; ellipsis: true };

const breadcrumbExamples: BreadcrumbExampleItem[][] = [
  [
    { label: "Home", href: "/dashboard", icon: "home" },
    { label: "UI Kits", href: "/components/button", icon: "kits" },
  ],
  [
    { label: "Home", href: "/dashboard", icon: "home" },
    { label: "UI Kits", href: "/components/button", icon: "kits" },
    { label: "Avatar", href: "/components/avatar", icon: "avatar" },
  ],
];

const breadcrumbIconExamples = breadcrumbExamples;

const breadcrumbEllipsisExamples: BreadcrumbExampleItem[][] = [[
  { label: "Home", href: "/dashboard", icon: "home" },
  { label: "…", ellipsis: true },
  { label: "Avatar", href: "/components/avatar", icon: "avatar" },
  { label: "Profile", href: "/account/profile", icon: "avatar" },
]];

function BreadcrumbSlash() {
  return <BreadcrumbListExample divider="slash" />;
}

function BreadcrumbSlashIcon() {
  return <BreadcrumbListExample divider="slash-icon" />;
}

function BreadcrumbWithAvatars() {
  return (
    <Breadcrumb className="w-full">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild><Link href="/components">Components</Link></BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/components" className="inline-flex items-center gap-2">
              <Avatar size="xs" aria-hidden="true"><AvatarFallback>DT</AvatarFallback></Avatar>
              Design team
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="inline-flex items-center gap-2">
            <Avatar size="xs" aria-hidden="true"><AvatarFallback>MC</AvatarFallback></Avatar>
            Maya Chen
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

function BreadcrumbWithEllipsis() {
  return <BreadcrumbListExample divider="arrow" examples={breadcrumbEllipsisExamples} />;
}

export const metadata = { title: "Breadcrumbs" };

export default function BreadcrumbsPage() {
  return <ConsoleLayout>{(
    <div className="min-w-0 space-y-5"><PageHeader title="Breadcrumbs" /><div className="grid min-w-0 gap-5 [&>*]:min-w-0 xl:grid-cols-2">
      <ComponentPreview title="Default Breadcrumb"><BreadcrumbArrow /></ComponentPreview>
      <ComponentPreview title="Breadcrumb With Icon"><BreadcrumbSlashIcon /></ComponentPreview>
      <ComponentPreview title="Breadcrumb With Slash Divider"><BreadcrumbSlash /></ComponentPreview>
      <ComponentPreview title="Breadcrumb With Ellipsis"><BreadcrumbWithEllipsis /></ComponentPreview>
      <ComponentPreview title="Breadcrumb with Avatars"><BreadcrumbWithAvatars /></ComponentPreview>
    </div></div>
  )}</ConsoleLayout>;
}
