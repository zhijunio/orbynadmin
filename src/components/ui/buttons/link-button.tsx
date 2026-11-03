"use client";
import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils/cn";

type SharedProps = { children: ReactNode; size?: "xs" | "sm" | "default"; variant?: "primary" | "secondary"; leadingIcon?: ReactNode; trailingIcon?: ReactNode; className?: string };
type AnchorProps = SharedProps & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "className"> & { href: string };
type ActionProps = SharedProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className"> & { href?: undefined };
export type LinkButtonProps = AnchorProps | ActionProps;
const styles = "inline-flex min-h-6 items-center gap-1 underline-offset-4 transition-colors hover:underline focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";
const sizes = { xs: "text-xs [&_svg]:size-3", sm: "text-sm [&_svg]:size-3.5", default: "text-sm [&_svg]:size-4" };
function content(children: ReactNode, leadingIcon?: ReactNode, trailingIcon?: ReactNode) { return <>{leadingIcon}{children}{trailingIcon}</>; }
export function LinkButton(props: LinkButtonProps) {
  const { children, size = "default", variant = "primary", leadingIcon, trailingIcon, className, ...rest } = props;
  const classes = cn(styles, sizes[size], variant === "primary" ? "text-primary" : "text-muted-foreground", className);
  if ("href" in props && props.href) return <Link href={props.href} className={classes} {...(rest as Omit<AnchorProps, keyof SharedProps | "href">)}>{content(children, leadingIcon, trailingIcon)}</Link>;
  return <button type="button" className={cn(classes, "disabled:opacity-50")} {...(rest as Omit<ActionProps, keyof SharedProps>)}>{content(children, leadingIcon, trailingIcon)}</button>;
}
