"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { IconArrowLeft, IconArrowRight, IconBell, IconCheck, IconChevronDown, IconChevronUp, IconCopy, IconCreditCard, IconDownload, IconExternalLink, IconLoader2, IconMenu2, IconMoon, IconPlus, IconSearch, IconStar, IconSun, IconThumbUp, IconX } from "@tabler/icons-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar/avatar";
import { Badge } from "@/components/ui/badge/badge";
import { StatusDot } from "@/components/ui/badge/status-dot";
import { Button, type ButtonProps } from "@/components/ui/button/button";
import { CloseButton } from "@/components/ui/button/close-button";
import { LinkButton } from "@/components/ui/button/link-button";
import { Kbd } from "@/components/ui/kbd/kbd";
import { SocialButton } from "@/components/ui/social-button/social-button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip/tooltip";
import { people } from "@/app/components/avatar/avatar-data";
import { cn } from "@/utils/cn";

const textSizes = ["xs", "sm", "default", "lg"] as const;
const iconSizes = ["icon-xs", "icon-sm", "icon", "icon-lg"] as const;
const iconVariants = ["outline", "secondary", "ghost", "destructive"] as const;

export function ButtonVariantExamples() {
  return (
    <>
      <Button>Button</Button>
      <Button variant="secondary">Button</Button>
      <Button variant="outline">Button</Button>
      <Button variant="ghost">Button</Button>
      <Button variant="destructive">Button</Button>
      <Button variant="link">Button</Button>
    </>
  );
}

export function ButtonSizeExamples() {
  return (
    <>
      {textSizes.map((size) => <Button key={size} variant="outline" size={size}>Button</Button>)}
      {iconSizes.map((size) => <Button key={size} variant="outline" size={size} aria-label="Add item"><IconPlus /></Button>)}
    </>
  );
}

export function ButtonIconExamples() {
  return (
    <>
      {iconVariants.map((variant) => (
        <span key={variant} className="contents">
          <Button variant={variant}><IconPlus data-icon="inline-start" />Button</Button>
          <Button variant={variant}>Button<IconArrowRight data-icon="inline-end" /></Button>
        </span>
      ))}
      <Button variant="outline" size="lg"><IconPlus data-icon="inline-start" />Button</Button>
      <Button variant="outline" size="lg">Button<IconArrowRight data-icon="inline-end" /></Button>
    </>
  );
}

function LoadingButton() {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  useEffect(() => {
    if (status !== "loading") return;
    const timer = setTimeout(() => setStatus("success"), 900);
    return () => clearTimeout(timer);
  }, [status]);
  useEffect(() => {
    if (status !== "success") return;
    const timer = setTimeout(() => setStatus("idle"), 2000);
    return () => clearTimeout(timer);
  }, [status]);
  const label = status === "loading" ? "Saving…" : status === "success" ? "Saved" : "Save changes";
  return (
    <Button variant="outline" aria-busy={status === "loading"} aria-live="polite" disabled={status === "loading"} onClick={() => setStatus("loading")} className="min-w-32">
      {status === "loading" && <IconLoader2 aria-hidden className="motion-safe:animate-spin" />}
      {status === "success" && <IconCheck aria-hidden />}
      {label}
    </Button>
  );
}

function CountToggle({ icon, label, count }: { icon: "like" | "star"; label: string; count: number }) {
  const [pressed, setPressed] = useState(false);
  const Icon = icon === "like" ? IconThumbUp : IconStar;
  return (
    <Button variant="outline" aria-pressed={pressed} onClick={() => setPressed((current) => !current)}>
      <Icon aria-hidden className={pressed ? "fill-current" : undefined} />
      {label}
      <span className="ml-1 border-l border-current/30 pl-3 text-xs">{count + (pressed ? 1 : 0)}</span>
    </Button>
  );
}

function CopyButton({ iconOnly = false }: { iconOnly?: boolean }) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const copy = async () => {
    try {
      await navigator.clipboard.writeText("NextRose");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };
  const label = status === "success" ? "Copied" : "Copy";
  return (
    <span className="inline-flex items-center gap-3">
      <Button variant="outline" size={iconOnly ? "icon" : "default"} aria-label={iconOnly ? label : undefined} onClick={copy}>
        {status === "success" ? <IconCheck aria-hidden /> : <IconCopy aria-hidden />}
        {iconOnly ? null : label}
      </Button>
      <span role="status" className={cn("text-xs text-muted-foreground", status !== "error" && "sr-only")}>
        {status === "error" ? "Unable to copy. Try again." : status === "success" ? "Copied" : ""}
      </span>
    </span>
  );
}

function MoreLessToggle() {
  const id = useId();
  const [open, setOpen] = useState(false);
  return (
    <span className="inline-flex flex-col gap-2">
      <Button variant="ghost" aria-expanded={open} aria-controls={id} onClick={() => setOpen((current) => !current)}>
        {open ? "Show less" : "Show more"}
        {open ? <IconChevronUp aria-hidden /> : <IconChevronDown aria-hidden />}
      </Button>
      {open && <p id={id} className="text-sm text-muted-foreground">Additional details are now visible.</p>}
    </span>
  );
}

function MenuToggle() {
  const id = useId();
  const [open, setOpen] = useState(false);
  return (
    <span className="inline-flex flex-col gap-2">
      <Button size="icon" variant="outline" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls={id} onClick={() => setOpen((current) => !current)}>
        <span className="relative flex size-4 items-center justify-center">
          <IconMenu2 aria-hidden className={cn("absolute motion-safe:transition-all", open && "rotate-90 scale-75 opacity-0")} />
          <IconX aria-hidden className={cn("absolute motion-safe:transition-all", !open && "-rotate-90 scale-75 opacity-0")} />
        </span>
      </Button>
      {open && <nav id={id} aria-label="Example navigation"><Link href="/components/input" className="text-sm text-primary underline">Browse inputs</Link></nav>}
    </span>
  );
}

function ExpandingButton() {
  const [feedback, setFeedback] = useState("");
  return (
    <Button variant="outline" aria-label="Create new" className="group/expand relative w-9 overflow-hidden rounded-full hover:w-36 focus-visible:w-36 motion-safe:transition-[width]" onClick={() => setFeedback("Created")}>
      <IconPlus aria-hidden className="absolute left-2.5" />
      <span className="ml-6 opacity-0 group-hover/expand:opacity-100 group-focus-visible/expand:opacity-100">{feedback || "Create new"}</span>
    </Button>
  );
}

function PaymentButton() {
  const [feedback, setFeedback] = useState("");
  return (
    <Button variant="outline" className="h-auto max-w-full justify-start gap-3 px-4 py-3 text-left whitespace-normal" onClick={() => setFeedback("Credit card selected")}>
      <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-muted"><IconCreditCard aria-hidden /></span>
      <span className="flex flex-col gap-0.5">
        <span>Credit card</span>
        <span className="text-xs font-normal text-muted-foreground">{feedback || "Pay securely with your card"}</span>
      </span>
    </Button>
  );
}

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  return (
    <Button variant="outline" size="icon" aria-label="Toggle theme" onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}>
      <IconSun aria-hidden className="hidden dark:block" />
      <IconMoon aria-hidden className="dark:hidden" />
    </Button>
  );
}

export function ButtonStateExamples() {
  return (
    <>
      <Button variant="outline" disabled>Button</Button>
      <Button variant="outline" aria-invalid="true">Button</Button>
      <Button variant="ghost" aria-invalid="true">Button</Button>
      <Button variant="outline" disabled aria-busy="true"><IconLoader2 aria-hidden className="motion-safe:animate-spin" />Saving…</Button>
      <LoadingButton />
      <MoreLessToggle />
      <CountToggle icon="like" label="Like" count={456} />
      <CountToggle icon="star" label="Star" count={589} />
      <CopyButton />
      <CopyButton iconOnly />
      <MenuToggle />
      <ExpandingButton />
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild><Button variant="outline" size="icon" aria-label="Search"><IconSearch /></Button></TooltipTrigger>
          <TooltipContent>Search<Kbd>⌘K</Kbd></TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <ThemeToggle />
    </>
  );
}

function AccountButton({ variant = "outline", size = "default" }: { variant?: ButtonProps["variant"]; size?: ButtonProps["size"] }) {
  return (
    <Button variant={variant} size={size}>
      <Avatar size="xs"><AvatarImage src={people[0].avatar} alt="" /><AvatarFallback>AM</AvatarFallback></Avatar>
      Account
    </Button>
  );
}

export function ButtonAdornmentExamples() {
  return (
    <>
      <Button variant="outline">Button<span className="rounded-full bg-foreground/10 px-1.5 text-xs">5</span></Button>
      <Button variant="outline">Button<span className="rounded-full bg-foreground/10 px-1.5 text-xs">12</span></Button>
      <Button variant="outline"><IconSearch data-icon="inline-start" />Search<Kbd>⌘K</Kbd></Button>
      <Button variant="outline"><StatusDot color="success" />Available</Button>
      <Button variant="ghost" aria-label="Updates (new)">Updates<Badge variant="secondary" size="sm">New</Badge></Button>
      <Button variant="outline" size="icon" aria-label="Notifications"><IconBell /><span className="rounded-full bg-foreground/10 px-1 text-xs">3</span></Button>
      <AccountButton />
      <AccountButton variant="secondary" />
      <AccountButton size="sm" />
      <AccountButton variant="secondary" size="sm" />
      <PaymentButton />
    </>
  );
}

function SlidingArrow() {
  return (
    <Button asChild variant="outline" className="group/slide relative overflow-hidden rounded-full px-6">
      <Link href="/components/input">
        <span className="group-hover/slide:-translate-x-2 group-focus-visible/slide:-translate-x-2 motion-safe:transition-transform">Get started</span>
        <IconArrowRight aria-hidden className="absolute right-2.5 translate-x-8 opacity-0 group-hover/slide:translate-x-0 group-hover/slide:opacity-100 group-focus-visible/slide:translate-x-0 group-focus-visible/slide:opacity-100 motion-safe:transition-all" />
      </Link>
    </Button>
  );
}

export function LinkButtonExamples() {
  return (
    <>
      <LinkButton href="/components/input">Browse inputs</LinkButton>
      <LinkButton href="/components/input" variant="secondary" leadingIcon={<IconArrowLeft />}>Back to inputs</LinkButton>
      <LinkButton href="/components/input" variant="secondary" trailingIcon={<IconArrowRight />}>Browse inputs</LinkButton>
      <LinkButton href="/components/input" variant="secondary" className="group/back" leadingIcon={<IconArrowLeft className="motion-safe:transition-transform motion-safe:group-hover/back:-translate-x-1" />}>Back to inputs</LinkButton>
      <LinkButton variant="secondary" href="/components/button">Open settings</LinkButton>
      <LinkButton variant="secondary" size="sm" href="/components/button">Open settings</LinkButton>
      <LinkButton variant="secondary" size="xs" trailingIcon={<IconArrowRight />} href="/components/accordion">See all</LinkButton>
      <LinkButton variant="secondary" size="sm" leadingIcon={<IconDownload />} href="/components/file-upload">Download report</LinkButton>
      <LinkButton variant="secondary" trailingIcon={<IconExternalLink />} href="/components/card">View cards</LinkButton>
      <LinkButton variant="secondary" size="sm" leadingIcon={<IconDownload />} onClick={() => undefined}>Download report</LinkButton>
      <LinkButton variant="secondary" disabled>Unavailable action</LinkButton>
      <SlidingArrow />
    </>
  );
}

function SocialGroup({ appearance, iconOnly = false }: { appearance: "white" | "black"; iconOnly?: boolean }) {
  const [feedback, setFeedback] = useState("");
  return (
    <span className="inline-flex flex-col gap-2">
      <span className="flex flex-wrap gap-3">
        {(["google", "github", "apple"] as const).map((brand) => (
          <SocialButton key={brand} brand={brand} appearance={appearance} iconOnly={iconOnly} aria-label={`Continue with ${brand}`} className={iconOnly ? undefined : "w-auto"} onClick={() => setFeedback(`${brand} sign-in selected (demo)`)}>
            {`Continue with ${brand}`}
          </SocialButton>
        ))}
      </span>
      <p role="status" className="text-xs text-muted-foreground">{feedback}</p>
    </span>
  );
}

export function SocialButtonExamples() {
  return (
    <>
      <SocialGroup appearance="white" />
      <SocialGroup appearance="black" />
      <SocialGroup appearance="black" iconOnly />
    </>
  );
}

export function CloseButtonExamples() {
  return (
    <>
      {(["xs", "sm", "default"] as const).map((size) => <CloseButton key={size} size={size} aria-label="Close" />)}
      <CloseButton disabled aria-label="Close" />
    </>
  );
}
