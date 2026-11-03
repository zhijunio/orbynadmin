import ConsoleLayout from "@/components/custom/app-shell/console-layout";

import { CompactPageHeader as PageHeader } from "@/components/custom/app-shell/page-header";
import PieChartOne from "@/app/components/charts/pie/pie-chart-one";
import PieChartTwo from "@/app/components/charts/pie/pie-chart-two";
import PieChartThree from "@/app/components/charts/pie/pie-chart-three";
import PieChartFour from "@/app/components/charts/pie/pie-chart-four";
import PieChartFive from "@/app/components/charts/pie/pie-chart-five";

export default function PieChartsPage() {
  return <ConsoleLayout>{<div className="min-w-0 space-y-6"><PageHeader title="Pie Charts" /><div className="grid min-w-0 gap-6 xl:grid-cols-2 [&>*]:min-w-0"><PieChartOne /><PieChartTwo /><PieChartThree /><PieChartFour /><PieChartFive /></div></div>}</ConsoleLayout>;
}
