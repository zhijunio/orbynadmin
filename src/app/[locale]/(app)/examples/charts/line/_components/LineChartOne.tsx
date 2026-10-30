"use client";

import dynamic from "next/dynamic";

import { ChartCard } from "../../_components/ChartCard";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false, loading: () => <div className="h-[270px] animate-pulse rounded-lg bg-muted/40" /> });
const points = [
  { month: "Jan", revenue: 400 }, { month: "Feb", revenue: 370 },
  { month: "Mar", revenue: 420 }, { month: "Apr", revenue: 460 },
  { month: "May", revenue: 310 }, { month: "Jun", revenue: 480 },
  { month: "Jul", revenue: 750 }, { month: "Aug", revenue: 600 },
  { month: "Sep", revenue: 400 }, { month: "Oct", revenue: 450 },
  { month: "Nov", revenue: 600 }, { month: "Dec", revenue: 420 },
];

const config = { revenue: { label: "Revenue", color: "var(--chart-1)" } } satisfies Record<string, { label: string; color: string }>;

export default function LineChartOne() {
  return <ChartCard title="Line Chart 1"><ApexChart type="area" height={270} options={{
    chart: { toolbar: { show: false }, fontFamily: "inherit", background: "transparent" },
    colors: [config.revenue.color], stroke: { curve: "smooth", width: 2 },
    fill: { type: "gradient", gradient: { opacityFrom: 0.2, opacityTo: 0 } },
    dataLabels: { enabled: false }, markers: { size: 0, hover: { size: 5 } },
    grid: { borderColor: "var(--border)", strokeDashArray: 3 },
    xaxis: { categories: points.map(({ month }) => month), axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { min: 0, max: 1000, tickAmount: 5, labels: { formatter: (value) => String(value) } },
    tooltip: { y: { formatter: (value) => `$${value}` } },
  }} series={[{ name: "Revenue", data: points.map(({ revenue }) => revenue) }]} /></ChartCard>;
}