"use client";

import { RechartsChart } from "@/components/application/charts/recharts-chart";

import { ChartCard } from "@/app/elements/charts/showcase-chart-card";

const points = [
  { month: "Jan", groupA: 11000, groupB: 5000 }, { month: "Feb", groupA: 8500, groupB: 4500 },
  { month: "Mar", groupA: 12000, groupB: 6000 }, { month: "Apr", groupA: 9500, groupB: 5500 },
  { month: "May", groupA: 11000, groupB: 5000 }, { month: "Jun", groupA: 9000, groupB: 4000 },
  { month: "Jul", groupA: 10000, groupB: 5000 }, { month: "Aug", groupA: 10500, groupB: 5000 },
  { month: "Sep", groupA: 7500, groupB: 4500 }, { month: "Oct", groupA: 11500, groupB: 5500 },
  { month: "Nov", groupA: 8500, groupB: 4000 }, { month: "Dec", groupA: 11500, groupB: 5500 },
];

const config = { income: { label: "Income", color: "var(--chart-1)" }, expense: { label: "Expense", color: "var(--chart-2)" } } satisfies Record<string, { label: string; color: string }>;

export default function BarChartTwo() {
  return <ChartCard title="Bar Chart 2"><div className="flex flex-col gap-5">
    <div className="flex items-center justify-end gap-5 text-sm font-medium text-muted-foreground">{Object.entries(config).map(([key, item]) => <span key={key} className="flex items-center gap-1.5"><i className="size-2 rounded-full" style={{ backgroundColor: item.color }} />{item.label}</span>)}</div>
    <RechartsChart type="bar" height={270} options={{
      chart: { stacked: true, toolbar: { show: false }, fontFamily: "inherit", background: "transparent" },
      colors: [config.income.color, config.expense.color], plotOptions: { bar: { borderRadius: 4, columnWidth: "45%", borderRadiusApplication: "end" } },
      dataLabels: { enabled: false }, grid: { borderColor: "var(--border)", strokeDashArray: 3 },
      xaxis: { categories: points.map(({ month }) => month), axisBorder: { show: false }, axisTicks: { show: false } },
      yaxis: { min: 0, max: 20000, tickAmount: 4, labels: { formatter: (value) => value === 0 ? "0" : `${value / 1000}K` } },
      tooltip: { y: { formatter: (value) => Number(value ?? 0).toLocaleString() } }, legend: { show: false },
    }} series={[{ name: config.income.label, data: points.map(({ groupA }) => groupA) }, { name: config.expense.label, data: points.map(({ groupB }) => groupB) }]} />
  </div></ChartCard>;
}
