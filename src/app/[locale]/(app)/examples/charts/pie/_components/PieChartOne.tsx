"use client";

import dynamic from "next/dynamic";
import type { ApexOptions } from "apexcharts";
import { ChartCard } from "../../_components/ChartCard";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false, loading: () => <div className="h-[210px] animate-pulse rounded-lg bg-muted/40" /> });
const totalVisitors = 12500;
const segments = [
  { name: "Group A", value: 65, fill: "var(--chart-1)" },
  { name: "Group B", value: 35, fill: "color-mix(in srgb, var(--foreground) 18%, var(--background))" },
];
const options: ApexOptions = {
  chart: { type: "donut", toolbar: { show: false }, background: "transparent", fontFamily: "inherit" },
  labels: segments.map(({ name }) => name), colors: segments.map(({ fill }) => fill),
  legend: { show: false }, dataLabels: { enabled: false }, stroke: { width: 0 },
  plotOptions: { pie: { donut: { size: "82%" } } },
  tooltip: { y: { formatter: (value) => `${value}%` } },
};

export default function PieChartOne() {
  return <ChartCard title="Pie Chart 1"><div className="flex h-[300px] w-full flex-col items-center justify-between">
    <div className="relative h-[210px] w-full"><ApexChart type="donut" height="100%" options={options} series={segments.map(({ value }) => value)} /><div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center"><span className="text-xl font-semibold">{totalVisitors.toLocaleString()}</span><span className="text-sm text-muted-foreground">Visitors</span></div></div>
    <div className="flex w-full justify-center gap-5 pt-4">{segments.map((item) => <div key={item.name} className="flex items-center gap-1.5"><span className="size-2 rounded-xs" style={{ backgroundColor: item.fill }} /><span className="text-sm font-medium text-muted-foreground">{item.name}</span></div>)}</div>
  </div></ChartCard>;
}
