# Plaan: Airport pildi positsioneerimine

## Eesmärk
Airports use-case kaardi taustapildi (`/robot/rollo-airport.webp`) nihutamine nii, et robot kuvatakse paremas 1/3 alas. Teised use-case kaardid jäävad muutmata (vaikimisi keskele).

## Muudatused

### 1. `src/pages/Index.tsx` (üks rida)
Lisame `useCases` massiivi Airports kirjele uue valikulise välja `objectPosition`:
```ts
{
  id: "...",
  title: "Airports",
  icon: Plane,
  image: "/robot/rollo-airport.webp",
  objectPosition: "75% center", // robot paremas 1/3 alas
  description: "...",
  tech: "...",
}
```

### 2. `src/pages/Index.tsx` (`OptimizedImage` kasutuskoht use-case kaardil)
Anname `style={{ objectPosition: uc.objectPosition ?? 'center' }}` `OptimizedImage` komponendile, et igal kaardil saab vajadusel oma fookust määrata. `OptimizedImage` annab kõik täiendavad `img` atribuudid (sh `style`) edasi `<img>` elemendile, seega täiendavat komponendi muutmist pole vaja.

## Visuaalne tulemus
- Airports kaart: pildil olev robot nihkub paremasse äärde (~75% horisontaalne fookus), maastik vasakul jääb rohkem nähtavale.
- Teised kaardid: muutusteta.

## Mõju jõudlusele / muudele süsteemidele
- Ainult CSS `object-position` muudatus, ei mõjuta srcSet, lazy-loadi ega fail-süsteemi.
- Muudatus on tagasiühilduv – teised kaardid kasutavad vaikeväärtust `center`.
