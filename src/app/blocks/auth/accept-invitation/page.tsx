"use client";

import ConsoleLayout from "@/components/application/app-shell/console-layout";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import { CompactPageHeader as PageHeader } from "@/components/application/app-shell/page-header";
import { AuthPanel, AuthSwitch } from "@/components/application/auth/auth-panel";
import { Button } from "@/components/base/buttons/button";

export default function AcceptInvitationExamplePage() {
  const t = useTranslations("Blocks.auth");
  const router = useRouter();
  const [status, setStatus] = useState<"pending" | "accepted" | "declined">("pending");

  return <ConsoleLayout>{<div className="mx-auto w-full max-w-[1040px] space-y-8">
      <PageHeader title="Accept Invitation" />
      <AuthPanel
        title={status === "pending" ? t("acceptInvitationTitle") : status === "accepted" ? t("invitationAcceptedTitle") : t("invitationDeclinedTitle")}
        description={status === "pending" ? t("acceptInvitationDescription") : status === "accepted" ? t("invitationAcceptedDescription") : t("invitationDeclinedDescription")}
      >
        <div className="rounded-xl border bg-muted/40 p-4 text-sm">
          <p className="font-medium">{t("invitationWorkspace")}</p>
          <p className="mt-2 text-xs text-muted-foreground">{t("invitationEmail")}</p>
          <p className="mt-1 text-muted-foreground">{t("invitedBy")}</p>
          <p className="mt-3 text-xs text-muted-foreground">{t("invitationRole")}</p>
          <p className="mt-1 font-medium">{t("invitationRoleValue")}</p>
          <p className="mt-3 text-xs text-muted-foreground">{t("invitationExpires")}</p>
        </div>
        {status === "pending" ? (
          <div className="space-y-3">
            <Button className="w-full" onClick={() => setStatus("accepted")}>{t("acceptInvitation")}</Button>
            <Button variant="outline" className="w-full" onClick={() => setStatus("declined")}>{t("declineInvitation")}</Button>
          </div>
        ) : (
          <Button className="w-full" onClick={() => router.push("/login")}>
            {status === "accepted" ? t("continueToSignIn") : t("backToSignIn")}
          </Button>
        )}
        {status === "pending" && <AuthSwitch lead={t("newHere")} action={t("createAccount")} onClick={() => router.push("/blocks/auth/invited-sign-up")} />}
        <p className="text-center text-xs leading-5 text-muted-foreground">{t("invitationDemoNotice")}</p>
      </AuthPanel>
    </div>}</ConsoleLayout>;
}
