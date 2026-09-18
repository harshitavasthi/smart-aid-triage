import { r as __toESM } from "../_runtime.mjs";
import { a as useFormContext, i as useForm, n as Controller, o as require_react, r as FormProvider, t as u } from "../_libs/@hookform/resolvers+[...].mjs";
import { o as require_jsx_runtime, r as Slot } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Root } from "../_libs/@radix-ui/react-label+[...].mjs";
import { t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { A as Check, C as Flame, D as ClipboardList, E as Copy, F as ArrowDown, M as BotMessageSquare, N as ArrowUp, O as CircleX, P as ArrowRight, S as Frown, T as CreditCard, _ as LockKeyhole, a as Stethoscope, b as Inbox, c as Siren, d as RotateCcw, f as OctagonAlert, g as MailCheck, h as MailX, i as Tag, j as Bot, k as CircleCheck, l as ShieldCheck, m as Meh, n as UserCheck, o as Sparkles, p as MessageCircle, r as TriangleAlert, s as Smile, t as X, u as Send, v as LoaderCircle, w as FileText, x as Gauge, y as Link2 } from "../_libs/lucide-react.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as Root$1 } from "../_libs/radix-ui__react-separator.mjs";
import { n as stringType, t as objectType } from "../_libs/zod.mjs";
import { i as Trigger, n as List, r as Root2, t as Content } from "../_libs/radix-ui__react-tabs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Dm5zCgd7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var base = "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold uppercase tracking-wide";
var priorityStyles = {
	low: {
		label: "Low",
		className: "border-priority-low/30 bg-priority-low/10 text-priority-low",
		Icon: ArrowDown
	},
	medium: {
		label: "Medium",
		className: "border-priority-medium/30 bg-priority-medium/10 text-priority-medium",
		Icon: Meh
	},
	high: {
		label: "High",
		className: "border-priority-high/30 bg-priority-high/10 text-priority-high",
		Icon: ArrowUp
	},
	critical: {
		label: "Critical",
		className: "border-priority-critical/40 bg-priority-critical/12 text-priority-critical",
		Icon: Flame
	}
};
var sentimentStyles = {
	positive: {
		label: "Positive",
		className: "border-sentiment-positive/30 bg-sentiment-positive/10 text-sentiment-positive",
		Icon: Smile
	},
	neutral: {
		label: "Neutral",
		className: "border-sentiment-neutral/30 bg-sentiment-neutral/10 text-sentiment-neutral",
		Icon: Meh
	},
	negative: {
		label: "Negative",
		className: "border-sentiment-negative/30 bg-sentiment-negative/10 text-sentiment-negative",
		Icon: Frown
	},
	urgent: {
		label: "Urgent",
		className: "border-sentiment-urgent/40 bg-sentiment-urgent/12 text-sentiment-urgent",
		Icon: Siren
	}
};
function PriorityBadge({ priority, className }) {
	const { label, className: tone, Icon } = priorityStyles[priority];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn(base, tone, className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
			className: "size-3.5",
			"aria-hidden": "true"
		}), label]
	});
}
function SentimentBadge({ sentiment, className }) {
	const { label, className: tone, Icon } = sentimentStyles[sentiment];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn(base, tone, className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
			className: "size-3.5",
			"aria-hidden": "true"
		}), label]
	});
}
function ReviewBadge({ required }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn(base, required ? "border-warning/35 bg-warning/10 text-warning" : "border-success/30 bg-success/10 text-success"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
			className: "size-3.5",
			"aria-hidden": "true"
		}), required ? "Review required" : "No review needed"]
	});
}
function StatusRow({ label, value, active, Icon, activeTone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex items-center gap-3 rounded-lg border p-3", active ? activeTone : "border-border/60 bg-muted/30"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
			className: cn("size-4 shrink-0", active ? "" : "text-muted-foreground"),
			"aria-hidden": "true"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium tracking-wide text-muted-foreground uppercase",
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "truncate text-sm font-medium",
				children: value
			})]
		})]
	});
}
function EmailStatus({ analysis }) {
	const { emailSent, humanReviewRequired, autoResponded } = analysis;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusRow, {
						label: "Email Sent",
						value: emailSent ? "Yes" : "Not sent",
						active: emailSent,
						Icon: emailSent ? MailCheck : MailX,
						activeTone: "border-success/35 bg-success/10 text-success"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusRow, {
						label: "Human Review Required",
						value: humanReviewRequired ? "Yes" : "No",
						active: humanReviewRequired,
						Icon: UserCheck,
						activeTone: "border-warning/35 bg-warning/10 text-warning"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusRow, {
						label: "Auto Responded",
						value: autoResponded ? "Yes" : "No",
						active: autoResponded,
						Icon: BotMessageSquare,
						activeTone: "border-primary/35 bg-primary/10 text-primary"
					})
				]
			}),
			emailSent ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "flex items-center gap-2 rounded-lg border border-success/30 bg-success/10 px-3 py-2.5 text-sm font-medium text-success",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
					className: "size-4 shrink-0",
					"aria-hidden": "true"
				}), "Customer email sent successfully"]
			}) : null,
			humanReviewRequired ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "flex items-center gap-2 rounded-lg border border-warning/30 bg-warning/10 px-3 py-2.5 text-sm font-medium text-warning",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserCheck, {
					className: "size-4 shrink-0",
					"aria-hidden": "true"
				}), "Ticket requires human review before sending a response."]
			}) : null,
			!emailSent && !humanReviewRequired ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "flex items-center gap-2 rounded-lg border border-border/60 bg-muted/30 px-3 py-2.5 text-sm text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, {
					className: "size-4 shrink-0",
					"aria-hidden": "true"
				}), "No customer email was sent for this ticket."]
			}) : null
		]
	});
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
			destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
			outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
			secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
			ghost: "hover:bg-accent hover:text-accent-foreground",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-9 px-4 py-2",
			sm: "h-8 rounded-md px-3 text-xs",
			lg: "h-10 rounded-md px-8",
			icon: "h-9 w-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
var Separator = import_react.forwardRef(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root$1, {
	ref,
	decorative,
	orientation,
	className: cn("shrink-0 bg-border", orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]", className),
	...props
}));
Separator.displayName = Root$1.displayName;
function Field({ label, value, Icon }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg border border-border/60 bg-muted/25 p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "flex items-center gap-1.5 text-xs font-medium tracking-wide text-muted-foreground uppercase",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
				className: "size-3.5",
				"aria-hidden": "true"
			}), label]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1.5 text-sm font-medium break-words",
			children: value || "—"
		})]
	});
}
function ConfidenceMeter({ confidence }) {
	const [width, setWidth] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		const id = requestAnimationFrame(() => setWidth(confidence ?? 0));
		return () => cancelAnimationFrame(id);
	}, [confidence]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "flex items-center gap-1.5 text-xs font-medium tracking-wide text-muted-foreground uppercase",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gauge, {
				className: "size-3.5",
				"aria-hidden": "true"
			}), "AI Confidence"]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-display text-sm font-semibold tabular-nums",
			children: confidence === null ? "N/A" : `${confidence}%`
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-2 h-2 w-full overflow-hidden rounded-full bg-muted",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-full rounded-full bg-primary transition-[width] duration-700 ease-out",
			style: { width: `${width}%` }
		})
	})] });
}
function AnalysisPanel({ analysis }) {
	const [copied, setCopied] = (0, import_react.useState)(false);
	const copyResponse = async () => {
		try {
			await navigator.clipboard.writeText(analysis.suggestedResponse);
			setCopied(true);
			toast.success("Suggested response copied");
			setTimeout(() => setCopied(false), 2e3);
		} catch {
			toast.error("Couldn't copy to clipboard");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-md border border-primary/30 bg-primary/10 px-2.5 py-1 font-mono text-xs font-semibold text-primary",
						children: analysis.ticketId
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriorityBadge, { priority: analysis.priority }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SentimentBadge, { sentiment: analysis.sentiment }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReviewBadge, { required: analysis.humanReviewRequired })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium tracking-wide text-muted-foreground uppercase",
					children: "Subject"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-1 text-lg font-semibold break-words",
					children: analysis.ticket.subject
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-muted-foreground break-words",
					children: [
						analysis.ticket.name,
						" · ",
						analysis.ticket.email
					]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Category",
					value: analysis.category,
					Icon: Tag
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Matched Issue",
					value: analysis.matchedIssue,
					Icon: Link2
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfidenceMeter, { confidence: analysis.confidence }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "flex items-center gap-1.5 text-xs font-medium tracking-wide text-muted-foreground uppercase",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
					className: "size-3.5",
					"aria-hidden": "true"
				}), "Summary"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1.5 text-sm leading-relaxed",
				children: analysis.summary || "The workflow did not return a summary for this ticket."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium tracking-wide text-muted-foreground uppercase",
					children: "Suggested Response"
				}), analysis.suggestedResponse ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "ghost",
					size: "sm",
					onClick: copyResponse,
					className: "h-7 px-2 text-xs",
					children: [copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
						className: "size-3.5",
						"aria-hidden": "true"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
						className: "size-3.5",
						"aria-hidden": "true"
					}), copied ? "Copied" : "Copy"]
				}) : null]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 rounded-lg border border-border/60 bg-surface p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm leading-relaxed whitespace-pre-wrap",
					children: analysis.suggestedResponse || "No suggested response was returned."
				})
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmailStatus, { analysis })
		]
	});
}
function Skeleton({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("animate-pulse rounded-md bg-primary/10", className),
		...props
	});
}
function AnalysisSkeleton() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		"aria-busy": "true",
		"aria-live": "polite",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-6 w-28 rounded-full" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-6 w-24 rounded-full" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-6 w-32 rounded-full" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-16 rounded-lg" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-16 rounded-lg" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-3 w-full rounded-full" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-24" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-full" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-11/12" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-32 w-full rounded-lg" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-center text-xs text-muted-foreground",
				children: "Routing the ticket through your triage workflow…"
			})
		]
	});
}
function AnalysisEmptyState() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center justify-center rounded-lg border border-dashed border-border/70 px-6 py-14 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex size-11 items-center justify-center rounded-full bg-muted",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Inbox, {
					className: "size-5 text-muted-foreground",
					"aria-hidden": "true"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-4 text-base font-semibold",
				children: "No analysis yet"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 max-w-sm text-sm text-muted-foreground",
				children: "Submit a ticket and its category, priority, sentiment and suggested reply will appear here."
			})
		]
	});
}
function AnalysisErrorState({ message, onRetry, isRetrying }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		role: "alert",
		className: "flex flex-col items-center justify-center rounded-lg border border-destructive/35 bg-destructive/8 px-6 py-12 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex size-11 items-center justify-center rounded-full bg-destructive/15",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OctagonAlert, {
					className: "size-5 text-destructive",
					"aria-hidden": "true"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-4 text-base font-semibold",
				children: "Analysis failed"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 max-w-md text-sm text-muted-foreground",
				children: message
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "outline",
				className: "mt-5",
				onClick: onRetry,
				disabled: isRetrying,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, {
					className: "size-4",
					"aria-hidden": "true"
				}), isRetrying ? "Retrying…" : "Retry analysis"]
			})
		]
	});
}
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Textarea.displayName = "Textarea";
/**
* Smart Aid Assistant configuration.
*
* The frontend only talks to n8n. n8n holds every AI credential.
* Override the endpoint with VITE_N8N_CHAT_WEBHOOK_URL.
*/
var N8N_CHAT_WEBHOOK_URL = {
	"BASE_URL": "/",
	"DEV": false,
	"MODE": "production",
	"PROD": true,
	"SSR": true,
	"TSS_DEV_SERVER": "false",
	"TSS_DEV_SSR_STYLES_BASEPATH": "/",
	"TSS_DEV_SSR_STYLES_ENABLED": "true",
	"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
	"TSS_INLINE_CSS_ENABLED": "false",
	"TSS_ROUTER_BASEPATH": "",
	"TSS_SERVER_FN_BASE": "/_serverFn/",
	"VITE_N8N_CHAT_WEBHOOK_URL": "https://harshitavasthi.app.n8n.cloud/webhook/smart-aid-assistant",
	"VITE_N8N_SUPPORT_WEBHOOK_URL": "https://harshitavasthi.app.n8n.cloud/webhook/support-ticket"
}["VITE_N8N_CHAT_WEBHOOK_URL"] ?? "https://harshitavasthi.app.n8n.cloud/webhook/smart-aid-assistant";
var CHAT_TIMEOUT_MS = 6e4;
var OUT_OF_SCOPE_REPLY = "I'm a payment-related assistant. I can't help with unrelated topics.";
var ASSISTANT_NAME = "Smart Aid Assistant";
var SEVERITIES = [
	"low",
	"medium",
	"high",
	"emergency"
];
var ChatApiError = class extends Error {};
function newSessionId() {
	const cryptoObj = typeof crypto !== "undefined" ? crypto : void 0;
	if (cryptoObj?.randomUUID) return cryptoObj.randomUUID();
	return `sess-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}
/**
* Deterministic client-side scope gate. n8n is the authority (via `inScope`),
* but obvious off-topic requests are refused here so the restriction is part of
* the app's behaviour and never reaches the model.
*/
var OFF_TOPIC_PATTERNS = [
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
	/\b(solve|calculate|integrate|derivative|equation)\b.*\b(\d|x)\b/i
];
var HEALTH_HINTS = /\b(pain|symptom|symptoms|triage|fever|headache|chest|breath|bleed|injur|wound|nausea|dizzy|rash|infection|clinic|hospital|doctor|nurse|urgent|emergency|medicine|medication|assessment|severity|result|smart aid)\b/i;
function isObviouslyOutOfScope(text) {
	if (HEALTH_HINTS.test(text)) return false;
	return OFF_TOPIC_PATTERNS.some((re) => re.test(text));
}
var isRecord$1 = (v) => typeof v === "object" && v !== null && !Array.isArray(v);
function unwrap$1(raw) {
	let current = raw;
	for (let i = 0; i < 6; i += 1) {
		if (Array.isArray(current)) {
			current = current[0];
			continue;
		}
		if (!isRecord$1(current)) break;
		const keys = Object.keys(current);
		const sole = keys.length === 1 ? keys[0] : void 0;
		if (sole && [
			"json",
			"data",
			"output",
			"result",
			"body",
			"response"
		].includes(sole)) {
			const next = current[sole];
			if (isRecord$1(next) || Array.isArray(next)) {
				current = next;
				continue;
			}
		}
		break;
	}
	return isRecord$1(current) ? current : {};
}
function pick$1(source, keys) {
	const lowered = /* @__PURE__ */ new Map();
	for (const [k, v] of Object.entries(source)) lowered.set(k.toLowerCase().replace(/[\s_-]/g, ""), v);
	for (const key of keys) {
		const hit = lowered.get(key.toLowerCase().replace(/[\s_-]/g, ""));
		if (hit !== void 0 && hit !== null && hit !== "") return hit;
	}
}
function asSeverity(value) {
	const v = typeof value === "string" ? value.trim().toLowerCase() : "";
	if (SEVERITIES.includes(v)) return v;
	if (v.includes("emergen") || v.includes("critical")) return "emergency";
	if (v.includes("high")) return "high";
	if (v.includes("medium") || v.includes("moderate")) return "medium";
	if (v.includes("low")) return "low";
	return null;
}
function normalizeReply(raw) {
	const data = unwrap$1(raw);
	const inScopeRaw = pick$1(data, [
		"inScope",
		"in_scope",
		"onTopic"
	]);
	const inScope = inScopeRaw === void 0 ? true : typeof inScopeRaw === "boolean" ? inScopeRaw : String(inScopeRaw).toLowerCase() === "true";
	const message = typeof pick$1(data, [
		"message",
		"reply",
		"text",
		"answer",
		"output"
	]) === "string" ? String(pick$1(data, [
		"message",
		"reply",
		"text",
		"answer",
		"output"
	])).trim() : "";
	const category = pick$1(data, ["category", "topic"]);
	return {
		message: inScope ? message : OUT_OF_SCOPE_REPLY,
		severity: inScope ? asSeverity(pick$1(data, [
			"severity",
			"priority",
			"urgency"
		])) : null,
		category: typeof category === "string" ? category : null,
		inScope
	};
}
async function sendChatMessage(message, sessionId) {
	const controller = new AbortController();
	const timer = setTimeout(() => controller.abort(), CHAT_TIMEOUT_MS);
	let response;
	try {
		response = await fetch(N8N_CHAT_WEBHOOK_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json"
			},
			body: JSON.stringify({
				message,
				sessionId
			}),
			signal: controller.signal
		});
	} catch (error) {
		if (error instanceof DOMException && error.name === "AbortError") throw new ChatApiError("The assistant took too long to respond. Please try again.");
		throw new ChatApiError("Couldn't reach the assistant. Check your connection and try again.");
	} finally {
		clearTimeout(timer);
	}
	const text = await response.text();
	if (!response.ok) throw new ChatApiError(response.status === 404 ? "The chat workflow wasn't found (404). If you're using an n8n test webhook, click 'Execute workflow' first." : `The assistant returned an error (${response.status}).`);
	if (!text.trim()) throw new ChatApiError("The assistant returned no reply. Check the workflow's response node.");
	let parsed;
	try {
		parsed = JSON.parse(text);
	} catch {
		return {
			message: text.trim(),
			severity: null,
			category: null,
			inScope: true
		};
	}
	const reply = normalizeReply(parsed);
	if (!reply.message) throw new ChatApiError("The assistant returned an empty reply. Please try again.");
	return reply;
}
var severityStyles = {
	low: {
		label: "Low severity",
		className: "border-priority-low/30 bg-priority-low/10 text-priority-low"
	},
	medium: {
		label: "Medium severity",
		className: "border-priority-medium/30 bg-priority-medium/10 text-priority-medium"
	},
	high: {
		label: "High severity",
		className: "border-priority-high/30 bg-priority-high/10 text-priority-high"
	},
	emergency: {
		label: "Emergency — seek care now",
		className: "border-priority-critical/40 bg-priority-critical/12 text-priority-critical"
	}
};
var GREETING = `Hi, I'm the ${ASSISTANT_NAME}. I can help you describe symptoms, understand what to report, and explain your triage result. What's going on?`;
function makeId() {
	return `m-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}
function greetingMessage() {
	return {
		id: makeId(),
		role: "assistant",
		content: GREETING,
		createdAt: (/* @__PURE__ */ new Date()).toISOString()
	};
}
function ChatWidget() {
	const [sessionId, setSessionId] = (0, import_react.useState)(() => newSessionId());
	const [messages, setMessages] = (0, import_react.useState)(() => [greetingMessage()]);
	const [input, setInput] = (0, import_react.useState)("");
	const [isSending, setIsSending] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const scrollRef = (0, import_react.useRef)(null);
	const inputRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		scrollRef.current?.scrollTo({
			top: scrollRef.current.scrollHeight,
			behavior: "smooth"
		});
	}, [messages, isSending]);
	(0, import_react.useEffect)(() => {
		inputRef.current?.focus();
	}, [isSending]);
	const reset = () => {
		setSessionId(newSessionId());
		setMessages([greetingMessage()]);
		setInput("");
		setError(null);
	};
	const send = async (text) => {
		const trimmed = text.trim();
		if (!trimmed || isSending) return;
		setError(null);
		setInput("");
		setMessages((prev) => [...prev, {
			id: makeId(),
			role: "user",
			content: trimmed,
			createdAt: (/* @__PURE__ */ new Date()).toISOString()
		}]);
		if (isObviouslyOutOfScope(trimmed)) {
			setMessages((prev) => [...prev, {
				id: makeId(),
				role: "assistant",
				content: OUT_OF_SCOPE_REPLY,
				outOfScope: true,
				createdAt: (/* @__PURE__ */ new Date()).toISOString()
			}]);
			return;
		}
		setIsSending(true);
		try {
			const reply = await sendChatMessage(trimmed, sessionId);
			setMessages((prev) => [...prev, {
				id: makeId(),
				role: "assistant",
				content: reply.message,
				severity: reply.severity,
				category: reply.category,
				outOfScope: !reply.inScope,
				createdAt: (/* @__PURE__ */ new Date()).toISOString()
			}]);
		} catch (err) {
			setError(err instanceof ChatApiError ? err.message : "Something went wrong. Please try again.");
			setInput(trimmed);
		} finally {
			setIsSending(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full min-h-0 flex-col overflow-hidden bg-card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center gap-3 border-b border-border/60 px-4 py-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "bg-gradient-primary flex size-9 shrink-0 items-center justify-center rounded-lg border border-primary/40",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stethoscope, {
							className: "size-4 text-primary-foreground",
							"aria-hidden": "true"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate text-sm font-semibold",
							children: ASSISTANT_NAME
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate text-xs text-muted-foreground",
							children: "Triage help · not a diagnosis"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						onClick: reset,
						"aria-label": "Start a new conversation",
						className: "size-8",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, {
							className: "size-4",
							"aria-hidden": "true"
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				ref: scrollRef,
				className: "flex-1 space-y-3 overflow-y-auto px-4 py-4",
				children: [
					messages.map((message) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: cn("flex", message.role === "user" ? "justify-end" : "justify-start"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: cn("max-w-[85%] space-y-2 rounded-lg px-3 py-2 text-sm leading-relaxed", message.role === "user" ? "bg-primary text-primary-foreground" : "border border-border/60 bg-background/60 text-foreground"),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "whitespace-pre-wrap",
									children: message.content
								}),
								message.severity ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: cn("inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide", severityStyles[message.severity].className),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
										className: "size-3",
										"aria-hidden": "true"
									}), severityStyles[message.severity].label]
								}) : null,
								message.category && message.role === "assistant" && !message.outOfScope ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[0.65rem] uppercase tracking-wide text-muted-foreground",
									children: message.category
								}) : null
							]
						})
					}, message.id)),
					isSending && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex justify-start",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "inline-flex items-center gap-2 rounded-lg border border-border/60 bg-background/60 px-3 py-2 text-sm text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
									className: "size-3.5 animate-spin",
									"aria-hidden": "true"
								}),
								"Smart Aid Assistant",
								" is typing…"
							]
						})
					}),
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: error }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => void send(input),
							className: "mt-1 font-semibold underline",
							children: "Retry"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "flex items-end gap-2 border-t border-border/60 px-3 py-3",
				onSubmit: (event) => {
					event.preventDefault();
					send(input);
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					ref: inputRef,
					value: input,
					onChange: (event) => setInput(event.target.value),
					onKeyDown: (event) => {
						if (event.key === "Enter" && !event.shiftKey) {
							event.preventDefault();
							send(input);
						}
					},
					rows: 1,
					placeholder: "Describe your symptoms…",
					className: "max-h-28 min-h-10 resize-none"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					size: "icon",
					disabled: isSending || !input.trim(),
					"aria-label": "Send message",
					className: "size-10 shrink-0",
					children: isSending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
						className: "size-4 animate-spin",
						"aria-hidden": "true"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, {
						className: "size-4",
						"aria-hidden": "true"
					})
				})]
			})
		]
	});
}
var Card = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("rounded-xl border bg-card text-card-foreground shadow", className),
	...props
}));
Card.displayName = "Card";
var CardHeader = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("flex flex-col space-y-1.5 p-6", className),
	...props
}));
CardHeader.displayName = "CardHeader";
var CardTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("font-semibold leading-none tracking-tight", className),
	...props
}));
CardTitle.displayName = "CardTitle";
var CardDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
CardDescription.displayName = "CardDescription";
var CardContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("p-6 pt-0", className),
	...props
}));
CardContent.displayName = "CardContent";
var CardFooter = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("flex items-center p-6 pt-0", className),
	...props
}));
CardFooter.displayName = "CardFooter";
var labelVariants = cva("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");
var Label = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
	ref,
	className: cn(labelVariants(), className),
	...props
}));
Label.displayName = Root.displayName;
var Form = FormProvider;
var FormFieldContext = import_react.createContext(null);
var FormField = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormFieldContext.Provider, {
		value: { name: props.name },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Controller, { ...props })
	});
};
var useFormField = () => {
	const fieldContext = import_react.useContext(FormFieldContext);
	const itemContext = import_react.useContext(FormItemContext);
	const { getFieldState, formState } = useFormContext();
	if (!fieldContext) throw new Error("useFormField should be used within <FormField>");
	if (!itemContext) throw new Error("useFormField should be used within <FormItem>");
	const fieldState = getFieldState(fieldContext.name, formState);
	const { id } = itemContext;
	return {
		id,
		name: fieldContext.name,
		formItemId: `${id}-form-item`,
		formDescriptionId: `${id}-form-item-description`,
		formMessageId: `${id}-form-item-message`,
		...fieldState
	};
};
var FormItemContext = import_react.createContext(null);
var FormItem = import_react.forwardRef(({ className, ...props }, ref) => {
	const id = import_react.useId();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormItemContext.Provider, {
		value: { id },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			ref,
			className: cn("space-y-2", className),
			...props
		})
	});
});
FormItem.displayName = "FormItem";
var FormLabel = import_react.forwardRef(({ className, ...props }, ref) => {
	const { error, formItemId } = useFormField();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
		ref,
		className: cn(error && "text-destructive", className),
		htmlFor: formItemId,
		...props
	});
});
FormLabel.displayName = "FormLabel";
var FormControl = import_react.forwardRef(({ ...props }, ref) => {
	const { error, formItemId, formDescriptionId, formMessageId } = useFormField();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slot, {
		ref,
		id: formItemId,
		"aria-describedby": !error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`,
		"aria-invalid": !!error,
		...props
	});
});
FormControl.displayName = "FormControl";
var FormDescription = import_react.forwardRef(({ className, ...props }, ref) => {
	const { formDescriptionId } = useFormField();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		ref,
		id: formDescriptionId,
		className: cn("text-[0.8rem] text-muted-foreground", className),
		...props
	});
});
FormDescription.displayName = "FormDescription";
var FormMessage = import_react.forwardRef(({ className, children, ...props }, ref) => {
	const { error, formMessageId } = useFormField();
	const body = error ? String(error?.message ?? "") : children;
	if (!body) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		ref,
		id: formMessageId,
		className: cn("text-[0.8rem] font-medium text-destructive", className),
		...props,
		children: body
	});
});
FormMessage.displayName = "FormMessage";
var Input = import_react.forwardRef(({ className, type, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		className: cn("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Input.displayName = "Input";
var ticketSchema = objectType({
	name: stringType().trim().min(2, "Please enter the customer's name (at least 2 characters).").max(80, "Name must be 80 characters or fewer."),
	email: stringType().trim().min(1, "Customer email is required.").email("Please enter a valid email address."),
	subject: stringType().trim().min(4, "Subject must be at least 4 characters.").max(120, "Subject must be 120 characters or fewer."),
	message: stringType().trim().min(20, "Please include at least 20 characters so the AI has enough context.").max(4e3, "Message must be 4000 characters or fewer.")
});
function TicketForm({ onSubmit, isSubmitting }) {
	const form = useForm({
		resolver: u(ticketSchema),
		defaultValues: {
			name: "",
			email: "",
			subject: "",
			message: ""
		},
		mode: "onBlur"
	});
	const messageLength = form.watch("message").length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "shadow-elegant border-border/70 bg-card/80 backdrop-blur-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
			className: "gap-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
				className: "text-lg",
				children: "New Ticket"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Submit a customer message and the triage workflow will classify it and draft a reply." })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form, {
			...form,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: form.handleSubmit((values) => onSubmit(values)),
				className: "space-y-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-5 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
							control: form.control,
							name: "name",
							render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: "Customer Name" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									placeholder: "Jordan Rivera",
									autoComplete: "name",
									...field
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {})
							] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
							control: form.control,
							name: "email",
							render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: "Customer Email" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "email",
									placeholder: "jordan@example.com",
									autoComplete: "email",
									...field
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {})
							] })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
						control: form.control,
						name: "subject",
						render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: "Ticket Subject" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								placeholder: "Charged twice for my annual plan",
								...field
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {})
						] })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
						control: form.control,
						name: "message",
						render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-baseline justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: "Support Message" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs tabular-nums text-muted-foreground",
									children: [messageLength, "/4000"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								rows: 7,
								placeholder: "Describe the issue exactly as the customer reported it…",
								className: "resize-y",
								...field
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {})
						] })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Analysis runs in your secure workflow — no keys live in this app."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							size: "lg",
							disabled: isSubmitting,
							className: "w-full font-semibold sm:w-auto",
							children: isSubmitting ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
								className: "size-4 animate-spin",
								"aria-hidden": "true"
							}), "Analyzing…"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
								className: "size-4",
								"aria-hidden": "true"
							}), "Analyze Ticket"] })
						})]
					})
				]
			})
		}) })]
	});
}
var Tabs = Root2;
var TabsList = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
	ref,
	className: cn("inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground", className),
	...props
}));
TabsList.displayName = List.displayName;
var TabsTrigger = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
	ref,
	className: cn("inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow", className),
	...props
}));
TabsTrigger.displayName = Trigger.displayName;
var TabsContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, {
	ref,
	className: cn("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className),
	...props
}));
TabsContent.displayName = Content.displayName;
/**
* SupportAI configuration.
*
* The frontend never talks to Groq, Resend, or any AI provider directly.
* It only POSTs the ticket to this n8n webhook, which orchestrates everything
* server-side and returns the analysis.
*
* Override the endpoint with VITE_N8N_SUPPORT_WEBHOOK_URL.
*/
var N8N_WEBHOOK_URL = {
	"BASE_URL": "/",
	"DEV": false,
	"MODE": "production",
	"PROD": true,
	"SSR": true,
	"TSS_DEV_SERVER": "false",
	"TSS_DEV_SSR_STYLES_BASEPATH": "/",
	"TSS_DEV_SSR_STYLES_ENABLED": "true",
	"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
	"TSS_INLINE_CSS_ENABLED": "false",
	"TSS_ROUTER_BASEPATH": "",
	"TSS_SERVER_FN_BASE": "/_serverFn/",
	"VITE_N8N_CHAT_WEBHOOK_URL": "https://harshitavasthi.app.n8n.cloud/webhook/smart-aid-assistant",
	"VITE_N8N_SUPPORT_WEBHOOK_URL": "https://harshitavasthi.app.n8n.cloud/webhook/support-ticket"
}["VITE_N8N_SUPPORT_WEBHOOK_URL"] ?? "https://harshitavasthi.app.n8n.cloud/webhook/support-ticket";
/** Abort the webhook request after this many milliseconds. */
var WEBHOOK_TIMEOUT_MS = 6e4;
var PRIORITIES = [
	"low",
	"medium",
	"high",
	"critical"
];
var SENTIMENTS = [
	"positive",
	"neutral",
	"negative",
	"urgent"
];
function isPriority(value) {
	return PRIORITIES.includes(value);
}
function isSentiment(value) {
	return SENTIMENTS.includes(value);
}
var SupportApiError = class extends Error {
	kind;
	status;
	constructor(kind, message, status) {
		super(message);
		this.name = "SupportApiError";
		this.kind = kind;
		this.status = status;
	}
};
var isRecord = (v) => typeof v === "object" && v !== null && !Array.isArray(v);
/** n8n often wraps output in an array, and sometimes under json / data / output / result. */
function unwrap(raw) {
	let current = raw;
	for (let i = 0; i < 6; i += 1) {
		if (Array.isArray(current)) {
			current = current[0];
			continue;
		}
		if (!isRecord(current)) break;
		const keys = Object.keys(current);
		const passthrough = [
			"json",
			"data",
			"output",
			"result",
			"body",
			"response"
		];
		const soleKey = keys.length === 1 ? keys[0] : void 0;
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
function pick(source, keys) {
	const lowered = /* @__PURE__ */ new Map();
	for (const [key, value] of Object.entries(source)) lowered.set(key.toLowerCase().replace(/[\s_-]/g, ""), value);
	for (const key of keys) {
		const hit = lowered.get(key.toLowerCase().replace(/[\s_-]/g, ""));
		if (hit !== void 0 && hit !== null && hit !== "") return hit;
	}
}
function asString(value) {
	if (typeof value === "string") return value.trim();
	if (typeof value === "number" || typeof value === "boolean") return String(value);
	return "";
}
function asBool(value) {
	if (typeof value === "boolean") return value;
	if (typeof value === "number") return value === 1;
	if (typeof value === "string") {
		const v = value.trim().toLowerCase();
		return v === "true" || v === "yes" || v === "1" || v === "sent";
	}
	return false;
}
/** Accepts 0–1 floats, 0–100 numbers, and "87%" strings. Returns 0–100 or null. */
function asConfidence(value) {
	let n = null;
	if (typeof value === "number") n = value;
	else if (typeof value === "string") {
		const parsed = Number.parseFloat(value.replace("%", "").trim());
		if (!Number.isNaN(parsed)) n = parsed;
	}
	if (n === null) return null;
	if (n > 0 && n <= 1) n *= 100;
	return Math.max(0, Math.min(100, Math.round(n)));
}
function asPriority(value) {
	const v = asString(value).toLowerCase();
	if (isPriority(v)) return v;
	if (v.includes("critical") || v.includes("p0") || v.includes("urgent")) return "critical";
	if (v.includes("high") || v.includes("p1")) return "high";
	if (v.includes("low") || v.includes("p3")) return "low";
	return "medium";
}
function asSentiment(value) {
	const v = asString(value).toLowerCase();
	if (isSentiment(v)) return v;
	if (v.includes("urgent") || v.includes("angry") || v.includes("frustrat")) return "urgent";
	if (v.includes("neg")) return "negative";
	if (v.includes("pos") || v.includes("happy")) return "positive";
	return "neutral";
}
function fallbackTicketId() {
	return `TCK-${Date.now().toString(36).toUpperCase().slice(-6)}`;
}
function normalizeAnalysis(raw, ticket) {
	const top = unwrap(raw);
	/** Workflows often nest the analysis under `ticket` / `analysis` / `triage`. Flatten it. */
	const nested = {};
	for (const key of [
		"ticket",
		"analysis",
		"triage",
		"result",
		"payload"
	]) {
		const value = top[key];
		if (isRecord(value)) Object.assign(nested, value);
	}
	const data = {
		...nested,
		...top
	};
	const status = asString(pick(data, [
		"status",
		"workflowStatus",
		"state"
	])) || null;
	const humanReviewRequired = asBool(pick(data, [
		"human_review_required",
		"needs_human_review",
		"humanReview",
		"requiresHumanReview",
		"needsReview"
	])) || status === "human_review_required";
	const emailSent = asBool(pick(data, [
		"email_sent",
		"emailSent",
		"email_status",
		"mailSent"
	]));
	const autoRespondedRaw = pick(data, [
		"auto_responded",
		"autoResponded",
		"auto_response_sent"
	]);
	const autoResponded = autoRespondedRaw !== void 0 ? asBool(autoRespondedRaw) : emailSent && !humanReviewRequired;
	return {
		ticketId: asString(pick(data, [
			"ticket_id",
			"ticketId",
			"id",
			"ticketNumber"
		])) || fallbackTicketId(),
		category: asString(pick(data, [
			"category",
			"ticket_category",
			"topic",
			"type"
		])) || "Uncategorized",
		priority: asPriority(pick(data, [
			"priority",
			"urgency",
			"severity"
		])),
		sentiment: asSentiment(pick(data, [
			"sentiment",
			"tone",
			"mood"
		])),
		confidence: asConfidence(pick(data, [
			"ai_confidence",
			"confidence",
			"confidenceScore",
			"score"
		])),
		humanReviewRequired,
		summary: asString(pick(data, [
			"summary",
			"ai_summary",
			"overview",
			"analysis"
		])),
		matchedIssue: asString(pick(data, [
			"matched_issue",
			"matchedIssue",
			"known_issue",
			"match"
		])),
		suggestedResponse: asString(pick(data, [
			"suggested_response",
			"suggestedResponse",
			"response",
			"reply",
			"draft"
		])),
		emailSent,
		autoResponded,
		status,
		ticket,
		analyzedAt: (/* @__PURE__ */ new Date()).toISOString()
	};
}
async function analyzeTicket(ticket) {
	const controller = new AbortController();
	const timer = setTimeout(() => controller.abort(), WEBHOOK_TIMEOUT_MS);
	let response;
	try {
		response = await fetch(N8N_WEBHOOK_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json"
			},
			body: JSON.stringify({
				name: ticket.name,
				email: ticket.email,
				subject: ticket.subject,
				message: ticket.message
			}),
			signal: controller.signal
		});
	} catch (error) {
		if (error instanceof DOMException && error.name === "AbortError") throw new SupportApiError("timeout", "The analysis workflow took too long to respond. Please try again.");
		throw new SupportApiError("network", "Could not reach the analysis workflow. Check your connection and that the webhook is active.");
	} finally {
		clearTimeout(timer);
	}
	const text = await response.text();
	if (!response.ok) throw new SupportApiError("http", response.status === 404 ? "The webhook URL was not found (404). If you are using an n8n test webhook, click 'Execute workflow' first." : `The analysis workflow returned an error (${response.status}).`, response.status);
	if (!text.trim()) throw new SupportApiError("empty", "The workflow responded with no data. Make sure it ends with a 'Respond to Webhook' node.");
	let parsed;
	try {
		parsed = JSON.parse(text);
	} catch {
		throw new SupportApiError("parse", "The workflow response was not valid JSON.");
	}
	return normalizeAnalysis(parsed, ticket);
}
function SupportCenter() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [history, setHistory] = (0, import_react.useState)([]);
	const [lastPayload, setLastPayload] = (0, import_react.useState)(null);
	const mutation = useMutation({
		mutationFn: (payload) => analyzeTicket(payload),
		onSuccess: (analysis) => {
			setHistory((previous) => [analysis, ...previous]);
			if (analysis.humanReviewRequired) {
				toast.warning("Ticket flagged for human review", { description: "An agent needs to approve the response before it goes out." });
				return;
			}
			toast.success("Ticket analyzed", { description: analysis.emailSent ? "Customer email sent successfully." : `Categorized as ${analysis.category} · ${analysis.priority} priority.` });
		},
		onError: (error) => {
			toast.error("Analysis failed", { description: error instanceof SupportApiError ? error.message : "Something went wrong. Please retry." });
		}
	});
	const submit = (payload) => {
		setLastPayload(payload);
		mutation.mutate(payload);
	};
	const latest = history[0];
	const errorMessage = mutation.error instanceof SupportApiError ? mutation.error.message : mutation.error ? "Something went wrong while contacting the analysis workflow." : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [!open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		type: "button",
		size: "icon",
		onClick: () => setOpen(true),
		"aria-label": "Open support center",
		className: "bg-gradient-primary shadow-elegant fixed bottom-5 right-5 z-50 size-14 rounded-full border border-primary/40",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, {
			className: "size-6",
			"aria-hidden": "true"
		})
	}) : null, open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		role: "dialog",
		"aria-label": "Customer support center",
		className: "shadow-elegant fixed inset-3 z-50 flex flex-col overflow-hidden rounded-xl border border-border/70 bg-card sm:inset-auto sm:bottom-5 sm:right-5 sm:h-[min(46rem,calc(100vh-2.5rem))] sm:w-[min(52rem,calc(100vw-2.5rem))]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex shrink-0 items-center gap-3 border-b border-border/70 px-4 py-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "bg-gradient-primary flex size-9 shrink-0 items-center justify-center rounded-lg text-primary-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, {
						className: "size-4.5",
						"aria-hidden": "true"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "truncate text-sm font-semibold",
						children: "Customer Support"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "truncate text-xs text-muted-foreground",
						children: "Submit a ticket or chat with the assistant"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "ghost",
					size: "icon",
					onClick: () => setOpen(false),
					"aria-label": "Close support center",
					className: "size-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
						className: "size-4",
						"aria-hidden": "true"
					})
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
			defaultValue: "ticket",
			className: "flex min-h-0 flex-1 flex-col",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "shrink-0 border-b border-border/60 px-4 py-2.5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
						className: "grid w-full grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
							value: "ticket",
							className: "gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardList, {
								className: "size-4",
								"aria-hidden": "true"
							}), "Submit ticket"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
							value: "chat",
							className: "gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, {
								className: "size-4",
								"aria-hidden": "true"
							}), "AI chat"]
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "ticket",
					className: "mt-0 min-h-0 flex-1 overflow-y-auto p-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 lg:grid-cols-2 lg:items-start",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TicketForm, {
							onSubmit: submit,
							isSubmitting: mutation.isPending
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "border-border/70 bg-card/80 shadow-none",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
								className: "gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
									className: "text-lg",
									children: "Latest Analysis"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: latest ? `Analyzed ${new Date(latest.analyzedAt).toLocaleTimeString()}` : "The most recently analyzed ticket appears here." })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: mutation.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnalysisSkeleton, {}) : errorMessage ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnalysisErrorState, {
								message: errorMessage,
								onRetry: () => {
									if (lastPayload) mutation.mutate(lastPayload);
								},
								isRetrying: mutation.isPending
							}) : latest ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnalysisPanel, { analysis: latest }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnalysisEmptyState, {}) })]
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "chat",
					className: "mt-0 min-h-0 flex-1 overflow-hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatWidget, {})
				})
			]
		})]
	}) : null] });
}
function Index() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid-backdrop min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "border-b border-border/70 bg-background/85 backdrop-blur",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex h-18 max-w-6xl items-center justify-between px-5 sm:px-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "bg-gradient-primary flex size-9 items-center justify-center rounded-lg text-primary-foreground shadow-sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, {
								className: "size-4.5",
								"aria-hidden": "true"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-lg font-semibold",
							children: "Payflow"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-sm text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockKeyhole, {
							className: "size-4 text-success",
							"aria-hidden": "true"
						}), "Secure checkout"]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto grid min-h-[calc(100vh-4.5rem)] max-w-6xl items-center gap-12 px-5 py-12 sm:px-8 lg:grid-cols-[1.05fr_0.8fr] lg:py-20",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "max-w-2xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-5 text-sm font-semibold uppercase text-primary",
							children: "Payments made simple"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "max-w-xl text-4xl font-semibold leading-tight sm:text-6xl",
							children: "A better way to manage every payment."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 max-w-lg text-base leading-7 text-muted-foreground sm:text-lg",
							children: "This placeholder page demonstrates how customer support stays available without taking over your product experience."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-foreground",
							children: [
								"Fast settlements",
								"Protected transactions",
								"Clear reporting"
							].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "flex size-5 items-center justify-center rounded-full bg-success/12 text-success",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
										className: "size-3.5",
										"aria-hidden": "true"
									})
								}), item]
							}, item))
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					"aria-label": "Payment preview",
					className: "mx-auto w-full max-w-md",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "shadow-elegant overflow-hidden rounded-lg border border-border/80 bg-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-b border-border/70 px-6 py-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: "Amount due"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 font-display text-3xl font-semibold",
								children: "$248.00"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-5 p-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-medium uppercase text-muted-foreground",
									children: "Card details"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-2 flex h-12 items-center justify-between rounded-md border border-input bg-background px-4 text-sm text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "•••• •••• •••• 4242" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, {
										className: "size-4",
										"aria-hidden": "true"
									})]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									className: "h-11 w-full",
									disabled: true,
									children: ["Complete payment", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
										className: "size-4",
										"aria-hidden": "true"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "flex items-center justify-center gap-1.5 text-xs text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {
										className: "size-3.5 text-success",
										"aria-hidden": "true"
									}), "Demo checkout — no payment will be processed"]
								})
							]
						})]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SupportCenter, {})
		]
	});
}
//#endregion
export { Index as component };
