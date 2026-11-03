import ConsoleLayout from "@/components/application/app-shell/console-layout";

import { CompactPageHeader as PageHeader } from "@/components/application/app-shell/page-header";
import { SignInLayoutPreviews } from "@/components/application/auth/sign-in-layout-cards";

export default function SignInCardPage() {
  return <ConsoleLayout>{<div className="mx-auto w-full max-w-[1040px] space-y-8">
      <PageHeader title="Sign In" />
      <SignInLayoutPreviews />
    </div>}</ConsoleLayout>;
}
