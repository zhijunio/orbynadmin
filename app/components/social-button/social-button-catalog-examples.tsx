
import { IconKey as KeyRound } from "@tabler/icons-react";
import { CatalogGridItems } from "@/components/custom/docs/catalog-page-grid";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { SocialButton, type SocialProvider } from "@/components/ui/social-button/social-button";
import { SOCIAL_PROVIDERS } from "@/components/ui/social-button/social-providers";

const providers = Object.entries(SOCIAL_PROVIDERS) as Array<
  [SocialProvider, (typeof SOCIAL_PROVIDERS)[SocialProvider]]
>;

export function SocialButtonCatalogExamples() {
  return (
    <CatalogGridItems>
      <ComponentPreview title="Providers" layout="grid2">
      <div className="min-w-0"><div className="mx-auto flex w-full max-w-[300px] flex-col gap-2">
                <SocialButton brand="google" appearance="white" size="sm" fullWidth />
                <SocialButton brand="github" appearance="white" size="sm" fullWidth />
                <SocialButton brand="slack" appearance="white" size="sm" fullWidth />
              </div></div>
      <div className="min-w-0"><div className="flex flex-wrap items-center gap-2">
                <SocialButton brand="custom" config={{ icon: <KeyRound className="size-4" />, label: "Company SSO", color: "#0f172a" }} />
                <SocialButton brand="custom" config={{ icon: <KeyRound className="size-4" /> }} appearance="white" />
              </div></div>
      <div className="min-w-0"><div className="flex flex-wrap items-center gap-2">
                <SocialButton brand="google" />
                <SocialButton brand="google">Sign up with Google</SocialButton>
                <SocialButton brand="google">Log in</SocialButton>
              </div></div>
      </ComponentPreview>
      <ComponentPreview title={`All providers (${providers.length})`} span={2}>
              <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {providers.map(([brand, config]) => (
                  <SocialButton key={brand} brand={brand} appearance="white" size="sm" fullWidth>{`Continue with ${config.label}`}</SocialButton>
                ))}
              </div>
            </ComponentPreview>
      <ComponentPreview title="Appearance" layout="grid2">
      <div className="min-w-0"><div className="mx-auto flex w-full max-w-[300px] flex-col gap-2">
                <SocialButton brand="google" appearance="colorful" fullWidth />
                <SocialButton brand="google" appearance="black" fullWidth />
                <SocialButton brand="google" appearance="white" fullWidth />
              </div></div>
      <div className="min-w-0"><div className="flex items-center gap-2">
                <SocialButton brand="google" appearance="white" iconOnly />
                <SocialButton brand="apple" appearance="white" iconOnly />
                <SocialButton brand="github" appearance="white" iconOnly />
              </div></div>
      </ComponentPreview>
      <ComponentPreview title="Size" layout="grid2">
      <div className="min-w-0"><div className="mx-auto flex w-full max-w-[300px] flex-col items-start gap-2">
                <SocialButton brand="slack" size="default" />
                <SocialButton brand="slack" size="sm" />
                <SocialButton brand="slack" size="sm" fullWidth className="max-w-[220px]" />
              </div></div>
      <div className="min-w-0"><div className="flex flex-wrap items-center gap-2">
                <SocialButton brand="github" href="/components/button">Continue with GitHub</SocialButton>
                <SocialButton brand="github">Continue with GitHub</SocialButton>
              </div></div>
      </ComponentPreview>
    </CatalogGridItems>
  );
}
