"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { IconEye, IconEyeOff, IconKey, IconLock } from "@tabler/icons-react";

import { type AuthExample } from "@/components/blocks/application/auth/auth-examples";
import { BrandMark } from "@/components/custom/auth/brand-mark";
import { Button } from "@/components/ui/button/button";
import { Input } from "@/components/ui/input/input";
import { SocialButton } from "@/components/ui/social-button/social-button";

export function AuthPage({ example, preview = false }: { example: AuthExample; preview?: boolean }) {
  const split = example.layout === "split";
  const [showPassword, setShowPassword] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [notice, setNotice] = useState("");
  const [email, setEmail] = useState("");
  const isMagicLink = example.mode === "magic-link" || selectedMethod === "Email";
  const isPicker = example.mode === "method-picker" && !selectedMethod;

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice(isMagicLink ? `A sign-in link is ready for ${email || "your work email"}.` : "This sign-in example is not connected to an account.");
  }

  const form = (
    <div className={`w-full ${example.layout === "framed" ? "rounded-2xl border bg-card p-7 shadow-sm sm:p-9" : ""}`} data-auth-surface>
      <div className="mb-7 grid justify-items-center gap-3 text-center">
        <BrandMark />
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Sign in to NextRose</h1>
          <p className="mt-1 text-sm text-muted-foreground">Welcome back. Continue to your workspace.</p>
        </div>
      </div>

      {isPicker ? (
        <div className="grid gap-2">
          <MethodButton icon={<IconKey />} label="Use a passkey" onClick={() => setSelectedMethod("Passkey")} />
          <MethodButton icon={<IconLock />} label="Continue with SSO" onClick={() => setSelectedMethod("SSO")} />
          <Button variant="outline" className="h-10" onClick={() => setSelectedMethod("Email")}>Continue with email</Button>
        </div>
      ) : selectedMethod && selectedMethod !== "Email" ? (
        <div className="grid gap-3 text-center">
          <p className="text-sm text-muted-foreground">Continue with {selectedMethod} to access your workspace.</p>
          <Button className="h-9 w-full" onClick={() => setNotice(`${selectedMethod} sign-in is a demo action.`)}>Continue with {selectedMethod}<span aria-hidden="true">→</span></Button>
          <Button variant="ghost" className="h-8 text-sm" onClick={() => { setSelectedMethod(null); setNotice(""); }}>Choose another method</Button>
        </div>
      ) : (
        <form className="grid gap-3.5" onSubmit={submit}>
          <label className="grid gap-1.5 text-sm font-medium" htmlFor={`auth-email-${example.id}`}>Work email
            <Input id={`auth-email-${example.id}`} type="email" autoComplete="email" placeholder="you@company.com" value={email} onChange={(event) => setEmail(event.target.value)} required />
          </label>
          {!isMagicLink && <label className="grid gap-1.5 text-sm font-medium" htmlFor={`auth-password-${example.id}`}>
            <span className="flex items-center justify-between">Password<Link href="/blocks/application/auth/forgot-password" className="text-xs font-normal text-muted-foreground hover:text-foreground">Forgot password?</Link></span>
            <span className="relative"><Input id={`auth-password-${example.id}`} type={showPassword ? "text" : "password"} autoComplete="current-password" placeholder="Enter your password" className="pr-10" required /><button type="button" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword((value) => !value)} className="absolute inset-y-0 right-0 grid w-10 place-items-center text-muted-foreground">{showPassword ? <IconEyeOff className="size-4" /> : <IconEye className="size-4" />}</button></span>
          </label>}
          <Button type="submit" className="mt-1 h-9 w-full">{isMagicLink ? "Continue with email" : "Sign in"}<span aria-hidden="true">→</span></Button>
        </form>
      )}

      {example.providers && example.providers.length > 0 && !isPicker && <div className="mt-5 grid gap-3">
        <div className="flex items-center gap-3 text-xs text-muted-foreground"><span className="h-px flex-1 bg-border" />or continue with<span className="h-px flex-1 bg-border" /></div>
        <div className={example.socialLayout === "vertical" ? "grid gap-2" : "grid grid-cols-2 gap-2"}>
          {example.providers.map((provider) => <SocialButton key={provider} brand={provider} appearance="white" fullWidth className="h-9" onClick={() => setNotice(`${provider[0].toUpperCase()}${provider.slice(1)} sign-in is a demo action.`)} />)}
        </div>
      </div>}
      {notice && <p role="status" className="mt-4 rounded-lg bg-muted px-3 py-2 text-center text-xs text-muted-foreground">{notice}</p>}
      <p className="mt-6 text-center text-xs text-muted-foreground">By continuing, you agree to our <span className="underline underline-offset-4">Terms of Service</span> and <span className="underline underline-offset-4">Privacy Policy</span>.</p>
      <p className="mt-4 text-center text-sm text-muted-foreground">Need an account? <Link href="/blocks/application/auth/signup" className="font-medium text-foreground">Sign up</Link></p>
    </div>
  );

  return (
    <main className={`flex w-full ${preview ? "min-h-[34rem]" : "min-h-svh"} items-center justify-center overflow-hidden bg-background px-5 py-10`}>
      {split ? <div className="grid w-full max-w-5xl items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(22rem,0.9fr)] lg:gap-14">
        <div className="mx-auto w-full max-w-sm">{form}</div>
        <AuthSidePanel />
      </div> : <div className={`w-full ${example.layout === "framed" ? "max-w-md" : "max-w-sm"}`}>{form}</div>}
    </main>
  );
}

function MethodButton({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick: () => void }) {
  return <Button variant="outline" className="h-10 justify-start gap-3" onClick={onClick}>{icon}<span>{label}</span></Button>;
}

function AuthSidePanel() {
  return <aside className="relative hidden min-h-[34rem] flex-col justify-between overflow-hidden rounded-2xl border bg-muted/30 p-10 lg:flex">
    <div aria-hidden="true" className="absolute inset-0 -z-0 bg-[radial-gradient(circle_at_1px_1px,color-mix(in_oklch,var(--foreground)_9%,transparent)_1px,transparent_0)] bg-[length:22px_22px]" />
    <div className="relative flex gap-1 text-amber-500" aria-label="5 out of 5 stars">★★★★★</div>
    <blockquote className="relative max-w-md text-2xl font-medium leading-relaxed">“The workspace finally feels as clear as the work we do in it.”<footer className="mt-5 text-sm font-normal text-muted-foreground">Jordan Lee · Product lead</footer></blockquote>
    <div className="relative flex items-center gap-3 border-t pt-5 text-sm text-muted-foreground"><span className="grid size-9 place-items-center rounded-full bg-primary/10 font-semibold text-primary">JL</span><span>Customer story · NextRose</span></div>
  </aside>;
}
