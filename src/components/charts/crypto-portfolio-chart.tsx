"use client";

import { useMemo } from "react";
import type { ApexOptions } from "apexcharts";
import { ApexChart } from "@/components/charts/apex-chart";

export function CryptoPortfolioChart({ data }: { data: { t: string; value: number }[] }) {
  const options = useMemo<ApexOptions>(() => ({
    chart: { type: "area", toolbar: { show: false }, fontFamily: "inherit", background: "transparent" },
    colors: ["var(--chart-1)"],
    dataLabels: { enabled: false },
    stroke: { curve: "smooth", width: 2 },
    fill: { type: "gradient", gradient: { opacityFrom: 0.35, opacityTo: 0.02 } },
    grid: { borderColor: "var(--border)", strokeDashArray: 3 },
    xaxis: { categories: data.map(({ t }) => t), tickAmount: 6, axisBorder: { show: false }, axisTicks: { show: false }, labels: { style: { colors: "var(--muted-foreground)" } } },
    yaxis: { min: Math.min(...data.map(({ value }) => value)) - 4000, max: Math.max(...data.map(({ value }) => value)) + 2000, labels: { formatter: (value) => `$${(value / 1000).toFixed(0)}k`, style: { colors: "var(--muted-foreground)" } } },
    tooltip: { y: { formatter: (value) => `$${Number(value ?? 0).toLocaleString()}` } },
    legend: { show: false },
  }), [data]);

  return <ApexChart options={options} series={[{ name: "Portfolio", data: data.map(({ value }) => value) }]} type="area" height={280} />;
}
