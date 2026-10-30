"use client";

import { useMemo } from "react";
import type { ApexOptions } from "apexcharts";
import { ApexChart } from "@/components/charts/apex-chart";
import { visitorsByDay } from "@/data";

export function VisitorsBarChart() {
  const options = useMemo<ApexOptions>(() => ({
    chart: { type: "bar", toolbar: { show: false }, fontFamily: "inherit", background: "transparent" },
    colors: ["var(--chart-1)", "var(--chart-3)"],
    plotOptions: { bar: { borderRadius: 4, columnWidth: "48%" } },
    dataLabels: { enabled: false },
    grid: { borderColor: "var(--border)", strokeDashArray: 3 },
    xaxis: { categories: visitorsByDay.map(({ date }) => date), axisBorder: { show: false }, axisTicks: { show: false }, labels: { style: { colors: "var(--muted-foreground)" } } },
    yaxis: { labels: { style: { colors: "var(--muted-foreground)" } } },
    legend: { position: "top", horizontalAlign: "left" },
  }), []);

  return <ApexChart options={options} series={[
    { name: "Desktop", data: visitorsByDay.map(({ desktop }) => desktop) },
    { name: "Mobile", data: visitorsByDay.map(({ mobile }) => mobile) },
  ]} type="bar" height={280} />;
}
