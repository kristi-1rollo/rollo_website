## Plaan: Avalehe probleemikaartide ikoonide uuendamine (uuendatud)

### Olukord
Avalehe "Human Patrol is Expensive, Inefficient and Now Replaceable" sektsiooni kolmel probleemikaardil on praegu punased X-ristikesed, mis kasutajate tagasiside järgi meenutavad rikki laaditud piltide placeholder'eid.

### Lahendus
Asenda 3 punast X-i **semantiliste lucide-react ikoonidega**, kuid **säilita punane toon** — sest need on probleemikaardid, mitte lahendused. Roheline jäetakse lahenduste sektsioonile.

### Täpsemad muudatused (1 fail)

**`src/pages/Index.tsx`**

1. **Lisa importid:**
   ```tsx
   import { TrendingUp, Brain, Scale } from "lucide-react";
   ```

2. **Kaart 1 — "Escalating Security Labor Costs"**
   - Asenda X SVG → `<TrendingUp className="h-5 w-5" />` (kasvavad kulud)
   - Konteiner jääb: `bg-red-500/15` + `text-red-500`

3. **Kaart 2 — "Human Performance Bottlenecks"**
   - Asenda X SVG → `<Brain className="h-5 w-5" />` (inimlikkuse/aju piirang)
   - Konteiner jääb: `bg-red-500/15` + `text-red-500`

4. **Kaart 3 — "Cost–Reliability Imbalance"**
   - Asenda X SVG → `<Scale className="h-5 w-5" />` (tasakaalustamatust)
   - Konteiner jääb: `bg-red-500/15` + `text-red-500`

### Miks see töötab
- **Punane toon säilib** → kaardid viitavad endiselt probleemile, ei sega lahenduste (lime) visuaalset keelt.
- **Semantiline kuju** → TrendingUp, Brain, Scale on arusaadavad ja ei meenuta "broken image" placeholder'it.
- **Kõik muu jääb samaks** → kaardi suurus, animatsioon, paigutus ei muutu.