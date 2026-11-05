"use client";
import { useState, type FormEvent } from "react";

import { CatalogGridItems } from "@/components/custom/docs/catalog-page-grid";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { Button } from "@/components/ui/button/button";
import { Label } from "@/components/ui/input/label";
import { Progress } from "@/components/ui/progress/progress";
import { Rating } from "@/components/ui/rating/rating";
import { Separator } from "@/components/ui/divider/separator";
import { Textarea } from "@/components/ui/textarea/textarea";

const distribution = [
  { stars: 5, count: 124, percentage: 62 },
  { stars: 4, count: 45, percentage: 22 },
  { stars: 3, count: 18, percentage: 9 },
  { stars: 2, count: 8, percentage: 4 },
  { stars: 1, count: 5, percentage: 3 },
];

const reactions = [
  { value: 1, emoji: "😞", label: "Needs improvement" },
  { value: 2, emoji: "😕", label: "Below expectations" },
  { value: 3, emoji: "😐", label: "Meets expectations" },
  { value: 4, emoji: "😊", label: "Good" },
  { value: 5, emoji: "🤩", label: "Excellent" },
];

function EditableRatingExample() {
  const [rating, setRating] = useState(0);

  return (
    <div className="flex flex-col items-center gap-3">
      <Rating rating={rating} editable onRatingChange={setRating} showValue />
      <p className="text-sm text-muted-foreground" aria-live="polite">
        {rating > 0 ? `Your rating: ${rating.toFixed(1)} out of 5` : "Select a rating"}
      </p>
    </div>
  );
}

function HalfStarRatingExample() {
  const [rating, setRating] = useState(3.5);

  return (
    <div className="flex flex-col items-center gap-3">
      <Rating rating={rating} editable step={0.5} showValue onRatingChange={setRating} />
      <p className="text-sm text-muted-foreground" aria-live="polite">Use half-star increments · {rating.toFixed(1)} out of 5</p>
    </div>
  );
}

function ReviewSummaryExample() {
  return (
    <div className="mx-auto w-full max-w-sm space-y-4">
      <div className="flex flex-col items-center gap-2">
        <span className="text-3xl font-semibold tabular-nums">4.6</span>
        <Rating rating={4.6} size="sm" />
        <span className="text-xs text-muted-foreground">Based on 200 reviews</span>
      </div>
      <Separator />
      <div className="space-y-2">
        {distribution.map((row) => (
          <div key={row.stars} className="grid grid-cols-[1rem_minmax(0,1fr)_2rem] items-center gap-3 text-xs">
            <span className="text-right text-muted-foreground">{row.stars}</span>
            <Progress value={row.percentage} aria-label={`${row.stars} star reviews: ${row.percentage}%`} />
            <span className="text-right tabular-nums text-muted-foreground">{row.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReactionRatingExample() {
  const [selected, setSelected] = useState<number | null>(null);
  const reaction = reactions.find((item) => item.value === selected);

  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-sm font-medium">How was the support response?</p>
      <div role="group" aria-label="Rate the support response" className="flex gap-2">
        {reactions.map((item) => (
          <button
            key={item.value}
            type="button"
            aria-label={item.label}
            aria-pressed={selected === item.value}
            onClick={() => setSelected(item.value)}
            className="flex size-10 items-center justify-center rounded-lg border border-transparent text-2xl transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring aria-pressed:border-primary/40 aria-pressed:bg-primary/10"
          >
            {item.emoji}
          </button>
        ))}
      </div>
      <p className="min-h-5 text-sm text-muted-foreground" aria-live="polite">{reaction?.label ?? "Choose a response"}</p>
    </div>
  );
}

function ReviewFormExample() {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function submitReview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (rating === 0 || review.trim().length === 0) return;
    setSubmitted(true);
  }

  return (
    <form onSubmit={submitReview} className="mx-auto flex w-full max-w-md flex-col gap-4">
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-sm font-semibold">Share product feedback</h2>
        <Rating rating={rating} editable onRatingChange={(value) => { setRating(value); setSubmitted(false); }} />
        <p className="min-h-5 text-xs text-muted-foreground" aria-live="polite">
          {rating === 0 ? "Choose a rating to continue" : rating <= 2 ? "Thanks for telling us what needs work" : rating <= 3 ? "Thanks for your feedback" : "Glad this worked well for you"}
        </p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="rating-review">Review</Label>
        <Textarea id="rating-review" value={review} onChange={(event) => { setReview(event.currentTarget.value); setSubmitted(false); }} placeholder="Share details with the product team" rows={3} />
      </div>
      <Button type="submit" size="sm" disabled={rating === 0 || review.trim().length === 0}>Submit review</Button>
      <p role="status" className="min-h-5 text-center text-sm text-primary">{submitted ? "Your review has been recorded." : ""}</p>
    </form>
  );
}

export function RatingCatalogExamples() {
  return (
    <CatalogGridItems>
      <ComponentPreview title="Value" span={2} layout="grid3">
      <div className="min-w-0"><Rating rating={4} /></div>
      <div className="min-w-0"><Rating rating={3.5} /></div>
      <div className="min-w-0"><Rating rating={4.5} showValue /></div>
      </ComponentPreview>
      <ComponentPreview title="Sizes">
      <div className="min-w-0"><div className="flex flex-col items-center gap-3"><Rating rating={4} size="sm" /><Rating rating={4} /><Rating rating={4} size="lg" /></div></div>
      </ComponentPreview>
      <ComponentPreview title="Editable" span={2} layout="grid3">
      <div className="min-w-0"><EditableRatingExample /></div>
      <div className="min-w-0"><HalfStarRatingExample /></div>
      <div className="min-w-0"><ReactionRatingExample /></div>
      </ComponentPreview>
      <ComponentPreview title="Summary" span={2} layout="grid2">
      <div className="min-w-0"><ReviewSummaryExample /></div>
      <div className="min-w-0"><ReviewFormExample /></div>
      </ComponentPreview>
    </CatalogGridItems>
  );
}
