"use client";

import ConsoleLayout from "@/components/application/app-shell/console-layout";

import { useTranslations } from "next-intl";

import { CompactPageHeader as PageHeader } from "@/components/application/app-shell/page-header";
import { FlowTabs } from "@/components/application/auth/mfa-flow-tabs";
import { RecoveryPhraseBindingCard, RecoveryPhraseChallengeCard } from "@/components/application/auth/mfa-cards";

export default function RecoveryPhraseMfaPage() {
  const t = useTranslations("Blocks.auth");

  return <ConsoleLayout>{<div className="mx-auto w-full max-w-[1040px] space-y-8">
      <PageHeader title="Recovery Phrase" />
      <FlowTabs label={t("mfaFlowTabs")} firstLabel={t("bindingTab")} secondLabel={t("challengeTab")} first={<RecoveryPhraseBindingCard />} second={<RecoveryPhraseChallengeCard />} />
    </div>}</ConsoleLayout>;
}
