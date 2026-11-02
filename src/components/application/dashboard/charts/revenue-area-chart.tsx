"use client";

import type { RechartsConfig } from "@/components/application/charts/recharts-chart";
import { useMemo } from "react";
import { useTranslations } from "next-intl";

import { RechartsChart } from "@/components/application/charts/recharts-chart";
import { revenueByMonth } from "@/data";

export function RevenueAreaChart() {
  const t = useTranslations("Charts");
  const options = useMemo<RechartsConfig>(() => ({
    chart: { type: "area", toolbar: { show: false }, fontFamily: "inherit", background: "transparent" },
    colors: ["var(--chart-1)", "var(--chart-2)"],
    dataLabels: { enabled: false },
    stroke: { curve: "smooth", width: 2 },
    fill: { type: "gradient", gradient: { opacityFrom: 0.32, opacityTo: 0.02 } },
    grid: { borderColor: "var(--border)", strokeDashArray: 3 },
    xaxis: { categories: revenueByMonth.map(({ month }) => t(`months.${month.toLowerCase()}`)), axisBorder: { show: false }, axisTicks: { show: false }, labels: { style: { colors: "var(--muted-foreground)" } } },
    yaxis: { labels: { formatter: (value) => `$${Math.round(value / 1000)}k`, style: { colors: "var(--muted-foreground)" } } },
    legend: { show: false },
    tooltip: { y: { formatter: (value) => `$${Number(value ?? 0).toLocaleString()}` } },
  }), [t]);

  return (
    <RechartsChart
      options={options}
      series={[
        { name: t("revenue"), data: revenueByMonth.map(({ revenue }) => revenue) },
        { name: t("profit"), data: revenueByMonth.map(({ profit }) => profit) },
      ]}
      type="area"
      height={280}
    />
  );
}
