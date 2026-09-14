import { AlertOctagon, Inbox, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export function AnalysisSkeleton() {
  return (
    <div className="space-y-5" aria-busy="true" aria-live="polite">
      <div className="flex flex-wrap items-center gap-2">
        <Skeleton className="h-6 w-28 rounded-full" />
        <Skeleton className="h-6 w-24 rounded-full" />
        <Skeleton className="h-6 w-32 rounded-full" />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <Skeleton className="h-16 rounded-lg" />
        <Skeleton className="h-16 rounded-lg" />
      </div>
      <Skeleton className="h-3 w-full rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-11/12" />
      </div>
      <Skeleton className="h-32 w-full rounded-lg" />
      <p className="text-center text-xs text-muted-foreground">
        Routing the ticket through your triage workflow…
      </p>
    </div>
  );
}

export function AnalysisEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border/70 px-6 py-14 text-center">
      <div className="flex size-11 items-center justify-center rounded-full bg-muted">
        <Inbox className="size-5 text-muted-foreground" aria-hidden="true" />
      </div>
      <h3 className="mt-4 text-base font-semibold">No analysis yet</h3>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">
        Submit a ticket and its category, priority, sentiment and suggested reply will appear here.
      </p>
    </div>
  );
}

export function AnalysisErrorState({
  message,
  onRetry,
  isRetrying,
}: {
  message: string;
  onRetry: () => void;
  isRetrying: boolean;
}) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center justify-center rounded-lg border border-destructive/35 bg-destructive/8 px-6 py-12 text-center"
    >
      <div className="flex size-11 items-center justify-center rounded-full bg-destructive/15">
        <AlertOctagon className="size-5 text-destructive" aria-hidden="true" />
      </div>
      <h3 className="mt-4 text-base font-semibold">Analysis failed</h3>
      <p className="mt-1 max-w-md text-sm text-muted-foreground">{message}</p>
      <Button variant="outline" className="mt-5" onClick={onRetry} disabled={isRetrying}>
        <RotateCcw className="size-4" aria-hidden="true" />
        {isRetrying ? "Retrying…" : "Retry analysis"}
      </Button>
    </div>
  );
}
