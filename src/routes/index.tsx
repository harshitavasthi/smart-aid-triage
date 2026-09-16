import { useMutation } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Bot, ShieldCheck, Workflow } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { AnalysisPanel } from "@/components/support/analysis-panel";
import {
  AnalysisEmptyState,
  AnalysisErrorState,
  AnalysisSkeleton,
} from "@/components/support/analysis-states";
import { OverviewCards, type OverviewStats } from "@/components/support/overview-cards";
import { TicketForm } from "@/components/support/ticket-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SupportApiError, analyzeTicket } from "@/lib/support-api";
import type { TicketAnalysis, TicketPayload } from "@/lib/support-types";

const title = "SupportAI — AI Customer Support Ticket Triage";
const description =
  "Submit a customer support ticket and get instant AI triage: category, priority, sentiment, confidence and a ready-to-send suggested response.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

/** Mock baseline numbers for the MVP; live results are added on top. */
const BASE_STATS: OverviewStats = {
  totalTickets: 128,
  highPriority: 19,
  autoResponded: 94,
  humanReview: 15,
};

function Index() {
  const [history, setHistory] = useState<TicketAnalysis[]>([]);
  const [lastPayload, setLastPayload] = useState<TicketPayload | null>(null);

  const mutation = useMutation({
    mutationFn: (payload: TicketPayload) => analyzeTicket(payload),
    onSuccess: (analysis) => {
      setHistory((prev) => [analysis, ...prev]);
      if (analysis.humanReviewRequired) {
        toast.warning("Ticket flagged for human review", {
          description: "An agent needs to approve the response before it goes out.",
        });
      } else {
        toast.success("Ticket analyzed", {
          description: analysis.emailSent
            ? "Customer email sent successfully."
            : `Categorized as ${analysis.category} · ${analysis.priority} priority.`,
        });
      }
    },
    onError: (error) => {
      toast.error("Analysis failed", {
        description:
          error instanceof SupportApiError ? error.message : "Something went wrong. Please retry.",
      });
    },
  });

  const stats = useMemo<OverviewStats>(() => {
    return history.reduce<OverviewStats>(
      (acc, item) => ({
        totalTickets: acc.totalTickets + 1,
        highPriority:
          acc.highPriority + (item.priority === "high" || item.priority === "critical" ? 1 : 0),
        autoResponded: acc.autoResponded + (item.autoResponded ? 1 : 0),
        humanReview: acc.humanReview + (item.humanReviewRequired ? 1 : 0),
      }),
      { ...BASE_STATS },
    );
  }, [history]);

  const submit = (payload: TicketPayload) => {
    setLastPayload(payload);
    mutation.mutate(payload);
  };

  const retry = () => {
    if (lastPayload) mutation.mutate(lastPayload);
  };

  const latest = history[0];
  const errorMessage =
    mutation.error instanceof SupportApiError
      ? mutation.error.message
      : mutation.error
        ? "Something went wrong while contacting the analysis workflow."
        : null;

  return (
    <div className="min-h-screen bg-background">
      <div className="grid-backdrop">
        <header className="border-b border-border/60">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-primary shadow-elegant flex size-10 shrink-0 items-center justify-center rounded-lg border border-primary/40">
                <Bot className="size-5 text-primary-foreground" aria-hidden="true" />
              </div>
              <div>
                <h1 className="text-lg font-semibold tracking-tight">SupportAI</h1>
                <p className="text-xs text-muted-foreground">AI customer support ticket triage</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border/70 px-2.5 py-1">
                <Workflow className="size-3.5" aria-hidden="true" />
                Workflow connected
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border/70 px-2.5 py-1">
                <ShieldCheck className="size-3.5 text-success" aria-hidden="true" />
                No keys in browser
              </span>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-6xl space-y-6 px-4 py-6 sm:px-6 lg:py-8">
          <section aria-label="Overview">
            <OverviewCards stats={stats} />
          </section>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start">
            <section aria-label="New ticket">
              <TicketForm onSubmit={submit} isSubmitting={mutation.isPending} />
            </section>

            <section aria-label="Latest analysis">
              <Card className="shadow-elegant border-border/70 bg-card/80 backdrop-blur-sm">
                <CardHeader className="gap-1">
                  <CardTitle className="text-lg">Latest Analysis</CardTitle>
                  <CardDescription>
                    {latest
                      ? `Analyzed ${new Date(latest.analyzedAt).toLocaleTimeString()}`
                      : "The most recently analyzed ticket appears here."}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {mutation.isPending ? (
                    <AnalysisSkeleton />
                  ) : errorMessage ? (
                    <AnalysisErrorState
                      message={errorMessage}
                      onRetry={retry}
                      isRetrying={mutation.isPending}
                    />
                  ) : latest ? (
                    <AnalysisPanel analysis={latest} />
                  ) : (
                    <AnalysisEmptyState />
                  )}
                </CardContent>
              </Card>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
