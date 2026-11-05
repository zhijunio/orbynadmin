"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";

import { Button } from "@/components/ui/button/button";
import { Input } from "@/components/ui/input/input";
import { type AuthFlow } from "@/components/blocks/application/auth/auth-flows";
import { BrandMark } from "@/components/custom/auth/brand-mark";

const flowFields: Record<AuthFlow["slug"], { name: string; label: string; type: string; autoComplete: string; placeholder: string }[]> = {
  signup: [
    { name: "name", label: "Full name", type: "text", autoComplete: "name", placeholder: "Alex Morgan" },
    { name: "email", label: "Work email", type: "email", autoComplete: "email", placeholder: "you@company.com" },
    { name: "password", label: "Password", type: "password", autoComplete: "new-password", placeholder: "Create a password" },
    { name: "confirmation", label: "Confirm password", type: "password", autoComplete: "new-password", placeholder: "Enter it again" },
  ],
  "forgot-password": [{ name: "email", label: "Work email", type: "email", autoComplete: "email", placeholder: "you@company.com" }],
  "reset-password": [
    { name: "password", label: "New password", type: "password", autoComplete: "new-password", placeholder: "Create a new password" },
    { name: "confirmation", label: "Confirm new password", type: "password", autoComplete: "new-password", placeholder: "Enter it again" },
  ],
};

const submitLabels: Record<AuthFlow["slug"], string> = {
  signup: "Create account",
  "forgot-password": "Send reset link",
  "reset-password": "Save new password",
};

export function AuthFlowPage({ flow, preview = false }: { flow: AuthFlow; preview?: boolean }) {
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const data = new FormData(event.currentTarget);
    const password = data.get("password");
    const confirmation = data.get("confirmation");

    if (flow.slug === "signup" || flow.slug === "reset-password") {
      if (password !== confirmation) {
        setError("Passwords do not match. Check both fields and try again.");
        return;
      }
    }

    const success: Record<AuthFlow["slug"], string> = {
      signup: "Your account is ready. This demo does not create a real account.",
      "forgot-password": "If an account matches that email, a reset link is on its way.",
      "reset-password": "Your password has been updated in this demo.",
    };
    setNotice(success[flow.slug]);
  }

  return (
    <main className={`flex w-full ${preview ? "min-h-0 py-6" : "min-h-svh py-10"} items-center justify-center bg-background px-5`}>
      <section className="w-full max-w-sm" aria-labelledby={`auth-flow-title-${flow.slug}`}>
        {!preview && <Link href="/blocks/application/auth" className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <IconArrowLeft className="size-4" aria-hidden="true" />All authentication examples
        </Link>}
        <div className="mb-7 grid justify-items-center gap-3 text-center">
          <BrandMark />
          <div>
            <h1 id={`auth-flow-title-${flow.slug}`} className="text-2xl font-semibold tracking-tight">{flow.title}</h1>
            {flow.description && <p className="mt-2 text-sm text-muted-foreground">{flow.description}</p>}
          </div>
        </div>
        <form className="grid gap-4" onSubmit={submit}>
          {flowFields[flow.slug].map((field) => <label key={field.label} className="grid gap-1.5 text-sm font-medium">
            {field.label}
            <Input name={field.name} type={field.type} autoComplete={field.autoComplete} placeholder={field.placeholder} required />
          </label>)}
          <Button type="submit" className="mt-1 w-full">{submitLabels[flow.slug]}<span aria-hidden="true">→</span></Button>
        </form>
        {error && <p role="alert" className="mt-4 rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</p>}
        {notice && <p role="status" className="mt-4 rounded-lg bg-muted px-3 py-2 text-sm text-muted-foreground">{notice}</p>}
        <p className="mt-6 text-center text-sm text-muted-foreground">{flow.slug === "signup" ? "Already have an account?" : "Back to sign in?"} <Link href="/blocks/application/auth/auth-20" className="font-medium text-foreground">Sign in</Link></p>
      </section>
    </main>
  );
}
