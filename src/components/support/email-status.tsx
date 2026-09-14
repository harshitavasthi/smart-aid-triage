import { BotMessageSquare, CheckCircle2, MailCheck, MailX, UserCheck, XCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import type { TicketAnalysis } from "@/lib/support-types";

function StatusRow({
  label,
  value,
  active,
  Icon,
  activeTone,
}: {
  label: string;
  value: string;
  active: boolean;
  Icon: LucideIcon;
  activeTone: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-lg border p-3",
        active ? activeTone : "border-border/60 bg-muted/30",
      )}
    >
      <Icon
        className={cn("size-4 shrink-0", active ? "" : "text-muted-foreground")}
        aria-hidden="true"
      />
      <div className="min-w-0">
        <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">{label}</p>
        <p className="truncate text-sm font-medium">{value}</p>
      </div>
    </div>
  );
}

export function EmailStatus({ analysis }: { analysis: TicketAnalysis }) {
  const { emailSent, humanReviewRequired, autoResponded } = analysis;

  return (
    <div className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-3">
        <StatusRow
          label="Email Sent"
          value={emailSent ? "Yes" : "Not sent"}
          active={emailSent}
          Icon={emailSent ? MailCheck : MailX}
          activeTone="border-success/35 bg-success/10 text-success"
        />
        <StatusRow
          label="Human Review Required"
          value={humanReviewRequired ? "Yes" : "No"}
          active={humanReviewRequired}
          Icon={UserCheck}
          activeTone="border-warning/35 bg-warning/10 text-warning"
        />
        <StatusRow
          label="Auto Responded"
          value={autoResponded ? "Yes" : "No"}
          active={autoResponded}
          Icon={BotMessageSquare}
          activeTone="border-primary/35 bg-primary/10 text-primary"
        />
      </div>

      {emailSent ? (
        <p className="flex items-center gap-2 rounded-lg border border-success/30 bg-success/10 px-3 py-2.5 text-sm font-medium text-success">
          <CheckCircle2 className="size-4 shrink-0" aria-hidden="true" />
          Customer email sent successfully
        </p>
      ) : null}

      {humanReviewRequired ? (
        <p className="flex items-center gap-2 rounded-lg border border-warning/30 bg-warning/10 px-3 py-2.5 text-sm font-medium text-warning">
          <UserCheck className="size-4 shrink-0" aria-hidden="true" />
          Ticket requires human review before sending a response.
        </p>
      ) : null}

      {!emailSent && !humanReviewRequired ? (
        <p className="flex items-center gap-2 rounded-lg border border-border/60 bg-muted/30 px-3 py-2.5 text-sm text-muted-foreground">
          <XCircle className="size-4 shrink-0" aria-hidden="true" />
          No customer email was sent for this ticket.
        </p>
      ) : null}
    </div>
  );
}
