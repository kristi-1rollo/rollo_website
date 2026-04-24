## Update Use Cases grid on Home page

Restructure the bento grid in `src/pages/Index.tsx` to introduce a new "Ports & Marine" tile and reposition "Data Centers".

### Changes

**1. Add new image asset**
- Copy uploaded `user-uploads://rollo_marine.png` to `public/robot/rollo-marine.png`.

**2. Update `useCases` array in `src/pages/Index.tsx`**

The 8 tiles will become (in order):

| # | Title | Notes |
|---|-------|-------|
| 01 | Airports | unchanged |
| 02 | Hospitals | unchanged |
| 03 | Industrial Plants | unchanged |
| 04 | **Ports & Marine** (NEW) | Replaces the current "Data Centers" slot. Uses new uploaded image. |
| 05 | Construction | unchanged |
| 06 | **Data Centers** (MOVED) | Takes over the current "Campuses" slot — same icon (`Database`), description and tech as today's Data Centers tile. |
| 07 | Communities | unchanged |
| 08 | Oil & Gas | unchanged |

**Net effect:** "Campuses" is removed, "Data Centers" moves to slot 06, and a new "Ports & Marine" tile lands in slot 04.

**3. New "Ports & Marine" tile content**
- icon: `Anchor` (from lucide-react) — fits maritime context
- image: `/robot/rollo-marine.png`
- description: `Continuous perimeter surveillance in high-traffic maritime zones.`
- tech: `MARITIME-GRADE IP67 / SALT-AIR HARDENED`

### Technical notes
- Add `Anchor` to the lucide-react import list, remove `GraduationCap` (no longer used after Campuses is removed).
- Keep existing `objectPosition` / `imageScale` logic as-is — the new tile will use defaults (centered, no scale). If the robot framing in the new image needs tweaking after preview, we can add `objectPosition` later.
- No changes to the rendering loop or grid layout.
