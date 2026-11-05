import { cn } from "@/utils/cn"

export type SkeletonProps = React.ComponentProps<"div">

function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      data-slot="skeleton"
      className={cn("motion-safe:animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

export { Skeleton }
