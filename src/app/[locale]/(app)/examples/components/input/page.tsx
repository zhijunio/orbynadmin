"use client";

import { Showcase } from "@/components/feature/example/Showcase";

import { useEffect, useId, useState } from "react";
import { Check as IconCheck, Search as IconSearch, Eye as IconEye, EyeOff as IconEyeOff, Mail as IconMail, Send as IconSend } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ComponentPreview } from "@/components/feature/example/ComponentPreview";
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from "@/components/ui/input-group";

function EmailVerificationInput() {
  const id = useId();
  const [email, setEmail] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [verificationCode, setVerificationCode] = useState("");
  const [emailError, setEmailError] = useState(false);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = window.setInterval(() => setSecondsLeft((seconds) => Math.max(0, seconds - 1)), 1000);
    return () => window.clearInterval(timer);
  }, [secondsLeft]);

  function sendCode() {
    if (secondsLeft > 0) return;
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setEmailError(true);
      return;
    }

    setEmailError(false);
    setSecondsLeft(60);
    setVerificationCode("");
    toast.success("Verification code sent", { description: `A code was sent to ${email}.` });
  }

  function verifyCode() {
    if (verificationCode.length === 6) {
      toast.success("Email verified", { description: "The example code was accepted." });
    }
  }

  const sendCodeLabel = secondsLeft > 0
    ? `Verification code sent, resend in ${secondsLeft} seconds`
    : "Send verification code";

  return (
    <div className="w-full max-w-xl space-y-2">
      <Label htmlFor={`${id}-email`}>Email address</Label>
      <div className="relative min-w-0">
        <IconMail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          id={`${id}-email`}
          type="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            setEmailError(false);
          }}
          placeholder="you@company.com"
          className="h-10 pl-9 pr-16"
          aria-invalid={emailError}
          aria-describedby={emailError ? `${id}-error` : undefined}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              sendCode();
            }
          }}
        />
        <Button
          type="button"
          size="sm"
          variant="ghost"
          disabled={secondsLeft > 0}
          aria-label={sendCodeLabel}
          title={secondsLeft > 0 ? `Resend in ${secondsLeft}s` : sendCodeLabel}
          onClick={sendCode}
          className="absolute right-1 top-1/2 h-8 -translate-y-1/2 gap-1 rounded-md px-2 text-primary hover:bg-primary/10 disabled:opacity-70"
        >
          {secondsLeft > 0 ? <><IconCheck className="size-3.5" />{secondsLeft}s</> : <IconSend className="size-4" />}
        </Button>
      </div>
      {emailError && <p id={`${id}-error`} className="text-xs text-destructive" role="alert">Enter a valid email address.</p>}
      {secondsLeft > 0 && (
        <div className="flex flex-col gap-2 pt-2 sm:flex-row">
          <Input
            aria-label="Six-digit verification code"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            value={verificationCode}
            onChange={(event) => setVerificationCode(event.target.value.replace(/\D/g, "").slice(0, 6))}
            placeholder="Enter 6-digit code"
            className="sm:max-w-xs"
          />
          <Button type="button" variant="outline" disabled={verificationCode.length !== 6} onClick={verifyCode}>
            Verify email
          </Button>
        </div>
      )}
      <p className="text-xs text-muted-foreground">Enter your email address and request a one-time verification code.</p>
    </div>
  );
}

function InputExamples() {
  const [query, setQuery] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <>
      <ComponentPreview title="Default">
        <Input placeholder="Enter a value" className="max-w-sm" />
      </ComponentPreview>
      <ComponentPreview title="With label">
        <div className="grid w-full max-w-sm gap-2">
          <Label htmlFor="input-name">Full name</Label>
          <Input id="input-name" placeholder="Jane Smith" />
        </div>
      </ComponentPreview>
      <ComponentPreview title="Search">
        <div className="relative w-full max-w-sm">
          <IconSearch className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search records..." className="pl-9" />
        </div>
      </ComponentPreview>
      <ComponentPreview title="Disabled">
        <Input disabled value="This field is disabled" className="max-w-sm" readOnly />
      </ComponentPreview>
      <ComponentPreview title="Password">
        <div className="relative w-full max-w-sm">
          <Input type={passwordVisible ? "text" : "password"} defaultValue="AdminPass123!" className="pr-10" aria-label="Password" />
          <Button type="button" variant="ghost" size="icon" aria-label={passwordVisible ? "Hide password" : "Show password"} onClick={() => setPasswordVisible((visible) => !visible)} className="absolute right-1 top-1/2 size-7 -translate-y-1/2 text-muted-foreground">
            {passwordVisible ? <IconEyeOff className="size-4" /> : <IconEye className="size-4" />}
          </Button>
        </div>
      </ComponentPreview>
      <ComponentPreview title="Input with prefix and suffix">
        <div className="grid w-full max-w-xl gap-4 sm:grid-cols-2">
          <InputGroup>
            <InputGroupAddon><InputGroupText>https://</InputGroupText></InputGroupAddon>
            <InputGroupInput aria-label="Website domain" placeholder="company.com" />
          </InputGroup>
          <InputGroup>
            <InputGroupAddon><InputGroupText>$</InputGroupText></InputGroupAddon>
            <InputGroupInput aria-label="Amount" inputMode="decimal" placeholder="0.00" />
            <InputGroupAddon align="inline-end"><InputGroupText>USD</InputGroupText></InputGroupAddon>
          </InputGroup>
        </div>
      </ComponentPreview>
      <ComponentPreview title="Validation states">
        <div className="grid w-full max-w-xl gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="invalid-email">Email address</Label>
            <Input id="invalid-email" type="email" value="alex@" readOnly aria-invalid="true" />
            <p className="text-xs text-destructive">Enter a valid email address.</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="valid-team">Team name</Label>
            <Input id="valid-team" value="Product Design" readOnly />
            <p className="text-xs text-muted-foreground">This name is available.</p>
          </div>
        </div>
      </ComponentPreview>
      <ComponentPreview title="Email verification" className="xl:col-span-2">
        <EmailVerificationInput />
      </ComponentPreview>
    </>
  );
}

export default function InputsPage() {
  return (
    <Showcase title="Inputs">
      <InputExamples />
    </Showcase>
  );
}
