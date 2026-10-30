import { PageHeader } from "@/components/feature/layout/PageHeader";
import LineChartOne from "@/app/[locale]/(app)/examples/charts/line/_components/LineChartOne";
import LineChartTwo from "@/app/[locale]/(app)/examples/charts/line/_components/LineChartTwo";
import LineChartThree from "@/app/[locale]/(app)/examples/charts/line/_components/LineChartThree";
import LineChartFour from "@/app/[locale]/(app)/examples/charts/line/_components/LineChartFour";

export default function LineChartsPage() {
  return <div className="space-y-5"><PageHeader title="Line Charts" /><div className="space-y-5"><LineChartOne /><LineChartTwo /><LineChartThree /><LineChartFour /></div></div>;
}
