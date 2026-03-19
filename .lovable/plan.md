

# FadeInView ref warning fix

## Problem
Console shows "Function components cannot be given refs" warning for `FadeInView` in `Index.tsx`. The `FadeInView` component doesn't use `forwardRef`, but somewhere in Index.tsx a ref is being passed to it (likely via the `Section` component or directly).

## Fix
Wrap `FadeInView` with `React.forwardRef` so it can accept refs without warnings. The ref will be forwarded to the inner `motion.div`.

### File: `src/components/FadeInView.tsx`
- Convert from plain function to `forwardRef` component
- Forward the ref to `motion.div`

This is a one-file, non-breaking change. No visual differences.

