# Floating Support Center

## Build
- Keep the current demo payment page as the background.
- Replace the standalone chat launcher with one floating support button.
- Open a responsive support panel containing two tabs: ticket submission and AI chat.
- Restore the complete ticket form, latest analysis, loading, errors, retry, and status feedback inside the ticket tab.
- Reuse the existing chatbot and n8n connection inside the chat tab, preserving session reset and close behavior.

## Preserve
- Keep the support-ticket webhook and its nested response handling unchanged.
- Keep the chatbot webhook and payment-related off-topic refusal unchanged.
- Do not add persistence, authentication, payments, or mock responses.

## Verification
- Confirm the support center opens and closes, both tabs work, and the ticket form remains usable on desktop and mobile.
