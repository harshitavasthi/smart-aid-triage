import { N8N_WEBHOOK_URL, WEBHOOK_TIMEOUT_MS } from "@/config/support";
import {
  isPriority,
  isSentiment,
  type Priority,
  type Sentiment,
  type TicketAnalysis,
  type TicketPayload,
} from "@/lib/support-types";

export type SupportErrorKind = "network" | "timeout" | "http" | "parse" | "empty";

export class SupportApiError extends Error {
  kind: SupportErrorKind;
  status: number | undefined;

  constructor(kind: SupportErrorKind, message: string, status?: number) {
    super(message);
    this.name = "SupportApiError";
    this.kind = kind;
    this.status = status;
  }
}

type Json = Record<string, unknown>;

const isRecord = (v: unknown): v is Json =>
  typeof v === "object" && v !== null && !Array.isArray(v);

/** n8n often wraps output in an array, and sometimes under json / data / output / result. */
function unwrap(raw: unknown): Json {
  let current = raw;

  for (let i = 0; i < 6; i += 1) {
    if (Array.isArray(current)) {
      current = current[0];
      continue;
    }
    if (!isRecord(current)) break;

    const keys = Object.keys(current);
    const passthrough = ["json", "data", "output", "result", "body", "response"];
    const soleKey = keys.length === 1 ? keys[0] : undefined;
    if (soleKey && passthrough.includes(soleKey)) {
      const next = current[soleKey];
      if (isRecord(next) || Array.isArray(next)) {
        current = next;
        continue;
      }
    }
    break;
  }

  return isRecord(current) ? current : {};
}

function pick(source: Json, keys: string[]): unknown {
  const lowered = new Map<string, unknown>();
  for (const [key, value] of Object.entries(source)) {
    lowered.set(key.toLowerCase().replace(/[\s_-]/g, ""), value);
  }
  for (const key of keys) {
    const hit = lowered.get(key.toLowerCase().replace(/[\s_-]/g, ""));
    if (hit !== undefined && hit !== null && hit !== "") return hit;
  }
  return undefined;
}

function asString(value: unknown): string {
  if (typeof value === "string") return value.trim();
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  return "";
}

function asBool(value: unknown): boolean {
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return value === 1;
  if (typeof value === "string") {
    const v = value.trim().toLowerCase();
    return v === "true" || v === "yes" || v === "1" || v === "sent";
  }
  return false;
}

/** Accepts 0–1 floats, 0–100 numbers, and "87%" strings. Returns 0–100 or null. */
function asConfidence(value: unknown): number | null {
  let n: number | null = null;
  if (typeof value === "number") n = value;
  else if (typeof value === "string") {
    const parsed = Number.parseFloat(value.replace("%", "").trim());
    if (!Number.isNaN(parsed)) n = parsed;
  }
  if (n === null) return null;
  if (n > 0 && n <= 1) n *= 100;
  return Math.max(0, Math.min(100, Math.round(n)));
}

function asPriority(value: unknown): Priority {
  const v = asString(value).toLowerCase();
  if (isPriority(v)) return v;
  if (v.includes("critical") || v.includes("p0") || v.includes("urgent")) return "critical";
  if (v.includes("high") || v.includes("p1")) return "high";
  if (v.includes("low") || v.includes("p3")) return "low";
  return "medium";
}

function asSentiment(value: unknown): Sentiment {
  const v = asString(value).toLowerCase();
  if (isSentiment(v)) return v;
  if (v.includes("urgent") || v.includes("angry") || v.includes("frustrat")) return "urgent";
  if (v.includes("neg")) return "negative";
  if (v.includes("pos") || v.includes("happy")) return "positive";
  return "neutral";
}

function fallbackTicketId(): string {
  return `TCK-${Date.now().toString(36).toUpperCase().slice(-6)}`;
}

export function normalizeAnalysis(raw: unknown, ticket: TicketPayload): TicketAnalysis {
  const data = unwrap(raw);

  const status = asString(pick(data, ["status", "workflowStatus", "state"])) || null;
  const humanReviewRequired =
    asBool(pick(data, ["human_review_required", "humanReview", "requiresHumanReview", "needsReview"])) ||
    status === "human_review_required";

  const emailSent = asBool(pick(data, ["email_sent", "emailSent", "email_status", "mailSent"]));

  const autoRespondedRaw = pick(data, ["auto_responded", "autoResponded", "auto_response_sent"]);
  const autoResponded =
    autoRespondedRaw !== undefined ? asBool(autoRespondedRaw) : emailSent && !humanReviewRequired;

  return {
    ticketId: asString(pick(data, ["ticket_id", "ticketId", "id", "ticketNumber"])) || fallbackTicketId(),
    category: asString(pick(data, ["category", "ticket_category", "topic", "type"])) || "Uncategorized",
    priority: asPriority(pick(data, ["priority", "urgency", "severity"])),
    sentiment: asSentiment(pick(data, ["sentiment", "tone", "mood"])),
    confidence: asConfidence(
      pick(data, ["ai_confidence", "confidence", "confidenceScore", "score"]),
    ),
    humanReviewRequired,
    summary: asString(pick(data, ["summary", "ai_summary", "overview", "analysis"])),
    matchedIssue: asString(pick(data, ["matched_issue", "matchedIssue", "known_issue", "match"])),
    suggestedResponse: asString(
      pick(data, ["suggested_response", "suggestedResponse", "response", "reply", "draft"]),
    ),
    emailSent,
    autoResponded,
    status,
    ticket,
    analyzedAt: new Date().toISOString(),
  };
}

export async function analyzeTicket(ticket: TicketPayload): Promise<TicketAnalysis> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), WEBHOOK_TIMEOUT_MS);

  let response: Response;
  try {
    response = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        name: ticket.name,
        email: ticket.email,
        subject: ticket.subject,
        message: ticket.message,
      }),
      signal: controller.signal,
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new SupportApiError(
        "timeout",
        "The analysis workflow took too long to respond. Please try again.",
      );
    }
    throw new SupportApiError(
      "network",
      "Could not reach the analysis workflow. Check your connection and that the webhook is active.",
    );
  } finally {
    clearTimeout(timer);
  }

  const text = await response.text();

  if (!response.ok) {
    throw new SupportApiError(
      "http",
      response.status === 404
        ? "The webhook URL was not found (404). If you are using an n8n test webhook, click 'Execute workflow' first."
        : `The analysis workflow returned an error (${response.status}).`,
      response.status,
    );
  }

  if (!text.trim()) {
    throw new SupportApiError(
      "empty",
      "The workflow responded with no data. Make sure it ends with a 'Respond to Webhook' node.",
    );
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new SupportApiError("parse", "The workflow response was not valid JSON.");
  }

  return normalizeAnalysis(parsed, ticket);
}
