"use client";

import { RechartsChart } from "@/components/application/charts/recharts-chart";
import type { RechartsConfig } from "@/components/application/charts/recharts-chart";

import { ChartCard } from "@/app/elements/charts/showcase-chart-card";

const segments = [
  { name: "ChatGPT", value: 65, fill: "var(--chart-1)" },
  { name: "Gemini", value: 20, fill: "var(--chart-2)" },
  { name: "xAI", value: 15, fill: "var(--chart-3)" },
];
const options: RechartsConfig = {
  chart: { type: "donut", toolbar: { show: false }, background: "transparent", fontFamily: "inherit" },
  labels: segments.map(({ name }) => name), colors: segments.map(({ fill }) => fill),
  legend: { show: false }, dataLabels: { enabled: false }, stroke: { width: 0 },
  plotOptions: { pie: { donut: { size: "76%", labels: { show: true, total: { show: true, label: "Total API Token used", formatter: () => "13.5M" } } } } },
  tooltip: { y: { formatter: (value) => `${value}%` } },
};

export default function PieChartThree() {
  return <ChartCard title="Pie Chart 3">
    <div className="flex min-h-[300px] flex-col items-center justify-between">
      <div className="h-[240px] w-full"><RechartsChart type="donut" height="100%" options={options} series={segments.map(({ value }) => value)} /></div>
      <div className="flex w-full flex-wrap justify-center gap-5">{segments.map((segment) => <div key={segment.name} className="flex items-center gap-1.5"><span className="size-2 rounded-xs" style={{ backgroundColor: segment.fill }} /><span className="text-sm font-medium text-muted-foreground">{segment.name}</span></div>)}</div>
    </div>
  </ChartCard>;
}
