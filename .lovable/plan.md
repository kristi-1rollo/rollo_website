Selge — laius jääb samaks (sama mis praegune päise pilt, `container-premium` sees), aga kõrgus ei tohi lõigata.

## Probleem praegu

`BlogPostHeader.tsx` kasutab `aspect-video md:aspect-[21/9]`. Desktopil (md+) on konteiner **21:9**, aga video on tavaliselt **16:9** → `object-cover` lõikab kaadri üle/alt servad ära.

## Lahendus

**`src/components/BlogPostHeader.tsx`:**
- Muudame konteineri klassi: `aspect-video md:aspect-[21/9]` → **`aspect-video`** (16:9 kõigil ekraanidel)
- Video/iframe jääb `object-cover` / `inset-0` — kuna konteiner ja video on mõlemad 16:9, lõikamist ei toimu
- Fallback `<img>` saab samuti `object-contain` asemel jätta `object-cover` (pildid on niikuinii 16:9 thumbnail'id)

**Tulemus:**
- Laius = sama mis praegu (container-premium, ~1200px max)
- Kõrgus = laius × 9/16 (näiteks 1200px laiuselt → 675px kõrgus)
- 16:9 YouTube/MP4 videod täidavad täpselt — null lõikamist, null musta riba

## Tähelepanu

Kui keegi laadib üles muu aspektisuhtega video (näiteks 4:3 või vertikaalne 9:16), tekib siiski letterboxing või cropping. 16:9 on standard ja kõige levinum — soovitame admin'is sellele jääda. Kui tahad ka neid toetada, võime hiljem lisada admin'is "video aspect ratio" valiku (16:9 / 4:3 / 1:1 / 9:16).
