/**
 * SupportAI configuration.
 *
 * The frontend never talks to Groq, Resend, or any AI provider directly.
 * It only POSTs the ticket to this n8n webhook, which orchestrates everything
 * server-side and returns the analysis.
 *
 * Override the endpoint with VITE_N8N_SUPPORT_WEBHOOK_URL.
 */
export const N8N_WEBHOOK_URL =
  (import.meta.env["VITE_N8N_SUPPORT_WEBHOOK_URL"] as string | undefined) ??
  "https://harshitavasthi.app.n8n.cloud/webhook/support-ticket";

/** Abort the webhook request after this many milliseconds. */
export const WEBHOOK_TIMEOUT_MS = 60_000;
