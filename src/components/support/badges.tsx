import { AlertTriangle, ArrowDown, ArrowUp, Flame, Frown, Meh, Siren, Smile } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import type { Priority, Sentiment } from "@/lib/support-types";

const base =
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold uppercase tracking-wide";

const priorityStyles: Record<Priority, { label: string; className: string; Icon: LucideIcon }> = {
  low: {
    label: "Low",
    className: "border-priority-low/30 bg-priority-low/10 text-priority-low",
    Icon: ArrowDown,
  },
  medium: {
    label: "Medium",
    className: "border-priority-medium/30 bg-priority-medium/10 text-priority-medium",
    Icon: Meh,
  },
  high: {
    label: "High",
    className: "border-priority-high/30 bg-priority-high/10 text-priority-high",
    Icon: ArrowUp,
  },
  critical: {
    label: "Critical",
    className: "border-priority-critical/40 bg-priority-critical/12 text-priority-critical",
    Icon: Flame,
  },
};

const sentimentStyles: Record<Sentiment, { label: string; className: string; Icon: LucideIcon }> = {
  positive: {
    label: "Positive",
    className: "border-sentiment-positive/30 bg-sentiment-positive/10 text-sentiment-positive",
    Icon: Smile,
  },
  neutral: {
    label: "Neutral",
    className: "border-sentiment-neutral/30 bg-sentiment-neutral/10 text-sentiment-neutral",
    Icon: Meh,
  },
  negative: {
    label: "Negative",
    className: "border-sentiment-negative/30 bg-sentiment-negative/10 text-sentiment-negative",
    Icon: Frown,
  },
  urgent: {
    label: "Urgent",
    className: "border-sentiment-urgent/40 bg-sentiment-urgent/12 text-sentiment-urgent",
    Icon: Siren,
  },
};

export function PriorityBadge({ priority, className }: { priority: Priority; className?: string }) {
  const { label, className: tone, Icon } = priorityStyles[priority];
  return (
    <span className={cn(base, tone, className)}>
      <Icon className="size-3.5" aria-hidden="true" />
      {label}
    </span>
  );
}

export function SentimentBadge({
  sentiment,
  className,
}: {
  sentiment: Sentiment;
  className?: string;
}) {
  const { label, className: tone, Icon } = sentimentStyles[sentiment];
  return (
    <span className={cn(base, tone, className)}>
      <Icon className="size-3.5" aria-hidden="true" />
      {label}
    </span>
  );
}

export function ReviewBadge({ required }: { required: boolean }) {
  return (
    <span
      className={cn(
        base,
        required
          ? "border-warning/35 bg-warning/10 text-warning"
          : "border-success/30 bg-success/10 text-success",
      )}
    >
      <AlertTriangle className="size-3.5" aria-hidden="true" />
      {required ? "Review required" : "No review needed"}
    </span>
  );
}
