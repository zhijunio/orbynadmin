"use client";

import { useState, type FormEvent, type ReactNode } from "react";

import { Button } from "@/components/base/buttons/button";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { Label } from "@/components/base/input/label";
import { AuthPanel, AuthSwitch, Divider, Field, SocialProviders, type AuthLayout } from "./auth-panel";
import type { SocialProvider } from "@/components/base/social-button/social-button";

export type SignInCardCopy = {
  title: string;
  description: string;
  emailLabel: string;
  emailPlaceholder: string;
  passwordLabel: string;
  passwordPlaceholder: string;
  rememberLabel: string;
  forgotPasswordLabel: string;
  signInLabel: string;
  socialDividerLabel: string;
  signUpLead: string;
  signUpLabel: string;
};

export type SignInCredentials = {
  email: string;
  password: string;
  remember: boolean;
};

export function SignInCard({
  copy,
  providers,
  socialLayout = "inline",
  onSubmit,
  onProviderSelect,
  onForgotPassword,
  onSignUp,
  brand,
  artwork,
  variant = "standard",
}: {
  copy: SignInCardCopy;
  providers: SocialProvider[];
  socialLayout?: AuthLayout;
  onSubmit: (credentials: SignInCredentials) => void;
  onProviderSelect: (provider: SocialProvider) => void;
  onForgotPassword: () => void;
  onSignUp: () => void;
  brand?: ReactNode;
  artwork?: ReactNode;
  variant?: "standard" | "split";
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit({ email, password, remember });
  }

  return (
    <AuthPanel title={copy.title} description={copy.description} variant={variant} brand={brand} artwork={artwork}>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <Field id="sign-in-email" label={copy.emailLabel} type="email" placeholder={copy.emailPlaceholder} autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        <Field id="sign-in-password" label={copy.passwordLabel} type="password" placeholder={copy.passwordPlaceholder} autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} />
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Checkbox id="sign-in-remember" checked={remember} onCheckedChange={(checked) => setRemember(checked === true)} />
            <Label htmlFor="sign-in-remember" className="text-sm font-normal">{copy.rememberLabel}</Label>
          </div>
          <button type="button" onClick={onForgotPassword} className="text-sm font-medium text-primary hover:underline">{copy.forgotPasswordLabel}</button>
        </div>
        <Button className="w-full" type="submit">{copy.signInLabel}</Button>
      </form>
      {providers.length > 0 && (
        <>
          <Divider label={copy.socialDividerLabel} />
          <SocialProviders layout={socialLayout} providers={providers} onProviderSelect={onProviderSelect} />
        </>
      )}
      <AuthSwitch lead={copy.signUpLead} action={copy.signUpLabel} onClick={onSignUp} />
    </AuthPanel>
  );
}
