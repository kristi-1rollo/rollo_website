

## Eesmärk
Vähendada lehe laadimisaega ja paranda piltide kuvamise kiirust, eemaldada koodist ja `public/`-ist kasutuseta failid.

## Probleemi diagnoos

### Mahukad probleemid
- **`public/robot/` = 274 MB**, sellest enamus on kasutuseta (kõik `1rollo-proto-*` failid, `lumes-1.mp4` 57 MB, `lumes-2.mp4` 34 MB, jne).
- **Reaalselt kasutatavad pildid on samuti üüratud:** `team-hero.png` 5.4 MB, `rollo-park.png` 5.8 MB, `rollo-des.png` 5.5 MB, `rollo-milit.png` 4.2 MB, F6 pildid 3–5 MB tükk. Kokku ~40 MB pilte renderdub Home / About / Product lehtedel **PNG-na originaalsuuruses**.
- **`OptimizedImage` ei aita lokaalsete piltide puhul** — see genereerib `srcSet` ainult Supabase URL-idele, mitte `/public/...` failidele. Seega kõik staatilised PNG-d laetakse 1:1 originaalmõõtudes.
- Hero LCP-pilt `rollo-street.webp` (201 KB) on juba ok, aga PNG-versiooni (`rollo-street.png` 2 MB) ei kasutata kunagi.

### Kasutuseta failid (turvaline kustutada)
**Pildid / videod (`public/`):**
- `public/robot/1rollo-proto-p001.png` … `p013.png` (13 faili, ~50 MB)
- `public/robot/1rollo-proto-render-p002/p006/p013/p016/p017/p018.png` (~32 MB)
- `public/robot/lumes-1.mp4` (57 MB), `lumes-2.mp4` (34 MB)
- `public/robot/vid/rollo-promo-1.mp4`
- `public/robot/pre-seed-round.png`, `robot-orbit.png`, `rollo-airport.png`, `rollo-datacentre.png`, `rollo-mud.png`, `rollo-night.png`, `rollo-orbit-2.png`
- `public/robot/F6/1Rollo_window_lights_evening.png`, `1rollo-autonomous_security.png`, `1rollo_orbital.png`
- `public/team/team-bluish.png`, `team-transparent.png`
- `public/hero/rollo-1.png`, `rollo-2.png`, `rollo-street.png` (PNG; jätame ainult `.webp`)
- `public/hero-orbit.mp4`
- `public/icon/icon-1.png` … `icon-8.png` (kõik 8)
- `public/graph/pilt-1.webp` (jätame `.jpg`, mida tegelikult kasutatakse), `pilt-5.png`
- `public/logos/rollo-favicon.png`, `rollo-logo-black.png`
- `public/placeholder.svg`, `public/favicon.ico`

**`src/assets/`:**
- `eu-cofunded.png`, `rollo1.png`, `rollo2.png`, `rollo3.png`
- `src/assets/robot/rollo-front-p010.png`, `rollo-render-p006.png`

**Komponendid / hookid:**
- `src/components/ReadingProgressBar.tsx` (mitte kuskil imporditud)
- `src/hooks/useAutoDraft.ts` (mitte kuskil imporditud)

**Kokkuhoid: ~250 MB repos / git LFS-is, kiirem clone, kiirem deploy.**

## Lahendus

### 1. Kustutada kasutuseta failid
Eemaldan kõik ülaltoodud kasutuseta pildid, videod, komponendid ja hookid. Public lehel ei muutu midagi visuaalselt.

### 2. Konverteerida ülejäänud suured PNG-d WebP-sse
Laiendan `scripts/convert-to-webp.mjs` skripti, et see konverteeriks ka kõik **reaalselt kasutatavad** rasked pildid:
- `public/robot/rollo-park.png`, `rollo-des.png`, `rollo-milit.png`, `rollo-tunnel.png`, `rollo-city.png`
- `public/robot/F6/1rollo_auto_sec.png`, `1rollo_close.png`, `1rollo_market_scale.png`, `1rollo_tll.png`, `f6_tech_spec.png`
- `public/team/team-hero.png`
- `public/robot/team/1rollo_team_3.png`
- `public/robot/1rollo_orbital_2.png` (kasutatakse läbi `src/assets`)

Kvaliteet 82, max laius 1920 px. Eeldatav kokkuhoid: **40 MB → ~4 MB** (90% väiksem).

Käitan skripti ja **kustutan PNG originaalid** (kuna kõik kasutuskohad uuendatakse `.webp`-le).

### 3. Uuendada koodis pildiviited `.webp`-le
Asendan `.png` → `.webp` viited:
- `src/pages/Index.tsx` (use cases hero pildid, capabilities orbit jne)
- `src/pages/Product.tsx` (F6 pildid)
- `src/pages/AboutUs.tsx` (team-hero, team_3)
- vajadusel teised pages

### 4. Parandada `OptimizedImage` ka lokaalsete failide jaoks
Praegu komponent annab `srcSet` ainult Supabase URL-idele. Lisan tugi:
- kui src on `.webp` lokaalne fail, pannakse korrektsed `loading`, `decoding`, `fetchPriority` atribuudid (ilma `srcSet`-ita, kuna Vite ei genereeri eri laiusi),
- pisi-täiendus: vaikimisi `width`/`height` atribuudid CLS vältimiseks, kus võimalik.

### 5. Paranda Home hero LCP
- Eemaldan kasutuseta `rollo-street.png` (PNG variant), kasutusel jääb ainult `.webp`.
- Veendun, et `<link rel="preload" as="image" href="/hero/rollo-street.webp">` on lisatud `index.html`-i, et hero laaditaks parsimise ajal paralleelselt (kiirem LCP).

### 6. Lisada `index.html`-i tagasihoidlikud performance-vinjettid
- `<link rel="preconnect" href="https://igdxbtuaajrhvuqtwhmm.supabase.co">` — kiirendab esimest Supabase päringut.
- Hero pildi preload (vt punkt 5).

## Mida EI muudeta
- visuaalne disain ja layout ei muutu,
- F6 sektsiooni pildid jäävad samadeks (ainult formaat WebP),
- video kompositsioonid ja `ScrollControlledVideo` jäävad puutumata,
- admin-paneeli komponendid jäävad puutumata,
- Supabase / RLS / auth ei muutu,
- shadcn UI komponente ei kustuta (kuigi paljud on praegu kasutamata, hoiame need alles, sest nad on pisikesed ja võivad olla vaja edaspidi).

## Tehniline teostus järjekorras
1. **Kustuta** kõik nimetatud kasutuseta `public/` failid.
2. **Kustuta** `src/assets/eu-cofunded.png`, `rollo1.png`, `rollo2.png`, `rollo3.png`, `rollo-front-p010.png`, `rollo-render-p006.png`.
3. **Kustuta** `src/components/ReadingProgressBar.tsx`, `src/hooks/useAutoDraft.ts`.
4. **Laienda** `scripts/convert-to-webp.mjs` ja **käita** `npm run optimize:images` → tekitab `.webp` versioonid.
5. **Kustuta** suured PNG originaalid pärast WebP genereerimist (ainult need, mille kõik kasutuskohad on uuendatud).
6. **Asenda** kõik `.png` viited koodis `.webp`-le.
7. **Täienda** `OptimizedImage.tsx` lokaalsete piltide tugi.
8. **Lisa** `index.html`-i preconnect ja hero preload.
9. **Käita** `npm run build` veendumaks, et midagi pole katki.

## Oodatav tulemus
- Repo / deploy maht väheneb **~250 MB** võrra.
- Home, Product ja About lehe esmase laadimise pildimaht väheneb hinnanguliselt **~40 MB → ~4 MB** (~90%).
- Hero LCP paraneb tänu preload + preconnect kombinatsioonile.
- Pole enam unused-koodi varbide all (`ReadingProgressBar`, `useAutoDraft`).
- Visuaalselt ei muutu midagi.

