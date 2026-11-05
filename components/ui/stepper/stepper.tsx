"use client";

import * as React from "react";
import { IconCheck, IconLoader2 } from "@tabler/icons-react";
import { cn } from "@/utils/cn";

export type StepperNavProps = React.ComponentProps<"nav">
export type StepperIndicatorProps = React.ComponentProps<"span">
export type StepperSeparatorProps = React.ComponentProps<"div">
export type StepperTitleProps = React.ComponentProps<"span">
export type StepperDescriptionProps = React.ComponentProps<"span">
export type StepperPanelProps = React.ComponentProps<"div">


type StepState = "active" | "completed" | "inactive" | "loading";
type StepperContextValue = {
  activeStep: number;
  setActiveStep: (step: number) => void;
  orientation: "horizontal" | "vertical";
  id: string;
  indicators?: Partial<Record<StepState, React.ReactNode>>;
};
const StepperContext = React.createContext<StepperContextValue | null>(null);
const ItemContext = React.createContext<{ step: number; state: StepState; disabled: boolean } | null>(null);
function useStepper() {
  const context = React.useContext(StepperContext);
  if (!context) throw new Error("Stepper components must be inside Stepper");
  return context;
}
function useStepItem() {
  const context = React.useContext(ItemContext);
  if (!context) throw new Error("Step components must be inside StepperItem");
  return context;
}
export type StepperProps = React.ComponentProps<"div"> & {
  value?: number;
  defaultValue?: number;
  onValueChange?: (step: number) => void;
  orientation?: "horizontal" | "vertical";
  indicators?: Partial<Record<StepState, React.ReactNode>>;
};
function Stepper({ value, defaultValue = 1, onValueChange, orientation = "horizontal", indicators, children, className, ...props }: StepperProps) {
  const [internal, setInternal] = React.useState(defaultValue);
  const id = React.useId();
  const activeStep = value ?? internal;
  function setActiveStep(step: number) {
    if (value === undefined) setInternal(step);
    onValueChange?.(step);
  }
  return <StepperContext.Provider value={{ activeStep, setActiveStep, orientation, id, indicators }}><div data-slot="stepper" data-orientation={orientation} className={cn("group/stepper w-full space-y-5", className)} {...props}>{children}</div></StepperContext.Provider>;
}
function StepperNav({ children, className, onKeyDown, ...props }: StepperNavProps) {
  const { orientation } = useStepper();
  return <nav {...props} role="tablist" aria-orientation={orientation} data-slot="stepper-nav" data-orientation={orientation} className={cn("group/stepper-nav flex gap-3", orientation === "vertical" && "flex-col", className)} onKeyDown={(event) => {
    onKeyDown?.(event);
    if (event.defaultPrevented || !(event.target instanceof Element) || !event.target.closest('[role="tab"]')) return;
    const forward = orientation === "vertical" ? "ArrowDown" : "ArrowRight";
    const backward = orientation === "vertical" ? "ArrowUp" : "ArrowLeft";
    if (![forward, backward, "Home", "End"].includes(event.key)) return;
    const triggers = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]:not(:disabled)'));
    if (!triggers.length) return;
    event.preventDefault();
    const index = triggers.indexOf(document.activeElement as HTMLButtonElement);
    const next = event.key === "Home" ? 0 : event.key === "End" ? triggers.length - 1 : (index + (event.key === forward ? 1 : -1) + triggers.length) % triggers.length;
    triggers[next].focus();
    triggers[next].click();
  }}>{children}</nav>;
}
export type StepperItemProps = React.ComponentProps<"div"> & { step: number; completed?: boolean; disabled?: boolean; loading?: boolean };
function StepperItem({ step, completed, disabled = false, loading, className, ...props }: StepperItemProps) {
  const { activeStep, orientation } = useStepper();
  const state: StepState = loading ? "loading" : completed || step < activeStep ? "completed" : step === activeStep ? "active" : "inactive";
  return <ItemContext.Provider value={{ step, state, disabled }}><div data-slot="stepper-item" data-state={state} data-orientation={orientation} className={cn("group/step flex min-w-0 gap-3", orientation === "horizontal" && "flex-1 items-center", disabled && "opacity-50", className)} {...props} /></ItemContext.Provider>;
}
export type StepperTriggerProps = React.ComponentProps<"button">;
function StepperTrigger({ className, onClick, disabled, ...props }: StepperTriggerProps) {
  const { activeStep, setActiveStep, id } = useStepper();
  const item = useStepItem();
  return <button {...props} type="button" role="tab" id={`${id}-tab-${item.step}`} aria-controls={`${id}-panel-${item.step}`} aria-selected={activeStep === item.step} aria-current={activeStep === item.step ? "step" : undefined} disabled={disabled || item.disabled || item.state === "loading"} tabIndex={activeStep === item.step ? 0 : -1} data-slot="stepper-trigger" className={cn("flex min-w-0 items-center gap-3 rounded-md text-left outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed", className)} onClick={(event) => { onClick?.(event); if (!event.defaultPrevented) setActiveStep(item.step); }} />;
}
function StepperIndicator({ className, children, ...props }: StepperIndicatorProps) {
  const { step, state } = useStepItem();
  const { indicators } = useStepper();
  return <span data-slot="stepper-indicator" data-state={state} className={cn("flex size-9 shrink-0 items-center justify-center rounded-full border text-sm font-medium", (state === "active" || state === "completed") ? "border-primary bg-primary text-primary-foreground" : "bg-muted text-muted-foreground", className)} {...props}>{indicators?.[state] ?? (state === "completed" ? <IconCheck className="size-4" /> : state === "loading" ? <IconLoader2 aria-hidden className="size-4 motion-safe:animate-spin" /> : children ?? step)}</span>;
}
function StepperSeparator({ className, ...props }: StepperSeparatorProps) {
  const { orientation } = useStepper();
  return <div aria-hidden data-slot="stepper-separator" className={cn("bg-border group-data-[state=completed]/step:bg-primary", orientation === "horizontal" ? "h-px min-w-3 flex-1" : "ml-4 h-8 w-px", className)} {...props} />;
}
function StepperTitle({ className, ...props }: StepperTitleProps) { return <span data-slot="stepper-title" className={cn("block text-sm font-medium", className)} {...props} />; }
function StepperDescription({ className, ...props }: StepperDescriptionProps) { return <span data-slot="stepper-description" className={cn("block text-xs text-muted-foreground", className)} {...props} />; }
function StepperPanel(props: StepperPanelProps) { return <div data-slot="stepper-panel" {...props} />; }
export type StepperContentProps = React.ComponentProps<"div"> & { value: number; forceMount?: boolean };
function StepperContent({ value, forceMount, ...props }: StepperContentProps) {
  const { activeStep, id } = useStepper();
  if (value !== activeStep && !forceMount) return null;
  return <div role="tabpanel" id={`${id}-panel-${value}`} aria-labelledby={`${id}-tab-${value}`} tabIndex={0} hidden={value !== activeStep} data-slot="stepper-content" {...props} />;
}
export { useStepper, useStepItem, Stepper, StepperNav, StepperItem, StepperTrigger, StepperIndicator, StepperSeparator, StepperTitle, StepperDescription, StepperPanel, StepperContent };
