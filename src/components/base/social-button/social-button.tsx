import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils/cn";
import { SOCIAL_PROVIDERS, type SocialProvider } from "@/components/base/social-button/social-providers";
import { SOCIAL_COLOR_LOGOS } from "@/components/base/social-button/social-color-logos";

export type { SocialProvider };
export type SocialBrand = SocialProvider | "custom";
export type SocialButtonAppearance = "colorful" | "black" | "white";
export type SocialButtonSize = "medium" | "small";

export interface SocialBrandConfig {
  icon: ReactNode;
  label?: string;
  color?: string;
}

type SocialButtonOptions = {
  appearance?: SocialButtonAppearance;
  size?: SocialButtonSize;
  iconOnly?: boolean;
  fullWidth?: boolean;
  children?: ReactNode;
  className?: string;
};

type SocialButtonBrandProps = SocialButtonOptions & (
  | { brand: SocialProvider; config?: never }
  | { brand: "custom"; config: SocialBrandConfig }
);

export type SocialButtonButtonProps = SocialButtonBrandProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "color"> & { href?: never };
export type SocialButtonLinkProps = SocialButtonBrandProps & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "color"> & { href: string };
export type SocialButtonProps = SocialButtonButtonProps | SocialButtonLinkProps;

const DARK_INVERTED_BRANDS = new Set<SocialProvider>(["apple", "github", "x"]);

export function SocialButton(props: SocialButtonProps) {
  const {
    href,
    brand,
    config,
    appearance = "colorful",
    size = "medium",
    iconOnly = false,
    fullWidth = false,
    children,
    className,
    style,
    ...rest
  } = props;
  const custom = brand === "custom";
  const provider = custom ? undefined : brand;
  const providerConfig = provider ? SOCIAL_PROVIDERS[provider] : undefined;
  const label = custom ? (config?.label ?? "SSO") : providerConfig!.label;
  const color = custom ? (config?.color ?? "#000000") : providerConfig!.brand;
  const colorLogo = appearance === "white" && provider ? SOCIAL_COLOR_LOGOS[provider] : undefined;
  const iconClass = size === "medium" ? "size-[18px] shrink-0" : "size-4 shrink-0";
  const icon = custom ? (
    <span aria-hidden="true" className={cn(iconClass, "inline-flex items-center justify-center")}>{config?.icon}</span>
  ) : colorLogo ? (
    <svg aria-hidden="true" viewBox={colorLogo.viewBox} className={cn(iconClass, provider && DARK_INVERTED_BRANDS.has(provider) && "dark:[&_path]:fill-white")} dangerouslySetInnerHTML={{ __html: colorLogo.body }} />
  ) : (
    <svg aria-hidden="true" viewBox={providerConfig!.viewBox} className={iconClass} style={{ color: appearance === "white" ? color : "white" }}><path d={providerConfig!.path} fill="currentColor" /></svg>
  );
  const content = <>{icon}{iconOnly ? <span className="sr-only">Continue with {label}</span> : <span className="truncate">{children ?? `Continue with ${label}`}</span>}</>;
  const classNames = cn(
    "relative inline-flex cursor-pointer select-none items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-lg border text-sm font-medium transition-[background-color,border-color,box-shadow,color,filter] duration-150 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60",
    size === "medium" ? "h-9 w-[300px] px-3" : "h-8 w-[250px] px-2.5",
    iconOnly && (size === "medium" ? "size-9 w-9 px-0" : "size-8 w-8 px-0"),
    appearance === "colorful" && "border-transparent text-white hover:brightness-105 active:brightness-95",
    appearance === "black" && "border-transparent bg-neutral-950 text-white hover:bg-neutral-800 active:bg-neutral-900",
    appearance === "white" && "border-border bg-background text-foreground shadow-xs hover:bg-muted",
    fullWidth && !iconOnly && "w-full",
    className,
  );
  const accessibleName = iconOnly ? `Continue with ${label}` : undefined;
  const computedStyle = appearance === "colorful" ? { ...style, backgroundColor: color } : style;

  if (href !== undefined) {
    return <a href={href} aria-label={accessibleName} className={classNames} style={computedStyle} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>{content}</a>;
  }

  return <button type="button" aria-label={accessibleName} className={classNames} style={computedStyle} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>{content}</button>;
}
