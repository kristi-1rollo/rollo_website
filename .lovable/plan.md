
## Eesmärk
Ühtlustada public page sektsioonide horisontaalne joondus nii, et:
- kõik section tag’id, pealkirjad, kirjeldused ja kaardigridid algaksid visuaalselt samalt x-teljelt,
- “sisemise konteineri” padding määraks ka väliste tekstiplokkide joone,
- Home lehel kaoks tunnetus, et üks sektsioon algab kitsamalt või laiemalt kui järgmine.

## Mida parandada
Praegu on `Index.tsx`-is korraga kasutusel mitu erinevat wrapperi mustrit:
- mõned plokid kasutavad `Section` komponenti (`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8`),
- capabilities/orbit sektsioon kasutab käsitsi `section + inner div` kombinatsiooni,
- business-case sektsioonis on lisaks oma “inner padding wrapper”, mis võib tekitada teise visuaalse telje.

See tähendab, et tekstid on tehniliselt erinevates konteinerites isegi siis, kui need peaksid visuaalselt olema ühel joonel.

## Lahendus
Rakendan ühe joondusreegli Home sektsioonidele ja vajadusel samale mustrile teistele public lehtedele:

### 1. Üks põhitelg sisutekstidele
Kasutan sama container-width + horizontal padding reeglit kõikide tekstiplokkide jaoks:
- `Section` komponendi telg jääb baasiks,
- kui sektsioon vajab full-bleed tausta või eraldi meediat, siis ainult taust ulatub laiemaks,
- aga tekstiline content wrapper jääb alati sama sisemise joone peale.

### 2. Capabilities/orbit sektsiooni korrastus
`src/pages/Index.tsx`
- jätan orbit-pildi eraldi meediaobjektiks,
- toon section tag’i ja pealkirja sama sisemise konteineri alla nagu järgmised sektsioonid,
- kontrollin, et pealkirja max-width ei nihutaks algusjoont,
- pildi wrapper võib jääda keskele objektina, aga selle kohal olev tekst peab algama sama paddinguga nagu Product / Use Cases.

### 3. Use Cases sektsiooni joondus
`src/pages/Index.tsx`
- jätan sektsiooni intro ja gridi ühe ja sama `Section` telje sisse,
- väldin olukorda, kus intro on ühes konteineris ja grid teises,
- vajadusel panen introle ja gridile ühise wrapperi, et “USE CASES”, pealkiri ja kirjeldus oleksid täpselt samal x-joonel nagu ülemise sektsiooni tekst.

### 4. Business Case sektsiooni joondus
`src/pages/Index.tsx`
- säilitan full-width background kompositsiooni,
- kuid eraldan tausta-paddingu ja sisuteksti-paddingu loogika,
- väline dekoratiivne inset-wrapper ei tohi määrata teksti joondust,
- sisutekst (tag, heading, body, stats) seotakse sama `max-w-6xl mx-auto px-4 sm:px-6 lg:px-8` teljega nagu teistes sektsioonides.

### 5. Shared wrapper consistency pass
`src/components/ui/section.tsx` või kasutusmuster
- kui vaja, lisan kerge kasutusreegli või abiklassi stiilis:
  - “section background wrapper”
  - “section content wrapper”
- eesmärk on, et full-bleed taustad ja glow’d ei muudaks enam content alignment’i.

## Tehniline teostus
Muudan peamiselt:
- `src/pages/Index.tsx`
- vajadusel väikese ühtlustusena `src/components/ui/section.tsx`

Rakenduse loogika:
- background/decor layers võivad jääda väljapoole,
- content peab alati tulema ühe standardse sisemise wrapperi kaudu,
- eemaldan kohad, kus sektsioon kasutab omaenda horisontaalset inset-loogikat tekstile.

## Mida ei muuda
- deep-tech visuaal, glow’d, pildid ja kompositsioonid jäävad alles,
- orbit pildi mobile enlarge funktsioon jääb alles,
- sektsioonide sisu ega hierarhiat ei muudeta, ainult joondusreeglit.

## Oodatav tulemus
Pärast muudatust:
- “PATENT PENDING INNOVATIONS”, “USE CASES”, “WHERE TO DEPLOY ROLLO” ja järgmised tekstiplokid algavad visuaalselt samalt joonelt,
- sisemiste kaartide ja väliste pealkirjade ääred tunduvad sama kaugusega,
- leht näeb mobiilis puhtam, korrektsem ja professionaalsem välja,
- eri sektsioonid ei tundu enam nagu erineva padding-süsteemiga kokku pandud plokid.
