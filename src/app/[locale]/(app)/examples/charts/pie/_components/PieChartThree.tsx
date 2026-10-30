"use client";

import dynamic from "next/dynamic";
import type { ApexOptions } from "apexcharts";
import { ChartCard } from "../../_components/ChartCard";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false, loading: () => <div className="h-[210px] animate-pulse rounded-lg bg-muted/40" /> });
const segments = [
  { name: "Group A", value: 40, fill: "#1e3a8a" }, { name: "Group B", value: 25, fill: "#c4b5fd" },
  { name: "Group C", value: 25, fill: "#fbcfe8" }, { name: "Group D", value: 10, fill: "#bfdbfe" },
];
const options: ApexOptions = {
  chart: { type: "pie", toolbar: { show: false }, background: "transparent", fontFamily: "inherit" },
  labels: segments.map(({ name }) => name), colors: segments.map(({ fill }) => fill),
  legend: { show: false }, dataLabels: { enabled: false }, stroke: { width: 0 },
  tooltip: { y: { formatter: (value) => `${value}%` } },
};

export default function PieChartThree() {
  return <ChartCard title="Pie Chart 3">
    <div className="flex flex-col items-center gap-5">
      <div className="h-[210px] w-full"><ApexChart type="pie" height="100%" options={options} series={segments.map(({ value }) => value)} /></div>
      <div className="flex w-full flex-wrap justify-center gap-5">{segments.map((segment) => <div key={segment.name} className="flex items-center gap-1.5"><span className="size-2 rounded-xs" style={{ backgroundColor: segment.fill }} /><span className="text-sm font-medium text-muted-foreground">{segment.name}</span></div>)}</div>
    </div>
  </ChartCard>;
}
