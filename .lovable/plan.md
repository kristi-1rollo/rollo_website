
## Eesmärk
Viia public lehtede horisontaalne rütm ühe reegli alla, et:
- hero’d kasutaksid sama külgvahet nagu ülejäänud sisu,
- Home “Use Cases” intro ja kaardid jookseksid samal x-teljel,
- kaardisisu ei tunduks mobiilis liiga sügaval sees,
- edaspidi oleks selge reegel, mille järgi uusi sektsioone ehitada.

## 1. Hero wrapperite ühtlustamine
Muudan hero-sisu wrapperid lehtedel:
- `src/pages/Index.tsx`
- `src/pages/Product.tsx`
- `src/pages/Contact.tsx`
- `src/pages/Career.tsx`

Rakendan sama public container gutter’i:
- `px-4 sm:px-6 lg:px-8`

Sellega kaob olukord, kus hero alustab kitsamalt või laiemalt kui järgmised sektsioonid. Hero võib jääda visuaalselt centered, aga selle “raam” peab olema sama mis teistel public section’itel.

## 2. Home “Use Cases” sektsiooni ühe rail’i alla viimine
Fail: `src/pages/Index.tsx`

Praegu intro ja grid on küll samas sektsioonis, aga visuaalselt jääb mulje nagu need ei kasutaks päris sama rail’i.

Muudan:
- intro-ploki ja kaardigridi vahelist spacing’ut,
- vajadusel intro max-width’i,
- gridi outer alignment’i, et esimese rea kaardid algaksid visuaalselt samast teljest nagu `SectionTag`, pealkiri ja kirjeldus.

Eesmärk:
- “Use Cases”
- “Where to Deploy ROLLO”
- kirjeldus
- esimene kaardirida

algaksid optiliselt ühe ja sama joone pealt.

## 3. Kaardisisu mobiilipaddingu normaliseerimine
Muudan public kaartide sisemisi paddings seal, kus mobiilis tekib “liiga sees” efekt.

Peamised sihtkohad:
- `src/pages/Index.tsx`
- `src/pages/Product.tsx`
- `src/pages/Contact.tsx`
- `src/pages/Career.tsx`
- vajadusel `src/pages/AboutUs.tsx`, kui sama muster kordub

Reegel:
- mobiilis vähendan liiga suuri sisemisi paddings väärtusi,
- desktopis jätan õhulisuse alles või säilitan mõõduka astmevahe,
- kaardi sisu algusjoon peab tunduma kooskõlas section headingu ja lehe põhigutter’iga.

Tõenäoline suund:
- `p-6` või suuremad väärtused vaatan üle,
- eelistan mobiilis `p-4` või `p-5`, desktopis `md:p-5` või `md:p-6` sõltuvalt kaardi tüübist,
- ei tee kogu UI-d kitsaks, vaid vähendan ainult optilist “liiga sügaval sees” tunnet.

## 4. Ühine public joondusreegel shared wrapperisse
Fail: `src/components/ui/section.tsx`

Lisan väikese, selge kasutusreegli shared wrapperi tasemele, et vältida tulevast drift’i.

Variant, mida rakendan:
- kas täiendan `Section` komponendi dokumenteeritud kasutusmustrit kommentaariga,
- või lisan väikese abikomponendi / klassipõhise mustri stiilis:
  - public section outer wrapper
  - public content rail
  - intro wrapper, mis võib olla centered
  - content wrapper, mis jääb alati vasakule ja sama gutter’i peale

Eesmärk ei ole teha keerulist süsteemi, vaid kehtestada üks selge public-page horizontal rhythm rule:
- taust võib olla full-bleed,
- meedia võib olla centered objekt,
- aga tekstiline content rail peab tulema ühest standardist.

## Tehniline teostus
Muudan peamiselt:
- `src/pages/Index.tsx`
- `src/pages/Product.tsx`
- `src/pages/Contact.tsx`
- `src/pages/Career.tsx`
- `src/components/ui/section.tsx`

Vajadusel teen väikse consistency-pass’i ka:
- `src/pages/AboutUs.tsx`

## Mida ei muuda
- Deep-tech visuaalkeelt
- olemasolevaid taustu, glow’sid ja imagery kompositsioone
- hero’de põhistruktuuri
- Home orbit pildi lightbox-funktsiooni

## Oodatav tulemus
Pärast muudatust:
- hero tekstid algavad sama külgvahega nagu ülejäänud public lehe sektsioonid,
- Home “Use Cases” intro ja kaardid tunduvad samal horisontaalsel rail’il,
- mobiilis ei mõju kaarditekstid enam liiga sügaval sees,
- uute sektsioonide ehitamisel on olemas üks selge reegel, mis hoiab alignment drift’i ära.
