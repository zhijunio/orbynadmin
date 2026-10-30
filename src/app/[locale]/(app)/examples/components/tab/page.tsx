"use client";

import { Showcase } from "@/components/feature/example/Showcase";

import type { ReactNode } from "react";
import { ChartPie as IconChartPie, Bell as IconBell, FileText as IconFileText, Home as IconHome, History as IconHistory, MessageCircle as IconMessageCircle, ShieldLock as IconShieldLock, Settings as IconSettings, CircleUser as IconUserCircle } from "lucide-react";
import { ComponentPreview } from "@/components/feature/example/ComponentPreview";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const regularTabs = [
  { value: "overview", label: "Overview", title: "Overview", description: "Get a high-level view of your dashboard metrics and key performance indicators." },
  { value: "analytics", label: "Analytics", title: "Analytics", description: "Track revenue, conversion, and engagement trends across your workspace." },
  { value: "reports", label: "Reports", title: "Reports", description: "Review saved reports and share the latest results with your team." },
  { value: "settings", label: "Settings", title: "Settings", description: "Choose which metrics and updates appear on your dashboard." },
] as const;

const minimalTabs = [
  { value: "home", label: "Home", description: "Welcome to your home dashboard. Here you can see recent activities." },
  { value: "profile", label: "Profile", description: "Review your profile information and the details shared with your workspace." },
  { value: "messages", label: "Messages", description: "Catch up on recent conversations and messages from your team." },
] as const;

const iconTabs = [
  { value: "home", label: "Home", icon: IconHome, description: "Access your main dashboard and summary." },
  { value: "analytics", label: "Analytics", icon: IconChartPie, description: "Review performance trends and key business metrics." },
  { value: "reports", label: "Reports", icon: IconFileText, description: "Open saved reports and team summaries." },
  { value: "settings", label: "Settings", icon: IconSettings, description: "Manage dashboard preferences and display options." },
] as const;

const iconMinimalTabs = [
  { value: "home", label: "Home", icon: IconHome, description: "Welcome to your home dashboard. Here you can see recent activities." },
  { value: "profile", label: "Profile", icon: IconUserCircle, description: "Review your profile information and workspace details." },
  { value: "messages", label: "Messages", icon: IconMessageCircle, description: "Catch up on recent conversations from your team." },
] as const;

const badgeSegmentedTabs = [
  { value: "home", label: "Home", icon: IconHome, badge: "3", description: "Access your main dashboard and summary." },
  { value: "analytics", label: "Analytics", icon: IconChartPie, description: "Review performance trends and key business metrics." },
  { value: "reports", label: "Reports", icon: IconFileText, badge: "1", description: "Open saved reports and team summaries." },
  { value: "settings", label: "Settings", icon: IconSettings, description: "Manage dashboard preferences and display options." },
] as const;

const badgeMinimalTabs = [
  { value: "home", label: "Home", icon: IconHome, description: "Welcome to your home dashboard. Here you can see recent activities." },
  { value: "profile", label: "Profile", icon: IconUserCircle, badge: "5", description: "Review your profile information and workspace details." },
  { value: "messages", label: "Messages", icon: IconMessageCircle, badge: "99+", description: "Catch up on recent conversations from your team." },
] as const;

const companyTabs = [
  { value: "home", label: "Home" },
  { value: "about", label: "About Us" },
  { value: "team", label: "Our Team" },
  { value: "company", label: "Company Details" },
] as const;

const companyContent = {
  home: "Review announcements, recent changes, and upcoming milestones from across your workspace. This overview keeps the most useful company updates together so your team can quickly understand what has changed and what needs attention.",
  about: "Learn about the organization’s background, mission, and values. This section provides shared context for the work and priorities that guide team decisions, product direction, and the way the company serves its customers.",
  team: "Meet colleagues across the organization and learn about their roles. Find areas of ownership, discover the right subject matter experts, and understand how different teams work together to deliver shared goals.",
  company: "Review official company information, contact details, and office locations. Keep shared records current so teams can reference consistent details when working with customers, vendors, and other business partners.",
};

const accountTabs = [
  { value: "profile", label: "Profile" },
  { value: "password", label: "Password" },
  { value: "team", label: "Team" },
  { value: "notifications", label: "Notification" },
  { value: "integrations", label: "Integrations" },
  { value: "licenses", label: "Licenses" },
] as const;

const accountContent = {
  profile: "Manage the personal details associated with your account, including your name, contact information, and profile image. These details help teammates identify you throughout the workspace.",
  password: "Change your password and review the security options that protect your account. Use a unique password and keep your recovery information up to date to maintain reliable access.",
  team: "Review your team membership, invitations, and assigned roles. Workspace administrators can use this area to keep access aligned with each person’s responsibilities.",
  notifications: "Choose which workspace updates you receive and how they are delivered. Adjust these preferences to stay informed about important changes without receiving unnecessary messages.",
  integrations: "Connect the tools your team relies on and manage how information moves between services. Review connected accounts and remove integrations that are no longer needed.",
  licenses: "Review the licenses assigned to your account and workspace. Administrators can check usage and make sure available seats are assigned to the right people.",
};

const verticalTabs = [
  { value: "account", label: "Account", icon: IconUserCircle, description: "Manage your name, email address, and other personal details for this workspace." },
  { value: "security", label: "Security", icon: IconShieldLock, description: "Review your password and security options to keep your account protected." },
  { value: "notifications", label: "Notifications", icon: IconBell, description: "Choose which updates you receive about workspace activity and changes." },
  { value: "activity", label: "Activity Log", icon: IconHistory, description: "Review recent sign-ins and important actions taken on your account." },
] as const;

type ContentItem = { value: string; title?: string; description: string };
type TabItem = { value: string; label: string; icon?: typeof IconHome; badge?: string; description?: string };

function ContentCopy({ title, description }: { title?: string; description: string }) {
  return <div className="space-y-2">{title && <h3 className="text-sm font-semibold text-foreground">{title}</h3>}<p className="text-sm leading-5 text-muted-foreground">{description}</p></div>;
}

function TabDemo({
  tabs,
  variant = "default",
  contentClassName = "",
  showTabTitle = false,
}: {
  tabs: readonly (TabItem & ContentItem)[];
  variant?: "default" | "line";
  contentClassName?: string;
  showTabTitle?: boolean;
}) {
  return (
    <Tabs defaultValue={tabs[0].value} className="w-full">
      <TabsList variant={variant} className={variant === "line"
        ? "mx-6 mt-4 h-12 w-[calc(100%-3rem)] justify-start gap-4 border-b"
        : "mx-4 mt-4 h-11 w-[calc(100%-2rem)]"}>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <TabsTrigger key={tab.value} value={tab.value} className={variant === "line" ? "flex-none gap-2 px-3" : "h-9 flex-1 gap-2 px-3"}>
              {Icon && <Icon className="size-4" />}
              {tab.label}
              {tab.badge && <Badge variant="secondary" className="h-5 min-w-5 rounded-full bg-primary/10 px-1.5 text-[10px] leading-none text-primary">{tab.badge}</Badge>}
            </TabsTrigger>
          );
        })}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value} className={`${variant === "default" ? "border-t" : ""} px-6 py-5 ${contentClassName}`}>
          <ContentCopy title={showTabTitle ? tab.label : tab.title} description={tab.description ?? ""} />
        </TabsContent>
      ))}
    </Tabs>
  );
}

function TabPanel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`w-full overflow-hidden rounded-xl border border-border bg-card ${className}`}>{children}</div>;
}

function ProjectTabSupplement() {
  return (
    <ComponentPreview title="Workspace Tabs" className="xl:col-span-2">
      <div className="grid w-full gap-5 lg:grid-cols-2">
        <TabPanel><TabDemo tabs={companyTabs.map((tab) => ({ ...tab, title: tab.label, description: companyContent[tab.value] }))} variant="line" showTabTitle /></TabPanel>
        <TabPanel><TabDemo tabs={accountTabs.map((tab) => ({ ...tab, title: tab.label, description: accountContent[tab.value] }))} variant="line" showTabTitle /></TabPanel>
      </div>
    </ComponentPreview>
  );
}

function LeftSideTabsExample() {
  return (
    <ComponentPreview title="Tabs on the Left" className="xl:col-span-2">
      <Tabs defaultValue="account" orientation="vertical" className="w-full flex-row gap-8">
        <TabsList variant="line" className="h-auto w-48 shrink-0 flex-col items-stretch justify-start gap-2 rounded-none border-r border-border p-0 pr-0">
          {verticalTabs.map(({ value, label, icon: Icon }) => (
            <TabsTrigger key={value} value={value} className="h-11 flex-none justify-start gap-3 rounded-md px-3.5 text-left after:left-auto after:right-0 after:top-0 after:bottom-0 after:h-auto after:w-0.5">
              <Icon className="size-4" />{label}
            </TabsTrigger>
          ))}
        </TabsList>
        {verticalTabs.map(({ value, label, description }) => (
          <TabsContent key={value} value={value} className="min-w-0 px-1 py-2">
            <ContentCopy title={label} description={description} />
          </TabsContent>
        ))}
      </Tabs>
    </ComponentPreview>
  );
}

function TabsExamples() {
  return (
    <>
      <ComponentPreview title="Regular Tab">
        <TabPanel><TabDemo tabs={regularTabs} showTabTitle /></TabPanel>
      </ComponentPreview>
      <ComponentPreview title="Minimal Tab">
        <TabPanel><TabDemo tabs={minimalTabs} variant="line" /></TabPanel>
      </ComponentPreview>
      <ComponentPreview title="Tabs with Icon" className="xl:col-span-2">
        <div className="flex w-full flex-wrap items-start gap-5">
          <TabPanel className="max-w-[36rem]"><TabDemo tabs={iconTabs} /></TabPanel>
          <TabPanel className="max-w-[32rem]"><TabDemo tabs={iconMinimalTabs} variant="line" /></TabPanel>
        </div>
      </ComponentPreview>
      <ComponentPreview title="Tabs with Badge" className="xl:col-span-2">
        <div className="flex w-full flex-wrap items-start gap-5">
          <TabPanel className="max-w-[36rem]"><TabDemo tabs={badgeSegmentedTabs} /></TabPanel>
          <TabPanel className="max-w-[32rem]"><TabDemo tabs={badgeMinimalTabs} variant="line" /></TabPanel>
        </div>
      </ComponentPreview>
      <LeftSideTabsExample />
      <ProjectTabSupplement />
    </>
  );
}

export default function TabsPage() {
  return (
    <Showcase title="Tabs">
      <TabsExamples />
    </Showcase>
  );
}
