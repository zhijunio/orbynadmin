"use client";

import dynamic from "next/dynamic";

import { ChartCard } from "../../_components/ChartCard";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false, loading: () => <div className="h-[270px] animate-pulse rounded-lg bg-muted/40" /> });
const points = [
  { month: "Jan", sales: 480 }, { month: "Feb", sales: 720 },
  { month: "Mar", sales: 460 }, { month: "Apr", sales: 620 },
  { month: "May", sales: 340 }, { month: "Jun", sales: 650 },
  { month: "Jul", sales: 490 }, { month: "Aug", sales: 660 },
  { month: "Sep", sales: 550 }, { month: "Oct", sales: 600 },
  { month: "Nov", sales: 370 }, { month: "Dec", sales: 530 },
];

export default function BarChartOne() {
  return <ChartCard title="Bar Chart 1"><ApexChart type="bar" height={270} options={{
    chart: { toolbar: { show: false }, fontFamily: "inherit", background: "transparent" },
    colors: ["color-mix(in srgb, var(--foreground) 14%, var(--background))"],
    plotOptions: { bar: { borderRadius: 4, columnWidth: "45%" } },
    dataLabels: { enabled: false }, grid: { borderColor: "var(--border)", strokeDashArray: 3 },
    xaxis: { categories: points.map(({ month }) => month), axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { min: 0, max: 800, tickAmount: 4, labels: { formatter: (value) => String(value) } },
    tooltip: { y: { formatter: (value) => String(value) } },
  }} series={[{ name: "Sales", data: points.map(({ sales }) => sales) }]} /></ChartCard>;
}