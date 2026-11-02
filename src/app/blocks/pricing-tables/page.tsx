import ConsoleLayout from "@/components/application/app-shell/console-layout";
import { PricingTablesPage } from "@/components/application/pricing/pricing-tables-page";

export default function PricingTablesRoute() {
  return (
    <ConsoleLayout>
      <PricingTablesPage />
    </ConsoleLayout>
  );
}
