"use client";

import ConsoleLayout from "@/components/custom/app-shell/console-layout";

import { useState } from "react";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { PageHeader } from "@/components/custom/app-shell/page-header";
import { InputOtp } from "@/components/ui/input-otp/input-otp";

function InputOtpExamples() {
  const [code, setCode] = useState("");

  return <>
      <ComponentPreview title="Six-Digit Verification Code">
        <InputOtp aria-label="Six-digit verification code" />
      </ComponentPreview>

      <ComponentPreview title="Controlled Value">
        <div className="space-y-3">
          <InputOtp
            aria-label="Controlled six-digit verification code"
            value={code}
            onChange={setCode}
          />
          <p className="text-xs text-muted-foreground" aria-live="polite">
            Value: {code || "—"}
          </p>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Four-digit PIN">
        <InputOtp length={4} aria-label="Four-digit PIN" />
      </ComponentPreview>

      <ComponentPreview title="Grouped Code">
        <InputOtp
          length={8}
          groupEvery={4}
          inputClassName="size-8 sm:size-10"
          aria-label="Eight-digit grouped verification code"
        />
      </ComponentPreview>

      <ComponentPreview title="Invalid Code">
        <InputOtp defaultValue="12" isInvalid aria-label="Invalid verification code" />
      </ComponentPreview>

      <ComponentPreview title="Disabled Input">
        <InputOtp defaultValue="123456" disabled aria-label="Disabled verification code" />
      </ComponentPreview>
    </>;
}

export default function InputOtpPage() {
  return <ConsoleLayout>{<div className="min-w-0 space-y-5"><PageHeader title="Input OTP" /><div className="grid min-w-0 gap-5 [&>*]:min-w-0 xl:grid-cols-2">
      <InputOtpExamples />
    </div></div>}</ConsoleLayout>;
}
