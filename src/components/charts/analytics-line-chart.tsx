"use client";

import { useMemo } from "react";
import type { ApexOptions } from "apexcharts";
import { ApexChart } from "@/components/charts/apex-chart";

const base = [2140, 2380, 2210, 2560, 2890, 2470, 2050, 2320, 2680, 2910, 3120, 2870, 2640, 2980, 3340, 3610, 3280, 2960, 3180, 3520, 3810, 3640, 3290, 3480, 3760, 4020, 3880, 3560, 3920, 4180];
const series = [
  { name: "Page Views", data: base.map((value, i) => Math.round(value * (2.4 + ((i % 5) * 0.06)))) },
  { name: "Visitors", data: base },
];

export function AnalyticsLineChart() {
  const options = useMemo<ApexOptions>(() => ({
    chart: { type: "line", toolbar: { show: false }, fontFamily: "inherit", background: "transparent" },
    colors: ["var(--chart-2)", "var(--chart-1)"],
    dataLabels: { enabled: false },
    stroke: { curve: "smooth", width: 2 },
    grid: { borderColor: "var(--border)", strokeDashArray: 3 },
    xaxis: { categories: base.map((_, i) => `Jun ${i + 1}`), tickAmount: 6, axisBorder: { show: false }, axisTicks: { show: false }, labels: { style: { colors: "var(--muted-foreground)" } } },
    yaxis: { labels: { formatter: (value) => `${(value / 1000).toFixed(0)}k`, style: { colors: "var(--muted-foreground)" } } },
    tooltip: { x: { show: true } },
    legend: { show: false },
  }), []);

  return <ApexChart options={options} series={series} type="line" height={300} />;
}
