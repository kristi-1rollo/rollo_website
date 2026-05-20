## Summary
Replace the toast-based success feedback on the Contact page with an inline confirmation message shown directly inside the form card. The message fades in smoothly after a successful submission, matching the existing deep-tech visual style.

## What will change

### 1. `src/hooks/useContactForm.ts`
- Add `isSuccess` boolean state to the hook.
- Set `isSuccess = true` after a successful API response.
- Remove the success toast call (error toasts remain unchanged).
- Export `isSuccess` from the hook return object.

### 2. `src/pages/Contact.tsx`
- Destructure `isSuccess` from the hook.
- Conditionally render a styled confirmation block at the top of the form card when `isSuccess === true`.
- Use existing design tokens (`surface-panel`, `text-white`, `text-primary`) and the project's `FadeInView` component for the fade-in effect.
- Keep the form visible underneath (already reset by the hook) so users can submit another inquiry if needed.

## Confirmation copy (exact)
```
Thank you for contacting Rollo Robotics.

Your message has been received. We'll get back to you as soon as possible.
```

## Visual treatment
- Rendered inside the same `surface-panel` card, above the form fields.
- Subtle lime accent: left border or icon in `text-primary`.
- Smooth opacity/transform fade-in via `FadeInView`.
- No layout shift: the confirmation block takes the same width as the form content.

## What stays the same
- All form fields, validation, and submission logic.
- Error handling and error toasts.
- Honeypot, required fields, and payload shape.
- The form resets to empty after submission as it does today.
