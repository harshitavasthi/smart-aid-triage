/**
 * SupportAI configuration.
 *
 * The frontend never talks to Groq, Resend, or any AI provider directly.
 * It only POSTs the ticket to this n8n webhook, which orchestrates everything
 * server-side and returns the analysis.
 *
 * Change this single constant to point at a different n8n workflow.
 */
export const N8N_WEBHOOK_URL =
  "https://harshitavasthi.app.n8n.cloud/webhook-test/support-ticket";

/** Abort the webhook request after this many milliseconds. */
export const WEBHOOK_TIMEOUT_MS = 60_000;
