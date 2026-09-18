import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Check, CreditCard, LockKeyhole, ShieldCheck } from "lucide-react";

import { SupportCenter } from "@/components/support/support-center";
import { Button } from "@/components/ui/button";

const title = "Payflow — Demo Payment Experience";
const description =
  "A simple demo payment landing page with an embedded customer support chat experience.";

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

function Index() {
  return (
    <div className="grid-backdrop min-h-screen bg-background">
      <header className="border-b border-border/70 bg-background/85 backdrop-blur">
        <div className="mx-auto flex h-18 max-w-6xl items-center justify-between px-5 sm:px-8">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-primary flex size-9 items-center justify-center rounded-lg text-primary-foreground shadow-sm">
              <CreditCard className="size-4.5" aria-hidden="true" />
            </div>
            <span className="font-display text-lg font-semibold">Payflow</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <LockKeyhole className="size-4 text-success" aria-hidden="true" />
            Secure checkout
          </div>
        </div>
      </header>

      <main className="mx-auto grid min-h-[calc(100vh-4.5rem)] max-w-6xl items-center gap-12 px-5 py-12 sm:px-8 lg:grid-cols-[1.05fr_0.8fr] lg:py-20">
        <section className="max-w-2xl">
          <p className="mb-5 text-sm font-semibold uppercase text-primary">Payments made simple</p>
          <h1 className="max-w-xl text-4xl font-semibold leading-tight sm:text-6xl">
            A better way to manage every payment.
          </h1>
          <p className="mt-6 max-w-lg text-base leading-7 text-muted-foreground sm:text-lg">
            This placeholder page demonstrates how customer support stays available without taking over your product experience.
          </p>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-foreground">
            {["Fast settlements", "Protected transactions", "Clear reporting"].map((item) => (
              <span key={item} className="inline-flex items-center gap-2">
                <span className="flex size-5 items-center justify-center rounded-full bg-success/12 text-success">
                  <Check className="size-3.5" aria-hidden="true" />
                </span>
                {item}
              </span>
            ))}
          </div>
        </section>

        <section aria-label="Payment preview" className="mx-auto w-full max-w-md">
          <div className="shadow-elegant overflow-hidden rounded-lg border border-border/80 bg-card">
            <div className="border-b border-border/70 px-6 py-5">
              <p className="text-sm text-muted-foreground">Amount due</p>
              <p className="mt-1 font-display text-3xl font-semibold">$248.00</p>
            </div>
            <div className="space-y-5 p-6">
              <div>
                <p className="text-xs font-medium uppercase text-muted-foreground">Card details</p>
                <div className="mt-2 flex h-12 items-center justify-between rounded-md border border-input bg-background px-4 text-sm text-muted-foreground">
                  <span>•••• •••• •••• 4242</span>
                  <CreditCard className="size-4" aria-hidden="true" />
                </div>
              </div>
              <Button className="h-11 w-full" disabled>
                Complete payment
                <ArrowRight className="size-4" aria-hidden="true" />
              </Button>
              <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                <ShieldCheck className="size-3.5 text-success" aria-hidden="true" />
                Demo checkout — no payment will be processed
              </p>
            </div>
          </div>
        </section>
      </main>
      <SupportCenter />
    </div>
  );
}
