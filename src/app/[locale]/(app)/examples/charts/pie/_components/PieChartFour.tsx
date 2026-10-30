"use client";

import dynamic from "next/dynamic";
import type { ApexOptions } from "apexcharts";
import { ChartCard } from "../../_components/ChartCard";

const ApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
  loading: () => <div className="h-[140px] animate-pulse rounded-lg bg-muted/40" />,
});

const segments = [
  { name: "Group A", value: 35, fill: "#1e3a8a" }, { name: "Group B", value: 20, fill: "#a78bfa" },
  { name: "Group C", value: 20, fill: "#a5b4fc" }, { name: "Group D", value: 15, fill: "#bfdbfe" }, { name: "Group E", value: 10, fill: "#fbcfe8" },
];
const options: ApexOptions = {
  chart: { type: "donut", toolbar: { show: false }, background: "transparent", fontFamily: "inherit" },
  labels: segments.map(({ name }) => name), colors: segments.map(({ fill }) => fill),
  legend: { show: false }, dataLabels: { enabled: false }, stroke: { width: 0 },
  plotOptions: { pie: { startAngle: -90, endAngle: 90, offsetY: 12, donut: { size: "58%" } } },
  tooltip: { y: { formatter: (value) => `${value}%` } },
};

export default function PieChartFour() {
  return <ChartCard title="Pie Chart 4">
    <div className="flex flex-col items-center gap-11">
      <div className="h-[140px] w-full"><ApexChart type="donut" height="100%" options={options} series={segments.map(({ value }) => value)} /></div>
      <div className="flex w-full flex-wrap justify-center gap-5">{segments.map((segment) => <div key={segment.name} className="flex items-center gap-1.5"><span className="size-2 rounded-xs" style={{ backgroundColor: segment.fill }} /><span className="text-sm font-medium text-muted-foreground">{segment.name}</span></div>)}</div>
    </div>
  </ChartCard>;
}
