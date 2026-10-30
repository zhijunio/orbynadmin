"use client";

import dynamic from "next/dynamic";

import { ChartCard } from "../../_components/ChartCard";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false, loading: () => <div className="h-[270px] animate-pulse rounded-lg bg-muted/40" /> });
const points = [
  { month: "Jan", groupA: 11000, groupB: 5000 }, { month: "Feb", groupA: 8500, groupB: 4500 },
  { month: "Mar", groupA: 12000, groupB: 6000 }, { month: "Apr", groupA: 9500, groupB: 5500 },
  { month: "May", groupA: 11000, groupB: 5000 }, { month: "Jun", groupA: 9000, groupB: 4000 },
  { month: "Jul", groupA: 10000, groupB: 5000 }, { month: "Aug", groupA: 10500, groupB: 5000 },
  { month: "Sep", groupA: 7500, groupB: 4500 }, { month: "Oct", groupA: 11500, groupB: 5500 },
  { month: "Nov", groupA: 8500, groupB: 4000 }, { month: "Dec", groupA: 11500, groupB: 5500 },
];

const config = { groupA: { label: "Group A", color: "var(--chart-1)" }, groupB: { label: "Group B", color: "#a5b4fc" } } satisfies Record<string, { label: string; color: string }>;

export default function BarChartTwo() {
  return <ChartCard title="Bar Chart 2"><div className="flex flex-col gap-5">
    <div className="flex items-center gap-5 text-sm font-medium text-muted-foreground"><span className="flex items-center gap-1.5"><i className="size-2 rounded-xs bg-[var(--chart-1)]" />Group A</span><span className="flex items-center gap-1.5"><i className="size-2 rounded-xs bg-[#a5b4fc]" />Group B</span></div>
    <ApexChart type="bar" height={270} options={{
      chart: { stacked: true, toolbar: { show: false }, fontFamily: "inherit", background: "transparent" },
      colors: [config.groupA.color, config.groupB.color], plotOptions: { bar: { borderRadius: 4, columnWidth: "45%", borderRadiusApplication: "end" } },
      dataLabels: { enabled: false }, grid: { borderColor: "var(--border)", strokeDashArray: 3 },
      xaxis: { categories: points.map(({ month }) => month), axisBorder: { show: false }, axisTicks: { show: false } },
      yaxis: { min: 0, max: 20000, tickAmount: 4, labels: { formatter: (value) => value === 0 ? "0" : `${value / 1000}K` } },
      tooltip: { y: { formatter: (value) => Number(value ?? 0).toLocaleString() } }, legend: { show: false },
    }} series={[{ name: "Group A", data: points.map(({ groupA }) => groupA) }, { name: "Group B", data: points.map(({ groupB }) => groupB) }]} />
  </div></ChartCard>;
}