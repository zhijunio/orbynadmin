"use client";

import { useMemo } from "react";
import type { ApexOptions } from "apexcharts";
import { ApexChart } from "@/components/charts/apex-chart";

export function CryptoAllocationChart({ data, total }: { data: { name: string; value: number; fill: string }[]; total: number }) {
  const options = useMemo<ApexOptions>(() => ({
    chart: { type: "donut", fontFamily: "inherit", background: "transparent", toolbar: { show: false } },
    colors: data.map(({ fill }) => fill),
    labels: data.map(({ name }) => name),
    dataLabels: { enabled: false },
    stroke: { width: 3, colors: ["var(--card)"] },
    legend: { show: false },
    plotOptions: { pie: { donut: { size: "68%", labels: { show: true, name: { show: false }, value: { show: false }, total: { show: true, label: "Total value", formatter: () => `$${(total / 1000).toFixed(1)}k`, color: "var(--foreground)" } } } } },
    tooltip: { y: { formatter: (value) => `$${Number(value ?? 0).toLocaleString()}` } },
  }), [data, total]);

  return <ApexChart options={options} series={data.map(({ value }) => value)} type="donut" height={220} />;
}
