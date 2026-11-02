import ConsoleLayout from "@/components/application/app-shell/console-layout";

export const metadata = { title: "Empty States" };




import { PageHeader } from "@/components/application/app-shell/page-header";
import { EmptyStatesGrid } from "@/app/blocks/empty-states/empty-states-grid";



export default function EmptyStatesPage() {
  return <ConsoleLayout>{<div className="space-y-6">
      <PageHeader
        title="Empty States"
      />

      <EmptyStatesGrid />
    </div>}</ConsoleLayout>;
}
