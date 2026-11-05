"use client"

import * as React from "react"
import { IconArrowLeft, IconArrowRight, IconCheck } from "@tabler/icons-react"
import { Button } from "@/components/ui/button/button"
import { cn } from "@/utils/cn"

export type QuestionnaireAnswer = string | string[]
export type QuestionnaireAnswers = Record<string, QuestionnaireAnswer>
export type QuestionnaireChoiceOption = { value: string; label: string; description?: string; shortcut?: string }
export type QuestionnaireQuestion = {
  id: string
  title: string
  description?: string
  options?: QuestionnaireChoiceOption[]
  multiple?: boolean
  required?: boolean
  optional?: boolean
  allowOther?: boolean
  placeholder?: string
  visibleWhen?: (answers: QuestionnaireAnswers) => boolean
}
export type QuestionnaireValidation = { message: string; questionId?: string }

export type QuestionnaireProps = {
  questions: QuestionnaireQuestion[]
  initialAnswers?: QuestionnaireAnswers
  onComplete?: (answers: QuestionnaireAnswers) => void
  onAnswersChange?: (answers: QuestionnaireAnswers) => void
  onSkip?: (questionId: string) => void
  validate?: (answers: QuestionnaireAnswers) => QuestionnaireValidation | undefined
  variant?: "card" | "plain"
  progressStyle?: "bar" | "segments"
  showStepLabels?: boolean
  completeTitle?: string
  completeDescription?: string
  className?: string
}

export function Questionnaire({
  questions,
  initialAnswers = {},
  onComplete,
  onAnswersChange,
  onSkip,
  validate,
  variant = "card",
  progressStyle = "bar",
  showStepLabels = false,
  completeTitle = "Setup complete",
  completeDescription = "Your answers have been saved.",
  className,
}: QuestionnaireProps) {
  const [answers, setAnswers] = React.useState<QuestionnaireAnswers>(initialAnswers)
  const [stepId, setStepId] = React.useState(questions[0]?.id ?? "")
  const [skipped, setSkipped] = React.useState<string[]>([])
  const [error, setError] = React.useState("")
  const [complete, setComplete] = React.useState(false)
  const [otherAnswer, setOtherAnswer] = React.useState("")
  const visibleQuestions = questions.filter((question) => question.visibleWhen?.(answers) ?? true)
  const stepIndex = Math.max(0, visibleQuestions.findIndex((question) => question.id === stepId))
  const question = visibleQuestions[stepIndex]
  const progress = visibleQuestions.length ? ((stepIndex + 1) / visibleQuestions.length) * 100 : 100

  const updateAnswer = (id: string, value: QuestionnaireAnswer) => {
    const next = { ...answers, [id]: value }
    setAnswers(next)
    onAnswersChange?.(next)
    setError("")
  }
  const goNext = (skip = false) => {
    if (!question) return
    const answer = answers[question.id]
    const empty = Array.isArray(answer) ? answer.length === 0 : !answer
    if (!skip && question.required !== false && empty) {
      setError("Choose an answer to continue.")
      return
    }
    if (skip) {
      setSkipped((current) => current.includes(question.id) ? current : [...current, question.id])
      onSkip?.(question.id)
    }
    const nextQuestions = questions.filter((item) => item.visibleWhen?.(answers) ?? true)
    const nextIndex = nextQuestions.findIndex((item) => item.id === question.id) + 1
    if (nextIndex < nextQuestions.length) {
      setStepId(nextQuestions[nextIndex].id)
      setOtherAnswer("")
      return
    }
    const issue = validate?.(answers)
    if (issue) {
      setError(issue.message)
      if (issue.questionId) setStepId(issue.questionId)
      return
    }
    onComplete?.(answers)
    setComplete(true)
  }
  const goBack = () => {
    if (stepIndex > 0) {
      setStepId(visibleQuestions[stepIndex - 1].id)
      setError("")
    }
  }

  if (complete) return <div role="status" className={cn("grid gap-2 rounded-xl border border-border bg-card p-6 text-center", className)}><span className="mx-auto grid size-10 place-items-center rounded-full bg-primary/10 text-primary"><IconCheck className="size-5" /></span><h3 className="font-semibold">{completeTitle}</h3><p className="text-sm text-muted-foreground">{completeDescription}</p><Button type="button" variant="outline" size="sm" className="mx-auto mt-2" onClick={() => { setComplete(false); setStepId(questions[0]?.id ?? ""); setSkipped([]); setError("") }}>Start again</Button></div>
  if (!question) return null

  const answer = answers[question.id]
  const selected = Array.isArray(answer) ? answer : answer ? [answer] : []
  const setChoice = (value: string) => {
    if (question.multiple) {
      const values = selected.includes(value) ? selected.filter((item) => item !== value) : [...selected, value]
      updateAnswer(question.id, values)
      return
    }
    updateAnswer(question.id, value)
  }

  return <form aria-label="Questionnaire" onSubmit={(event) => { event.preventDefault(); goNext() }} onKeyDown={(event) => {
    const target = event.target
    if (target instanceof HTMLElement && target.closest("textarea, select, button")) return
    if (target instanceof HTMLInputElement && target.type !== "radio" && target.type !== "checkbox") return
    const shortcutIndex = question.options?.findIndex((option, index) => (option.shortcut ?? String.fromCharCode(65 + index)).toLowerCase() === event.key.toLowerCase()) ?? -1
    if (shortcutIndex >= 0 && question.options?.[shortcutIndex]) { event.preventDefault(); setChoice(question.options[shortcutIndex].value) }
  }} className={cn("min-w-0", variant === "card" && "rounded-xl border border-border bg-card p-5", className)}>
    <div className="mb-5 flex items-start justify-between gap-3">
      <div className="min-w-0"><div className="text-xs font-medium text-muted-foreground">Question {stepIndex + 1} of {visibleQuestions.length}{skipped.includes(question.id) && <span className="ml-2 rounded-full bg-muted px-2 py-0.5">Skipped</span>}</div><h3 className="mt-1 text-base font-semibold">{question.title}</h3>{question.description && <p className="mt-1 text-sm text-muted-foreground">{question.description}</p>}</div>
      {question.multiple && <span className="shrink-0 rounded-full bg-muted px-2 py-1 text-xs text-muted-foreground">{selected.length} selected</span>}
    </div>
    {progressStyle === "bar" ? <div className="mb-5 h-1.5 overflow-hidden rounded-full bg-muted" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress)} aria-label="Questionnaire progress"><div className="h-full rounded-full bg-primary transition-[width] motion-reduce:transition-none" style={{ width: `${progress}%` }} /></div> : <div className="mb-5 flex gap-1.5" aria-label={`Progress ${Math.round(progress)}%`}>{visibleQuestions.map((item, index) => <div key={item.id} className="min-w-0 flex-1"><div className={cn("h-1.5 rounded-full", index <= stepIndex ? "bg-primary" : "bg-muted")} />{showStepLabels && <span className={cn("mt-1 block truncate text-[10px]", index === stepIndex ? "font-medium text-foreground" : "text-muted-foreground")}>{item.title}</span>}</div>)}</div>}
    {question.options ? <fieldset className="grid gap-2"><legend className="sr-only">{question.title}</legend>{question.options.map((option, index) => <label key={option.value} className={cn("flex min-w-0 cursor-pointer items-start gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-accent/50", selected.includes(option.value) && "border-primary bg-primary/5")}><input type={question.multiple ? "checkbox" : "radio"} name={question.id} value={option.value} checked={selected.includes(option.value)} onChange={() => setChoice(option.value)} className="mt-0.5 accent-primary"/><span className="min-w-0 flex-1"><span className="flex items-center justify-between gap-2 text-sm font-medium">{option.label}{option.shortcut && <kbd className="rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">{option.shortcut || String.fromCharCode(65 + index)}</kbd>}</span>{option.description && <span className="mt-0.5 block text-xs text-muted-foreground">{option.description}</span>}</span></label>)}</fieldset> : <label className="grid gap-1.5 text-sm font-medium">Your answer<input autoFocus value={typeof answer === "string" ? answer : ""} onChange={(event) => updateAnswer(question.id, event.target.value)} placeholder={question.placeholder ?? "Type your answer..."} className="h-10 rounded-md border border-input bg-background px-3 font-normal outline-none focus-visible:ring-2 focus-visible:ring-ring" /></label>}
    {question.allowOther && <label className="mt-3 grid gap-1.5 text-sm font-medium">Something else<input value={otherAnswer} onChange={(event) => { setOtherAnswer(event.target.value); if (event.target.value) updateAnswer(question.id, `custom:${event.target.value}`) }} placeholder="Write your own answer" className="h-10 rounded-md border border-input bg-background px-3 font-normal outline-none focus-visible:ring-2 focus-visible:ring-ring" /></label>}
    {error && <p role="alert" className="mt-3 text-sm text-destructive">{error}</p>}
    <div className="mt-5 flex items-center justify-between gap-2"><Button type="button" size="sm" variant="outline" onClick={goBack} disabled={stepIndex === 0}><IconArrowLeft className="size-4"/>Previous</Button><div className="flex items-center gap-2">{question.optional && <Button type="button" size="sm" variant="ghost" onClick={() => goNext(true)}>Skip</Button>}<Button type="submit" size="sm">{stepIndex === visibleQuestions.length - 1 ? "Finish" : "Next"}<IconArrowRight className="size-4"/></Button></div></div>
  </form>
}
