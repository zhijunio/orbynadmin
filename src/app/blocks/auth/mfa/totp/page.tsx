"use client";

import ConsoleLayout from "@/components/application/app-shell/console-layout";

import { useTranslations } from "next-intl";

import { CompactPageHeader as PageHeader } from "@/components/application/app-shell/page-header";
import { ComponentPreview } from "@/components/application/docs/component-preview";
import { AuthenticatorSetupCard, AuthenticatorChallengeCard } from "@/components/application/auth/mfa-cards";

export default function TotpMfaPage() {
  const t = useTranslations("Blocks.auth");

  return <ConsoleLayout>{<div className="mx-auto w-full max-w-[1040px] space-y-8">
      <PageHeader title="Authenticator" />
      <div className="grid gap-5 lg:grid-cols-2">
        <ComponentPreview title={t("bindingTab")}><AuthenticatorSetupCard /></ComponentPreview>
        <ComponentPreview title={t("challengeTab")}><AuthenticatorChallengeCard /></ComponentPreview>
      </div>
    </div>}</ConsoleLayout>;
}
