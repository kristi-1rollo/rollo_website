
## Eesmärk
Luua avalikule veebilehele selge joondusreegel mobiilis ja desktopis:
- hero-introd võivad olla kontrollitult center- või center-leaning,
- kõik sisusektsioonid, kaardid, detailid, vormid ja artiklitekst jäävad järjekindlalt vasakjoondusega,
- Home capabilities/orbit plokk ei moonuta enam lehe visuaalset telge,
- About, Product, Contact, Career ja Blog kasutavad sama avalehtede joonduspoliitikat.

## Ühine joonduspoliitika
Rakendan ühe lihtsa reegli kogu public UI jaoks:

1. Hero:
- lubatud on ainult lühike intro-kompositsioon,
- pealkiri võib olla visuaalselt kesksemas kompositsioonis,
- kuid tekstiblokk ise jääb joonduselt kontrollitud ja mitte “ujuvaks”.

2. Sisusektsioonid:
- section tag, pealkiri, copy, listid, kaardid, meta ja CTA-d vasakule,
- gridid võivad olla keskelt paigutatud kui tervik, aga iga sisuplokk sees jääb vasakjoonduseks.

3. Lugemissisu:
- blogiartikli prose, detailplokid, metadata, navigatsioon ja sisukord jäävad vasakule,
- eemaldan/ei lisa mobiilis justification-loogikat, mis halvendab loetavust.

4. Shared wrappers:
- Section wrapper jääb konteineri jaoks, kuid sisemised intro-blokid saavad selgema “intro can center / content stays left” mustri.

## 1. Home — `src/pages/Index.tsx`
Teen Home’i joonduskaardi selgeks:

### Hero
- säilitan hero visuaalse tugevuse,
- korrastan intro-ploki nii, et see ei tunduks kord center, kord left sõltuvalt ekraanisuurusest,
- hoian teksti ühes selges teljes.

### Capabilities / orbit
- kuna orbit on nüüd üks komposiitpilt, eemaldan sektsiooni ümbert kõik lisajoondused, mis võivad jätta mulje teisest teljest,
- pealkirja ja intro joondan samale container-teljele nagu teised Home sektsioonid,
- pildi wrapper jääb tehniliselt keskele kui meediaobjekt, kuid sektsiooni tekstiline struktuur jääb vasakule,
- mobiilis säilib tap-to-enlarge, aga ilma et ploki ümbrus “kiskuks” layout’i keskele.

### Järgnevad sektsioonid
- Product teaser, Use Cases ja Business Case saavad sama vasakjoondatud content hierarchy loogika,
- kontrollin, et statistikablokid, card copy ja section intros kasutaksid sama spacing + left alignment mustrit.

## 2. Product — `src/pages/Product.tsx`
Teen Product lehele kahekihilise reegli:

### Hero
- hero headline võib jääda center-friendly kompositsiooniga taustal,
- aga tekstiplokk ise ei tohi minna “ujuvaks keskele” kui ülejäänud leht on vasakul.

### Problem / Solution / Capabilities / Platform / Specs
- kõik probleemikaardid, lahenduse tekst, capability-kaardid, platform-kaardid ja kirjeldused jäävad rangelt vasakjoonduseks,
- ühtlustan card-content alignment’i,
- eemaldan kohad, kus wrapper on neutraalne või center-ish, kuid sisu peaks olema selgelt left.

## 3. Contact — `src/pages/Contact.tsx`
Sellel lehel piiran center-joondust ainult introle:

### Hero
- intro võib jääda ülevaatlikuks hero-plokiks,
- aga tekstiplokk, CTA ja videokompositsioon peavad lugema end ühe teljena, mitte kahe eraldi joondusloogikana.

### Contact info + form
- company details, email, address, form heading, labels, inputs ja checkbox-grid jäävad kõik vasakule,
- kontrollin, et ükski wrapper ei tsentreeri vormitekste ega sektsiooni sisu.

## 4. Career — `src/pages/Career.tsx`
Teen Career lehel sama reegli:

### Hero
- recruiting statement võib jääda lühikese hero-intro vormi,
- sisuplokk ise jääb selgelt vasakjoondatuks.

### Why Join / Open Positions / modal content
- kõik kaardid, listid, ametikohtade read, metadata ja modal prose jäävad vasakule,
- kontrollin, et fixed-hero + scrolling-content kombinatsioon ei tekitaks joonduslikku katkestust sektsiooni vahetusel.

## 5. Blog — `src/pages/Blog.tsx` + `src/pages/BlogPost.tsx`
Teen blogi puhul eraldi reegli:

### Blog listing
- listing intro võib olla visuaalselt rohkem centered section-intro tüüpi,
- aga säilitan või korrastan selle nii, et ta ei tunduks vastuolus grid-postide vasakjoondusega,
- kõik kaardid ja “Read Dispatch” flow jäävad vasakule.

### Blog article
- artikli lugemissisu jääb täielikult vasakjoonduseks,
- eemaldan prose klassidest mobiili/desktop justify segu, kui see on alles,
- sisukord, metadata, share plokk ja prev/next nav jäävad loetava vasakjoondatud lugemisvoo osaks.

## 6. About Us + shared consistency pass — `src/pages/AboutUs.tsx` ja korduvad wrapperid
Teen About Us lehel viimase konsistentsuspassi:

### Hero
- hero võib jääda visuaalselt tugev intro,
- tekstiploki telg seatakse samasse süsteemi nagu teistel lehtedel.

### Overview / Team / CTA
- mission/technology/scale kaardid jäävad vasakule,
- team intro ja competency-kaardid jäävad vasakule,
- lõpu CTA otsustan poliitika järgi:
  - kui see on “section intro CTA”, võib wrapper olla keskel,
  - kuid tekstihierarhia jääb kontrollituks ega tohi murda ülejäänud lehe joondusreeglit.

### Shared wrappers
- vajadusel teen väikese korduskomponentide/klasside pass’i, et section intro’d oleksid läbivalt ühes mustris:
  - intro wrapper
  - content wrapper
  - card body alignment
- eesmärk ei ole luua rasket uut süsteemi, vaid eemaldada juhuslik center/left vaheldumine.

## Tehniline teostus
Muudan peamiselt:
- `src/pages/Index.tsx`
- `src/pages/Product.tsx`
- `src/pages/Contact.tsx`
- `src/pages/Career.tsx`
- `src/pages/Blog.tsx`
- `src/pages/BlogPost.tsx`
- `src/pages/AboutUs.tsx`

Vajadusel teen väikese ühtlustuse ka:
- `src/components/ui/section.tsx`
või shared wrapperi kasutusmustrites, kuid ainult siis, kui see aitab vältida copy-paste joondusloogikat.

## Mida ma ei muuda
- Deep-tech visuaalne stiil jääb alles,
- olemasolevad taustad, glow’d, imagery ja põhikompositsioonid ei kao,
- desktop hero’d ei muudeta “liiga lihtsaks”,
- blogi, career ja contact funktsionaalsus jääb samaks.

## Oodatav tulemus
Pärast teostust:
- igal public lehel on selge alignment map,
- hero intro võib olla visuaalselt kesksem ainult seal, kus see on põhjendatud,
- kõik sisusektsioonid, detailid, kaardid, vormid ja artiklitekstid on järjepidevalt vasakjoondatud,
- Home orbit sektsioon ei tõmba enam visuaalset telge paigast,
- mobiilivaade tundub ühtlasem, professionaalsem ja loetavam ilma desktop-kompositsioone lõhkumata.
