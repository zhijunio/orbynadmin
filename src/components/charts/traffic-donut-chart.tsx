"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import type { ApexOptions } from "apexcharts";
import { ApexChart } from "@/components/charts/apex-chart";
import { trafficSources } from "@/data";

export function TrafficDonutChart() {
  const t = useTranslations("Charts");
  const total = trafficSources.reduce((sum, item) => sum + item.value, 0);
  const options = useMemo<ApexOptions>(() => ({
    chart: { type: "donut", fontFamily: "inherit", background: "transparent", toolbar: { show: false } },
    colors: ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"],
    labels: trafficSources.map(({ source }) => t(`traffic.${source.toLowerCase()}`)),
    dataLabels: { enabled: false },
    stroke: { width: 3, colors: ["var(--card)"] },
    legend: { show: false },
    plotOptions: { pie: { donut: { size: "68%", labels: { show: true, name: { show: false }, value: { show: false }, total: { show: true, label: t("visitors"), formatter: () => `${(total / 1000).toFixed(1)}k`, color: "var(--foreground)" } } } } },
    tooltip: { y: { formatter: (value) => Number(value ?? 0).toLocaleString() } },
  }), [t, total]);

  return (
    <ApexChart
      options={options}
      series={trafficSources.map(({ value }) => value)}
      type="donut"
      height={240}
    />
  );
}
