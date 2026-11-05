import * as React from "react"
import { cn } from "@/utils/cn"

export type AlertTitleProps = React.ComponentProps<"div">
export type AlertDescriptionProps = React.ComponentProps<"div">
export type AlertActionProps = React.ComponentProps<"div">


const alertBase = "group/alert relative grid w-full gap-0.5 rounded-lg border px-2.5 py-2 text-left text-sm has-data-[slot=alert-action]:relative has-data-[slot=alert-action]:pr-18 has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-2 *:[svg]:row-span-2 *:[svg]:translate-y-0.5 *:[svg]:text-current *:[svg:not([class*='size-'])]:size-4"
const alertVariantClasses = {
  default: "bg-card text-card-foreground",
  info: "border-info/30 bg-info/5 text-info-foreground *:data-[slot=alert-description]:text-current",
  success: "border-success/30 bg-success/5 text-success-foreground *:data-[slot=alert-description]:text-current",
  warning: "border-warning/30 bg-warning/5 text-warning-foreground *:data-[slot=alert-description]:text-current",
  invert: "border-foreground bg-foreground text-background *:data-[slot=alert-description]:text-background/80",
  destructive: "bg-card text-destructive *:data-[slot=alert-description]:text-destructive/90 *:[svg]:text-current",
} as const
export type AlertVariant = keyof typeof alertVariantClasses
export type AlertProps = React.ComponentProps<"div"> & { variant?: AlertVariant }
function alertVariants({ variant = "default" }: { variant?: AlertVariant } = {}) {
  return cn(alertBase, alertVariantClasses[variant])
}

function Alert({
  className,
  variant,
  ...props
}: AlertProps) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }: AlertTitleProps) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "font-medium group-has-[>svg]/alert:col-start-2 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground",
        className
      )}
      {...props}
    />
  )
}

function AlertDescription({
  className,
  ...props
}: AlertDescriptionProps) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "text-sm text-balance text-muted-foreground md:text-pretty [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4",
        className
      )}
      {...props}
    />
  )
}

function AlertAction({ className, ...props }: AlertActionProps) {
  return (
    <div
      data-slot="alert-action"
      className={cn("absolute top-2 right-2", className)}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription, AlertAction }
