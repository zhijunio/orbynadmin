import ConsoleLayout from "@/components/application/app-shell/console-layout";

import { CompactPageHeader as PageHeader } from "@/components/application/app-shell/page-header";
import { InvitationSignUpCard } from "@/components/application/auth/account-flow-cards";

export default function InvitedSignUpExamplePage() {
  return <ConsoleLayout>{<div className="mx-auto w-full max-w-[1040px] space-y-8">
      <PageHeader title="Invitation Sign Up" />
      <InvitationSignUpCard />
    </div>}</ConsoleLayout>;
}
