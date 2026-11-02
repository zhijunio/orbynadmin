"use client";

import type { RechartsConfig } from "@/components/application/charts/recharts-chart";
import { useMemo } from "react";

import { RechartsChart } from "@/components/application/charts/recharts-chart";
import { salesByCategory } from "@/data";

export function CategoryBarChart() {
  const options = useMemo<RechartsConfig>(() => ({
    chart: { type: "bar", toolbar: { show: false }, fontFamily: "inherit", background: "transparent" },
    colors: ["var(--chart-1)"],
    plotOptions: { bar: { horizontal: true, borderRadius: 4, barHeight: "56%" } },
    dataLabels: { enabled: false },
    grid: { borderColor: "var(--border)", strokeDashArray: 3 },
    xaxis: { categories: salesByCategory.map(({ category }) => category), max: 40, labels: { formatter: (value) => `${value}%`, style: { colors: "var(--muted-foreground)" } }, axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { labels: { style: { colors: "var(--muted-foreground)" } } },
    tooltip: { y: { formatter: (value) => `${value}%` } },
    legend: { show: false },
  }), []);

  return <RechartsChart options={options} series={[{ name: "Share", data: salesByCategory.map(({ value }) => value) }]} type="bar" height={280} />;
}
