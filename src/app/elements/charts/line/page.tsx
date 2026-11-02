"use client";

import ConsoleLayout from "@/components/application/app-shell/console-layout";

import { ChartCard } from "@/app/elements/charts/showcase-chart-card";
import { CompactPageHeader as PageHeader } from "@/components/application/app-shell/page-header";
import { RechartsChart } from "@/components/application/charts/recharts-chart";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];
const dailyDates = Array.from({ length: 56 }, (_, index) => {
  const date = new Date(Date.UTC(2025, 4, 1 + index * 4));
  return `${date.toLocaleString("en", { month: "short", timeZone: "UTC" })} ${date.getUTCFullYear()}`;
});
const dailyValues = Array.from({ length: 56 }, (_, index) => Math.round(31 + Math.sin(index / 8) * 1.7 + Math.cos(index / 3.3) * 0.75 + ((index * 17) % 9) / 10));
const dates = Array.from({ length: 56 }, (_, index) => {
  const date = new Date(Date.UTC(2025, 4, 26 + index));
  return `${date.toLocaleString("en", { month: "short", timeZone: "UTC" })} ${date.getUTCDate()}`;
});
const revenue = [8000, 13000, 7000, 6500, 3500, 7500, 6000, 18500];
const monthlySeries = [
  { name: "Desktop", data: [310, 430, 420, 400, 700, 810, 700, 770] },
  { name: "Mobile", data: [540, 630, 570, 700, 820, 500, 370, 480] },
];

const examples = [
  {
    title: "Line Chart 1",
    type: "area" as const,
    categories: months,
    series: [{ name: "Revenue", data: revenue }],
    colors: ["var(--chart-1)"],
    yaxis: { min: 0, max: 20000, tickAmount: 4, labels: { formatter: (value: number) => value === 0 ? "0" : `${value / 1000}K` } },
  },
  {
    title: "Line Chart 2",
    type: "area" as const,
    categories: months,
    series: [{ name: "Visitors", data: [180, 190, 170, 160, 175, 165, 170, 215] }],
    colors: ["var(--chart-1)"],
    yaxis: { min: 150, max: 240, tickAmount: 4 },
  },
  {
    title: "Line Chart 3",
    type: "area" as const,
    categories: dailyDates,
    series: [{ name: "Temperature", data: dailyValues }],
    colors: ["var(--chart-1)"],
    yaxis: { min: 28, max: 40, tickAmount: 6, labels: { formatter: (value: number) => value.toFixed(2) } },
    tickInterval: 7,
  },
  {
    title: "Line Chart 4",
    type: "area" as const,
    categories: months,
    series: monthlySeries,
    colors: ["var(--chart-1)", "var(--chart-2)"],
    yaxis: { min: 0, max: 1000, tickAmount: 5 },
  },
  {
    title: "Line Chart 5",
    type: "area" as const,
    categories: dates,
    series: [{ name: "Revenue", data: Array.from({ length: 56 }, (_, index) => Math.round(1200 + index * 5.6 + Math.sin(index / 2.8) * 35 + ((index * 13) % 19))) }],
    colors: ["var(--chart-1)"],
    yaxis: { min: 1200, max: 2000, tickAmount: 4, labels: { formatter: (value: number) => `$${value.toLocaleString()}` } },
    tickInterval: 7,
  },
];

export default function LineChartsPage() {
  return <ConsoleLayout>{<div className="min-w-0 space-y-6">
      <PageHeader title="Line Charts" />
      <div className="grid min-w-0 gap-6 [&>*]:min-w-0">
        {examples.map((example) => (
          <ChartCard key={example.title} title={example.title}>
            <RechartsChart
              type={example.type}
              height={310}
              options={{
                dataLabels: { enabled: false },
                grid: { borderColor: "var(--border)", strokeDashArray: 3 },
                xaxis: { categories: example.categories, tickInterval: example.tickInterval },
                yaxis: example.yaxis,
                colors: example.colors,
                fill: { opacity: 0.12, gradient: { opacityFrom: 0.28, opacityTo: 0 } },
                stroke: { curve: "smooth", width: 2 },
                markers: { size: 0 },
                legend: { show: example.series.length > 1 },
              }}
              series={example.series}
            />
          </ChartCard>
        ))}
      </div>
    </div>}</ConsoleLayout>;
}
