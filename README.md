# Support AI Assistant

Build a production-style web application called **SupportAI — AI Customer Support Ticket Triage**.

The application is a customer-support ticket management dashboard. The frontend must communicate with an external n8n workflow through a webhook. Do NOT implement the AI logic in the frontend. Groq AI will be called by n8n.

## Tech/UI

Use:

* React
* TypeScript
* Tailwind CSS
* shadcn/ui where useful
* Lucide icons

Create a clean modern SaaS dashboard with a professional support/AI aesthetic. Make it responsive for desktop and mobile.

## Main page

Create a support ticket submission form containing:

* Customer Name
* Customer Email
* Ticket Subject
* Support Message

Fields must have proper validation.

Submit button:
**Analyze Ticket**

When submitted:

1. Show loading state.
2. Send a POST request to an n8n webhook.
3. Send JSON in exactly this structure:

{
"name": "Customer Name",
"email": "[customer@example.com](mailto:customer@example.com)",
"subject": "Ticket subject",
"message": "Customer support message"
}

Use this placeholder webhook URL:

https://harshitavasthi.app.n8n.cloud/webhook-test/support-ticket

Keep the webhook URL in one easy-to-edit configuration variable.

## Results

After receiving the n8n response, display a ticket-analysis dashboard.

Show:

* Ticket ID
* Category
* Priority
* Sentiment
* AI Confidence
* Human Review Required
* Summary
* Matched Issue
* Suggested Response

Use visual badges for:

Priority:

* Low
* Medium
* High
* Critical

Sentiment:

* Positive
* Neutral
* Negative
* Urgent

## Email status

Display:

* Email Sent
* Human Review Required
* Auto Responded

If the backend returns:

{
"email_sent": true
}

show:
"Customer email sent successfully"

If:

{
"status": "human_review_required"
}

show:
"Ticket requires human review before sending a response."

## Dashboard layout

Create these sections:

### Overview cards

* Total Tickets
* High Priority
* Auto Responded
* Human Review

For the MVP, these can use local/mock values until a database is connected.

### New Ticket

Large ticket submission form.

### Latest Analysis

Display the most recently analyzed ticket.

## UX

Use:

* Loading skeleton
* Toast notifications
* Empty states
* Error states
* Form validation
* Disabled submit button while processing
* Retry button when webhook fails

Do not expose Groq API keys, Resend API keys, or any n8n credentials in the frontend.

## Important

The frontend must NOT call Groq directly.

The architecture is:

Lovable frontend
→ n8n webhook
→ Groq API
→ n8n processing
→ Resend email when auto-response is allowed
→ n8n response
→ Lovable frontend

Make the code modular and easy to modify later.

Do not add authentication, payments, database, or unnecessary features in the first version.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://smart-aid-triage.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/a43f4529-2140-473e-820d-b1ddaa55c25f).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
