import type { ComponentType } from "react";
import {
  IconArrowUpRight,
  IconArrowsLeftRight, IconBolt,
  IconChartBar, IconChevronRight,
  IconCreditCard,
  IconFile, IconLink, IconMail, IconMapPin2, IconPackages,
  IconShoppingCart,
  IconShield,
} from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge/badge";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { Frame, FrameHeader, FramePanel } from "@/components/ui/frame/frame";
import { IconTile } from "@/components/ui/icon-tile/icon-tile";
import { cn } from "@/utils/cn";
import {
  InvestorProfile,
  ApplicantRecord,
  ReportUpdates,
  DeliveryTracking,
  MeetingAgendaCards,
  InstalledIntegration,
  CryptoPriceQuote,
  JobRecommendation,
  ContributorPortfolio,
  UptimeMonitoringPromo,
  InventoryCounters,
} from "@/components/blocks/application/card/card-interactive-examples";

type CardExample = { title: string; Component: ComponentType };

const cardExamples: CardExample[] = [
  { title: "Integration Connector", Component: IntegrationConnector },
  { title: "Installed Integration", Component: InstalledIntegration },
  { title: "Shortcut Launcher", Component: ShortcutLauncher },
  { title: "Source Link Cards", Component: SourceLinkCards },
  { title: "Report Updates", Component: ReportUpdates },
  { title: "Delivery Tracking", Component: DeliveryTracking },
  { title: "Meeting Agenda Cards", Component: MeetingAgendaCards },
  { title: "Crypto Price Quote", Component: CryptoPriceQuote },
  { title: "Inventory Counters", Component: InventoryCounters },
  { title: "Investor Profile", Component: InvestorProfile },
  { title: "Applicant Record", Component: ApplicantRecord },
  { title: "Job Recommendation", Component: JobRecommendation },
  { title: "Contributor Portfolio", Component: ContributorPortfolio },
  { title: "Uptime Monitoring Promo", Component: UptimeMonitoringPromo },
];

export function CardShowcase() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Cards</h1>
      <div className="grid min-w-0 gap-5 md:grid-cols-2 [&>*]:min-w-0">
        {cardExamples.map(({ title, Component }) => <ComponentPreview key={title} title={title} previewClassName="w-full"><Component /></ComponentPreview>)}
      </div>
    </div>
  );
}

function SourceLinkCards() {
  const sources = [
    { label: "Market Data", description: "Track trading volumes, liquidity shifts, and price movements for informed decisions.", link: "app.nextrose.dev/markets", href: "#market-data", icon: IconPackages },
    { label: "Revenue Reports", description: "Get instant insights into earnings and cash flow performance.", link: "app.nextrose.dev/reports/revenue", href: "#revenue-reports", icon: IconArrowUpRight },
    { label: "Shipments", description: "Stay on top of deliveries and track shipment statuses efficiently.", link: "app.nextrose.dev/operations/shipments", href: "#shipments", icon: IconMapPin2 },
  ];

  return (
    <div className="@container w-full">
      <div className="grid gap-3 @xl:grid-cols-2 @2xl:grid-cols-3">
        {sources.map(({ label, description, link, href, icon: Icon }) => (
          <Frame key={label} spacing="xs" className="w-full">
            <FrameHeader className="flex-row items-center gap-2.5">
              <IconTile variant="soft" size="sm"><Icon className="size-4" /></IconTile>
              <span className="text-sm font-medium">{label}</span>
            </FrameHeader>
            <FramePanel className="p-3">
              <p className="text-sm leading-5 text-muted-foreground">{description}</p>
              <a href={href} className="mt-3 flex min-w-0 items-center gap-1 truncate text-sm text-foreground underline underline-offset-4"><IconLink className="size-3 shrink-0" /><span className="truncate">{link}</span></a>
            </FramePanel>
          </Frame>
        ))}
      </div>
    </div>
  );
}

function IntegrationConnector() {
  const integrations = [
    {
      name: "Mail Delivery Flow",
      description: "Transactional email delivery tuned for speed, observability, and reliable event handling.",
      tier: "Premium",
      tierClass: "border-purple-200 bg-purple-50 text-purple-700",
      href: "#mail-delivery",
      left: IconShoppingCart,
      right: IconFile,
      logo: (
        <IconMail className="size-8" />
      ),
    },
    {
      name: "Payment Processing Flow",
      description: "Optimized payment processing for speed, reliability, and global reach.",
      tier: "Regular",
      tierClass: "border-amber-200 bg-amber-50 text-amber-800",
      href: "#payment-processing",
      left: IconBolt,
      right: IconShield,
      logo: <IconCreditCard className="size-8 text-blue-700" stroke={1.8} />,
    },
  ];

  return (
    <div className="@container w-full">
      <div className="grid gap-5 @xl:grid-cols-2">
        {integrations.map(({ name, description, tier, tierClass, href, left: LeftIcon, right: RightIcon, logo }) => (
          <article key={name} className="w-full overflow-hidden rounded-xl border bg-background p-1">
              <div className="relative isolate flex min-h-36 items-center rounded-lg border bg-muted/20 px-6">
              <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 opacity-30 [background-image:radial-gradient(color-mix(in_oklch,var(--foreground)_28%,transparent)_1px,transparent_1px)] [background-size:5px_5px]"
              />
              <div className="mx-auto flex w-full max-w-52 items-center">
                <IconTile variant="outline" size="default" className="bg-background"><LeftIcon className="size-4" /></IconTile>
                <span aria-hidden="true" className="mx-1 min-w-3 flex-1 border-t border-dashed border-muted-foreground/50" />
                <span className="grid size-14 shrink-0 place-items-center rounded-xl border bg-background shadow-xs">{logo}</span>
                <span aria-hidden="true" className="mx-1 min-w-3 flex-1 border-t border-dashed border-muted-foreground/50" />
                <IconTile variant="outline" size="default" className="bg-background"><RightIcon className="size-4" /></IconTile>
              </div>
              </div>
              <div className="p-2">
              <div className="flex items-center justify-between gap-2">
                <a href={href} target="_blank" rel="noreferrer" className="block w-fit font-medium hover:underline hover:underline-offset-4">{name}</a>
                <Badge variant="outline" className={cn("shrink-0", tierClass)}>{tier}</Badge>
              </div>
              <p className="mt-1 text-sm leading-5 text-muted-foreground">{description}</p>
              </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function ShortcutLauncher() {
  const items = [
    { title: "Recent Orders Overview", description: "Track and review all recent purchases, updates, and status changes in one place.", link: "View Orders", href: "#orders", icon: IconPackages, color: "bg-emerald-600" },
    { title: "Active Opportunities Pipeline", description: "Monitor ongoing deals, check potential revenue, and update opportunity stages.", link: "Open Pipeline", href: "#pipeline", icon: IconArrowUpRight, color: "bg-indigo-600" },
    { title: "Performance & Sales Reports", description: "Analyze weekly and monthly reports to gain deeper insights into performance trends.", link: "View Reports", href: "#reports", icon: IconChartBar, color: "bg-sky-600" },
    { title: "Integration Settings & Sync", description: "Manage connections with third-party tools and ensure data stays in sync.", link: "Manage Integrations", href: "#integrations", icon: IconArrowsLeftRight, color: "bg-orange-600" },
  ];

  return (
    <div className="@container w-full">
      <div className="grid gap-1 rounded-xl border bg-muted/20 p-1 @xl:grid-cols-2">
        {items.map(({ title, description, link, href, icon: Icon, color }) => (
            <article key={title} className="relative isolate overflow-hidden rounded-xl border bg-background p-4">
              <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 opacity-20 [background-image:radial-gradient(color-mix(in_oklch,var(--foreground)_25%,transparent)_1px,transparent_1px)] [background-size:5px_5px] [mask-image:linear-gradient(to_right,transparent,black)]"
              />
              <span className={`grid size-10 place-items-center rounded-lg text-white ${color}`}><Icon className="size-5" /></span>
              <h3 className="mt-6 font-medium">{title}</h3>
              <p className="mt-2 text-sm leading-5 text-muted-foreground">{description}</p>
              <a href={href} className="mt-4 flex items-center justify-between border-t pt-3 text-sm font-medium hover:text-primary">
                {link}<IconChevronRight className="size-3" />
              </a>
            </article>
        ))}
      </div>
    </div>
  );
}

