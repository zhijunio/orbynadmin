"use client";

import dynamic from "next/dynamic";

import { ChartCard } from "../../_components/ChartCard";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false, loading: () => <div className="h-[270px] animate-pulse rounded-lg bg-muted/40" /> });

const points = Array.from({ length: 52 }, (_, index) => ({ id: index + 1, value: 100, status: index < 29 ? "active" : "inactive" }));

export default function BarChartFive() {
  return <ChartCard title="Bar Chart 5"><ApexChart type="bar" height={32} options={{
    chart: { sparkline: { enabled: true }, toolbar: { show: false }, background: "transparent" },
    colors: points.map((point) => point.status === "active" ? "var(--chart-1)" : "var(--border)"),
    plotOptions: { bar: { distributed: true, columnWidth: "100%" } },
    dataLabels: { enabled: false }, xaxis: { categories: points.map(({ id }) => String(id)) },
    yaxis: { min: 0, max: 100 }, tooltip: { y: { formatter: (value) => `${value}%` } },
  }} series={[{ name: "Progress", data: points.map(({ value }) => value) }]} /></ChartCard>;
}