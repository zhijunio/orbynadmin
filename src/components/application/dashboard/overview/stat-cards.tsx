"use client";

import { useTranslations } from "next-intl";
import { IconActivity, IconCoin, IconPackage, IconShoppingCart, IconTicket, IconUserCircle, IconUsersGroup } from "@tabler/icons-react";

import { StatCard, type StatCardData } from "@/components/application/dashboard/state-card/stat-card";
import { customers, orders, overviewStats, productList } from "@/data";
import { tickets } from "@/app/account/support/tickets-data";

const statTranslationKeys: Record<string, string> = {
  "Total Revenue": "totalRevenue",
  "New Customers": "newCustomers",
  "Active Accounts": "activeAccounts",
  "Churn Rate": "churnRate",
};

const statIcons = {
  "Total Revenue": IconCoin,
  "New Customers": IconUsersGroup,
  "Active Accounts": IconUserCircle,
  "Churn Rate": IconActivity,
};

export function useOverviewStatData() {
  const t = useTranslations("Dashboard.Overview");
  return overviewStats.map((stat) => ({
    ...stat,
    label: t(`stats.${statTranslationKeys[stat.label]}`),
    hint: t("vsLastMonth"),
    icon: statIcons[stat.label as keyof typeof statIcons],
  }));
}

export function DashboardStatCards() {
  const stats = useOverviewStatData();
  return <StatCardsGrid stats={stats} />;
}

export function DashboardSummaryCards() {
  const t = useTranslations("Dashboard.Overview");
  const stats: StatCardData[] = [
    { label: t("stats.customers"), value: customers.length.toLocaleString(), change: 5.3, trend: "up", hint: t("vsLastMonth"), icon: IconUsersGroup },
    { label: t("stats.unitSold"), value: productList.reduce((total, product) => total + product.sold, 0).toLocaleString(), change: 2.1, trend: "down", hint: t("vsLastMonth"), icon: IconPackage },
    { label: t("stats.orders"), value: orders.length.toLocaleString(), change: 0, trend: "up", hint: t("vsLastMonth"), icon: IconShoppingCart },
    { label: t("stats.supportTickets"), value: tickets.length.toLocaleString(), change: 12.8, trend: "up", hint: t("vsLastMonth"), icon: IconTicket },
  ];

  return <StatCardsGrid stats={stats} />;
}

function StatCardsGrid({ stats }: { stats: StatCardData[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4 xl:gap-4">
      {stats.map((stat) => <StatCard key={stat.label} stat={stat} />)}
    </div>
  );
}
