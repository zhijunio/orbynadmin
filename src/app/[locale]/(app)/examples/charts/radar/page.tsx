"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/base/ui/card";
import { PageHeader } from "@/components/application/layout/LocalizedPageHeader";
import dynamic from "next/dynamic";
import type { ApexOptions } from "apexcharts";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false, loading: () => <div className="h-[280px] animate-pulse rounded-lg bg-muted/40" /> });
const chartColors = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"];

function RadarChart({ series, categories, height = 300 }: { series: { name: string; data: number[] }[]; categories: string[]; height?: number }) {
  const options: ApexOptions = {
    chart: { type: "radar", toolbar: { show: false }, fontFamily: "inherit", background: "transparent", animations: { enabled: true, speed: 350 } },
    colors: chartColors,
    xaxis: { categories, labels: { style: { colors: categories.map(() => "var(--muted-foreground)"), fontSize: "12px" } } },
    yaxis: { show: true, min: 0, max: 100, tickAmount: 4, labels: { style: { colors: ["var(--muted-foreground)"] } } },
    stroke: { width: 2, lineCap: "round" },
    fill: { opacity: 0.16 },
    markers: { size: 3, hover: { size: 5 } },
    grid: { borderColor: "var(--border)", padding: { top: 4, right: 12, bottom: 0, left: 12 } },
    legend: { show: true, position: "bottom", fontSize: "12px", labels: { colors: "var(--muted-foreground)" }, markers: { size: 4 } },
    tooltip: { theme: typeof document !== "undefined" && document.documentElement.classList.contains("dark") ? "dark" : "light", y: { formatter: (value) => `${value}%` } },
    plotOptions: { radar: { polygons: { strokeColors: "var(--border)", connectorColors: "var(--border)", fill: { colors: ["transparent", "transparent"] } } } },
    dataLabels: { enabled: false },
  };

  return <ApexChart type="radar" height={height} options={options} series={series} />;
}

const qualityCategories = ["Performance", "Reliability", "Security", "Usability", "Scalability", "Support"];
const teamCategories = ["Delivery", "Quality", "Communication", "Ownership", "Planning"];

function RadarCard({ title, categories, series }: { title: string; categories: string[]; series: { name: string; data: number[] }[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">{title}</CardTitle>
      </CardHeader>
      <CardContent><RadarChart categories={categories} series={series} /></CardContent>
    </Card>
  );
}

export default function RadarChartPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Radar Charts" />
      <div className="grid gap-5 xl:grid-cols-2">
        <RadarCard
          title="Product Quality"
          categories={qualityCategories}
          series={[
            { name: "Current", data: [88, 74, 92, 81, 69, 85] },
            { name: "Target", data: [95, 90, 96, 85, 82, 88] },
          ]}
        />
        <RadarCard
          title="Team Performance"
          categories={teamCategories}
          series={[
            { name: "Platform", data: [86, 91, 78, 88, 80] },
            { name: "Growth", data: [78, 82, 92, 76, 89] },
          ]}
        />
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm">Quarterly Skill Assessment</CardTitle>
          </CardHeader>
          <CardContent>
            <RadarChart
              height={360}
              categories={["Product", "Engineering", "Design", "Operations", "Customer"]}
              series={[
                { name: "Q1", data: [78, 84, 90, 72, 82] },
                { name: "Q2", data: [86, 88, 83, 80, 91] },
                { name: "Target", data: [90, 92, 90, 85, 92] },
              ]}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
