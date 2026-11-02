"use client";

import { RechartsChart } from "@/components/application/charts/recharts-chart";
import type { RechartsConfig } from "@/components/application/charts/recharts-chart";

import { ChartCard } from "@/app/elements/charts/showcase-chart-card";

const segments = [
  { name: "Media", value: 35, fill: "var(--chart-1)" },
  { name: "Downloads", value: 59, fill: "var(--chart-2)" },
  { name: "Apps", value: 37, fill: "var(--chart-3)" },
  { name: "Documents", value: 19, fill: "var(--chart-4)" },
];
const options: RechartsConfig = {
  chart: { type: "pie", toolbar: { show: false }, background: "transparent", fontFamily: "inherit" },
  labels: segments.map(({ name }) => name), colors: segments.map(({ fill }) => fill),
  legend: { show: false }, dataLabels: { enabled: false }, stroke: { width: 0 },
  plotOptions: { pie: { donut: { size: "76%", labels: { show: true, total: { show: true, label: "Used of 720 GB", formatter: () => "135 GB" } } } } },
  tooltip: { y: { formatter: (value) => `${value} GB` } },
};

export default function PieChartTwo() {
  return <ChartCard title="Pie Chart 2">
    <div className="flex min-h-[340px] flex-col items-center justify-between">
      <div className="h-[250px] w-full"><RechartsChart type="donut" height="100%" options={options} series={segments.map(({ value }) => value)} /></div>
      <ul className="grid w-full grid-cols-1 gap-y-2 pt-3">
        {segments.map((segment) => (
          <li key={segment.name} className="flex min-w-0 items-center justify-between gap-2 text-sm">
            <span className="flex min-w-0 items-center gap-2">
              <span className="size-2 shrink-0 rounded-full" style={{ backgroundColor: segment.fill }} />
              <span className="truncate">{segment.name}</span>
            </span>
            <span className="shrink-0 tabular-nums text-muted-foreground">{segment.value} GB</span>
          </li>
        ))}
      </ul>
    </div>
  </ChartCard>;
}
