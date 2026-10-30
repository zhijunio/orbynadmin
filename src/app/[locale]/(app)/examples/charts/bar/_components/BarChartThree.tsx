"use client";

import dynamic from "next/dynamic";

import { ChartCard } from "../../_components/ChartCard";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false, loading: () => <div className="h-[270px] animate-pulse rounded-lg bg-muted/40" /> });

const config = { groupA: { label: "Group A", color: "var(--chart-1)" }, groupB: { label: "Group B", color: "#a5b4fc" } } satisfies Record<string, { label: string; color: string }>;
const points = [
  { month: "Jan", groupA: 44000, groupB: 100000 }, { month: "Feb", groupA: 77000, groupB: 54000 },
  { month: "Mar", groupA: 65000, groupB: 49000 }, { month: "Apr", groupA: 33000, groupB: 59000 },
  { month: "May", groupA: 14000, groupB: 49000 }, { month: "Jun", groupA: 65000, groupB: 52000 },
  { month: "Jul", groupA: 14000, groupB: 49000 }, { month: "Aug", groupA: 77000, groupB: 53000 },
  { month: "Sep", groupA: 14000, groupB: 49000 }, { month: "Oct", groupA: 44000, groupB: 100000 },
  { month: "Nov", groupA: 77000, groupB: 54000 }, { month: "Dec", groupA: 77000, groupB: 53000 },
];

export default function BarChartThree() {
  return <ChartCard title="Bar Chart 3">
    <div className="mb-5 flex items-center gap-5">{Object.entries(config).map(([key, item]) => <div key={key} className="flex items-center gap-1.5"><span className="size-2 rounded-xs" style={{ backgroundColor: item.color }} /><span className="text-sm font-medium text-muted-foreground">{item.label}</span></div>)}</div>
    <ApexChart type="bar" height={270} options={{
      chart: { toolbar: { show: false }, fontFamily: "inherit", background: "transparent" },
      colors: [config.groupA.color, config.groupB.color], plotOptions: { bar: { borderRadius: 4, columnWidth: "38%" } },
      dataLabels: { enabled: false }, grid: { borderColor: "var(--border)", strokeDashArray: 3 },
      xaxis: { categories: points.map(({ month }) => month), axisBorder: { show: false }, axisTicks: { show: false } },
      yaxis: { min: 0, max: 100000, tickAmount: 4, labels: { formatter: (value) => Intl.NumberFormat("en", { notation: "compact" }).format(Number(value ?? 0)).toLowerCase() } },
      tooltip: { y: { formatter: (value) => Number(value ?? 0).toLocaleString() } }, legend: { show: false },
    }} series={[{ name: "Group A", data: points.map(({ groupA }) => groupA) }, { name: "Group B", data: points.map(({ groupB }) => groupB) }]} />
  </ChartCard>;
}