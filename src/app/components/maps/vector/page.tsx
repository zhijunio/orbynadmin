import ConsoleLayout from "@/components/custom/app-shell/console-layout";
import { CompactPageHeader as PageHeader } from "@/components/custom/app-shell/page-header";
import { VectorMapExamples } from "@/components/custom/maps/vector-map-examples";

export const metadata = { title: "Vector Map" };

export default function VectorMapPage() {
  return (
    <ConsoleLayout>
      <div className="space-y-6">
        <PageHeader title="Vector Map" />
        <VectorMapExamples />
      </div>
    </ConsoleLayout>
  );
}
