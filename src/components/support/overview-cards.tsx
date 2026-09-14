import { Inbox, Flame, Send, UserCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface OverviewStats {
  totalTickets: number;
  highPriority: number;
  autoResponded: number;
  humanReview: number;
}

const items: {
  key: keyof OverviewStats;
  label: string;
  Icon: LucideIcon;
  tone: string;
  hint: string;
}[] = [
  {
    key: "totalTickets",
    label: "Total Tickets",
    Icon: Inbox,
    tone: "text-info",
    hint: "Analyzed this session",
  },
  {
    key: "highPriority",
    label: "High Priority",
    Icon: Flame,
    tone: "text-priority-critical",
    hint: "High or critical",
  },
  {
    key: "autoResponded",
    label: "Auto Responded",
    Icon: Send,
    tone: "text-success",
    hint: "Replies sent by the workflow",
  },
  {
    key: "humanReview",
    label: "Human Review",
    Icon: UserCheck,
    tone: "text-warning",
    hint: "Waiting on an agent",
  },
];

export function OverviewCards({ stats }: { stats: OverviewStats }) {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
      {items.map(({ key, label, Icon, tone, hint }) => (
        <Card
          key={key}
          className="gap-0 border-border/70 bg-card/80 p-4 shadow-none backdrop-blur-sm lg:p-5"
        >
          <div className="flex items-start justify-between gap-2">
            <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              {label}
            </p>
            <Icon className={cn("size-4 shrink-0", tone)} aria-hidden="true" />
          </div>
          <p className="mt-3 font-display text-3xl font-semibold tabular-nums lg:text-4xl">
            {stats[key]}
          </p>
          <p className="mt-1 truncate text-xs text-muted-foreground">{hint}</p>
        </Card>
      ))}
    </div>
  );
}
