"use client";

import dynamic from "next/dynamic";

import { ChartCard } from "../../_components/ChartCard";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false, loading: () => <div className="h-[270px] animate-pulse rounded-lg bg-muted/40" /> });

const config = {
  organic: { label: "Organic", color: "#2b448d" }, direct: { label: "Direct", color: "#b5aaff" },
  social: { label: "Social", color: "#ffbcf9" }, referral: { label: "Referral", color: "#c9e5ff" },
} satisfies Record<string, { label: string; color: string }>;
const points = [{ name: "Traffic Sources", organic: 480, direct: 240, social: 130, referral: 150 }];

export default function BarChartFour() {
  return <ChartCard title="Bar Chart 4">
    <div className="h-10 w-full"><ApexChart type="bar" height="100%" options={{
      chart: { stacked: true, toolbar: { show: false }, fontFamily: "inherit", background: "transparent" },
      colors: Object.values(config).map(({ color }) => color), plotOptions: { bar: { horizontal: true, borderRadius: 6, barHeight: "72%" } },
      dataLabels: { enabled: false }, stroke: { show: true, width: 4, colors: ["var(--card)"] },
      xaxis: { categories: ["Traffic Sources"], max: 1000, labels: { show: false }, axisBorder: { show: false }, axisTicks: { show: false } },
      yaxis: { labels: { show: false } }, grid: { show: false, padding: { left: 0, right: 0, top: -20, bottom: -20 } },
      legend: { show: false }, tooltip: { y: { formatter: (value) => String(value) } },
    }} series={Object.entries(config).map(([key, item]) => ({ name: item.label, data: [points[0][key as keyof typeof points[0]] as number] }))} /></div>
    <div className="mt-5 flex flex-wrap items-center gap-5">{Object.entries(config).map(([key, item]) => <div key={key} className="flex items-center gap-1.5"><span className="size-3 rounded-xs" style={{ backgroundColor: item.color }} /><span className="text-sm font-medium text-muted-foreground">{item.label}</span></div>)}</div>
  </ChartCard>;
}