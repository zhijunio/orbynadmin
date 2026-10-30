"use client";

import dynamic from "next/dynamic";

import { ChartCard } from "../../_components/ChartCard";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false, loading: () => <div className="h-[270px] animate-pulse rounded-lg bg-muted/40" /> });
const points = [
  { month: "Jan", groupA: 100, groupB: 220 }, { month: "Feb", groupA: 250, groupB: 180 },
  { month: "Mar", groupA: 380, groupB: 240 }, { month: "Apr", groupA: 480, groupB: 360 },
  { month: "May", groupA: 400, groupB: 310 }, { month: "Jun", groupA: 550, groupB: 650 },
  { month: "Jul", groupA: 650, groupB: 800 }, { month: "Aug", groupA: 520, groupB: 680 },
  { month: "Sep", groupA: 640, groupB: 820 }, { month: "Oct", groupA: 750, groupB: 900 },
  { month: "Nov", groupA: 600, groupB: 780 }, { month: "Dec", groupA: 750, groupB: 600 },
];

const config = { groupA: { label: "Group A", color: "var(--chart-1)" }, groupB: { label: "Group B", color: "#d8b4fe" } } satisfies Record<string, { label: string; color: string }>;

export default function LineChartTwo() {
  return <ChartCard title="Line Chart 2"><div className="flex flex-col gap-5">
    <div className="flex items-center gap-5 text-sm font-medium text-muted-foreground"><span className="flex items-center gap-1.5"><i className="size-2 rounded-xs bg-[var(--chart-1)]" />Group A</span><span className="flex items-center gap-1.5"><i className="size-2 rounded-xs bg-[#d8b4fe]" />Group B</span></div>
    <ApexChart type="area" height={270} options={{
      chart: { toolbar: { show: false }, fontFamily: "inherit", background: "transparent" },
      colors: [config.groupA.color, config.groupB.color], stroke: { curve: "smooth", width: 2 },
      fill: { type: "gradient", gradient: { opacityFrom: 0.2, opacityTo: 0 } },
      dataLabels: { enabled: false }, markers: { size: 0, hover: { size: 5 } },
      grid: { borderColor: "var(--border)", strokeDashArray: 3 },
      xaxis: { categories: points.map(({ month }) => month), axisBorder: { show: false }, axisTicks: { show: false } },
      yaxis: { min: 0, max: 1000, tickAmount: 5, labels: { formatter: (value) => String(value) } },
      tooltip: { y: { formatter: (value) => String(value) } }, legend: { show: false },
    }} series={[{ name: "Group A", data: points.map(({ groupA }) => groupA) }, { name: "Group B", data: points.map(({ groupB }) => groupB) }]} />
  </div></ChartCard>;
}