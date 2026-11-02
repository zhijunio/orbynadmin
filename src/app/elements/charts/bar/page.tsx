import ConsoleLayout from "@/components/application/app-shell/console-layout";

import { CompactPageHeader as PageHeader } from "@/components/application/app-shell/page-header";
import BarChartOne from "@/app/elements/charts/bar/bar-chart-one";
import BarChartTwo from "@/app/elements/charts/bar/bar-chart-two";
import BarChartThree from "@/app/elements/charts/bar/bar-chart-three";
import BarChartFour from "@/app/elements/charts/bar/bar-chart-four";
import BarChartFive from "@/app/elements/charts/bar/bar-chart-five";
import BarChartSix from "@/app/elements/charts/bar/bar-chart-six";
import BarChartSeven from "@/app/elements/charts/bar/bar-chart-seven";

export default function BarChartsPage() {
  return <ConsoleLayout>{<div className="min-w-0 space-y-6">
      <PageHeader title="Bar Charts" />
      <div className="grid min-w-0 gap-6 xl:grid-cols-2 [&>*]:min-w-0">
        <div className="min-w-0 xl:col-span-2"><BarChartOne /></div>
        <div className="min-w-0 xl:col-span-2"><BarChartTwo /></div>
        <div className="min-w-0 xl:col-span-2"><BarChartThree /></div>
        <BarChartFour />
        <BarChartFive />
        <BarChartSix />
        <BarChartSeven />
      </div>
    </div>}</ConsoleLayout>;
}
