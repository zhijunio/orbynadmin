import ConsoleLayout from "@/components/application/app-shell/console-layout";

import { CompactPageHeader as PageHeader } from "@/components/application/app-shell/page-header";
import { SignInWithArtworkCard } from "@/components/application/auth/sign-in-layout-cards";

export default function SignInArtworkExamplePage() {
  return <ConsoleLayout>{<div className="mx-auto w-full max-w-[1040px] space-y-8">
      <PageHeader title="Split with artwork" />
      <SignInWithArtworkCard />
    </div>}</ConsoleLayout>;
}
