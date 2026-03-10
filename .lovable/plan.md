

# Hero pildi asendamine

Kasutaja soovib asendada praeguse hero taustapildi (`/hero/rollo_street.png`) uue üleslaetud pildiga (`rollo-roterman.png`). Uus pilt on puhas, ilma vesimärgita.

## Muudatused

1. **Kopeeri pilt**: `user-uploads://rollo-roterman.png` → `public/hero/rollo_street.png` (asendab olemasoleva)
2. **Koodi muudatusi pole vaja** — failinimi jääb samaks, seega `Index.tsx` viitab endiselt `/hero/rollo_street.png`.

Uuel pildil on robot paremal pool, mis sobib praeguse `object-[75%_center]` fookuspunktiga hästi.

