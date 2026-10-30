import { PageHeader } from "@/components/feature/layout/PageHeader";
import PieChartOne from "@/app/[locale]/(app)/examples/charts/pie/_components/PieChartOne";
import PieChartTwo from "@/app/[locale]/(app)/examples/charts/pie/_components/PieChartTwo";
import PieChartThree from "@/app/[locale]/(app)/examples/charts/pie/_components/PieChartThree";
import PieChartFour from "@/app/[locale]/(app)/examples/charts/pie/_components/PieChartFour";

export default function PieChartsPage() {
  return <div className="space-y-5"><PageHeader title="Pie Charts" /><div className="space-y-5"><PieChartOne /><PieChartTwo /><PieChartThree /><PieChartFour /></div></div>;
}
