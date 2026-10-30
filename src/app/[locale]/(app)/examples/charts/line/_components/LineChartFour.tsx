"use client";

import dynamic from "next/dynamic";

import { ChartCard } from "../../_components/ChartCard";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false, loading: () => <div className="h-[270px] animate-pulse rounded-lg bg-muted/40" /> });

const config = {
  groupA: { label: "Group A", color: "#818cf8" },
  groupB: { label: "Group B", color: "#93c5fd" },
} satisfies Record<string, { label: string; color: string }>;

const points = [
  { id: "p1", month: "Jan", groupA: 30, groupB: 50 }, { id: "p2", month: "Feb", groupA: 42, groupB: 34 },
  { id: "p3", month: "Mar", groupA: 55, groupB: 42 }, { id: "p4", month: "Apr", groupA: 70, groupB: 55 },
  { id: "p5", month: "May", groupA: 58, groupB: 46 }, { id: "p6", month: "Jun", groupA: 82, groupB: 78 },
  { id: "p7", month: "Jul", groupA: 98, groupB: 112 }, { id: "p8", month: "Aug", groupA: 76, groupB: 95 },
  { id: "p9", month: "Sep", groupA: 94, groupB: 118 }, { id: "p10", month: "Oct", groupA: 110, groupB: 130 },
  { id: "p11", month: "Nov", groupA: 90, groupB: 105 }, { id: "p12", month: "Dec", groupA: 112, groupB: 82 },
];

export default function LineChartFour() {
  return <ChartCard title="Line Chart 4">
    <div className="mb-5 flex flex-wrap items-center gap-5">{Object.entries(config).map(([key, item]) => <div key={key} className="flex items-center gap-1.5"><span className="size-2 rounded-xs" style={{ backgroundColor: item.color }} /><span className="text-sm font-medium text-muted-foreground">{item.label}</span></div>)}</div>
    <ApexChart type="area" height={270} options={{
      chart: { toolbar: { show: false }, fontFamily: "inherit", background: "transparent" },
      colors: [config.groupA.color, config.groupB.color], stroke: { curve: "smooth", width: 2 },
      fill: { type: "gradient", gradient: { opacityFrom: 0.2, opacityTo: 0 } },
      dataLabels: { enabled: false }, markers: { size: 0, hover: { size: 5 } },
      grid: { borderColor: "var(--border)", strokeDashArray: 3 },
      xaxis: { categories: points.map(({ month }) => month), axisBorder: { show: false }, axisTicks: { show: false } },
      yaxis: { min: 0, max: 150, tickAmount: 5 },
      tooltip: { y: { formatter: (value) => String(value) } }, legend: { show: false },
    }} series={[{ name: "Group A", data: points.map(({ groupA }) => groupA) }, { name: "Group B", data: points.map(({ groupB }) => groupB) }]} />
  </ChartCard>;
}