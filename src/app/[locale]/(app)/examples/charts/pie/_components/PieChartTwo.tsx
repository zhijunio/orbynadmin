"use client";

import dynamic from "next/dynamic";
import type { ApexOptions } from "apexcharts";
import { ChartCard } from "../../_components/ChartCard";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false, loading: () => <div className="h-[210px] animate-pulse rounded-lg bg-muted/40" /> });
const segments = [
  { name: "Group A", value: 50, fill: "#93c5fd" },
  { name: "Group B", value: 20, fill: "#d8b4fe" },
  { name: "Group C", value: 30, fill: "#a5b4fc" },
];
const options: ApexOptions = {
  chart: { type: "donut", toolbar: { show: false }, background: "transparent", fontFamily: "inherit" },
  labels: segments.map(({ name }) => name), colors: segments.map(({ fill }) => fill),
  legend: { show: false }, dataLabels: { enabled: false }, stroke: { width: 0 },
  plotOptions: { pie: { donut: { size: "82%" } } },
  tooltip: { y: { formatter: (value) => `${value}%` } },
};

export default function PieChartTwo() {
  return <ChartCard title="Pie Chart 2">
    <div className="flex h-[300px] flex-col items-center justify-between">
      <div className="relative h-[210px] w-full"><ApexChart type="donut" height="100%" options={options} series={segments.map(({ value }) => value)} /><div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center"><span className="text-xl font-semibold">2,548</span><span className="text-sm text-muted-foreground">Visitors</span></div></div>
      <Legend />
    </div>
  </ChartCard>;
}

function Legend() {
  return <div className="flex w-full flex-wrap justify-center gap-5 pt-4">{segments.map((segment) => <div key={segment.name} className="flex items-center gap-1.5"><span className="size-2 rounded-xs" style={{ backgroundColor: segment.fill }} /><span className="text-sm font-medium text-muted-foreground">{segment.name}</span></div>)}</div>;
}
