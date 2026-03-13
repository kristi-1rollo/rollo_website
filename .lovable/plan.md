

# Piltide kuvamise parandamine Solution sektsioonis

## Probleem
Failinimed sisaldavad tühikuid (nt `1Rollo Proto render P006.png`), mis põhjustab probleeme URL-i parsimisel. Brauseri URL-kodeering ei pruugi tühikutega failinimesid korrektselt lahendada.

## Lahendus
Kodeerida failinimed `src/pages/Index.tsx` failis URL-encoded kujul (`%20` tühikute asemel):

- `/robot/1Rollo Proto render P006.png` → `/robot/1Rollo%20Proto%20render%20P006.png`
- `/robot/1Rollo Proto P010.png` → `/robot/1Rollo%20Proto%20P010.png`

## Muudatused
**`src/pages/Index.tsx`** — read 298 ja 303: asendada `src` väärtused URL-encoded versioonidega.

Samuti kontrollida kogu faili teiste roboti piltide viidete osas ja kodeerida need samuti.

