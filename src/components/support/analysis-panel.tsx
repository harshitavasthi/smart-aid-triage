import { Check, Copy, FileText, Gauge, Link2, Tag } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { PriorityBadge, ReviewBadge, SentimentBadge } from "@/components/support/badges";
import { EmailStatus } from "@/components/support/email-status";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { TicketAnalysis } from "@/lib/support-types";

function Field({
  label,
  value,
  Icon,
}: {
  label: string;
  value: string;
  Icon: typeof Tag;
}) {
  return (
    <div className="rounded-lg border border-border/60 bg-muted/25 p-3">
      <p className="flex items-center gap-1.5 text-xs font-medium tracking-wide text-muted-foreground uppercase">
        <Icon className="size-3.5" aria-hidden="true" />
        {label}
      </p>
      <p className="mt-1.5 text-sm font-medium break-words">{value || "—"}</p>
    </div>
  );
}

function ConfidenceMeter({ confidence }: { confidence: number | null }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const id = requestAnimationFrame(() => setWidth(confidence ?? 0));
    return () => cancelAnimationFrame(id);
  }, [confidence]);

  return (
    <div>
      <div className="flex items-center justify-between gap-2">
        <p className="flex items-center gap-1.5 text-xs font-medium tracking-wide text-muted-foreground uppercase">
          <Gauge className="size-3.5" aria-hidden="true" />
          AI Confidence
        </p>
        <span className="font-display text-sm font-semibold tabular-nums">
          {confidence === null ? "N/A" : `${confidence}%`}
        </span>
      </div>
      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-700 ease-out"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}

export function AnalysisPanel({ analysis }: { analysis: TicketAnalysis }) {
  const [copied, setCopied] = useState(false);

  const copyResponse = async () => {
    try {
      await navigator.clipboard.writeText(analysis.suggestedResponse);
      setCopied(true);
      toast.success("Suggested response copied");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Couldn't copy to clipboard");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-md border border-primary/30 bg-primary/10 px-2.5 py-1 font-mono text-xs font-semibold text-primary">
          {analysis.ticketId}
        </span>
        <PriorityBadge priority={analysis.priority} />
        <SentimentBadge sentiment={analysis.sentiment} />
        <ReviewBadge required={analysis.humanReviewRequired} />
      </div>

      <div>
        <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">Subject</p>
        <h3 className="mt-1 text-lg font-semibold break-words">{analysis.ticket.subject}</h3>
        <p className="mt-1 text-sm text-muted-foreground break-words">
          {analysis.ticket.name} · {analysis.ticket.email}
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Category" value={analysis.category} Icon={Tag} />
        <Field label="Matched Issue" value={analysis.matchedIssue} Icon={Link2} />
      </div>

      <ConfidenceMeter confidence={analysis.confidence} />

      <div>
        <p className="flex items-center gap-1.5 text-xs font-medium tracking-wide text-muted-foreground uppercase">
          <FileText className="size-3.5" aria-hidden="true" />
          Summary
        </p>
        <p className="mt-1.5 text-sm leading-relaxed">
          {analysis.summary || "The workflow did not return a summary for this ticket."}
        </p>
      </div>

      <Separator />

      <div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
            Suggested Response
          </p>
          {analysis.suggestedResponse ? (
            <Button variant="ghost" size="sm" onClick={copyResponse} className="h-7 px-2 text-xs">
              {copied ? (
                <Check className="size-3.5" aria-hidden="true" />
              ) : (
                <Copy className="size-3.5" aria-hidden="true" />
              )}
              {copied ? "Copied" : "Copy"}
            </Button>
          ) : null}
        </div>
        <div className="mt-2 rounded-lg border border-border/60 bg-surface p-4">
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {analysis.suggestedResponse || "No suggested response was returned."}
          </p>
        </div>
      </div>

      <Separator />

      <EmailStatus analysis={analysis} />
    </div>
  );
}
