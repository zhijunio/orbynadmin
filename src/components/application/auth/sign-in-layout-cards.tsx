"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { IconSparkles } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

import { SignInCard as ReusableSignInCard } from "@/components/application/auth/sign-in-card";
import { ComponentPreview } from "@/components/application/docs/component-preview";
import type { AuthLayout } from "@/components/application/auth/auth-panel";
import type { SocialProvider } from "@/components/base/social-button/social-button";

const providers: SocialProvider[] = ["google", "apple", "github", "x"];
const authArtwork = [
  "/images/models/building-model-1.jpg",
  "/images/models/building-model-2.jpg",
  "/images/models/building-model-3.jpg",
];

function SignInCardView({ variant, standalone = false, socialLayout = "inline" }: { variant: "standard" | "logo" | "split"; standalone?: boolean; socialLayout?: AuthLayout }) {
  const t = useTranslations("Blocks.auth");
  const router = useRouter();
  const brand = variant === "logo" ? (
    <div className="mb-5 inline-flex items-center gap-2.5">
      <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground"><IconSparkles aria-hidden="true" className="size-5" /></span>
      <span className="text-sm font-semibold tracking-tight">OrbynAdmin</span>
    </div>
  ) : undefined;

  return (
    <>
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
        socialLayout={socialLayout}
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

export function SignInLayoutPreviews() {
  const t = useTranslations("Blocks.auth");
  const variants: { value: "standard" | "logo" | "split"; label: string }[] = [
    { value: "standard", label: t("layoutStandard") },
    { value: "logo", label: t("layoutLogo") },
    { value: "split", label: t("layoutSplit") },
  ];
  const verticalSocial = t("layoutVerticalSocial");

  return (
    <div className="grid gap-5 xl:grid-cols-2">
      <ComponentPreview title={variants[0].label}>
        <div className="w-full"><SignInCardView variant="standard" /></div>
      </ComponentPreview>
      <ComponentPreview title={verticalSocial}>
        <div className="w-full"><SignInCardView variant="standard" socialLayout="stacked" /></div>
      </ComponentPreview>
      <ComponentPreview title={variants[1].label}>
        <div className="w-full"><SignInCardView variant="logo" /></div>
      </ComponentPreview>
      <ComponentPreview title={t("layoutLogoVerticalSocial")}>
        <div className="w-full"><SignInCardView variant="logo" socialLayout="stacked" /></div>
      </ComponentPreview>
      <ComponentPreview title={variants[2].label} className="xl:col-span-2">
        <div className="w-full"><SignInCardView variant="split" /></div>
      </ComponentPreview>
    </div>
  );
}
