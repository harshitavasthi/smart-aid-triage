import { AlertTriangle, Loader2, MessageCircle, RotateCcw, Send, Stethoscope, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ASSISTANT_NAME, OUT_OF_SCOPE_REPLY } from "@/config/chat";
import {
  ChatApiError,
  isObviouslyOutOfScope,
  newSessionId,
  sendChatMessage,
  type ChatMessage,
  type Severity,
} from "@/lib/chat-api";
import { cn } from "@/lib/utils";

const severityStyles: Record<Severity, { label: string; className: string }> = {
  low: { label: "Low severity", className: "border-priority-low/30 bg-priority-low/10 text-priority-low" },
  medium: {
    label: "Medium severity",
    className: "border-priority-medium/30 bg-priority-medium/10 text-priority-medium",
  },
  high: {
    label: "High severity",
    className: "border-priority-high/30 bg-priority-high/10 text-priority-high",
  },
  emergency: {
    label: "Emergency — seek care now",
    className: "border-priority-critical/40 bg-priority-critical/12 text-priority-critical",
  },
};

const GREETING = `Hi, I'm the ${ASSISTANT_NAME}. I can help you describe symptoms, understand what to report, and explain your triage result. What's going on?`;

function makeId() {
  return `m-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

function greetingMessage(): ChatMessage {
  return { id: makeId(), role: "assistant", content: GREETING, createdAt: new Date().toISOString() };
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [sessionId, setSessionId] = useState(() => newSessionId());
  const [messages, setMessages] = useState<ChatMessage[]>(() => [greetingMessage()]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isSending]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open, isSending]);

  const reset = () => {
    setSessionId(newSessionId());
    setMessages([greetingMessage()]);
    setInput("");
    setError(null);
  };

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isSending) return;

    setError(null);
    setInput("");
    setMessages((prev) => [
      ...prev,
      { id: makeId(), role: "user", content: trimmed, createdAt: new Date().toISOString() },
    ]);

    if (isObviouslyOutOfScope(trimmed)) {
      setMessages((prev) => [
        ...prev,
        {
          id: makeId(),
          role: "assistant",
          content: OUT_OF_SCOPE_REPLY,
          outOfScope: true,
          createdAt: new Date().toISOString(),
        },
      ]);
      return;
    }

    setIsSending(true);
    try {
      const reply = await sendChatMessage(trimmed, sessionId);
      setMessages((prev) => [
        ...prev,
        {
          id: makeId(),
          role: "assistant",
          content: reply.message,
          severity: reply.severity,
          category: reply.category,
          outOfScope: !reply.inScope,
          createdAt: new Date().toISOString(),
        },
      ]);
    } catch (err) {
      setError(
        err instanceof ChatApiError ? err.message : "Something went wrong. Please try again.",
      );
      setInput(trimmed);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={`Open ${ASSISTANT_NAME}`}
          className="bg-gradient-primary shadow-elegant fixed bottom-5 right-5 z-50 inline-flex size-14 items-center justify-center rounded-full border border-primary/40 text-primary-foreground transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <MessageCircle className="size-6" aria-hidden="true" />
        </button>
      )}

      {open && (
        <div
          role="dialog"
          aria-label={ASSISTANT_NAME}
          className="shadow-elegant fixed inset-x-3 bottom-3 top-3 z-50 flex flex-col overflow-hidden rounded-xl border border-border/70 bg-card sm:inset-auto sm:bottom-5 sm:right-5 sm:top-auto sm:h-[min(34rem,calc(100vh-3rem))] sm:w-[24rem]"
        >
          <header className="flex items-center gap-3 border-b border-border/60 px-4 py-3">
            <div className="bg-gradient-primary flex size-9 shrink-0 items-center justify-center rounded-lg border border-primary/40">
              <Stethoscope className="size-4 text-primary-foreground" aria-hidden="true" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{ASSISTANT_NAME}</p>
              <p className="truncate text-xs text-muted-foreground">Triage help · not a diagnosis</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={reset}
              aria-label="Start a new conversation"
              className="size-8"
            >
              <RotateCcw className="size-4" aria-hidden="true" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="size-8"
            >
              <X className="size-4" aria-hidden="true" />
            </Button>
          </header>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}
              >
                <div
                  className={cn(
                    "max-w-[85%] space-y-2 rounded-lg px-3 py-2 text-sm leading-relaxed",
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "border border-border/60 bg-background/60 text-foreground",
                  )}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  {message.severity ? (
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide",
                        severityStyles[message.severity].className,
                      )}
                    >
                      <AlertTriangle className="size-3" aria-hidden="true" />
                      {severityStyles[message.severity].label}
                    </span>
                  ) : null}
                  {message.category && message.role === "assistant" && !message.outOfScope ? (
                    <p className="text-[0.65rem] uppercase tracking-wide text-muted-foreground">
                      {message.category}
                    </p>
                  ) : null}
                </div>
              </div>
            ))}

            {isSending && (
              <div className="flex justify-start">
                <div className="inline-flex items-center gap-2 rounded-lg border border-border/60 bg-background/60 px-3 py-2 text-sm text-muted-foreground">
                  <Loader2 className="size-3.5 animate-spin" aria-hidden="true" />
                  {ASSISTANT_NAME} is typing…
                </div>
              </div>
            )}

            {error && (
              <div className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive">
                <p>{error}</p>
                <button
                  type="button"
                  onClick={() => void send(input)}
                  className="mt-1 font-semibold underline"
                >
                  Retry
                </button>
              </div>
            )}
          </div>

          <form
            className="flex items-end gap-2 border-t border-border/60 px-3 py-3"
            onSubmit={(event) => {
              event.preventDefault();
              void send(input);
            }}
          >
            <Textarea
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  void send(input);
                }
              }}
              rows={1}
              placeholder="Describe your symptoms…"
              className="max-h-28 min-h-10 resize-none"
            />
            <Button
              type="submit"
              size="icon"
              disabled={isSending || !input.trim()}
              aria-label="Send message"
              className="size-10 shrink-0"
            >
              {isSending ? (
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              ) : (
                <Send className="size-4" aria-hidden="true" />
              )}
            </Button>
          </form>
        </div>
      )}
    </>
  );
}
