"use client";

import ConsoleLayout from "@/components/application/app-shell/console-layout";

import { useTranslations } from "next-intl";

import { CompactPageHeader as PageHeader } from "@/components/application/app-shell/page-header";
import { ComponentPreview } from "@/components/application/docs/component-preview";
import { RecoveryPhraseBindingCard, RecoveryPhraseChallengeCard } from "@/components/application/auth/mfa-cards";

export default function RecoveryPhraseMfaPage() {
  const t = useTranslations("Blocks.auth");

  return <ConsoleLayout>{<div className="mx-auto w-full max-w-[1040px] space-y-8">
      <PageHeader title="Recovery Phrase" />
      <div className="grid gap-5 lg:grid-cols-2">
        <ComponentPreview title={t("bindingTab")}><RecoveryPhraseBindingCard /></ComponentPreview>
        <ComponentPreview title={t("challengeTab")}><RecoveryPhraseChallengeCard /></ComponentPreview>
      </div>
    </div>}</ConsoleLayout>;
}
