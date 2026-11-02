"use client";

import { RechartsChart } from "@/components/application/charts/recharts-chart";

import { ChartCard } from "@/app/elements/charts/showcase-chart-card";

const config = {
  shipments: { label: "Shipment", color: "var(--chart-1)" },
  transit: { label: "In Transit", color: "var(--chart-2)" },
  delivery: { label: "Delivery", color: "var(--chart-3)" },
} satisfies Record<string, { label: string; color: string }>;
const points = [
  { month: "Jan", shipments: 50, transit: 120, delivery: 40 }, { month: "Feb", shipments: 75, transit: 140, delivery: 50 },
  { month: "Mar", shipments: 80, transit: 190, delivery: 42 }, { month: "Apr", shipments: 78, transit: 185, delivery: 30 },
  { month: "May", shipments: 48, transit: 118, delivery: 40 }, { month: "Jun", shipments: 90, transit: 140, delivery: 58 },
  { month: "Jul", shipments: 92, transit: 140, delivery: 58 }, { month: "Aug", shipments: 115, transit: 200, delivery: 72 },
  { month: "Sep", shipments: 48, transit: 118, delivery: 40 }, { month: "Oct", shipments: 115, transit: 200, delivery: 72 },
  { month: "Nov", shipments: 100, transit: 170, delivery: 60 }, { month: "Dec", shipments: 50, transit: 118, delivery: 40 },
];

export default function BarChartThree() {
  return <ChartCard title="Bar Chart 3">
    <div className="mb-5 flex items-center gap-5">{Object.entries(config).map(([key, item]) => <div key={key} className="flex items-center gap-1.5"><span className="size-2 rounded-xs" style={{ backgroundColor: item.color }} /><span className="text-sm font-medium text-muted-foreground">{item.label}</span></div>)}</div>
    <RechartsChart type="bar" height={270} options={{
      chart: { toolbar: { show: false }, fontFamily: "inherit", background: "transparent" },
      colors: [config.shipments.color, config.transit.color, config.delivery.color], plotOptions: { bar: { borderRadius: 4, columnWidth: "38%" } },
      dataLabels: { enabled: false }, grid: { borderColor: "var(--border)", strokeDashArray: 3 },
      xaxis: { categories: points.map(({ month }) => month), axisBorder: { show: false }, axisTicks: { show: false } },
      yaxis: { min: 0, max: 220, tickAmount: 4 },
      tooltip: { y: { formatter: (value) => String(value) } }, legend: { show: false },
    }} series={[
      { name: config.shipments.label, data: points.map(({ shipments }) => shipments) },
      { name: config.transit.label, data: points.map(({ transit }) => transit) },
      { name: config.delivery.label, data: points.map(({ delivery }) => delivery) },
    ]} />
  </ChartCard>;
}
