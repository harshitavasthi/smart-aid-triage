export const PRIORITIES = ["low", "medium", "high", "critical"] as const;
export type Priority = (typeof PRIORITIES)[number];

export const SENTIMENTS = ["positive", "neutral", "negative", "urgent"] as const;
export type Sentiment = (typeof SENTIMENTS)[number];

/** Exactly the payload shape the n8n workflow expects. */
export interface TicketPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/** Normalized shape of whatever n8n returns. */
export interface TicketAnalysis {
  ticketId: string;
  category: string;
  priority: Priority;
  sentiment: Sentiment;
  /** 0–100 */
  confidence: number | null;
  humanReviewRequired: boolean;
  summary: string;
  matchedIssue: string;
  suggestedResponse: string;
  emailSent: boolean;
  autoResponded: boolean;
  /** Raw status string from the workflow, if provided. */
  status: string | null;
  /** Echo of the submitted ticket, for context in the UI. */
  ticket: TicketPayload;
  analyzedAt: string;
}

export function isPriority(value: string): value is Priority {
  return (PRIORITIES as readonly string[]).includes(value);
}

export function isSentiment(value: string): value is Sentiment {
  return (SENTIMENTS as readonly string[]).includes(value);
}
