"use client";

import { RechartsChart } from "@/components/application/charts/recharts-chart";

import { ChartCard } from "@/app/elements/charts/showcase-chart-card";

const categories = ["Jan", "Feb", "Mar", "Apr", "May"];

export default function BarChartFour() {
  return (
    <ChartCard title="Bar Chart 4">
      <RechartsChart
        type="bar"
        height={250}
        options={{
          colors: ["var(--chart-1)", "var(--muted-foreground)"],
          plotOptions: { bar: { horizontal: true, barHeight: "52%" } },
          grid: { borderColor: "var(--border)", strokeDashArray: 3 },
          xaxis: { categories, min: 0, max: 700, tickAmount: 7 },
          yaxis: { min: 0 },
          legend: { show: true },
        }}
        series={[
          { name: "Category A", data: [610, 530, 490, 465, 600] },
          { name: "Category B", data: [560, 580, 510, 560, 470] },
        ]}
      />
    </ChartCard>
  );
}
