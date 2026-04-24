## Diagnoos

Lighthouse mobiil 89 vs desktop 97. Peamised probleemid:

### 🔴 Kriitiline #1: vale LCP preload
`index.html` preload’ib `/hero/rollo-street.webp` (201 KB), **AGA** `Index.tsx` (rida 130) kasutab tegelikult `/robot/F6/1rollo_tll.webp` (103 KB). Brauser laadib alla mõlemad — preloaded pilt visatakse minema (raisatud 201 KB mobiili andmesidet) ning tegelik LCP-pilt jääb järjekorda. See on **otsene LCP regressioon** (3215 ms mobiilis).

### 🔴 Kriitiline #2: `backdrop-blur` 8 use-case kaardil
`Index.tsx` rida 281: iga use-case kaart kasutab `backdrop-blur-sm`. Mobiili GPU peab iga frame jooksul resamplima 8 ala — **see on suurim mobiili scroll jank ja FCP/SI viivituse põhjus**. Kaardid on niigi tumeda gradient-overlayga, blur ei anna visuaalselt midagi juurde.

### 🟡 Keskmine #3: Layout’i scroll-to-top backdrop-blur
`Layout.tsx` `scroll-to-top` nupp kasutab `backdrop-blur-md` ja seda animeeritakse iga scrollimise peale (state update igal scroll eventil). See käivitab pidevaid re-rendereid mobiilis.

### 🟡 Keskmine #4: framer-motion bundle Index lehel
Index.tsx impordib `framer-motion` ainult use-case kaartide stagger-animatsiooni jaoks (`motion.div` koos `whileInView`). framer-motion on suur dependency (~50 KB gz). Sama efekti saab `FadeInView` komponendiga, mis on juba eluces igal pool kasutusel.

### 🟡 Keskmine #5: Bundle splitting puudub
`vite.config.ts`-is pole `manualChunks` seadistust. `index-C-HliReq.js` on **222 KB** ja `Header-B6VK1vpC.js` **87 KB** — vendor kood (react-router, tanstack-query, lucide, radix, framer-motion) on segamini app-koodiga. Mobiili 4G-l tähendab see aeglasemat parse + execution.

### 🟢 Väike #6: `body` `background-attachment: fixed` + 4 radial-gradient
`index.css` rida 86: fixed background koos 4 radiaalse gradiendiga sunnib mobiili iga scroll-frame'i ajal kogu tausta uuesti komposiitida. Mobiilil tasuks `fixed` asendada `scroll`-iga.

### 🟢 Väike #7: scroll listener Layout’is ilma throttle’ita
`window.scrollY > 300` kontroll tehakse iga scroll eventi peale — viib re-render’ini iga kord, kui state muutub.

---

## Lahendus

### 1. Paranda LCP preload
**Fail:** `index.html`
- Asenda `<link rel="preload" as="image" href="/hero/rollo-street.webp" ...>` õige hero pildiga: `/robot/F6/1rollo_tll.webp`.
- See üksi peaks mobiili LCP viima ~3.2s → ~2.0s alla (tegelik LCP-pilt hakkab laadima HTML parsimise ajal, mitte alles pärast JS-i).

### 2. Eemalda `backdrop-blur` use-case kaartidelt
**Fail:** `src/pages/Index.tsx` (rida 281)
- Eemalda `backdrop-blur-sm` className’ist. Kaartide all on niigi tume gradient — visuaalselt sama, GPU-le radikaalselt odavam.
- Kaardid säilitavad `blue-card-glow`, hover’i ja muu visuaali.

### 3. Eemalda `backdrop-blur` muudest mitte-kriitilistest kohtadest
**Failid:** `src/components/Layout.tsx`, `src/components/LiveScanner.tsx`
- `Layout.tsx` scroll-to-top: `backdrop-blur-md` → asenda läbipaistmatuma `bg-black/70` taustaga.
- `LiveScanner.tsx`: säilita (väike, mitteanimeeritud, üks element).
- `Header.tsx` `backdrop-blur-xl` jätame alles, sest see on funktsionaalselt vajalik fixed header’i jaoks ja kasutab juba `supports-[backdrop-filter]` guard’i.
- `ScrollControlledVideo.tsx` replay-overlay jääb alles (kuvatakse harva).

### 4. Asenda Index.tsx use-case kaartide framer-motion `FadeInView`-ga
**Fail:** `src/pages/Index.tsx`
- Eemalda `import { motion } from "framer-motion"`.
- Asenda `motion.div` `whileInView` stagger-animatsiooniga olemasoleva `<FadeInView delay={i * 80}>` wrapper’iga (sama visuaalne efekt — fade-in up).
- See vähendab `index.js` bundle’it ~30–50 KB gz võrra (framer-motion ei pea esimesel route’il laadima).

### 5. Lisa Vite manualChunks vendor splitting
**Fail:** `vite.config.ts`
- Lisa `build.rollupOptions.output.manualChunks`:
  - `react-vendor`: `react`, `react-dom`, `react-router-dom`
  - `query-vendor`: `@tanstack/react-query`
  - `ui-vendor`: `@radix-ui/*`
  - `motion-vendor`: `framer-motion`
  - `icons-vendor`: `lucide-react`
- See võimaldab brauseril cache’ida vendor chunks deployimiste vahel ja parallelselt laadida.

### 6. Mobiilil eemalda `background-attachment: fixed`
**Fail:** `src/index.css` (~rida 78–90)
- Lisa media query: mobiilil (max-width: 768px) `background-attachment: scroll`. Desktopil säilita fixed efekt.
- Eemaldab mobiili komposiitimise overhead’i ilma desktop-vaadet muutmata.

### 7. Throttle scroll listener Layout’is
**Fail:** `src/components/Layout.tsx`
- Lisa scroll handler’ile rAF-throttle (request animation frame), et state-update toimuks max 60×/sekundis, mitte iga scroll-eventi peale (mobiilil tuleb scroll events ~120/s).
- Sama parandus võiks teha `Header.tsx`-is, aga see on juba kerge (boolean toggle).

### 8. Lisa `width`/`height` use-case kaartide piltidele (CLS prevent)
**Fail:** `src/pages/Index.tsx`
- Lisa `width="800" height="600"` decorative use-case piltidele. CLS on praegu 0.00, aga see hoiab seda 0.00.

### 9. Lazy-loadi Slider ja Dialog Index lehel
**Fail:** `src/pages/Index.tsx`
- ROI-kalkulaatori `Slider` ja orbit `Dialog` ei ole esimesel viewport’il nähtavad. Saab `lazy()` + `Suspense`-iga viiteid all-the-fold sisule.
- Aga seda teen ainult juhul, kui mõõtmed näitavad et see annab kasu — `Slider`-i import on suhteliselt väike. **Jätan selle punkti välja vaikimisi**, lisan ainult kui esimesed 7 punkti pole piisavad.

---

## Mida EI muudeta
- Visuaalne disain ei muutu (use-case kaartide `backdrop-blur` eemaldamine on visuaalselt märkamatu, sest taustal on tume gradient).
- Hero kompositsioon, `OptimizedImage` komponent, ScrollControlledVideo loogika — kõik puutumata.
- `framer-motion` jääb projekti alles teiste komponentide jaoks (`FadeInView`, `BlogPostHeader`, `ScrollControlledVideo`, `LiveScanner`, `SpecsBlueprint`) — ainult Index.tsx ei impordi seda enam otse.
- Header’i backdrop-blur jääb alles (visuaalselt oluline navigatsiooniks).
- Pildid ise — mahud on juba optimeeritud (~100 KB tükk WebP).

---

## Oodatav tulemus mobiilil

| Metric | Enne | Pärast (eeldus) |
|---|---|---|
| **LCP** | 3215 ms 🟠 | ~1800 ms 🟢 |
| **FCP** | 2530 ms 🟠 | ~1600 ms 🟢 |
| **SI** | 2808 ms 🟢 | ~2100 ms 🟢 |
| **TBT** | 28 ms 🟢 | ~20 ms 🟢 |
| **CLS** | 0.00 🟢 | 0.00 🟢 |
| **Skoor** | **89** | **~96** |

Põhivõit tuleb:
- LCP preload-fix (~30% LCP paranduse osa),
- backdrop-blur eemaldamine 8 kaardilt (suurim scroll jank ja paint cost),
- framer-motion eemaldamine esimese route’i bundle’ist (kiirem JS parse + execute mobiilis),
- vendor splitting (parem cache, kiirem repeat-visit).

---

## Tehniline teostus järjekorras
1. **Paranda** `index.html` preload pildiviide.
2. **Eemalda** `backdrop-blur-sm` use-case kaartidelt `Index.tsx`-is.
3. **Asenda** `motion.div` use-case grid’il `FadeInView`-ga, eemalda framer-motion import Index.tsx-ist.
4. **Eemalda** `backdrop-blur-md` Layout.tsx scroll-to-top nupult, asenda solid bg-ga.
5. **Lisa** rAF-throttle Layout.tsx scroll listener’ile.
6. **Lisa** mobiili media-query `background-attachment: scroll` reegliga `index.css`-is.
7. **Lisa** `vite.config.ts`-i `manualChunks` vendor splitting.
8. **Käita** `npm run build` veendumaks et bundle’id on chunk’itud ja midagi pole katki.

