## Eesmärk
Footeris mobiilivaates kuvada "Follow Us" ja "Supported by" plokid kõrvuti (2 veergu), et footer oleks kompaktsem. Desktopis jääb senine vertikaalne paigutus alles.

## Muudatused

**Fail:** `src/components/Footer.tsx`

1. Kolmas tulp (Social & Trust signals, rida ~90) — välimine `<div>` muuta mobiilis grid'iks:
   - `space-y-6 md:text-right` → `grid grid-cols-2 gap-6 md:flex md:flex-col md:space-y-6 md:text-right w-full md:w-auto`

2. "Follow Us" plokk — mobiilis vasakule joondus, desktopis paremale:
   - Ikoonide rida `justify-center md:justify-end` → `justify-start md:justify-end`
   - Pealkiri jääb samaks (text-center pole määratud, päritud parent'ist — eemaldame parent'ist text-center mobiilis)

3. "Supported by" plokk — mobiilis paremale joondus:
   - `items-center md:items-end` → `items-end`
   - `pt-2` eemaldada (pole vaja kõrvuti paigutuses)

4. Vajadusel reguleerida parent flex/wrap käitumist real 9, et kolmas tulp võtaks mobiilis täislaiuse.

## Tulemus
Mobiilis: Logo + kontakt (üleval), Quick Links (keskel 2 veerus), Follow Us | Supported by (all 2 veerus kõrvuti). Footer u 30-40% lühem.