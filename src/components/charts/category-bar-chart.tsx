"use client";

import { useMemo } from "react";
import type { ApexOptions } from "apexcharts";
import { ApexChart } from "@/components/charts/apex-chart";
import { salesByCategory } from "@/data";

export function CategoryBarChart() {
  const options = useMemo<ApexOptions>(() => ({
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

  return <ApexChart options={options} series={[{ name: "Share", data: salesByCategory.map(({ value }) => value) }]} type="bar" height={280} />;
}
