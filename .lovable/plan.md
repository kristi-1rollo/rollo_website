
## Soovitus
Parem lahendus on teha video raam taustaga sulanduvaks, mitte panna videole samasuguseid “ikooni + tekstikast” kaarte nagu kõrval olevatel benefit-kaartidel.

Põhjus:
- benefit-kaardid juba kannavad infot ja loovad sektsioonis selge mustri,
- kui video ümber lisada samad kastid, tekib visuaalne dubleerimine ja sektsioon muutub raskeks,
- tootelehe “Solution” plokis peaks video töötama kui emotsionaalne / demonstratiivne ankurobjekt, mitte veel üks kaartide grid.

## Eesmärk
Muuta `Product` lehe Solution-sektsiooni video elegantsemaks nii, et:
- video serv ei lõikuks tumeda tausta vastu järsult,
- video tunduks rohkem “kinni” sektsiooni atmosfääris,
- video ja tekstikaardid oleksid samas premium deep-tech keeles,
- desktop ja mobile jääksid puhtad ning mitte ülekujundatud.

## Soovitatud lahendus
Rakendan videole “soft ambient frame” lahenduse:

### 1. Eemaldada liiga agressiivne ümmargune mask
Fail: `src/components/ScrollControlledVideo.tsx`

Praegu video kasutab tugevat radiaalset maski ja blur vignette’i, mis teeb serva veidi uduseks, aga võib jätta ka “ujuva musta laigu” mulje.

Muudan seda nii, et:
- mask oleks pehmem ja rohkem ristkülikulise objekti loogikaga,
- serva fade toimuks õrnemalt,
- video ise jääks selgem ja vähem “läbi filtri” tunneks.

### 2. Lisada videole subtiline konteiner, mitte klassikaline kaart
Fail: `src/components/ScrollControlledVideo.tsx`

Video ümber tuleks õrn raamistik:
- väga nõrk border `border-white/10` või `border-primary/15`,
- tumedast taustast veidi eristuv sisepind `bg-white/[0.02]` või sinakas klaasikiht,
- kerge inner glow / outer glow,
- 4px border-radius vastavalt projekti reeglile.

See ei oleks “kaart” samas mõttes nagu info-boxid, vaid pigem cinematic display shell.

### 3. Lisada ambient taustakiht video taha
Failid:
- `src/components/ScrollControlledVideo.tsx`
- vajadusel `src/pages/Product.tsx`

Video taha lisaks:
- pehme sinakas radiaalne glow,
- väga nõrk lime-highlight ainult aktsendina,
- gradient, mis hajub sektsiooni olemasolevasse tumedasse tausta.

Eesmärk:
video ei paista lihtsalt eraldi MP4-na lehe peal, vaid tundub nagu see “kiirgaks” samast keskkonnast.

### 4. Hoida video kompositsioon eraldi kaartidest
Fail: `src/pages/Product.tsx`

Solution-sektsioonis jätan alles:
- vasakul tekst + 4 benefit-kaarti,
- paremal video.

Aga ma ei lisa video peale ega ümber samu tekstikaste, sest see konkureerib olemasolevate benefit-kaartidega.

Kui on vaja lisada rohkem “toote tunnet”, siis parem alternatiiv on:
- 1–2 väikest floating micro-label elementi video nurkadesse,
- näiteks “Autonomous patrol” või “All-weather operation” stiilis mini-meta sildid,
- mitte täismõõdus info-kaardid.

## Soovitatud visuaalne hierarhia
Sektsioon jääb selliseks:

```text
[ vasak: pealkiri + kirjeldus + 4 benefit kaarti ]   [ parem: sulanduva raamiga video ]
```

Mitte selliseks:

```text
[ vasak: benefit kaardid ]   [ parem: video + veel uued kaardid ]
```

See hoiab sektsiooni puhtamana ja professionaalsemana.

## Tehniline teostus
### Muudan komponenti
`src/components/ScrollControlledVideo.tsx`
- asendan praeguse raske vignette/mask lahenduse rafineerituma frame + ambient glow mudeliga,
- lisan eraldi wrapper-layerid:
  - ambient back glow
  - subtle shell
  - optional edge fade
  - replay overlay, mis sobib uue raamiga.

### Häälestan sektsiooni kasutust
`src/pages/Product.tsx`
- vajadusel annan video wrapperile sektsioonis parema laiuse, vertikaalse joondamise või spacing’u,
- hoian video ja vasaku sisu visuaalses tasakaalus, ilma et video tunduks liiga väike või liiga “uppuv”.

## Mida ei muudeta
- Solution-sektsiooni üldstruktuuri ei muudeta,
- olemasolevad ikooniga tekstikastid jäävad alles,
- videot ei muudeta sisuliselt, ainult selle esitusviisi,
- mobile autoplay / replay loogika jääb alles.

## Kui soovid tugevamat visuaalset efekti
Teise taseme variant oleks lisada videole mitte “kastid”, vaid:
- väga väikesed HUD-stiilis markerid,
- õhukesed jooned või corner brackets,
- üks diskreetne status-chip.

See sobib deep-tech esteetikaga palju paremini kui täisväärtuslikud info-kaardid video kõrval või peal.

## Oodatav tulemus
Pärast muudatust:
- video serv sulandub loomulikult tumeda taustaga,
- video näeb välja kallim ja sihilikum,
- Solution-sektsioon ei tundu ülekoormatud,
- olemasolevad benefit-kaardid jäävad põhisisu kandjaks,
- kogu plokk mõjub rohkem “premium product showcase” kui lihtsalt tekst + eraldi video.
