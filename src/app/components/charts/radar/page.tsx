import ConsoleLayout from "@/components/custom/app-shell/console-layout";

import { ChartCard } from "@/app/components/charts/showcase-chart-card";
import { CompactPageHeader as PageHeader } from "@/components/custom/app-shell/page-header";
import { RechartsChart } from "@/components/custom/charts/recharts-chart";

const quality = ["Estonia", "Germany", "France", "Spain", "Italy", "Canada"];

export default function RadarChartsPage() {
  return <ConsoleLayout>{<div className="min-w-0 space-y-6">
      <PageHeader title="Radar Charts" />
      <div className="grid min-w-0 gap-6 xl:grid-cols-2 [&>*]:min-w-0">
        <ChartCard title="Radar Chart 1">
          <RechartsChart type="radar" height={300} options={{ xaxis: { categories: quality }, yaxis: { min: 0, max: 9, tickAmount: 7 }, colors: ["var(--chart-1)"], fill: { opacity: 0.2 }, legend: { show: false } }} series={[{ name: "Series", data: [3, 9, 2, 5, 1, 2] }]} />
        </ChartCard>
        <ChartCard title="Radar Chart 2">
          <RechartsChart type="radar" height={340} options={{ xaxis: { categories: ["January", "February", "March", "April", "May", "June", "July"] }, yaxis: { min: 0, max: 90, tickAmount: 9 }, colors: ["var(--chart-1)", "var(--chart-4)"], fill: { opacity: 0.18 }, legend: { show: true } }} series={[{ name: "Desktop", data: [60, 70, 62, 14, 25, 57, 60] }, { name: "Mobile", data: [55, 50, 50, 12, 60, 45, 50] }]} />
        </ChartCard>
        <ChartCard title="Radar Chart 3">
          <RechartsChart type="radar" height={300} options={{ xaxis: { categories: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] }, yaxis: { min: 0, max: 140, tickAmount: 7 }, dataLabels: { enabled: true }, colors: ["var(--chart-1)"], fill: { opacity: 0.2 }, legend: { show: false } }} series={[{ name: "Activity", data: [20, 100, 40, 30, 60, 80, 33] }]} />
        </ChartCard>
      </div>
    </div>}</ConsoleLayout>;
}
