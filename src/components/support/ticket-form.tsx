import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Sparkles } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { TicketPayload } from "@/lib/support-types";

export const ticketSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter the customer's name (at least 2 characters).")
    .max(80, "Name must be 80 characters or fewer."),
  email: z
    .string()
    .trim()
    .min(1, "Customer email is required.")
    .email("Please enter a valid email address."),
  subject: z
    .string()
    .trim()
    .min(4, "Subject must be at least 4 characters.")
    .max(120, "Subject must be 120 characters or fewer."),
  message: z
    .string()
    .trim()
    .min(20, "Please include at least 20 characters so the AI has enough context.")
    .max(4000, "Message must be 4000 characters or fewer."),
});

export type TicketFormValues = z.infer<typeof ticketSchema>;

export function TicketForm({
  onSubmit,
  isSubmitting,
}: {
  onSubmit: (values: TicketPayload) => void;
  isSubmitting: boolean;
}) {
  const form = useForm<TicketFormValues>({
    resolver: zodResolver(ticketSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
    mode: "onBlur",
  });

  const messageLength = form.watch("message").length;

  return (
    <Card className="border-border/70 bg-card/80 shadow-none backdrop-blur-sm">
      <CardHeader className="gap-1">
        <CardTitle className="text-lg">New Ticket</CardTitle>
        <CardDescription>
          Submit a customer message and the triage workflow will classify it and draft a reply.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit((values) => onSubmit(values))} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Jordan Rivera" autoComplete="name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="jordan@example.com"
                        autoComplete="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ticket Subject</FormLabel>
                  <FormControl>
                    <Input placeholder="Charged twice for my annual plan" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-baseline justify-between gap-2">
                    <FormLabel>Support Message</FormLabel>
                    <span className="text-xs tabular-nums text-muted-foreground">
                      {messageLength}/4000
                    </span>
                  </div>
                  <FormControl>
                    <Textarea
                      rows={7}
                      placeholder="Describe the issue exactly as the customer reported it…"
                      className="resize-y"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-muted-foreground">
                Analysis runs in your secure workflow — no keys live in this app.
              </p>
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full font-semibold sm:w-auto"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                    Analyzing…
                  </>
                ) : (
                  <>
                    <Sparkles className="size-4" aria-hidden="true" />
                    Analyze Ticket
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
