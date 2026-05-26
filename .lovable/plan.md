## Plaan: Mobiili spec sektsioon — sticky robot taustal, kastid kerivad ette

### Muudatus
`src/components/SpecsBlueprint.tsx` mobiili plokis (`md:hidden`):

1. **Robot jääb sticky** ekraani keskel/ülaosas, **fikseeritud suurusega** (nt 260px laius).
2. **Eemalda** `useScroll` + `useTransform` (suuruse animatsioon kaob).
3. **z-index loogika ümber pööratud:**
   - Robotipildi konteiner: `z-0` (taga)
   - Specs grid konteiner: `z-10` (ees, kerib roboti peale)
4. **Glow jääb roboti taha**, mitte kastide ette.
5. Kastid `glass` jääb sama (poolläbipaistev, et robot oleks läbi näha) — annab kena "blueprint pinnal" tunde.

### Tehnilised üksikasjad
- `mobileRef` ja kogu Framer Motion scroll-progress eemalda.
- `motion.img` → tavaline `<img>` fikseeritud `width: 260px` ja `className="..."`.
- `<div className="sticky top-20 ... z-0">` robotipildi ümber.
- `<div className="relative z-10 ...">` specs gridi ümber, et see kindlasti roboti peal renderdatakse.
- Eemalda `import { useRef }` ja `useScroll, useTransform`.
- `framer-motion` import jääb (desktopis veel kasutusel).

### Tulemus
- Robot virvendamist enam ei toimu (suurus stabiilne).
- Kasutaja kerides liiguvad spec-kastid roboti silueti peale → tugev "tehniline blueprint" tunne.
- Roboti kontuur jääb pehmelt nähtavaks ka kastide all tänu `glass` taustale.