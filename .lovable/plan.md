## Mobile-first kujunduse analüüs

Kontrollisin kõik avalikud lehed (`Index`, `Product`, `AboutUs`, `Blog`, `BlogPost`, `Contact`, `CareerNew`, `EuFunding`) ning võrdlesin kolme telge: **horisontaalne padding (gutter)**, **maksimaalne laius (content rail)** ja **vertikaalne rütm (`py`/sektsiooni kõrgus)**. Mobiilis pildistasin Indexi `/` 390 px peal — sealt joonistub välja pildi peamine sümptom (vt allpool).

---

### 1. Kriitiline probleem mobiilis: `h-[100vh]` sektsioonid

`Index.tsx` ja `Contact.tsx` mässivad **iga** sisuploki `<section class="… h-[100vh]">` sisse. Tulemus mobiilis:

- Hero (õigesti `100vh`) — OK.
- Capabilities, Market Opportunity, ROI Calculator jne — kõik samuti `100vh`, aga sisu mahub umbes 50–70 % kõrgusesse → ekraanil tekib **mustad tühjad alad** iga sektsiooni all (täpselt seda näeb screenshot'il, kus 1Rollo logo all on lehekülgi tühja pinda enne footerit).
- Lisaks `100vh` lülitub iOS Safaris hüplevalt (URL-riba), mistõttu sisu hüpleb.

**Lahendus**: ainult hero kasutab `min-h-[100svh]`; muud sektsioonid `py-16 md:py-24 lg:py-32` ilma fikseeritud kõrguseta.

---

### 2. Kolm erinevat gutter-süsteemi paralleelselt

| Süsteem | Asukoht | Mobiil | sm | md | lg | xl/2xl |
|---|---|---|---|---|---|---|
| **A — `PUBLIC_SECTION_GUTTER`** (Section komponent) | AboutUs, Product, Index osa | `px-4` | `px-6` | `px-6` | `px-20` | `px-20` |
| **B — laia rail** (Index hero/sektsioonid, Product hero, Blog, Contact, CareerNew, EuFunding) | enamus heroid | `px-4` | `px-6` | `px-6` | `px-8` | `px-10 / px-12` |
| **C — AboutUs hero** üksiku reegliga | AboutUs hero | `px-6` | `px-6` | `px-6` | `px-20` | `px-20` |

→ Vasakserv hüppab kasutaja jaoks lehelt-lehele edasi-tagasi (lg ekraanil eriti — 32 px vs 80 px erinevus). Lisaks max-width on samuti tüvitud: `max-w-6xl lg:max-w-[1440px]` (A) vs `max-w-6xl lg:max-w-[1320px] xl:max-w-[1440px] 2xl:max-w-[1520px]` (B) vs `max-w-5xl … 2xl:max-w-[1520px]` (EuFunding) vs `max-w-7xl … 2xl:max-w-[1520px]` (CareerNew).

**Lahendus**: ühtne `PUBLIC_CONTENT_RAIL` (Section komponent) → kõik lehed kasutavad sama gutter + max-width skaalat. Soovitan: `px-4 sm:px-6 lg:px-8 xl:px-12` + `max-w-6xl lg:max-w-[1320px] xl:max-w-[1440px] 2xl:max-w-[1520px]` (st süsteem B muutub kanooniliseks, sest 80 px vasakserv `lg`-l on liiga laitja muutused 1024–1280 px ekraanil).

---

### 3. Topelt-padding mobiilis (anti-pattern)

Korduvalt esineb:

```tsx
<Section className="...">              {/* juba px-4 */}
  <div className="... px-3 md:px-0">   {/* lisab veel 12 px */}
```

Asukohad: `Index.tsx:188, 282`, `AboutUs.tsx:120, 163`, `Product.tsx:103, 122`, `Blog.tsx:24`. Mobiilis on sisu nihutatud **28 px** servast, mitte 16 px → ekraan tundub kitsam ja tekst ei joondu kaartide vasaku servaga (kaardid kasutavad ainult `Section` padding'ut).

**Lahendus**: eemaldada `px-3 md:px-0` wrapperid.

---

### 4. Vertikaalse rütmi ebaühtlus

Sektsioonide vahed varieeruvad metoodikata:

| Leht | Hero | Esimene blokk | Järgmised | Viimane (CTA/sõlme) |
|---|---|---|---|---|
| Index | `py-24` (sees 100vh) | `py-24` | `py-32 md:py-40`, `py-24` | – |
| Product | `py-24` (100vh) | `pt-20 md:pt-36 pb-20 md:pb-44` | sama | `mt-20 md:mt-[120px] mb-20 md:mb-44` |
| AboutUs | `py-24` | `py-16 md:py-24` | `py-16 md:py-20` | – |
| Blog | `py-12 md:py-20` | `py-8 md:py-12` | – | – |
| Contact | hero `100vh py-24` | `py-16 md:py-24` | – | – |
| CareerNew | hero `min-h-[100svh]` | `py-12 sm:py-16 md:py-20 lg:py-32` | sama | sama |
| EuFunding | – | `py-16 md:py-24` | – | – |

→ Sama tüüpi sektsioonid (nt "kaartide grid pealkirjaga") on ühel lehel `py-16`, teisel `py-32 md:py-40`. Mobiilis tähendab see, et üks leht hingab, teine on tihe.

**Lahendus**: ühtne 4-astmeline skaala:
- `SECTION_SPACING_TIGHT` = `py-12 md:py-16`
- `SECTION_SPACING_DEFAULT` = `py-16 md:py-24 lg:py-32`
- `SECTION_SPACING_HERO` = `py-20 md:py-32 lg:py-40`
- `HERO_HEIGHT` = `min-h-[100svh] flex items-center`

Lisada `section.tsx`-i konstantidena ja kasutada igal pool.

---

### 5. Joondused

Heroid kasutavad mobiilis kõik `text-center`, desktop'is `md:text-left` — see osa on järjekindel. AGA `SectionIntro` puhul on segadus: AboutUs heros `<div className="mx-auto flex max-w-5xl flex-col items-center text-center md:mx-0 md:items-start md:text-left">` vs CareerNew heros sama loogika aga `max-w-7xl`. Olemasolev `SectionIntro centered` prop juba teeb selle ära — kasutada seda kõikjal.

Index hero on ainus, kus logo + pealkiri on **mobiilis vasakule joondatud** (`SectionIntro centered ... md:items-start`) — see on tegelikult centered intro, aga päises (header) on logo vasakul. Soovitan: hero pealkiri jääb mobiilis tsentrisse (matš Producti ja AboutUs heroidega), siis on järjekindlus täielik.

---

### 6. Pildi sümptom (screenshot)

Indexi mobiil-screenshot näitab: pärast esimest hero ekraani tuleb **~3 ekraani jagu mustja pinda** enne footerit, kuigi koodis on seal 3 sisukat sektsiooni. Põhjus = punkt #1 (`h-[100vh]` × 3) kombineerituna sellega, et taustapildid on `md:` breakpointi peal positioneeritud, mobiilis aga ekraani äärtes peaaegu nähtamatud. Punkti #1 parandus selle ära lahendab.

---

## Plaan tegevuseks (kui kinnitad)

1. `src/components/ui/section.tsx` — lisada `SECTION_*` spacing konstandid + uuendada `PUBLIC_SECTION_GUTTER` ja `PUBLIC_CONTENT_RAIL` ühtsele süsteemile (B).
2. `src/pages/Index.tsx` — eemaldada `h-[100vh]` mitte-hero sektsioonidelt, asendada `SECTION_SPACING_DEFAULT`-ga, eemaldada topelt-padding `px-3 md:px-0` wrapperid.
3. `src/pages/Product.tsx` — sama: ühtlustada `py-*` ja kasutada `Section` komponenti `<section>` asemel.
4. `src/pages/AboutUs.tsx` — eemaldada topelt-padding, ühtlustada `py`.
5. `src/pages/Blog.tsx`, `Contact.tsx`, `CareerNew.tsx`, `EuFunding.tsx`, `BlogPost.tsx` — viia kõik custom railid `Section` / `PublicContentRail` peale.
6. Kontrollida brauserist 390/768/1280 px peal Index, Product, AboutUs, CareerNew.

**Risk**: muudatusi on palju (≈ 7 faili), aga kõik on puhas presentation-layer (padding/max-width klassid). Funktsionaalsus ei muutu.

Kui sobib, alustan punktist 1.
