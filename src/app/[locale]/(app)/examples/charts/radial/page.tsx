"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/feature/layout/PageHeader";
import dynamic from "next/dynamic";
import type { ApexOptions } from "apexcharts";

const ApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
  loading: () => <div className="h-[280px] animate-pulse rounded-lg bg-muted/40" />,
});
const chartColors = ["#465fff", "#9cb9ff", "#12b76a", "#f79009", "#ee46bc"];

function RadialChart({ values, labels, height = 300, compact = false }: { values: number[]; labels: string[]; height?: number; compact?: boolean }) {
  const options: ApexOptions = {
    chart: { type: "radialBar", toolbar: { show: false }, fontFamily: "inherit", background: "transparent", animations: { enabled: true, speed: 350 } },
    colors: chartColors,
    stroke: { width: 0, lineCap: "round" },
    fill: { opacity: 1 },
    legend: { show: !compact, position: "bottom", fontSize: "12px", labels: { colors: "#667085" }, markers: { size: 4 } },
    tooltip: { theme: typeof document !== "undefined" && document.documentElement.classList.contains("dark") ? "dark" : "light", y: { formatter: (value) => `${value}%` } },
    plotOptions: { radialBar: { hollow: { size: compact ? "52%" : "38%" }, track: { background: "#eef2f6", strokeWidth: "100%" }, dataLabels: { name: { show: !compact, fontSize: "13px", color: "#667085", offsetY: 22 }, value: { show: true, fontSize: compact ? "20px" : "24px", fontWeight: 600, offsetY: compact ? 4 : -4, formatter: (value) => `${Math.round(value)}%` }, total: { show: !compact, label: "Average", color: "#667085", formatter: (chart) => `${Math.round(chart.globals.seriesTotals.reduce((sum: number, item: number) => sum + item, 0) / chart.globals.seriesTotals.length)}%` } } } },
    dataLabels: { enabled: false },
    labels,
  };

  return <ApexChart type="radialBar" height={height} options={options} series={values} />;
}

export default function RadialChartPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Radial Charts" />
      <div className="grid gap-5 xl:grid-cols-3">
        <Card>
          <CardHeader><CardTitle className="text-sm">Sales Goal</CardTitle></CardHeader>
          <CardContent><RadialChart values={[78]} labels={["Sales"]} compact /></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-sm">Customer Satisfaction</CardTitle></CardHeader>
          <CardContent><RadialChart values={[92]} labels={["Satisfaction"]} compact /></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-sm">On-time Delivery</CardTitle></CardHeader>
          <CardContent><RadialChart values={[84]} labels={["On time"]} compact /></CardContent>
        </Card>
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="text-sm">Team Progress</CardTitle></CardHeader>
          <CardContent><RadialChart values={[86, 72, 64, 91]} labels={["Platform", "Mobile", "Website", "Operations"]} height={340} /></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-sm">Service Health</CardTitle></CardHeader>
          <CardContent><RadialChart values={[99.9, 96, 88]} labels={["Uptime", "API success", "Capacity"]} height={340} /></CardContent>
        </Card>
      </div>
    </div>
  );
}
