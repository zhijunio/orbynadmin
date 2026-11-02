"use client";

import { ChartCard } from "@/app/elements/charts/showcase-chart-card";
import { RechartsChart } from "@/components/application/charts/recharts-chart";

const labels = ["Email", "Social Media", "Mobile", "Direct", "Other"];

export default function PieChartFive() {
  return (
    <ChartCard title="Pie Chart 5">
      <RechartsChart
        type="donut"
        height={290}
        options={{
          labels,
          colors: ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"],
          legend: { show: true },
          plotOptions: { pie: { donut: { size: "62%" }, startAngle: 180, endAngle: 0, offsetY: 12 } },
          tooltip: { y: { formatter: (value) => `${value}%` } },
        }}
        series={[31, 24, 19, 15, 11]}
      />
    </ChartCard>
  );
}
