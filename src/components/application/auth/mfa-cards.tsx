"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import { AuthPanel, AuthSwitch, Field } from "@/components/application/auth/auth-panel";
import { Button } from "@/components/base/buttons/button";
import { CodeDeliveryInput } from "@/components/base/input/code-delivery-input";
import { InputOtp } from "@/components/base/input-otp/input-otp";
import { Label } from "@/components/base/input/label";
import { Textarea } from "@/components/base/textarea/textarea";

function ContactBindingCard({ channel }: { channel: "email" | "phone" }) {
  const t = useTranslations("Blocks.auth");
  const [recipient, setRecipient] = useState("");
  const [started, setStarted] = useState(false);
  const [bound, setBound] = useState(false);
  const [code, setCode] = useState("");
  const isEmail = channel === "email";
  const valid = isEmail
    ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipient.trim())
    : recipient.replace(/\D/g, "").length >= 7;

  return (
    <AuthPanel title={isEmail ? t("bindEmailTitle") : t("bindPhoneTitle")} description={isEmail ? t("bindEmailDescription") : t("bindPhoneDescription")}>
      <CodeDeliveryInput
        id={isEmail ? "mfa-bind-email" : "mfa-bind-phone"}
        label={isEmail ? t("email") : t("phoneNumber")}
        type={isEmail ? "email" : "tel"}
        placeholder={isEmail ? "you@company.com" : "+1 555 010 0142"}
        autoComplete={isEmail ? "email" : "tel"}
        value={recipient}
        onValueChange={(value) => { setRecipient(value); setCode(""); }}
        onSend={() => { setStarted(true); setCode(""); }}
        disabled={bound}
        canSend={valid}
        cooldownSeconds={60}
        sendLabel={t("sendCode")}
        resendLabel={t("resendCode")}
        countdownLabel={(seconds) => t("resendInSeconds", { seconds })}
      />
      {started && !bound && (
        <div className="space-y-2">
          <Label>{t("verificationCode")}</Label>
          <InputOtp value={code} onChange={setCode} length={6} aria-label={t("verificationCode")} digitAriaLabel={(digit, total) => t("digit", { digit, total })} className="justify-center py-2" />
        </div>
      )}
      {started && !bound && <Button className="w-full" disabled={code.length !== 6} onClick={() => setBound(true)}>{t("confirmBinding")}</Button>}
      {bound && <p className="text-center text-sm text-muted-foreground">{t("bindingCompleteDescription")}</p>}
      <p className="text-center text-xs text-muted-foreground">{t("mfaDemoNotice")}</p>
    </AuthPanel>
  );
}

export function EmailBindingCard() { return <ContactBindingCard channel="email" />; }
export function PhoneBindingCard() { return <ContactBindingCard channel="phone" />; }

function CodeChallengeCard({ channel }: { channel: "email" | "sms" | "totp" }) {
  const t = useTranslations("Blocks.auth");
  const [code, setCode] = useState("");
  const title = channel === "totp" ? t("authenticatorCode") : t("verificationCode");
  const description = channel === "email" ? t("mfaEmailDescription") : channel === "sms" ? t("mfaSmsDescription") : t("mfaDescription");

  return (
    <AuthPanel title={channel === "totp" ? t("mfaTitle") : t("mfaCodeTitle")} description={description}>
      <div className="space-y-2">
        <Label>{title}</Label>
        <InputOtp value={code} onChange={setCode} length={6} aria-label={title} digitAriaLabel={(digit, total) => t("digit", { digit, total })} className="justify-center py-2" />
      </div>
      <Button className="w-full" disabled={code.length !== 6}>{t("verifyIdentity")}</Button>
      {channel !== "totp" && <AuthSwitch lead={t("noCode")} action={t("resend")} onClick={() => setCode("")} />}
      <p className="text-center text-xs text-muted-foreground">{t("mfaDemoNotice")}</p>
    </AuthPanel>
  );
}

export function EmailChallengeCard() { return <CodeChallengeCard channel="email" />; }
export function SmsChallengeCard() { return <CodeChallengeCard channel="sms" />; }
export function AuthenticatorChallengeCard() { return <CodeChallengeCard channel="totp" />; }

export function RecoveryCodeChallengeCard() {
  const t = useTranslations("Blocks.auth");
  const [code, setCode] = useState("");
  return (
    <AuthPanel title={t("recoveryTitle")} description={t("recoveryDescription")}>
      <Field id="mfa-recovery-code" label={t("recoveryCode")} placeholder={t("recoveryCodePlaceholder")} autoComplete="one-time-code" value={code} onChange={(event) => setCode(event.target.value)} />
      <Button className="w-full" disabled={code.trim().length < 8}>{t("verifyIdentity")}</Button>
      <p className="text-center text-xs text-muted-foreground">{t("recoveryCodesHint")}</p>
    </AuthPanel>
  );
}

export function RecoveryPhraseChallengeCard() {
  const t = useTranslations("Blocks.auth");
  const [phrase, setPhrase] = useState("");
  const wordCount = phrase.trim().split(/\s+/).filter(Boolean).length;
  return (
    <AuthPanel title={t("recoveryPhraseTitle")} description={t("recoveryPhraseDescription")}>
      <div className="space-y-2">
        <Label htmlFor="mfa-recovery-phrase">{t("recoveryPhrase")}</Label>
        <Textarea id="mfa-recovery-phrase" rows={3} value={phrase} onChange={(event) => setPhrase(event.target.value)} placeholder={t("recoveryPhrasePlaceholder")} autoComplete="off" />
      </div>
      <Button className="w-full" disabled={wordCount < 12}>{t("verifyIdentity")}</Button>
      <p className="text-center text-xs text-muted-foreground">{t("mfaDemoNotice")}</p>
    </AuthPanel>
  );
}

const recoveryCodes = ["4821-7395", "1604-8273", "9538-2146", "6712-4089", "3057-9614", "8249-5301"];

export function RecoveryCodeBindingCard() {
  const t = useTranslations("Blocks.auth");
  return (
    <AuthPanel title={t("recoveryCodesTitle")} description={t("recoveryCodesDescription")}>
      <div className="grid grid-cols-2 gap-2 rounded-xl border bg-muted/40 p-4 font-mono text-sm tabular-nums">{recoveryCodes.map((code) => <code key={code}>{code}</code>)}</div>
      <p className="text-xs leading-5 text-muted-foreground">{t("recoveryCodesHint")}</p>
    </AuthPanel>
  );
}

export function RecoveryPhraseBindingCard() {
  const t = useTranslations("Blocks.auth");
  const [created, setCreated] = useState(false);
  return (
    <AuthPanel title={t("recoveryPhraseTitle")} description={t("recoveryPhraseSetupDescription")}>
      {created ? <div className="rounded-xl border bg-muted/40 p-4 text-sm leading-7">{t("recoveryPhraseSample")}</div> : <p className="text-sm text-muted-foreground">{t("recoveryPhraseSetupHint")}</p>}
      <Button className="w-full" onClick={() => setCreated(true)}>{created ? t("recoveryPhraseCreated") : t("createRecoveryPhrase")}</Button>
      <p className="text-xs leading-5 text-muted-foreground">{t("mfaDemoNotice")}</p>
    </AuthPanel>
  );
}

export function AuthenticatorSetupCard() {
  const t = useTranslations("Blocks.auth");
  const [step, setStep] = useState<"pair" | "verify" | "recovery" | "complete">("pair");
  const [code, setCode] = useState("");
  const stepIndex = { pair: 0, verify: 1, recovery: 2, complete: 3 }[step];
  const steps = [t("setupStepOne"), t("setupStepTwo"), t("setupStepThree")];
  const progress = (
    <ol className="grid grid-cols-3 gap-2" aria-label={t("setupProgress")}>
      {steps.map((label, index) => <li key={label} className={`rounded-lg px-2 py-2 text-center text-xs ${index <= stepIndex ? "bg-primary/10 font-medium text-foreground" : "bg-muted text-muted-foreground"}`}><span className="mb-1 block tabular-nums">{index + 1}</span>{label}</li>)}
    </ol>
  );

  if (step === "pair") return <AuthPanel title={t("mfaSetupTitle")} description={t("mfaSetupDescription")}>{progress}<div className="space-y-2 rounded-xl border bg-muted/40 p-4"><p className="text-xs font-medium text-muted-foreground">{t("setupKeyLabel")}</p><code className="block break-all text-sm font-semibold tracking-[0.12em]">JBSWY3DPEHPK3PXP</code></div><p className="text-xs leading-5 text-muted-foreground">{t("setupKeyHint")}</p><Button className="w-full" onClick={() => setStep("verify")}>{t("continueSetup")}</Button></AuthPanel>;
  if (step === "verify") return <AuthPanel title={t("confirmAuthenticatorTitle")} description={t("confirmAuthenticatorDescription")}>{progress}<div className="space-y-2"><Label>{t("authenticatorCode")}</Label><InputOtp value={code} onChange={setCode} length={6} aria-label={t("authenticatorCode")} digitAriaLabel={(digit, total) => t("digit", { digit, total })} className="justify-center py-2" /></div><Button className="w-full" disabled={code.length !== 6} onClick={() => setStep("recovery")}>{t("continueSetup")}</Button><AuthSwitch lead="" action={t("backToSetupKey")} onClick={() => setStep("pair")} /></AuthPanel>;
  if (step === "recovery") return <AuthPanel title={t("recoveryCodesTitle")} description={t("recoveryCodesDescription")}>{progress}<div className="grid grid-cols-2 gap-2 rounded-xl border bg-muted/40 p-4 font-mono text-sm tabular-nums">{recoveryCodes.map((recovery) => <code key={recovery}>{recovery}</code>)}</div><p className="text-xs leading-5 text-muted-foreground">{t("recoveryCodesHint")}</p><Button className="w-full" onClick={() => setStep("complete")}>{t("finishSetup")}</Button></AuthPanel>;
  return <AuthPanel title={t("mfaSetupComplete")} description={t("mfaSetupCompleteDescription")}>{progress}<Button className="w-full" onClick={() => setStep("pair")}>{t("setupAgain")}</Button></AuthPanel>;
}
