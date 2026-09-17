import { CHAT_TIMEOUT_MS, N8N_CHAT_WEBHOOK_URL, OUT_OF_SCOPE_REPLY } from "@/config/chat";

export const SEVERITIES = ["low", "medium", "high", "emergency"] as const;
export type Severity = (typeof SEVERITIES)[number];

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  severity?: Severity | null;
  category?: string | null;
  outOfScope?: boolean;
  createdAt: string;
}

export interface ChatReply {
  message: string;
  severity: Severity | null;
  category: string | null;
  inScope: boolean;
}

export class ChatApiError extends Error {}

export function newSessionId(): string {
  const cryptoObj = typeof crypto !== "undefined" ? crypto : undefined;
  if (cryptoObj?.randomUUID) return cryptoObj.randomUUID();
  return `sess-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

/**
 * Deterministic client-side scope gate. n8n is the authority (via `inScope`),
 * but obvious off-topic requests are refused here so the restriction is part of
 * the app's behaviour and never reaches the model.
 */
const OFF_TOPIC_PATTERNS: RegExp[] = [
  /\b(joke|jokes|riddle|pun)\b/i,
  /\b(poem|poetry|haiku|song|lyrics|short story|screenplay|essay about)\b/i,
  /\b(football|soccer|cricket|basketball|nba|nfl|ipl|world cup|match|tournament|olympics)\b/i,
  /\b(movie|movies|film|netflix|tv show|series|anime|celebrity|actor|actress|singer)\b/i,
  /\b(politic|politics|president|prime minister|election|parliament|government policy)\b/i,
  /\b(capital of|population of|who invented|tallest|largest country|history of the)\b/i,
  /\b(stock|stocks|crypto|bitcoin|investment advice|shopping|buy me|best laptop|best phone)\b/i,
  /\b(travel|flight|hotel|holiday destination|tourist)\b/i,
  /\b(weather|news headlines|latest news)\b/i,
  /\b(recipe|cook|bake)\b/i,
  /(write|fix|debug|explain)\s+(me\s+)?(some\s+)?(code|a function|python|javascript|java|c\+\+|sql)\b/i,
  /\b(solve|calculate|integrate|derivative|equation)\b.*\b(\d|x)\b/i,
];

const HEALTH_HINTS =
  /\b(pain|symptom|symptoms|triage|fever|headache|chest|breath|bleed|injur|wound|nausea|dizzy|rash|infection|clinic|hospital|doctor|nurse|urgent|emergency|medicine|medication|assessment|severity|result|smart aid)\b/i;

export function isObviouslyOutOfScope(text: string): boolean {
  if (HEALTH_HINTS.test(text)) return false;
  return OFF_TOPIC_PATTERNS.some((re) => re.test(text));
}

const isRecord = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null && !Array.isArray(v);

function unwrap(raw: unknown): Record<string, unknown> {
  let current: unknown = raw;
  for (let i = 0; i < 6; i += 1) {
    if (Array.isArray(current)) {
      current = current[0];
      continue;
    }
    if (!isRecord(current)) break;
    const keys = Object.keys(current);
    const sole = keys.length === 1 ? keys[0] : undefined;
    if (sole && ["json", "data", "output", "result", "body", "response"].includes(sole)) {
      const next = current[sole];
      if (isRecord(next) || Array.isArray(next)) {
        current = next;
        continue;
      }
    }
    break;
  }
  return isRecord(current) ? current : {};
}

function pick(source: Record<string, unknown>, keys: string[]): unknown {
  const lowered = new Map<string, unknown>();
  for (const [k, v] of Object.entries(source)) {
    lowered.set(k.toLowerCase().replace(/[\s_-]/g, ""), v);
  }
  for (const key of keys) {
    const hit = lowered.get(key.toLowerCase().replace(/[\s_-]/g, ""));
    if (hit !== undefined && hit !== null && hit !== "") return hit;
  }
  return undefined;
}

function asSeverity(value: unknown): Severity | null {
  const v = typeof value === "string" ? value.trim().toLowerCase() : "";
  if ((SEVERITIES as readonly string[]).includes(v)) return v as Severity;
  if (v.includes("emergen") || v.includes("critical")) return "emergency";
  if (v.includes("high")) return "high";
  if (v.includes("medium") || v.includes("moderate")) return "medium";
  if (v.includes("low")) return "low";
  return null;
}

export function normalizeReply(raw: unknown): ChatReply {
  const data = unwrap(raw);
  const inScopeRaw = pick(data, ["inScope", "in_scope", "onTopic"]);
  const inScope =
    inScopeRaw === undefined
      ? true
      : typeof inScopeRaw === "boolean"
        ? inScopeRaw
        : String(inScopeRaw).toLowerCase() === "true";

  const message =
    typeof pick(data, ["message", "reply", "text", "answer", "output"]) === "string"
      ? String(pick(data, ["message", "reply", "text", "answer", "output"])).trim()
      : "";

  const category = pick(data, ["category", "topic"]);

  return {
    message: inScope ? message : OUT_OF_SCOPE_REPLY,
    severity: inScope ? asSeverity(pick(data, ["severity", "priority", "urgency"])) : null,
    category: typeof category === "string" ? category : null,
    inScope,
  };
}

export async function sendChatMessage(message: string, sessionId: string): Promise<ChatReply> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), CHAT_TIMEOUT_MS);

  let response: Response;
  try {
    response = await fetch(N8N_CHAT_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ message, sessionId }),
      signal: controller.signal,
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new ChatApiError("The assistant took too long to respond. Please try again.");
    }
    throw new ChatApiError("Couldn't reach the assistant. Check your connection and try again.");
  } finally {
    clearTimeout(timer);
  }

  const text = await response.text();

  if (!response.ok) {
    throw new ChatApiError(
      response.status === 404
        ? "The chat workflow wasn't found (404). If you're using an n8n test webhook, click 'Execute workflow' first."
        : `The assistant returned an error (${response.status}).`,
    );
  }
  if (!text.trim()) {
    throw new ChatApiError("The assistant returned no reply. Check the workflow's response node.");
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    // Some workflows return plain text.
    return { message: text.trim(), severity: null, category: null, inScope: true };
  }

  const reply = normalizeReply(parsed);
  if (!reply.message) {
    throw new ChatApiError("The assistant returned an empty reply. Please try again.");
  }
  return reply;
}
