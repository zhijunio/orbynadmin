"use client";

import dynamic from "next/dynamic";

import { ChartCard } from "../../_components/ChartCard";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false, loading: () => <div className="h-[270px] animate-pulse rounded-lg bg-muted/40" /> });

const config = {
  groupA: { label: "Group A", color: "var(--chart-1)" },
  groupB: { label: "Group B", color: "#d8b4fe" },
  groupC: { label: "Group C", color: "var(--muted-foreground)" },
} satisfies Record<string, { label: string; color: string }>;

const points = [
  { month: "Jan", groupA: 30000, groupB: 6000, groupC: 2000 },
  { month: "Feb", groupA: 24000, groupB: 10000, groupC: 3000 },
  { month: "Mar", groupA: 34000, groupB: 5000, groupC: 5000 },
  { month: "Apr", groupA: 30000, groupB: 10000, groupC: 5200 },
  { month: "May", groupA: 40000, groupB: 6000, groupC: 3000 },
  { month: "Jun", groupA: 34000, groupB: 12000, groupC: 4000 },
  { month: "Jul", groupA: 47000, groupB: 7000, groupC: 4500 },
  { month: "Aug", groupA: 44000, groupB: 16000, groupC: 1500 },
  { month: "Sep", groupA: 65000, groupB: 10000, groupC: 4000 },
  { month: "Oct", groupA: 55000, groupB: 14000, groupC: 3000 },
  { month: "Nov", groupA: 72000, groupB: 18000, groupC: 6000 },
  { month: "Dec", groupA: 85000, groupB: 22000, groupC: 8000 },
];

const series = [
  { key: "groupA", color: "var(--color-groupA)" },
  { key: "groupB", color: "var(--color-groupB)" },
  { key: "groupC", color: "var(--color-groupC)" },
] as const;

export default function LineChartThree() {
  return <ChartCard title="Line Chart 3">
    <div className="mb-5 flex flex-wrap items-center gap-5">{series.map(({ key, color }) => <div key={key} className="flex items-center gap-1.5"><span className="size-2 rounded-xs" style={{ backgroundColor: color }} /><span className="text-sm font-medium text-muted-foreground">{config[key].label}</span></div>)}</div>
    <ApexChart type="line" height={270} options={{
      chart: { toolbar: { show: false }, fontFamily: "inherit", background: "transparent" },
      colors: series.map(({ color }) => color), stroke: { curve: "straight", width: 2 },
      dataLabels: { enabled: false }, markers: { size: 0, hover: { size: 5 } },
      grid: { borderColor: "var(--border)", strokeDashArray: 3 },
      xaxis: { categories: points.map(({ month }) => month), axisBorder: { show: false }, axisTicks: { show: false } },
      yaxis: { min: 0, max: 100000, tickAmount: 5, labels: { formatter: (value) => Intl.NumberFormat("en", { notation: "compact" }).format(Number(value ?? 0)) } },
      tooltip: { y: { formatter: (value) => Number(value ?? 0).toLocaleString() } }, legend: { show: false },
    }} series={series.map(({ key }) => ({ name: config[key].label, data: points.map((point) => point[key]) }))} />
  </ChartCard>;
}