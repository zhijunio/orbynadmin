"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import type { SocialProvider } from "@/components/base/social-button/social-button";

import { Button } from "@/components/base/buttons/button";
import { InputOtp } from "@/components/base/input-otp/input-otp";
import { AuthPanel, AuthSwitch, Divider, Field, SocialProviders } from "@/components/application/auth/auth-panel";
const providers: SocialProvider[] = ["google", "apple", "github", "x"];

function preventSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
}

export function SignUpCard({ standalone = false }: { standalone?: boolean }) {
  const t = useTranslations("Blocks.auth");
  const router = useRouter();
  const signInHref = standalone ? "/login" : "/blocks/auth/sign-in";

  return (
    <AuthPanel title={t("createAccount")} description={t("signUpDescription")}>
      <form className="space-y-4" onSubmit={preventSubmit}>
        <Field id="signup-name" label={t("fullName")} placeholder="Alex Morgan" autoComplete="name" />
        <Field id="signup-email" label={t("email")} type="email" placeholder="you@company.com" autoComplete="email" />
        <Field id="signup-password" label={t("password")} type="password" placeholder={t("passwordPlaceholder")} autoComplete="new-password" />
        <Button className="w-full" type="submit">{t("createAccount")}</Button>
        <p className="text-xs leading-5 text-muted-foreground">{t("termsNote")}</p>
      </form>
      <Divider label={t("orSignUpWith")} />
      <SocialProviders layout="grid" providers={providers} />
      <AuthSwitch lead={t("alreadyHaveAccount")} action={t("signIn")} onClick={() => router.push(signInHref)} />
    </AuthPanel>
  );
}

export function InvitationSignUpCard() {
  const t = useTranslations("Blocks.auth");
  const router = useRouter();
  const [accountCreated, setAccountCreated] = useState(false);

  return (
    <AuthPanel
      title={accountCreated ? t("inviteSignupCompleteTitle") : t("inviteSignupTitle")}
      description={accountCreated ? t("inviteSignupCompleteDescription") : t("inviteSignupDescription")}
    >
      {accountCreated ? (
        <Button className="w-full" onClick={() => router.push("/login")}>{t("continueToSignIn")}</Button>
      ) : (
        <>
          <div className="rounded-xl border bg-muted/40 p-4 text-sm">
            <p className="font-medium">{t("invitedToWorkspace")}</p>
            <p className="mt-1 text-muted-foreground">{t("invitationWorkspace")}</p>
            <p className="mt-2 text-xs text-muted-foreground">{t("invitationEmail")}</p>
            <p className="mt-2 text-xs text-muted-foreground">{t("invitedBy")}</p>
          </div>
          <form className="space-y-4" onSubmit={(event) => { event.preventDefault(); setAccountCreated(true); }}>
            <Field id="invite-signup-name" label={t("fullName")} placeholder="Alex Morgan" autoComplete="name" required />
            <Field id="invite-signup-email" label={t("email")} type="email" value="alex@company.com" readOnly autoComplete="email" />
            <Field id="invite-signup-password" label={t("password")} type="password" placeholder={t("passwordPlaceholder")} autoComplete="new-password" required />
            <Button className="w-full" type="submit">{t("createAccountAndJoin")}</Button>
          </form>
          <AuthSwitch lead={t("alreadyHaveAccount")} action={t("acceptInvitation")} onClick={() => router.push("/blocks/auth/accept-invitation")} />
          <p className="text-center text-xs leading-5 text-muted-foreground">{t("invitationDemoNotice")}</p>
        </>
      )}
    </AuthPanel>
  );
}

export function VerificationCard() {
  const t = useTranslations("Blocks.auth");
  const [code, setCode] = useState("");

  return (
    <AuthPanel title={t("verifyTitle")} description={t("verifyDescription")}>
      <InputOtp value={code} onChange={setCode} length={6} aria-label={t("verificationCode")} digitAriaLabel={(digit, total) => t("digit", { digit, total })} className="justify-center py-2" />
      <Button className="w-full" disabled={code.length !== 6}>{t("verify")}</Button>
      <AuthSwitch lead={t("noCode")} action={t("resend")} onClick={() => setCode("")} />
    </AuthPanel>
  );
}

export function ForgotPasswordCard({ standalone = false }: { standalone?: boolean }) {
  const t = useTranslations("Blocks.auth");
  const router = useRouter();
  const signInHref = standalone ? "/login" : "/blocks/auth/sign-in";

  return (
    <AuthPanel title={t("forgotTitle")} description={t("forgotDescription")}>
      <form className="space-y-4" onSubmit={preventSubmit}>
        <Field id="forgot-email" label={t("email")} type="email" placeholder="you@company.com" autoComplete="email" />
        <Button className="w-full" type="submit">{t("sendResetLink")}</Button>
      </form>
      <AuthSwitch lead="" action={t("backToSignIn")} onClick={() => router.push(signInHref)} />
    </AuthPanel>
  );
}

export function ResetPasswordCard() {
  const t = useTranslations("Blocks.auth");
  const router = useRouter();

  return (
    <AuthPanel title={t("resetTitle")} description={t("resetDescription")}>
      <form className="space-y-4" onSubmit={preventSubmit}>
        <Field id="reset-password" label={t("newPassword")} type="password" autoComplete="new-password" />
        <Field id="reset-confirm" label={t("confirmPassword")} type="password" autoComplete="new-password" />
        <Button className="w-full" type="submit">{t("savePassword")}</Button>
      </form>
      <AuthSwitch lead="" action={t("backToSignIn")} onClick={() => router.push("/blocks/auth/sign-in")} />
    </AuthPanel>
  );
}

export function LockScreenCard() {
  const t = useTranslations("Blocks.auth");
  const router = useRouter();

  return (
    <AuthPanel title={t("lockTitle")} description="alex@company.com">
      <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-muted text-base font-semibold text-muted-foreground" aria-hidden="true">AM</div>
      <form className="space-y-4" onSubmit={preventSubmit}>
        <Field id="lock-password" label={t("password")} type="password" autoComplete="current-password" />
        <Button className="w-full" type="submit">{t("unlock")}</Button>
      </form>
      <AuthSwitch lead="" action={t("switchAccount")} onClick={() => router.push("/blocks/auth/sign-in")} />
    </AuthPanel>
  );
}
