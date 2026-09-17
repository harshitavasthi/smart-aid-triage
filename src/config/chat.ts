/**
 * Smart Aid Assistant configuration.
 *
 * The frontend only talks to n8n. n8n holds every AI credential.
 * Override the endpoint with VITE_N8N_CHAT_WEBHOOK_URL.
 */
export const N8N_CHAT_WEBHOOK_URL =
  (import.meta.env["VITE_N8N_CHAT_WEBHOOK_URL"] as string | undefined) ??
  "https://harshitavasthi.app.n8n.cloud/webhook/smart-aid-chat";

export const CHAT_TIMEOUT_MS = 60_000;

export const OUT_OF_SCOPE_REPLY =
  "I'm here to help with Smart Aid Triage and health-related triage questions. I can't help with unrelated topics.";

export const ASSISTANT_NAME = "Smart Aid Assistant";
