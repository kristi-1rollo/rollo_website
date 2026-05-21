## Probleem
Mobiilis algab sektsiooni pealkirja/teksti rida ekraani servast 16 px kaugusel (rail `px-4`), aga kaartide sisene tekst on 16 + 20 = 36 px kaugusel (kaardil endal `p-5`). Seega välis- ja sisekonteineri tekst ei ole samal joonel.

Soov: kogu lehel (mitte ainult Solution sektsioonis) algagu mobiilis igasugune tekst — kaardis või väljaspool kaarti — täpselt samalt vasakult joonelt; sama parempoolne joon.

## Lahendus
Ühtlustame paddingu nii, et **tekstijoon mobiilis on alati 20 px ekraani servadest**, hoolimata sellest, kas tekst on rail-konteineris või kaardis. Selleks:

1. **Tõstame globaalse mobiilipaddingu** `px-4` → `px-5` failis `src/components/ui/section.tsx` (`PUBLIC_SECTION_GUTTER`). See mõjutab kõiki avalikke sektsioone (Index, Product, About, Contact, Blog, EU Funding jne) ühe muudatusega. Tahvel- ja desktop-paddingud (`sm:px-6 lg:px-8 …`) jäävad samaks.

2. **Kaardid lähevad mobiilis full-bleed**, et nende serv puudutaks rail-paddingu välimist joont, ja kaardi sisene `p-5` annab teksti täpselt samasse 20 px joonele.
   - Lisame kaartidele klassi `-mx-5 md:mx-0`, et tühistada raili padding ainult mobiilis.
   - Mõjutatud kohad (~8 kaarti, peamiselt `src/pages/Index.tsx`): Solution kaardid (Extreme-Env, Gyroscopic Innovation, jne), Capabilities kaardid ja muud `blue-card-glow` / `glass` plokid, mis kasutavad `p-5`/`p-6`.
   - Kui kaart on grid'is (`grid grid-cols-1 md:grid-cols-…`), tuleb `-mx-5` panna kaardi enda diivile, mitte grid-konteinerile.

3. **Kaartide sisene padding** jääb `p-5` (20 px) — see hoiab kaardi sees teksti samal 20 px joonel kui väline rail-tekst.

## Tulemus
- Mobiil: kõik pealkirjad, lõigud ja kaartide tekstid algavad vasakult 20 px ja lõpevad paremalt 20 px joonelt.
- Tahvel/desktop: muutmata (`md:mx-0` taastab kaartide normaalse paigutuse, rail-padding samuti).
- Elementide järjekord, vasak/center joondus ja sisuline struktuur jäävad puutumata — muutub ainult padding.

## Tehnilised detailid
- Fail 1: `src/components/ui/section.tsx`
  - `PUBLIC_SECTION_GUTTER = "px-5 sm:px-6 lg:px-8 xl:px-10 2xl:px-12"`
- Fail 2: `src/pages/Index.tsx` (ja vajadusel `Product.tsx`, `AboutUs.tsx`, `Contact.tsx`, `Blog.tsx`, `EuFunding.tsx`)
  - Kõikidele `p-5`/`p-6` kaartidele lisada `-mx-5 md:mx-0`.
- Audit: jooksen pärast muudatust `rg` üle, et leida kaarte, mis võisid kahe silma vahele jääda, ja kontrollin mobiilivaates brauseris (390×844), et tekstijoon klapib igal sektsioonil.

## Mida ma ei tee
- Ei muuda värve, fonte, ikoonide paigutust, kaartide siseseid joondusi ega gridi struktuuri.
- Desktop-paddingule (md ja suuremad) ei puutu.
