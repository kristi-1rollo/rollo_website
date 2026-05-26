# Mobile Hero — Sticky Image with Scroll-Reveal

Sama lähenemine, mis töötab Product-lehe spec-sektsioonis: hero pilt jääb taustal "sticky" asendisse, sisu (logo, pealkiri, kirjeldus) ja tume filter kerivad eest ära, nii et lehe alumises osas paistab puhas, filtrita pilt välja enne, kui järgmine sektsioon (Problems) tuleb peale.

**Ainult mobiilis** (`md:` breakpoint allpool). Desktop hero jääb täpselt samaks nagu praegu.

## Mida muudame

Fail: `src/pages/Index.tsx`, HERO-sektsioon (read ~140–177).

1. **Mobiilis** muudame hero-sektsiooni kõrgemaks (nt `min-h-[160svh]`), et tekiks scrolliruum sticky efekti jaoks. Desktopil jääb `min-h-[100svh]`.

2. **Pildi konteiner** (img + glow) saab mobiilis `sticky top-0 h-[100svh]` — pilt püsib ekraanil terve hero-sektsiooni ulatuses.

3. **Tume overlay + radiaalsed gradient'id** lähevad samasse sticky konteinerisse, AGA saavad mobiilis scroll-linked opacity-animatsiooni (Framer Motion `useScroll` + `useTransform`), nii et kui kasutaja kerib alla, overlay tuhmub nullini → puhas pilt paistab läbi.

4. **Tekstiblokk** (`PublicContentRail`) jääb tavalisse voogu (mitte sticky), nii et kerides liigub see pildi pealt ära ülespoole. Tekst saab oma `relative z-20`, et olla esialgu ülal pildi peal.

5. **Järgmine sektsioon (Problems)** jääb täpselt nagu praegu — ta tuleb hero alt välja ja katab sticky pildi kinni.

## Tehnilised detailid

- Lisame `framer-motion`-i `useScroll` + `useTransform` HERO-sektsiooni omaks (target: hero `ref`).
- `overlayOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 0.4, 0])` — overlay fade.
- Tekstil võiks olla väike `opacity` ja `y` transform, et kerides sujuvalt välja kaduda (`[0, 0.5] → opacity [1, 0]`, `y [0, -40]`).
- Kõik animatsioonid wrappitakse `md:` media-check'iga: kasutame `useMediaQuery`-laadset lähenemist või lihtsalt rakendame transformid alati, kuna desktop hero kõrgus on `100svh` ja sticky ei oma scroll-rangega efekti — aga turvalisem on Framer transformid renderdada conditionally läbi `hidden md:block` / `md:hidden` duplikaatide.

## ASCII

```text
[hero section, 160svh on mobile]
┌─────────────────────────┐ ◄── scroll 0%
│  IMG (sticky)           │
│  + dark overlay (1.0)   │
│  ─ logo                 │
│  ─ HEADLINE             │
│  ─ subtitle             │
└─────────────────────────┘
        ↓ scroll
┌─────────────────────────┐ ◄── scroll 60%
│  IMG (still sticky)     │
│  + overlay (0.4)        │
│  (text scrolled away)   │
└─────────────────────────┘
        ↓ scroll
┌─────────────────────────┐ ◄── scroll 100%
│  IMG (clean, no filter) │
└─────────────────────────┘
[Problems section starts]
```

## Mida EI muuda

- Desktop hero-välimus
- Problems / Solution / muud sektsioonid
- SpecsBlueprint (Product-leht)
