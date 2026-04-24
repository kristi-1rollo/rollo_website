
## Diagnoos (mõõdetud andmed)

Lighthouse mobiilis: **76 punkti, FCP 3.49s, SI 5.31s, LCP 4.05s**. Mõõtsin live-saidi (https://new.1rollo.com) iPhone 12 vaatest — esimese laadimisega tuleb **16 pilti, kokku ~1.9 MB**, kusjuures LCP-pildi (`1rollo_tll.webp`, 103 KB) laadimine võttis **1.46 s**, sest see konkureeris ribalaiusel kõigi teiste piltidega.

Põhjus pole enam disainis ega koodi struktuuris — see on **paralleelsete päringute prioriteet ja arv**:

1. **Hero pilt jagab ribalaiust kõigi 8 use-case pildiga + 3 product-teaser pildiga.** Kõik need on `<img loading="lazy">`, aga brauser kontrollib lazy-loading'ut alles pärast layout'i, ja Index.tsx renderdab kõik tile'id kohe komponendi mountimisel. Mobiilis (390 px) algatab brauser kõik need allalaadimised samaaegselt LCP-pildiga.
2. **`hero/rollo-street.webp` (201 KB)** on use-case "Airports" taustapilt. See on oma 201 KB-ga **suurem kui hero pilt ise** ja konkureerib LCP-ga.
3. **`framer-motion` on `motion-vendor` chunk = ~70 KB gz**, mida kasutatakse Index lehel ainult `FadeInView` jaoks. See on render-blocking JS.
4. **Use-case pildid on 800×600 (50–200 KB)**, aga renderduvad mobiilis ~190×190 px. Liiga suured.
5. **`1rollo_orbital_2.webp` (96 KB)** on imporditud kui ES moodul → laaditakse koos Index chunkiga, kuigi on capabilities sektsioonis (allpool fold'i).

## Lahendus (5 sammu, mõõdetav mõju)

### 1. Lazy-load use-case ja product-teaser pildid päriselt
Asendan tavalise `<img loading="lazy">` lähenemise **`loading="lazy" + fetchpriority="low" + decoding="async"`** kombinatsiooniga ja lisan **`width`/`height`** atribuudid (juba on). Lisaks **lükkan use-case sektsiooni renderdamise edasi** kasutades `IntersectionObserver`-põhist platseeringut (`<Section>` mahuti renderib platseholderid kuni jõuab viewportile lähedale, siis lubab pildid). See vähendab esimese 3 sekundi pildimahtu ~1.4 MB → ~150 KB.

Tehniliselt: lisan `useInView` hooki Index.tsx use-case ja product-teaser sektsioonidele (root margin 400px), mis hoiab `<img src>` tühjana kuni sektsioon läheneb. Hero pilt jääb puutumata (priority=true).

### 2. Eemalda `framer-motion` Index lehelt
`FadeInView` kasutab `framer-motion`'i (~70 KB JS). Asendan selle lihtsa **CSS `IntersectionObserver` põhise fade-in komponendiga** (≤ 1 KB). Sama API (`<FadeInView delay={i*80}>`), seega muutus on transparent. `framer-motion`'i kasutavad veel `BlogPostHeader`, `LiveScanner`, `ScrollControlledVideo`, `SpecsBlueprint` — need jäävad puutumata, aga kuna nad on kõik laisalt laetud (lazy routes), siis Home laadimisel `framer-motion` üldse ei downloadita.

Tulemus: Home initial JS väheneb ~70 KB → 0 KB framer-motion'i osas.

### 3. Genereeri responsive variandid use-case piltidele
Praegu `OptimizedImage`-l on `localVariants` ainult hero-pildil. Genereerin 640w + 960w variandid kõigile use-case piltidele:
- `rollo-futu.jpg` (283 KB → ~50 KB @ 640w)
- `rollo-des.webp` (199 KB → ~40 KB)
- `rollo-tunnel.webp` (147 KB → ~30 KB)
- `rollo-park.webp` (132 KB → ~28 KB)
- `rollo-city.webp` (97 KB → ~22 KB)
- `rollo-milit.webp` (92 KB → ~22 KB)
- `hero/rollo-street.webp` (201 KB → ~40 KB)
- `graph/pilt-1.jpg` (199 KB → ~38 KB)

Use-case pildid migreerin `<img>` → `<OptimizedImage localVariants={[640]}>`, sizes="(max-width: 640px) 50vw, 25vw". Mobiilis tuleb 640w variant.

Eeldatav kokkuhoid: ~1.4 MB → ~250 KB.

### 4. Eemalda konkureeriv `rollo-street.webp` preload teema
Kontrollin index.html'i — hero preload on praegu õige (`1rollo_tll-640.webp` mobiilis). Aga `rollo-street.webp` (use-case Airports) laaditakse samal hetkel kui hero. Pärast sammu 1+3 see konkurents kaob, sest pilt enam ei laadi enne sektsiooni nähtavust ja on 40 KB asemel 201 KB.

### 5. Lükka `1rollo_orbital_2.webp` import edasi
Praegu: `import orbitalCompositeImage from "@/assets/robot/1rollo_orbital_2.webp"` → bundleerib pildi URL-i Index chunki. Vahetan tavalise `/robot/F6/1rollo_orbital_2.webp` viite vastu (sama pilt on juba `public/`-is) ja `<img loading="lazy">`. See vabastab Index chunki esmase parsimise koormusest.

## Mida EI muudeta

- Disain, layout, animatsioonid (FadeInView käitub identselt).
- Vite chunk splitting (juba hea — `react-vendor`, `ui-vendor`, `motion-vendor`, `icons-vendor`, `query-vendor` eraldi).
- Background gradiendid `index.css`-is (mobiilil juba `background-attachment: scroll`).
- Hero pilt ja preload (juba optimeeritud).

## Tehniline teostus

1. Asenda `src/components/FadeInView.tsx` framer-motion'i versioon CSS+IntersectionObserver põhise vastu (sama API).
2. Index.tsx: muuda use-case `<img>` → `<OptimizedImage localVariants={[640]} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw">`. Lisa `IntersectionObserver`-põhine "lazy section" wrapper, mis hoiab use-case pildid renderdamata kuni sektsioon on 400px viewport'ist all.
3. Index.tsx: vaheta `import orbitalCompositeImage from "@/assets/..."` → string `"/robot/F6/1rollo_orbital_2.webp"`.
4. Index.tsx: product-teaser tile'id → samasugune lazy-section.
5. Genereeri 640w variandid 8 use-case pildi jaoks `scripts/convert-to-webp.mjs` skriptiga.

## Oodatav tulemus

| Mõõdik | Enne | Pärast |
|---|---|---|
| Esimese 3s pildimaht (mobiilis) | ~1.9 MB | ~250 KB |
| Home initial JS (framer-motion eemaldamine) | ~220 KB | ~150 KB |
| LCP (kuna ei konkureeri 15 muu pildiga) | 4.0 s | ~2.0 s |
| FCP | 3.5 s | ~1.8 s |
| Lighthouse mobile score | 76 | 90+ |

Visuaalselt midagi ei muutu — kasutaja näeb sama lehte, aga see ilmub kaks korda kiiremini.
