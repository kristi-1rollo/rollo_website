## Probleem

Google näitab otsingutulemustes Lovable'i vaikeikooni, sest `index.html` viitab failile `/favicon.png`, mida tegelikult ei eksisteeri. `public/` kaustas on hoopis `1rollo_favicon.png`. Brauserid ja Google crawler saavad 404 ning kukuvad tagasi Lovable'i ikoonile.

## Lahendus

Ühtlustada failinimi nii, et HTML viit ja päris fail kattuvad. Lihtsaim ja turvalisem variant on nimetada olemasolev fail ümber kanoonilisele teele `/favicon.png` (sama nimi, mida juba viitavad `index.html`, `humans.txt`, structured data ja `og:image` jne — nii ei pea üheski teises kohas midagi muutma).

### Muudatused

1. **Nimeta ümber** `public/1rollo_favicon.png` → `public/favicon.png`.
2. **Lisa `public/favicon.ico`** (sama PNG koopia .ico nimega või eraldi ico) — Google ja paljud sotsiaalplatvormid pärivad vaikimisi `/favicon.ico` juurteelt enne kui HTML-i loevad. Kasutame PNG sisuga, sest brauserid aktsepteerivad seda.
3. **Cache-bust**: tõsta `?v=` query stringi `index.html`-is uue väärtuseni (nt `v=1rollo-20260615`), et Google ja brauserid laadiks ikooni uuesti.
4. **Kontroll**: veendu, et `index.html`-is kõik kolm `<link rel="icon|shortcut icon|apple-touch-icon">` viiteid uuele URL-ile, ning JSON-LD `"logo"` viit on samuti `https://1rollo.com/favicon.png`.

### Mida ma EI tee

- Ei muuda ikooni kujundust — kasutame sama `1rollo_favicon.png` pildifaili.
- Ei lisa uusi favicon variante (16/32/192/512) — kui soovid hiljem täielikku PWA ikoonide komplekti, saame seda eraldi teha.

### Pärast deploy'd

Google ei uuenda favicon'i otsingutulemustes kohe — see võib võtta päevi kuni nädalaid, kuni Googlebot uuesti `/favicon.ico` ja lehe re-crawl'ib. Brauserites näed muudatust kohe pärast hard refresh'i (cache-bust hoolitseb selle eest automaatselt). Kui soovid, võime ka Google Search Console'is URL-i inspektsiooni teha kiirema indekseerimise jaoks.

Kas alustan?
