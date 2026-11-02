"use client";

import { RechartsChart } from "@/components/application/charts/recharts-chart";

import { ChartCard } from "@/app/elements/charts/showcase-chart-card";

const points = [
  { month: "Jan", sales: 2.3 }, { month: "Feb", sales: 3.1 },
  { month: "Mar", sales: 2.7 }, { month: "Apr", sales: 3.9 },
  { month: "May", sales: 2.1 }, { month: "June", sales: 1.7 },
  { month: "July", sales: 2.6 }, { month: "Aug", sales: 2.7 },
  { month: "Sept", sales: 1.5 }, { month: "Oct", sales: 0.8 },
  { month: "Nov", sales: 1.8 }, { month: "Dec", sales: 1.2 },
];

export default function BarChartOne() {
  return <ChartCard title="Bar Chart 1"><RechartsChart type="bar" height={270} options={{
    chart: { toolbar: { show: false }, fontFamily: "inherit", background: "transparent" },
    colors: ["var(--chart-1)"],
    plotOptions: { bar: { borderRadius: 4, columnWidth: "45%" } },
    dataLabels: { enabled: true, formatter: (value) => `${value}%` }, grid: { borderColor: "var(--border)", strokeDashArray: 3 },
    xaxis: { categories: points.map(({ month }) => month), axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { min: 0, max: 5, tickAmount: 4, labels: { formatter: (value) => `${value}%` } },
    tooltip: { y: { formatter: (value) => `${value}%` } },
  }} series={[{ name: "Sales", data: points.map(({ sales }) => sales) }]} /></ChartCard>;
}
