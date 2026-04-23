
## Eesmärk
Asendada kogu avalehe capabilities/orbit sektsioon ühe valmis komposiitpildiga, kus kõik tekstid on juba pildi sees, et:
- desktop taastuks visuaalselt õigeks,
- mobiilis kaoks overlay- ja offset-loogika haprus,
- sektsioon muutuks lihtsamaks ja stabiilsemaks.

## Mida muudan
**Fail:** `src/pages/Index.tsx`

Praegune sektsioon kasutab eraldi:
- vasakut ja paremat tekstiveergu,
- mobiilikaarte,
- badge’e,
- eraldi roboti pilti `/robot/F6/1rollo_orbital.png`.

Selle asemel teen sektsiooni ümber ühe pildi põhisele lahendusele.

## Teostus
### 1. Asendan kogu praeguse orbit/capabilities markup’i
Eemaldan sellest plokist:
- `solutionsLeft`
- `solutionsRight`
- `solutionBottom`
- `capabilityBadges`
- desktopi vasak/parem kaardiveerud
- mobiili capability grid’i
- eraldi badge-rea

Sektsiooni sisse jääb:
- olemasolev pealkiri
- üks keskne pildiplokk

### 2. Kasutan uut valmis komposiitpilti
Pildiks seon faili, mis vastab sinu soovitud variandile “1rollo_orbital_2”.

Praeguse koodibaasi järgi on kõige tõenäolisem olemasolev vaste:
- `public/robot/rollo-orbit-2.png`

Kui sinu mõeldud lõplik fail on teine asset nimega `1rollo_orbital_2`, siis vahetan viite sellele failile, kuid loogika jääb samaks.

### 3. Teen sektsiooni responsiivseks ilma eraldi mobiili-desktopi dubleerimiseta
Kuna tekstid on pildi sees:
- ei ole vaja enam absoluutseid label’eid,
- ei ole vaja mobiilis eraldi fallback-grid’i,
- ei ole vaja negatiivseid offset’e.

Rakendan pildile turvalise responsive wrapperi:
- `max-w-*` piirang keskel
- `w-full`
- stabiilne kõrguse/kuvasuhte loogika
- `rounded-[4px]` ainult siis, kui see sobib uue pildi stiiliga

### 4. Säilitan sektsiooni deep-tech konteksti
Jätan alles:
- sektsiooni tumeda tausta/glow tausta
- olemasoleva pealkirja ja section intro loogika
- üldise container joondumise

Eemaldan ainult selle osa, mis üritab tekste pildi ümber eraldi üles ehitada.

## Miks see on õige lahendus
Praegune probleem tekkis, sest üks ja sama sektsioon pidi teenindama:
- desktop orbit-kompositsiooni,
- mobiili loetavust,
- eraldi tekstikaarte.

Kui tekstid on juba pildi sees, siis:
- desktop jääb täpselt nii nagu kujundatud,
- mobiil ei vaja kompromiss-layout’i,
- kogu sektsioon muutub palju vähem hapraks.

## Oodatav tulemus
Pärast muudatust:
- desktopis ei lagune see sektsioon enam ümber kaartideks,
- mobiilis puudub overflow-risk sellest plokist,
- visuaal vastab paremini sinu referentsile,
- kood muutub lihtsamaks, sest kogu capability-overlay loogika kaob.

## Muudetav ulatus
- `src/pages/Index.tsx`
- vajadusel pildiviide olemasolevale või uuele assetile

## Tehniline märkus
Kui sinu soovitud fail “1rollo_orbital_2” ei ole veel projektis sama nimega olemas, seon implementatsioonis sektsiooni sellele pildile, mis on juba repo sees ja kõige tõenäolisem vaste (`/robot/rollo-orbit-2.png`), või vahetan selle kohe sinu lõpliku faili vastu, kui see lisatakse projekti assetina.
