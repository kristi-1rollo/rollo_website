
# Mobiilivaate ühtlustamise teostusplaan

## Eesmärk
Viia avaliku veebilehe mobiilivaade ühtse süsteemi peale nii, et:
- horizontal overflow kaob,
- tekst ja meedia on loetavad ning stabiilsed,
- hero-sektsioonid ei kasuta mobiilis desktop-first paigutusi,
- container, alignment, radius ja spacing järgivad ühtset reeglistikku.

## 1. Home: orbiti/capabilities sektsiooni mobiilne ümberdisain
**Fail:** `src/pages/Index.tsx`

Rakendan sellele sektsioonile kahe olekuga lahenduse:
- **desktop/tablet:** jätab alles visuaalse orbiti loogika
- **mobile:** asendab negatiivsete offsetitega absoluutsed sildid turvalise stackitud layout’iga

### Muudatused
- Eemaldan mobiilis:
  - `left: '-2%'`, `left: '-6%'`, `right: '-2%'`, `right: '-6%'`
  - mikrotekstid `text-[7px]`, `text-[9px]`
- Teen mobiilile eraldi struktuuri:
  - robotipilt oma konteineris
  - capability itemid all või ümber grid/list kujul
  - inner annotations (“two-way audio and sensors”, “360° cameras”) eraldi väikeste infobadge’idena
- Ühtlustan sektsiooni joondamise:
  - mobiilis `text-left`
  - eemaldan `text-center sm:text-left` tüüpi segamustri selles plokis
- Vähendan mobiilset vertikaalset spacingut:
  - `py-24 md:py-40` asemel mobiilis kompaktsem sektsioon

### Tulemus
- overflow-risk kaob
- capability info muutub loetavaks
- orbiti esteetika jääb desktopis alles, mobiilis muutub robustseks

---

## 2. Contact: hero kompositsiooni mobiiline versioon
**Fail:** `src/pages/Contact.tsx`

Teen contact hero’le mobiilse paigutuse, kus video ei ole enam “desktop crop” loogikaga teksti kõrval.

### Muudatused
- Asendan mobiilis `absolute left-[30%] ... right-0` paigutuse responsive loogikaga:
  - **mobile:** video kas
    - täislaiuses eraldi plokina teksti all/taustal, või
    - nõrgema overlay’ga taustana ilma agressiivse külgnihketa
  - **desktop:** võib jääda kahekihiline kompositsioon
- Viin hero content wrapperi sama container-reegli peale nagu mujal:
  - `px-4 sm:px-6 lg:px-8`
- Ühtlustan info- ja formikaartide mobiiltiheduse:
  - `rounded-2xl` ja `p-8` asemel kompaktsem süsteem
- Vormi väljade ja CTA nuppude spacingu jätan funktsionaalselt samaks, kuid viin visuaalselt tokenitega kooskõlla

### Tulemus
- hero ei tundu mobiilis “poolikult desktop”
- tekst ja video ei konkureeri
- contact page sobitub paremini ülejäänud avaliku saidiga

---

## 3. Career: fixed hero lihtsustamine ja kaartide tihendamine
**Fail:** `src/pages/Career.tsx`

Karjäärilehel teen mobiilis robustsema hero flow, et vältida `fixed + pt-[100vh]` haprust.

### Muudatused
- Teen hero sektsioonile responsive käitumise:
  - **mobile:** eemaldan või leevendan fixed-hero mustri
  - **desktop:** võib jääda cinematic overlay-scroll efekt
- Kui fixed-lahendus jääb alles desktopi jaoks, teen mobiilis tavapärase voolava hero-sektsiooni
- Vähendan kaartide tihedust:
  - `p-8` -> mobiilis `p-5` või `p-6`
  - ikooni ja pealkirja ridade spacing kompaktsemaks
- Open Positions listi nupud viin sama radius/spacing süsteemi peale
- Hero wrapperi külgmised paddingud viin ühisele standardile

### Tulemus
- väikestel ekraanidel väheneb layout glitch’i risk
- karjäärileht tundub kergem ja vähem “raske”
- hero ja sisu vahel tekib loomulikum rütm

---

## 4. Blog + BlogPost: loetavuse ja hierarhia parandamine
**Failid:**  
- `src/pages/Blog.tsx`
- `src/pages/BlogPost.tsx`
- `src/components/BlogPostHeader.tsx`

### Blog list
- Mobiilis ühtlustan hero ja kaardisisu joondamise:
  - vaikimisi `text-left`
- Vähendan meta-info dominantsi:
  - kuupäeva mono-stiil jääb alles, kuid visuaalne kaal langetatakse
- Kaartide sisu spacing teen läbivaks:
  - pildi, meta, pealkirja, excerpti ja CTA vahed standardseks

### BlogPost
- Eemaldan mobiilis body-textilt `text-justify`
- Jätan pealkirjad vasakjoondusse
- Kontrollin H2/H3 vahede mobiilset mõõtu:
  - suur “editorial” rütm jääb, kuid kitsal ekraanil muutub kompaktsemaks
- Meta riba (`publishedDate`, read time) teen väiksema visuaalse rõhuga
- Blog header pildi kuvasuhte teen mobiilis vähem “ultrawide”-ks, kui vaja:
  - praegune `aspect-[21/9]` võib väiksel ekraanil olla liiga madal
  - mobiilis sobivam `aspect-video` või muu kõrgem variant

### Tulemus
- blogiartiklid on mobiilis märksa paremini loetavad
- meta ei võistle pealkirjaga
- hero-pilt ja artikli algus tunduvad tasakaalus

---

## 5. Shared layout system: üks container + alignment standard
**Failid:**  
- `src/components/ui/section.tsx`
- `src/pages/Index.tsx`
- `src/pages/Contact.tsx`
- `src/pages/Career.tsx`
- `src/pages/Blog.tsx`
- vajadusel `src/components/BlogPostHeader.tsx`
- vajadusel `src/index.css`

### Muudatused
- Kehtestan avalike lehtede põhistandardi:
  - `max-w-6xl mx-auto px-4 sm:px-6 lg:px-8`
- Vähendan käsitsi kirjutatud alternatiive:
  - näiteks `px-6 lg:px-8`
  - ning `container-premium`, kui sama ploki jaoks piisab Section-loogikast
- Kehtestan mobiilis vaikimisi:
  - `text-left`
- Center joondus jääb ainult teadlikele eranditele, mitte vaikemustriks

### Tulemus
- lehtede alguspunktid joonduvad visuaalselt ühele teljele
- avalik UI ei tundu enam eri süsteemide segu

---

## 6. Shared design tokens: radius, spacing, cards
**Failid:**  
- `src/index.css`
- mõjutatud public page failid ülal

### Kehtestatav reeglistik
#### Container
- `px-4 sm:px-6 lg:px-8`
- `max-w-6xl`

#### Alignment
- mobile default: `text-left`

#### Section spacing
- mobile default: `py-12`
- larger feature sections: `md:py-16` või `md:py-20`
- vältida mobiilis `py-24+` kui pole mõjuvat põhjust

#### Card system
- default mobile card padding: `p-5`
- prominent cards/forms: `p-6`
- vältida `p-8` mobiili defaultina

#### Radius
Projektimälu järgi hoian public UI teravama joone peal:
- eelistatud: `rounded-[4px]`
- kui kõikjale korraga viimine oleks liiga agressiivne, siis teen vähemalt esimese passi:
  - avalikel lehtedel lõpetan `rounded-lg / rounded-xl / rounded-2xl` segakasutuse samatüübilistel plokkidel

#### Typography
- H1: `text-3xl`
- H2: `text-2xl`
- H3: `text-lg`
- body: `text-base`
- secondary/meta: `text-sm` või `text-xs`
- ei kasuta sisutekstil alla 12px suurusi

#### Media
- mobiilis ei kasuta negatiivsete offsetitega overlay-silte
- pilt/video peab jääma konteineri sisse
- hero-meedial peab olema eraldi mobiilne kompositsioon, kui desktop kasutab keerukat layout’i

---

## Teostuse järjekord
1. `src/pages/Index.tsx` — orbit/capabilities overflow ja mobiilloetavus
2. `src/pages/Contact.tsx` — hero video/text kompositsiooni stabiliseerimine
3. `src/pages/Career.tsx` — fixed hero mobiilflow + kaartide tihendamine
4. `src/pages/Blog.tsx` + `src/pages/BlogPost.tsx` + `src/components/BlogPostHeader.tsx` — loetavus ja hierarhia
5. `src/components/ui/section.tsx` + seotud public page wrapperid — container/alignment pass
6. `src/index.css` + mõjutatud kaardid/sektsioonid — radius/spacing/card token pass

## Tehnilised märkused
- Muudatused jäävad front-end tasemele; backendit ega andmeskeemi ei ole vaja muuta.
- Hoian olemasoleva deep-tech visuaalse suuna alles: must taust, lime accent, uppercase premium typography.
- Desktop-layout ei kao; teen vajadusel eraldi mobile-only ja desktop-only struktuurid kohtades, kus üksainus markup oleks liiga habras.

## Oodatav tulemus
Pärast teostust:
- mobiilis puudub kriitiline horizontal overflow,
- hero-sektsioonid on stabiilsed ja loetavad,
- blogiartiklid on paremini tarbitavad,
- avalik veeb kasutab ühtset container-, spacing-, alignment- ja card-süsteemi,
- kogu sait näeb mobiilis professionaalsem ja ühtlasem välja.
