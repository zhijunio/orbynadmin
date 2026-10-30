import { PageHeader } from "@/components/feature/layout/PageHeader";
import { LoadingStatesExample } from "./loading-states-example";

export const metadata = { title: "Loading & Error States" };

export default function LoadingStatesPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Loading & Error States" />
      <LoadingStatesExample />
    </div>
  );
}
