import ConsoleLayout from "@/components/application/app-shell/console-layout";

export const metadata = { title: "Loading & Error States" };




import { CompactPageHeader as PageHeader } from "@/components/application/app-shell/page-header";
import { LoadingStatesExample } from "@/app/blocks/loading-state/loading-states-example";



export default function LoadingStatesPage() {
  return <ConsoleLayout>{<div className="space-y-6">
      <PageHeader title="Loading & Error States" />
      <LoadingStatesExample />
    </div>}</ConsoleLayout>;
}
