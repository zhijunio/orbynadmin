"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { IconSparkles } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

import { SignInCard as ReusableSignInCard } from "@/components/application/auth/sign-in-card";
import { SegmentedControl, SegmentedControlItem } from "@/components/base/segmented-control/segmented-control";
import { Label } from "@/components/base/input/label";
import type { SocialProvider } from "@/components/base/social-button/social-button";
import type { AuthLayout } from "@/components/application/auth/auth-panel";

const providers: SocialProvider[] = ["google", "apple", "github", "x"];
const authArtwork = [
  "/images/models/building-model-1.jpg",
  "/images/models/building-model-2.jpg",
  "/images/models/building-model-3.jpg",
];

function SignInCardView({ variant, standalone = false }: { variant: "standard" | "logo" | "split"; standalone?: boolean }) {
  const t = useTranslations("Blocks.auth");
  const router = useRouter();
  const [layout, setLayout] = useState<AuthLayout>("inline");
  const prefix = `auth-${variant}`;
  const brand = variant === "logo" ? (
    <div className="mb-5 inline-flex items-center gap-2.5">
      <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground"><IconSparkles aria-hidden="true" className="size-5" /></span>
      <span className="text-sm font-semibold tracking-tight">OrbynAdmin</span>
    </div>
  ) : undefined;

  return (
    <>
      {!standalone && (
        <div className="mb-4 flex flex-wrap items-center justify-center gap-3">
          <Label id={`${prefix}-layout-label`} className="text-sm text-muted-foreground">{t("providerLayout")}</Label>
          <SegmentedControl aria-labelledby={`${prefix}-layout-label`} value={layout} onValueChange={(value) => value && setLayout(value as AuthLayout)}>
            <SegmentedControlItem value="stacked">{t("layoutStacked")}</SegmentedControlItem>
            <SegmentedControlItem value="inline">{t("layoutInline")}</SegmentedControlItem>
            <SegmentedControlItem value="grid">{t("layoutGrid")}</SegmentedControlItem>
          </SegmentedControl>
        </div>
      )}
      <ReusableSignInCard
        copy={{
          title: t("signInTitle"),
          description: t("signInDescription"),
          emailLabel: t("email"),
          emailPlaceholder: "you@company.com",
          passwordLabel: t("password"),
          passwordPlaceholder: t("passwordPlaceholder"),
          rememberLabel: t("remember"),
          forgotPasswordLabel: t("forgotPasswordLink"),
          signInLabel: t("signIn"),
          socialDividerLabel: t("orContinueWith"),
          signUpLead: t("newHere"),
          signUpLabel: t("createAccountLink"),
        }}
        providers={providers}
        socialLayout={layout}
        onSubmit={() => {
          if (standalone) router.push("/dashboard");
        }}
        onProviderSelect={() => {}}
        onForgotPassword={() => router.push(standalone ? "/forgot-password" : "/blocks/auth/forgot-password")}
        onSignUp={() => router.push(standalone ? "/register" : "/blocks/auth/sign-up")}
        brand={brand}
        artwork={variant === "split" ? <AuthArtworkCarousel /> : undefined}
        variant={variant === "split" ? "split" : "standard"}
      />
    </>
  );
}

function AuthArtworkCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setActiveIndex((index) => (index + 1) % authArtwork.length), 4200);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0" aria-hidden="true">
      {authArtwork.map((src, index) => (
        <Image key={src} src={src} alt="" fill sizes="(min-width: 768px) 440px, 0px" className={`object-cover transition-opacity duration-700 ease-out ${index === activeIndex ? "opacity-100" : "opacity-0"}`} />
      ))}
      <div className="absolute inset-x-0 bottom-5 flex justify-center gap-1.5">
        {authArtwork.map((src, index) => <span key={src} className={`size-1.5 rounded-full ${index === activeIndex ? "bg-white" : "bg-white/50"}`} />)}
      </div>
    </div>
  );
}

export function SignInCard({ standalone = false }: { standalone?: boolean }) {
  return <SignInCardView standalone={standalone} variant="standard" />;
}

export function SignInWithLogoCard() {
  return <SignInCardView variant="logo" />;
}

export function SignInWithArtworkCard() {
  return <SignInCardView variant="split" />;
}
