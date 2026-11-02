"use client";

import ConsoleLayout from "@/components/application/app-shell/console-layout";

import { useState } from "react";
import { ComponentPreview } from "@/components/application/docs/component-preview";
import { Showcase } from "@/components/application/docs/showcase";
import { InputOtp } from "@/components/base/input-otp/input-otp";

function InputOtpExamples() {
  const [code, setCode] = useState("");

  return <>
      <ComponentPreview title="Default">
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

      <ComponentPreview title="Invalid and Disabled">
        <div className="grid w-full gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <p className="text-sm font-medium">Invalid</p>
            <InputOtp
              defaultValue="12"
              isInvalid
              aria-label="Invalid verification code"
            />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">Disabled</p>
            <InputOtp
              defaultValue="123456"
              disabled
              aria-label="Disabled verification code"
            />
          </div>
        </div>
      </ComponentPreview>
    </>;
}

export default function InputOtpPage() {
  return <ConsoleLayout>{<Showcase title="Input OTP">
      <InputOtpExamples />
    </Showcase>}</ConsoleLayout>;
}
