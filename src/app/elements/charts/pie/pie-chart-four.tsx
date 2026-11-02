"use client";

import { ChartCard } from "@/app/elements/charts/showcase-chart-card";
import { RechartsChart } from "@/components/application/charts/recharts-chart";

const labels = ["Image", "Video", "Audio", "Documents"];

export default function PieChartFour() {
  return (
    <ChartCard title="Pie Chart 4">
      <RechartsChart
        type="pie"
        height={290}
        options={{
          labels,
          colors: ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)"],
          legend: { show: true },
          plotOptions: { pie: {} },
          tooltip: { y: { formatter: (value) => `${value}%` } },
        }}
        series={[48, 29, 15, 8]}
      />
    </ChartCard>
  );
}
