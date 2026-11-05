import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { InputOtpCatalogExamples } from "@/app/components/input-otp/input-otp-catalog-examples";
import { PageHeader } from "@/components/custom/docs/page-header";
import { CatalogPageGrid } from "@/components/custom/docs/catalog-sections";

export const metadata = { title: "Input OTP" };

export default function InputOtpPage() {
  return (
    <AppShell>
      <div className="min-w-0 space-y-5">
        <PageHeader title="Input OTP" />
        <CatalogPageGrid>
        <InputOtpCatalogExamples />
        </CatalogPageGrid>
      </div>
    </AppShell>
  );
}
