

# Footeri tasakaalustamine

## Probleem

Praegune desktop grid jaotus on **5-3-4** (12 tulpa kokku):
- Kontakt: 5 tulpa — liiga lai, tekst on kompaktne aga ruum on suur
- Quick Links: 3 tulpa — kitsas, visuaalselt "kokkusurutud"
- Social/Supported by: 4 tulpa — keskmine

See loob ebavõrdse visuaalse kaalu: vasak tulp domineerib, keskmine on kitsas.

## Lahendus

### Desktop (md+)
Muudan jaotuse **4-3-5** peale:
- Kontakt: `md:col-span-4` — kompaktsem, tekst mahub endiselt
- Quick Links: `md:col-span-3` — jääb samaks (piisav linkidele)
- Social/Supported by: `md:col-span-5` — laiem, logod saavad rohkem ruumi

Alternatiiv: **4-4-4** ühtlane jaotus. Kuid kuna paremal tulbal on logopildid, siis 5 tulpa annab neile paremat hingamisruumi.

### Mobiil
Mobiilis on kõik `grid-cols-1`, mis on korrektne. Kuid tulpade vaheline ruum (`gap-10`) on natuke suur — vähendaks `gap-8` peale kompaktsema tunde saamiseks.

### Subfooter
Subfooter on korras, muudatusi ei vaja.

## Muudatused

Üks fail: `src/components/Footer.tsx`
- Rida 12: `md:col-span-5` → `md:col-span-4`
- Rida 88: `md:col-span-4` → `md:col-span-5`
- Rida 9: `gap-10 md:gap-12` → `gap-8 md:gap-12`

