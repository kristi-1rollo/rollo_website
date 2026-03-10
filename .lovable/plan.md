

# Market & ROI Sections — Mockup-Style Redesign (English, No AI)

## Changes to `src/pages/Index.tsx`

### Market Section (lines 331-401)
- **Tag**: Keep "Market" → change to "Market Opportunity"
- **Heading**: Large bold text with period: "Global Reach, Untouched Potential."
- **Stats**: Left-aligned instead of centered. Each stat gets two description lines — normal + italic subtext:
  - 28.5M: "Frontline security workers globally." / *"A critical mass where automation begins."*
  - $500B: "Security equipment market by 2030." / *"We don't create markets, we optimize them."*
  - 80%+: "Cost savings for customers." / *"Efficiency that transforms the business model."*
- **Remove**: The comparison cards (3 Robots vs 9 Guards block, lines 372-400)

### ROI Calculator (lines 403-480)
- **Tag**: Keep "Business Intelligence"
- **Heading**: "The Math of Autonomy."
- **Description**: "We don't sell costs, we sell returns. Use the sliders to estimate your savings."
- **Sliders**: Remove surrounding card container (border/bg). Labels left-aligned with value on the right of same row: "Patrol Hours per Day" / "Replaced Guard Sectors"
- **Glass panel**: Keep glassmorphism but restructure:
  - "Estimated Annual Savings" label + massive number
  - Below: ROI Period and Efficiency side-by-side in a 2-col grid (no Clock icon)
  - Add "Get a Quote" button at bottom → links to /contact
- **Remove**: No AI input field, no AI strategy button

