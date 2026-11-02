"use client";

import ConsoleLayout from "@/components/application/app-shell/console-layout";

import { ChartCard } from "@/app/elements/charts/showcase-chart-card";
import { CompactPageHeader as PageHeader } from "@/components/application/app-shell/page-header";
import { RechartsChart } from "@/components/application/charts/recharts-chart";

const compactOptions = {
  colors: ["var(--chart-1)"],
  plotOptions: { radialBar: { hollow: { size: "62%" }, dataLabels: { total: { show: true, label: "Total", formatter: () => "62.25%" } } } },
};

export default function RadialChartsPage() {
  return <ConsoleLayout>{<div className="min-w-0 space-y-6">
      <PageHeader title="Radial Charts" />
      <div className="grid min-w-0 gap-6 xl:grid-cols-2 [&>*]:min-w-0">
        <ChartCard title="Semi Circle 1">
          <RechartsChart type="radialBar" height={300} options={{ colors: ["var(--chart-1)"], labels: ["Sales"], plotOptions: { radialBar: { startAngle: 180, endAngle: 0, hollow: { size: "55%" }, dataLabels: { value: { show: true, formatter: (value) => `${value.toFixed(2)}%` } } } } }} series={[75.55]} />
        </ChartCard>
        <ChartCard title="Semi Circle 2">
          <RechartsChart type="radialBar" height={240} options={{ colors: ["var(--chart-1)", "var(--chart-2)", "var(--muted-foreground)"], labels: ["Completed", "Pending", "Remaining"], plotOptions: { radialBar: { startAngle: 180, endAngle: 0, hollow: { size: "35%" }, dataLabels: { total: { show: true, label: "Total Job", formatter: () => "120" } } } } }} series={[64, 28, 32]} />
          <div className="flex justify-center gap-6 pt-2 text-sm font-semibold tabular-nums text-foreground"><span className="flex items-center gap-2"><i className="h-4 w-1 rounded-full bg-chart-1" />64</span><span className="flex items-center gap-2"><i className="h-4 w-1 rounded-full bg-chart-2" />28</span><span className="flex items-center gap-2"><i className="h-4 w-1 rounded-full bg-muted-foreground" />32</span></div>
        </ChartCard>
        <ChartCard title="Basic Radial">
          <RechartsChart type="radialBar" height={300} options={compactOptions} series={[78]} />
        </ChartCard>
        <ChartCard title="Semi Circle 3">
          <RechartsChart type="radialBar" height={300} options={{ colors: ["var(--chart-1)", "var(--chart-4)", "var(--chart-5)"], labels: ["Salary", "Benefits", "Bonus"], plotOptions: { radialBar: { startAngle: 180, endAngle: 0, hollow: { size: "35%" }, dataLabels: { total: { show: true, label: "Salary", formatter: () => " " } } } } }} series={[92, 82, 70]} />
        </ChartCard>
        <ChartCard title="Multiple">
          <RechartsChart type="radialBar" height={300} options={{ colors: ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)"], labels: ["Mobile", "Tablet", "Desktop", "Other"], plotOptions: { radialBar: { hollow: { size: "28%" }, dataLabels: { total: { show: true, label: "Total", formatter: () => "62.25%" } } } } }} series={[62, 48, 74, 58]} />
        </ChartCard>
        <ChartCard title="Custom Angle Circle">
          <RechartsChart type="radialBar" height={300} options={{ colors: ["var(--chart-1)", "var(--chart-2)", "var(--chart-4)"], labels: ["Availability", "Success", "Capacity"], legend: { show: true }, plotOptions: { radialBar: { startAngle: 225, endAngle: -45, hollow: { size: "34%" } } } }} series={[99, 94, 72]} />
        </ChartCard>
      </div>
    </div>}</ConsoleLayout>;
}
