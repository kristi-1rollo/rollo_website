

# Hero Section Text Position Fix

## Problem
The "ROLLO" title, subtitle, and CTA buttons overlap with the robot image. The text sits on top of the robot's lower body/wheels area.

## Solution
Move the text block below the robot image instead of positioning it absolutely over the robot. Change the layout from overlapping (absolute positioning) to a stacked vertical flow where the robot appears first and the text content follows beneath it.

## Technical Details

### File: `src/components/HeroSection.tsx`

**Current approach**: The text block uses `absolute bottom-[8vh]` positioning, which places it over the robot.

**New approach**: 
- Remove `absolute` positioning from the text container
- Place the text naturally below the robot in the flex column layout
- Adjust robot size slightly to ensure both robot and text fit within the sticky viewport
- Add some negative margin or reduced spacing so the layout feels cohesive without overlap

### Changes:
1. Remove `absolute bottom-[8vh]` from the text `motion.div`
2. Make the text a normal flow element after the robot
3. Reduce robot height slightly (e.g., `h-[45vh] sm:h-[50vh] md:h-[60vh]`) to leave room for text below
4. Add appropriate spacing between robot and text

No other files need to change.

