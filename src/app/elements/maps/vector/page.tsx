import ConsoleLayout from "@/components/application/app-shell/console-layout";
import { CompactPageHeader as PageHeader } from "@/components/application/app-shell/page-header";
import { VectorMapExamples } from "@/components/application/maps/vector-map-examples";

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
