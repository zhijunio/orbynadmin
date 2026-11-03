"use client";

import ConsoleLayout from "@/components/application/app-shell/console-layout";

import { useTranslations } from "next-intl";

import { CompactPageHeader as PageHeader } from "@/components/application/app-shell/page-header";
import { ComponentPreview } from "@/components/application/docs/component-preview";
import { RecoveryCodeBindingCard, RecoveryCodeChallengeCard } from "@/components/application/auth/mfa-cards";

export default function RecoveryCodeMfaPage() {
  const t = useTranslations("Blocks.auth");

  return <ConsoleLayout>{<div className="mx-auto w-full max-w-[1040px] space-y-8">
      <PageHeader title="One-time Recovery Code" />
      <div className="grid gap-5 lg:grid-cols-2">
        <ComponentPreview title={t("bindingTab")}><RecoveryCodeBindingCard /></ComponentPreview>
        <ComponentPreview title={t("challengeTab")}><RecoveryCodeChallengeCard /></ComponentPreview>
      </div>
    </div>}</ConsoleLayout>;
}
