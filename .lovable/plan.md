

# Landing Page Visual & UX Overhaul — "High-End Deep-Tech"

This is a large transformation. I recommend breaking it into phases to keep quality high and avoid regressions. Here is the full plan for Phase 1 (the complete overhaul):

## Changes Overview

### 1. Market Section — Borderless Stats with Glow
- Remove `rounded-2xl border bg-white/5` containers from the 3 stat cards
- Make numbers massive: `text-5xl md:text-7xl font-extrabold`
- Add `drop-shadow` glow: `[text-shadow:0_0_40px_rgba(190,255,75,0.3)]`
- Add faint geometric grid SVG background to this section only (inline SVG pattern, low opacity)
- Comparison cards: keep but soften borders

### 2. ROI Calculator — Glassmorphism Interactive Engine
- Expand slider range: "Patrol Hours" 1-24 (step 1), "Sectors/Units" 1-20 (rename guards to sectors)
- Right panel: glassmorphism style (`backdrop-blur-xl bg-white/[0.03] border border-white/10`)
- Main stat: massive annual savings number with glow
- Add "ROI Period" calculation (months to break even)
- Result panel as single large card instead of 3 small ones

### 3. Section Spacing
- All sections: `py-24 md:py-40` (160px+ on desktop) — already defined in CSS `.section` class but not used in Index.tsx
- Use the existing `section` CSS class or increase inline padding

### 4. Scroll Reveal Animations
- Wrap all section content with existing `ScrollFadeIn` component
- Stagger child elements with delay props

### 5. Button Hover States
- Primary buttons: `hover:bg-white hover:text-black` transition
- Ghost buttons: `hover:bg-[#B4FF33] hover:text-black` transition

### 6. Problem/Solution & Product Cards — Lighter Touch
- Remove heavy borders, use `border-white/5` instead of `/10`
- Product section images: remove `bg-black` container, let images float

### 7. Use Cases — Minimal Grid
- Remove card borders, use icon + label only with subtle hover glow

## Files Modified

- **`src/pages/Index.tsx`** — Major rewrite of all sections with new styling, ScrollFadeIn wrapping, glassmorphism ROI panel, borderless market stats, updated spacing, button hover states
- **`src/index.css`** — Add `.glass` utility class, geometric grid background pattern

No new dependencies needed. Existing `ScrollFadeIn` component and `Slider` are reused.

