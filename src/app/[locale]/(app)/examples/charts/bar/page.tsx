import { PageHeader } from "@/components/feature/layout/PageHeader";
import BarChartOne from "@/app/[locale]/(app)/examples/charts/bar/_components/BarChartOne";
import BarChartTwo from "@/app/[locale]/(app)/examples/charts/bar/_components/BarChartTwo";
import BarChartThree from "@/app/[locale]/(app)/examples/charts/bar/_components/BarChartThree";
import BarChartFour from "@/app/[locale]/(app)/examples/charts/bar/_components/BarChartFour";
import BarChartFive from "@/app/[locale]/(app)/examples/charts/bar/_components/BarChartFive";

export default function BarChartsPage() {
  return (
    <div className="min-w-0 space-y-5">
      <PageHeader title="Bar Charts" />
      <div className="grid min-w-0 gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <BarChartOne />
        <BarChartTwo />
        <BarChartThree />
        <BarChartFour />
        <BarChartFive />
      </div>
    </div>
  );
}
