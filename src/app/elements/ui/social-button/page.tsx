import ConsoleLayout from "@/components/application/app-shell/console-layout";

import { IconKey as KeyRound } from "@tabler/icons-react";
import { ComponentPreview } from "@/components/application/docs/component-preview";
import { PageHeader } from "@/components/application/app-shell/page-header";
import { SocialButton, type SocialProvider } from "@/components/base/social-button/social-button";
import { SOCIAL_PROVIDERS } from "@/components/base/social-button/social-providers";

export default function SocialButtonPage() {
  const providers = Object.entries(SOCIAL_PROVIDERS) as Array<[
    SocialProvider,
    (typeof SOCIAL_PROVIDERS)[SocialProvider],
  ]>;

  return <ConsoleLayout>{<div className="min-w-0 space-y-5"><PageHeader title="Social Button" /><div className="grid min-w-0 gap-5 [&>*]:min-w-0 xl:grid-cols-2">
      <ComponentPreview title="Common providers">
        <div className="mx-auto flex w-full max-w-[300px] flex-col gap-2">
          <SocialButton brand="google" appearance="white" size="small" fullWidth />
          <SocialButton brand="github" appearance="white" size="small" fullWidth />
          <SocialButton brand="slack" appearance="white" size="small" fullWidth />
        </div>
      </ComponentPreview>

      <ComponentPreview title={`All providers (${providers.length})`} className="xl:col-span-2">
        <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {providers.map(([brand, config]) => (
            <SocialButton key={brand} brand={brand} appearance="white" size="small" fullWidth>{`Continue with ${config.label}`}</SocialButton>
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview title="Appearance">
        <div className="mx-auto flex w-full max-w-[300px] flex-col gap-2">
          <SocialButton brand="google" appearance="colorful" fullWidth />
          <SocialButton brand="google" appearance="black" fullWidth />
          <SocialButton brand="google" appearance="white" fullWidth />
        </div>
      </ComponentPreview>

      <ComponentPreview title="Button Sizes">
        <div className="mx-auto flex w-full max-w-[300px] flex-col items-start gap-2">
          <SocialButton brand="slack" size="medium" />
          <SocialButton brand="slack" size="small" />
          <SocialButton brand="slack" size="small" fullWidth className="max-w-[220px]" />
        </div>
      </ComponentPreview>

      <ComponentPreview title="Icon only">
        <div className="flex items-center gap-2">
          <SocialButton brand="google" appearance="white" iconOnly />
          <SocialButton brand="apple" appearance="white" iconOnly />
          <SocialButton brand="github" appearance="white" iconOnly />
        </div>
      </ComponentPreview>

      <ComponentPreview title="Custom brand">
        <div className="flex flex-wrap items-center gap-2">
          <SocialButton brand="custom" config={{ icon: <KeyRound className="size-4" />, label: "Company SSO", color: "#0f172a" }} />
          <SocialButton brand="custom" config={{ icon: <KeyRound className="size-4" /> }} appearance="white" />
        </div>
      </ComponentPreview>

      <ComponentPreview title="Labels">
        <div className="flex flex-wrap items-center gap-2">
          <SocialButton brand="google" />
          <SocialButton brand="google">Sign up with Google</SocialButton>
          <SocialButton brand="google">Log in</SocialButton>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Buttons and links">
        <div className="flex flex-wrap items-center gap-2">
          <SocialButton brand="github" href="/blocks/auth">Continue with GitHub</SocialButton>
          <SocialButton brand="github">Continue with GitHub</SocialButton>
        </div>
      </ComponentPreview>
    </div></div>}</ConsoleLayout>;
}
