"use client";
import { useState } from "react";
import { CatalogGridItems } from "@/components/custom/docs/catalog-page-grid";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { InputOtp } from "@/components/ui/input-otp/input-otp";

function InputOtpExamples() {
  const [code, setCode] = useState("");

  return <>
      <ComponentPreview title="Length" span={2} layout="grid3">
<div className="min-w-0"><InputOtp aria-label="Six-digit verification code" /></div>
<div className="min-w-0"><InputOtp length={4} aria-label="Four-digit PIN" /></div>
<div className="min-w-0"><InputOtp
          length={8}
          groupEvery={4}
          inputClassName="size-8 sm:size-10"
          aria-label="Eight-digit grouped verification code"
        /></div>
</ComponentPreview>
<ComponentPreview title="Value" layout="grid2">
<div className="min-w-0"><div className="space-y-3">
          <InputOtp
            aria-label="Controlled six-digit verification code"
            value={code}
            onChange={setCode}
          />
          <p className="text-xs text-muted-foreground" aria-live="polite">
            Value: {code || "—"}
          </p>
        </div></div>
<div className="min-w-0"><div className="grid gap-2">
          <label htmlFor="alphanumeric-otp" className="text-sm font-medium">Alphanumeric verification code</label>
          <InputOtp id="alphanumeric-otp" allowAlphanumeric groupEvery={3} aria-label="Alphanumeric verification code" digitAriaLabel={(digit, total) => `Character ${digit} of ${total}`} />
          <p className="text-xs text-muted-foreground">Accepts both letters and numbers.</p>
        </div></div>
</ComponentPreview>
<ComponentPreview title="States" layout="grid2">
<div className="min-w-0"><InputOtp defaultValue="12" invalid aria-label="Invalid verification code" /></div>
<div className="min-w-0"><InputOtp defaultValue="123456" disabled aria-label="Disabled verification code" /></div>
</ComponentPreview>
    </>;
}

export function InputOtpCatalogExamples() {
  return (
    <CatalogGridItems>
      <InputOtpExamples />
    </CatalogGridItems>
  );
}
