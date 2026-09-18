import { useMutation } from "@tanstack/react-query";
import { Bot, ClipboardList, MessageCircle, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { AnalysisPanel } from "@/components/support/analysis-panel";
import {
  AnalysisEmptyState,
  AnalysisErrorState,
  AnalysisSkeleton,
} from "@/components/support/analysis-states";
import { ChatWidget } from "@/components/support/chat-widget";
import { TicketForm } from "@/components/support/ticket-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SupportApiError, analyzeTicket } from "@/lib/support-api";
import type { TicketAnalysis, TicketPayload } from "@/lib/support-types";

export function SupportCenter() {
  const [open, setOpen] = useState(false);
  const [history, setHistory] = useState<TicketAnalysis[]>([]);
  const [lastPayload, setLastPayload] = useState<TicketPayload | null>(null);

  const mutation = useMutation({
    mutationFn: (payload: TicketPayload) => analyzeTicket(payload),
    onSuccess: (analysis) => {
      setHistory((previous) => [analysis, ...previous]);
      if (analysis.humanReviewRequired) {
        toast.warning("Ticket flagged for human review", {
          description: "An agent needs to approve the response before it goes out.",
        });
        return;
      }
      toast.success("Ticket analyzed", {
        description: analysis.emailSent
          ? "Customer email sent successfully."
          : `Categorized as ${analysis.category} · ${analysis.priority} priority.`,
      });
    },
    onError: (error) => {
      toast.error("Analysis failed", {
        description:
          error instanceof SupportApiError ? error.message : "Something went wrong. Please retry.",
      });
    },
  });

  const submit = (payload: TicketPayload) => {
    setLastPayload(payload);
    mutation.mutate(payload);
  };

  const latest = history[0];
  const errorMessage =
    mutation.error instanceof SupportApiError
      ? mutation.error.message
      : mutation.error
        ? "Something went wrong while contacting the analysis workflow."
        : null;

  return (
    <>
      {!open ? (
        <Button
          type="button"
          size="icon"
          onClick={() => setOpen(true)}
          aria-label="Open support center"
          className="bg-gradient-primary shadow-elegant fixed bottom-5 right-5 z-50 size-14 rounded-full border border-primary/40"
        >
          <MessageCircle className="size-6" aria-hidden="true" />
        </Button>
      ) : null}

      {open ? (
        <div
          role="dialog"
          aria-label="Customer support center"
          className="shadow-elegant fixed inset-3 z-50 flex flex-col overflow-hidden rounded-xl border border-border/70 bg-card sm:inset-auto sm:bottom-5 sm:right-5 sm:h-[min(46rem,calc(100vh-2.5rem))] sm:w-[min(52rem,calc(100vw-2.5rem))]"
        >
          <header className="flex shrink-0 items-center gap-3 border-b border-border/70 px-4 py-3">
            <div className="bg-gradient-primary flex size-9 shrink-0 items-center justify-center rounded-lg text-primary-foreground">
              <Bot className="size-4.5" aria-hidden="true" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">Customer Support</p>
              <p className="truncate text-xs text-muted-foreground">Submit a ticket or chat with the assistant</p>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setOpen(false)}
              aria-label="Close support center"
              className="size-8"
            >
              <X className="size-4" aria-hidden="true" />
            </Button>
          </header>

          <Tabs defaultValue="ticket" className="flex min-h-0 flex-1 flex-col">
            <div className="shrink-0 border-b border-border/60 px-4 py-2.5">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="ticket" className="gap-2">
                  <ClipboardList className="size-4" aria-hidden="true" />
                  Submit ticket
                </TabsTrigger>
                <TabsTrigger value="chat" className="gap-2">
                  <MessageCircle className="size-4" aria-hidden="true" />
                  AI chat
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="ticket" className="mt-0 min-h-0 flex-1 overflow-y-auto p-4">
              <div className="grid gap-4 lg:grid-cols-2 lg:items-start">
                <TicketForm onSubmit={submit} isSubmitting={mutation.isPending} />
                <Card className="border-border/70 bg-card/80 shadow-none">
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
                        onRetry={() => {
                          if (lastPayload) mutation.mutate(lastPayload);
                        }}
                        isRetrying={mutation.isPending}
                      />
                    ) : latest ? (
                      <AnalysisPanel analysis={latest} />
                    ) : (
                      <AnalysisEmptyState />
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="chat" className="mt-0 min-h-0 flex-1 overflow-hidden">
              <ChatWidget />
            </TabsContent>
          </Tabs>
        </div>
      ) : null}
    </>
  );
}