# SupportAI — AI Customer Support Ticket Triage

A single-page support dashboard where a team member submits a ticket, it is sent to your n8n workflow for AI analysis, and the returned triage result is shown as a clean analysis panel.

## What gets built

**One main page** (the home page) with three stacked areas:

1. **Overview cards** — Total Tickets, High Priority, Auto Responded, Human Review. Mock counts for now, updated live as tickets are analyzed in the session.
2. **New Ticket form** — Customer Name, Customer Email, Ticket Subject, Support Message. Validation on every field (required, valid email, minimum message length). Submit button reads "Analyze Ticket", is disabled while working, and shows a spinner.
3. **Latest Analysis** — the most recent result: Ticket ID, Category, Priority, Sentiment, AI Confidence, Human Review Required, Summary, Matched Issue, Suggested Response. Colour-coded badges for Priority (Low/Medium/High/Critical) and Sentiment (Positive/Neutral/Negative/Urgent), plus a confidence bar and a copy button on the suggested response.

**Email status strip** inside the analysis panel showing Email Sent / Human Review Required / Auto Responded, with the exact messages:
- "Customer email sent successfully" when the response says the email went out
- "Ticket requires human review before sending a response." when the response flags human review

**States covered:** empty state before the first ticket, loading skeleton in the analysis panel while waiting, error state with a Retry button that resends the same ticket, and toast notifications for success and failure.

## Design

Clean modern SaaS look: dark-leaning professional support/AI aesthetic, generous spacing, subtle card borders, one accent colour for actions and one for alerts. Fully responsive — cards reflow to a single column and the form stays comfortable on mobile. I will show you a few visual directions to pick from before building.

## Not included (as requested)

No login, no payments, no database, no extra features. All AI work stays in n8n; no keys of any kind live in this app.

## Technical notes

- Stack: React + TypeScript + Tailwind + shadcn/ui + Lucide icons, on the project's existing TanStack Start setup.
- `src/config/support.ts` holds the single editable webhook constant: `https://harshitavasthi.app.n8n.cloud/webhook-test/support-ticket`.
- `src/lib/support-api.ts` does the POST with exactly `{ name, email, subject, message }`, normalizes the n8n response into a typed `TicketAnalysis` (tolerant of snake_case/camelCase, array-wrapped payloads, and missing optional fields), and throws typed errors for non-2xx/network/parse failures.
- Form handled with react-hook-form + zod; request state via TanStack Query `useMutation` (gives loading/error/retry for free).
- Components split for easy edits: `OverviewCards`, `TicketForm`, `AnalysisPanel`, `PriorityBadge`, `SentimentBadge`, `EmailStatus`, `AnalysisSkeleton`, `AnalysisEmptyState`, `AnalysisErrorState`.
- Badge colours added as semantic tokens in `src/styles.css` (no hardcoded colour utilities).
- `<Toaster />` from `@/components/ui/sonner` mounted once in `__root.tsx`; page-specific `head()` title/description/og tags on the index route.
- Session-only counters in React state derived from analyzed tickets; no persistence.
