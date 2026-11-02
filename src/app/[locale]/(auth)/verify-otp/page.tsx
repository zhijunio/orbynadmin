"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IconArrowLeft, IconShieldLock } from "@tabler/icons-react";
import { Button } from "@/components/base/buttons/button";
import { InputOtp } from "@/components/base/input-otp/input-otp";

const LENGTH = 6;

export default function VerifyOtpPage() {
  const router = useRouter();
  const [code, setCode] = React.useState("");
  const otpRef = React.useRef<HTMLDivElement>(null);
  const complete = code.length === LENGTH;

  return (
    <div className="space-y-6">
      <div className="space-y-1.5">
        <div className="mb-3 flex size-11 items-center justify-center rounded-xl border bg-card">
          <IconShieldLock className="size-5" />
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Two-factor verification
        </h1>
        <p className="text-sm text-muted-foreground">
          We sent a 6-digit code to{" "}
          <span className="font-medium text-foreground">alex@orbynadmin.com</span>. Enter
          it below to continue.
        </p>
      </div>

      <form
        className="space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          router.push("/dashboard");
        }}
      >
        <InputOtp
          ref={otpRef}
          length={LENGTH}
          value={code}
          onChange={setCode}
          aria-label="Verification code"
        />

        <Button type="submit" className="w-full" disabled={!complete}>
          Verify
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Didn&apos;t get a code?{" "}
        <button
          type="button"
          className="font-medium text-foreground hover:underline"
          onClick={() => {
            setCode("");
            otpRef.current?.querySelector("input")?.focus();
          }}
        >
          Resend
        </button>
      </p>

      <Link
        href="/login"
        className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <IconArrowLeft className="size-4" /> Back to sign in
      </Link>
    </div>
  );
}
