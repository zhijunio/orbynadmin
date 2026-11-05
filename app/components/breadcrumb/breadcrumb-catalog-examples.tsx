import { CatalogGridItems } from "@/components/custom/docs/catalog-page-grid";
import { ComponentPreview } from "@/components/custom/docs/component-preview";

import Link from "next/link";
import type { ElementType } from "react";
import { IconChevronRight, IconComponents, IconHome, IconSlash, IconUserCircle } from "@tabler/icons-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar/avatar";
import { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb/breadcrumb";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown/dropdown-menu";
import { Button } from "@/components/ui/button/button";

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
  { label: "Profile", href: "/components/button", icon: "avatar" },
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
          <BreadcrumbLink asChild><Link href="/components/button">Components</Link></BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/components/button" className="inline-flex items-center gap-2">
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

function BreadcrumbWithDropdown() {
  return <Breadcrumb><BreadcrumbList>
    <BreadcrumbItem><BreadcrumbLink asChild><Link href="/components/button">Home</Link></BreadcrumbLink></BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem><DropdownMenu><DropdownMenuTrigger asChild><Button variant="ghost" size="icon" aria-label="Open breadcrumb menu"><BreadcrumbEllipsis /></Button></DropdownMenuTrigger><DropdownMenuContent align="start"><DropdownMenuItem>Documentation</DropdownMenuItem><DropdownMenuItem>Themes</DropdownMenuItem><DropdownMenuItem>GitHub</DropdownMenuItem></DropdownMenuContent></DropdownMenu></BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem><BreadcrumbLink asChild><Link href="/components/button">Components</Link></BreadcrumbLink></BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem><BreadcrumbPage>Breadcrumb</BreadcrumbPage></BreadcrumbItem>
  </BreadcrumbList></Breadcrumb>;
}


export function BreadcrumbCatalogExamples() {
  return (
    <CatalogGridItems>
      <ComponentPreview title="Dividers">
      <BreadcrumbArrow />

      <BreadcrumbSlash />

      <BreadcrumbListExample divider="arrow" examples={[[{label:"Home",href:"/components/button",icon:"home"},{label:"UI",href:"/components/button",icon:"kits"},{label:"Buttons",href:"/components/button",icon:"avatar"}]]}/>

      <BreadcrumbListExample divider="slash" examples={[[{label:"Organization",href:"/components/card",icon:"home"},{label:"Teams",href:"/components/card",icon:"kits"},{label:"Design",href:"/components/card",icon:"avatar"}]]}/>
      </ComponentPreview>
          <ComponentPreview title="Icon">
      <BreadcrumbSlashIcon />

      <Breadcrumb><BreadcrumbList><BreadcrumbItem><BreadcrumbLink asChild><Link aria-label="Home" href="/components/button" className="inline-flex size-8 items-center justify-center rounded-md border p-0"><IconHome className="size-4"/></Link></BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator/><BreadcrumbItem><BreadcrumbLink asChild><Link href="/components/button">Components</Link></BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator/><BreadcrumbItem><BreadcrumbPage>Buttons</BreadcrumbPage></BreadcrumbItem></BreadcrumbList></Breadcrumb>
      </ComponentPreview>
          <ComponentPreview title="Ellipsis">
      <BreadcrumbWithEllipsis />

      <BreadcrumbListExample divider="arrow" examples={[[{label:"Workspace",href:"/components/card",icon:"home"},{label:"…",ellipsis:true},{label:"Current item",href:"/components/card",icon:"avatar"}]]}/>
      </ComponentPreview>
          <ComponentPreview title="Menu">
      <BreadcrumbWithDropdown />
      </ComponentPreview>
          <ComponentPreview title="Content Variants">
      <BreadcrumbWithAvatars />

      <BreadcrumbListExample divider="arrow" examples={[[{label:"Workspace",href:"/components/card",icon:"home"},{label:"Projects",href:"/components/table",icon:"kits"},{label:"Overview",href:"/components/card",icon:"avatar"}]]}/>

      <Breadcrumb><BreadcrumbList><BreadcrumbItem><BreadcrumbLink asChild><Link href="/components/card">Workspace</Link></BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator/><BreadcrumbItem><BreadcrumbLink asChild><Link href="/components/table">Members</Link></BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator/><BreadcrumbItem><BreadcrumbPage className="inline-flex items-center gap-2">Invitations<span className="rounded-full bg-muted px-2 py-0.5 text-[10px]">4</span></BreadcrumbPage></BreadcrumbItem></BreadcrumbList></Breadcrumb>

      <BreadcrumbListExample divider="arrow" examples={[[{label:"Projects",href:"/components/card",icon:"home"},{label:"Website refresh",href:"/components/card",icon:"kits"},{label:"Design brief",href:"/components/card",icon:"avatar"}]]}/>
      </ComponentPreview>
          <ComponentPreview title="Frame">
      <div className="w-full rounded-xl border bg-card p-4"><BreadcrumbListExample divider="arrow" examples={[[{label:"Workspace",href:"/components/card",icon:"home"},{label:"Billing",href:"/components/card",icon:"kits"},{label:"Invoices",href:"/components/card",icon:"avatar"}]]}/><p className="mt-4 border-t pt-4 text-sm font-medium">Invoice overview</p></div>

      <div className="inline-flex rounded-full border bg-muted/30 p-2"><BreadcrumbListExample divider="slash" examples={[[{label:"Library",href:"/components/card",icon:"home"},{label:"Components",href:"/components/button",icon:"kits"},{label:"Buttons",href:"/components/button",icon:"avatar"}]]}/></div>

      <Breadcrumb><BreadcrumbList><BreadcrumbItem><BreadcrumbLink asChild><Link href="/components/button" className="rounded-md border bg-background px-2 py-1">Components</Link></BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator/><BreadcrumbItem><BreadcrumbPage className="rounded-md bg-primary px-2 py-1 text-primary-foreground">Buttons</BreadcrumbPage></BreadcrumbItem></BreadcrumbList></Breadcrumb>
      </ComponentPreview>
    </CatalogGridItems>
  );
}
