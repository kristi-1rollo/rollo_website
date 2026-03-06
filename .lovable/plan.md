

# Footeri paigutuse parandamine

## Probleem
- **Desktop**: 12-tulba grid jagab ruumi 4-3-5, aga parem tulp on liigselt tühi kuna sisu on kompaktne. Tulbad on liiga tihedalt koos vasakul, parem pool on tühi.
- **Mobiil**: Quick Links vahel on liiga suured vahed (`min-h-[44px]` + `space-y-2.5`), sektsioonid on liiga vasakule surutud.

## Lahendus

### Desktop: `justify-between` flex-layout gridi asemel
Vahetame 12-tulba gridi välja **flexboxi** vastu `justify-between`-iga. See paigutab:
- Vasaku tulba (Kontakt) vasakusse serva
- Keskmise tulba (Quick Links) keskele
- Parema tulba (Follow Us / Supported by) paremale

Container-premium tagab juba servadest padding-i (32px desktop).

### Mobiil: kompaktsem Quick Links
- Quick Links: kasuta **kahte tulpa** gridi (`grid grid-cols-2 gap-x-6 gap-y-1.5`) linkide jaoks, kus 3 vasakul ja 2 paremal
- Eemalda `min-h-[44px]` mobiilis (jäta `md:min-h-0` asemel lihtsalt `py-1`)
- Lisa kogu footeri mobiilivaatesse rohkem vasakut paddingi (`px-6` mobiilis)

## Muudatused: `src/components/Footer.tsx`

1. **Rida 9**: Asenda `grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12` → `flex flex-col md:flex-row md:justify-between gap-8 md:gap-0`
2. **Rida 12**: Eemalda `md:col-span-4`, lisa `md:max-w-[280px]`
3. **Rida 49**: Eemalda `md:col-span-3`
4. **Rida 53**: Quick Links nav: `space-y-2.5` → `grid grid-cols-2 gap-x-8 gap-y-1 md:grid-cols-1 md:gap-y-2.5`
5. **Rida 54-83**: Quick Links: eemalda `min-h-[44px] md:min-h-0`, asenda `py-1.5 md:py-0`
6. **Rida 88**: Eemalda `md:col-span-5`, lisa `md:text-right` ja `md:items-end` et sisu joondub paremale
7. **Rida 93, 119**: Lisa `md:justify-end` sotsiaalmeedia ikoonidele ja logodele desktopil
8. **Mobiili padding**: Rida 8 konteineri sees lisa `px-6 md:px-0` lastele või muuda ülemine container

