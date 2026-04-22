
# Plaan: miks update on aeglane ja kuidas see professionaalselt korda teha

## Tõenäoline põhipõhjus
Praeguse koodi põhjal on kõige tõenäolisem põhjus tootmisbuildi aegluses `vite-plugin-imagemin`, mis jookseb igal production buildil failis `vite.config.ts`. See tähendab, et iga publish/update ajal proovitakse staatilisi pilte uuesti optimeerida.

Projektis on samal ajal:
- palju suuri pilte `public/robot`, `public/hero`, `src/assets/robot` kaustades
- mitu videot `public/robot/vid` ja muud rasked meediafailid
- eraldi skript `scripts/convert-to-webp.mjs`, mis näitab, et piltide eeltöötlus on juba osaliselt mõeldud buildist väljapoole

Selline kombinatsioon teebki update’i aeglaseks või viib build timeout’ini.

## Mida muudaksin

### 1. Eemaldan buildi seest raskekaalulise pildioptimeerimise
**Fail:** `vite.config.ts`

Teen buildi kiiremaks nii, et eemaldan `vite-plugin-imagemin` production pipeline’ist või piiran selle kasutust väga tugevalt.

Professionaalne lähenemine siin:
- production build ei peaks igal deploy’l kõiki pilte uuesti ümber pakkima
- pildid tuleb optimeerida ette, mitte igal buildil nullist

Tulemus:
- update/publish muutub märgatavalt kiiremaks
- väheneb timeout’i risk
- käitumine lehel ei muutu

### 2. Viin pildioptimeerimise build-time asemel asset pipeline’i
**Failid:**
- `scripts/convert-to-webp.mjs`
- vajadusel `package.json`

Teen loogika selliseks:
- rasked pildid konverteeritakse WebP-ks ette
- build kasutab juba optimeeritud faile
- vajadusel lisan eraldi käsu nagu `npm run optimize:images`, mida saab jooksutada ainult siis, kui uusi suuri pilte lisatakse

See on full stack / production-grade loogika:
- build = paketiseerimine
- asset optimization = eraldi ettevalmistusetapp

### 3. Vähendan hero- ja suuremate visuaalide koormust
**Mõjutatud failid tõenäoliselt:**
- `src/pages/Index.tsx`
- `src/pages/Product.tsx`
- `src/pages/Career.tsx`
- `src/pages/BlogPost.tsx`
- muud komponendid, kus kasutatakse suuri pilte otse `img` kaudu

Rakendan järk-järgult:
- WebP eelistus seal, kus fail juba olemas on
- `OptimizedImage` komponendi kasutus Supabase/Lovable Cloud storage piltidel
- ainult above-the-fold piltidel `fetchPriority="high"`
- mujal lazy loading
- võimalusel `width` / `height` või stabiilne container ratio CLS vältimiseks

See ei muuda disaini, aga vähendab lehe ja buildi koormust.

### 4. Kontrollin, et buildis poleks tarbetuid aeglustajaid
Vaadan üle:
- kas mõni komponent impordib suuri faile otse `src/assets` kaudu, kui võiks kasutada juba optimeeritud public-faile
- kas kasutusel on dubleeritud assetid (`png` + `webp`) ilma fallback-loogikata
- kas mõni video/pilt laetakse liiga vara

Eesmärk:
- ainult vajalikud kriitilised failid laaditakse kohe
- ülejäänud defer/lazy

### 5. Teen väikese “safety” puhastuse, et update’d oleksid stabiilsemad
Kontrollin ja vajadusel korrastan:
- kas projekt kasutab korraga nii `bun.lock` kui `package-lock.json`
- kas buildi töövoog sõltub mitmest paketihaldurist
- kas buildis on pluginaid, mis annavad vähe kasu, aga lisavad palju aega

Kui vaja, jätan ühe selge paketihalduri tee, et buildikäitumine oleks üheselt mõistetav.

## Mida see kasutaja jaoks tähendab
Pärast muudatust:
- publish/update peaks minema märksa kiiremini
- build timeout’e peaks olema oluliselt vähem
- veebilehe välimus ei muutu
- kood jääb puhtamaks ja professionaalsemaks: asset optimization on eraldatud buildist

## Tehnilised detailid
Praegune pudelikael on see:

```text
production update
  -> Vite build
    -> vite-plugin-imagemin
      -> töötleb suure hulga staatilisi pilte
        -> build venib / timeout
```

Parem arhitektuur:

```text
uue pildi lisamine
  -> eraldi optimize script
  -> salvesta webp / optimeeritud fail

publish/update
  -> ainult Vite build
  -> kiire paketiseerimine
  -> vähem timeout'e
```

## Muudetavad failid
1. `vite.config.ts` — eemaldan või piiran `vite-plugin-imagemin` kasutust
2. `package.json` — lisan selge asset-optimeerimise skripti, kui vaja
3. `scripts/convert-to-webp.mjs` — kohandan vajadusel üldisemaks tööriistaks
4. `src/pages/Index.tsx` — kasutan optimeeritud pildi laadimise mustrit, kus mõistlik
5. `src/pages/Product.tsx` — sama
6. `src/pages/Career.tsx` — sama
7. vajadusel muud meediakomponendid, kus suuri pilte kasutatakse otse

## Oodatav tulemus
- kiirem update
- väiksem build timeout’i risk
- sama visuaal
- selgem, professionaalsem ja hooldatavam meedialogika
