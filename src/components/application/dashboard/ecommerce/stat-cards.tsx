import { IconChartBar, IconCoin, IconRefresh, IconShoppingCart } from "@tabler/icons-react";

import { StatCard } from "@/components/application/dashboard/state-card/stat-card";
import { ecommerceStats } from "@/data";

const statIcons = {
  "Gross Sales": IconCoin,
  Orders: IconShoppingCart,
  "Avg. Order Value": IconChartBar,
  Refunds: IconRefresh,
};

export function EcommerceStatCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {ecommerceStats.map((stat) => (
        <StatCard key={stat.label} stat={{ ...stat, icon: statIcons[stat.label as keyof typeof statIcons] }} />
      ))}
    </div>
  );
}
