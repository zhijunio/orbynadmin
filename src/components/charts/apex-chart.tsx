"use client";

import dynamic from "next/dynamic";
import type {
  ApexAxisChartSeries,
  ApexNonAxisChartSeries,
  ApexOptions,
} from "apexcharts";
import { useThemeConfigStore } from "@/stores/theme-config-store";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
  loading: () => <div className="h-full min-h-48 animate-pulse rounded-md bg-muted/40" />,
});

type ChartType =
  | "area"
  | "bar"
  | "line"
  | "pie"
  | "donut"
  | "radialBar"
  | "radar";

export function ApexChart({
  options,
  series,
  type,
  height,
  className,
}: {
  options: ApexOptions;
  series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  type: ChartType;
  height: number;
  className?: string;
}) {
  const themeReady = useThemeConfigStore((state) => state.hydrated);

  if (!themeReady) {
    return <div aria-hidden="true" style={{ height }} className={`w-full animate-pulse rounded-md bg-muted/40 ${className ?? ""}`} />;
  }

  return (
    <div className={className}>
      <ReactApexChart
        options={options}
        series={series}
        type={type}
        height={height}
        width="100%"
      />
    </div>
  );
}
