## Eesmärk
Google'i otsingus näeks 1Rollo.com välja professionaalselt: õige favicon, korrektne pealkiri ja kirjeldus, ilus sotsiaalmeedia eelvaade ning Google leiab ja indekseerib uue versiooni võimalikult kiiresti.

## Miks praegu vale vaade?
- Google'i indeks on vana (cache'itud vana favicon ja vana title/description).
- `index.html`-s on title/description juba head, aga puudu on **canonical**, **og:url**, **og:image** ja **sitemap.xml** — need aitavad Google'il "rikkaliku" tulemuse luua ja õigele URL-ile lukustada.
- Praegune `/favicon.png` on 1.5 KB — liiga väike, tihti Google ei aktsepteeri seda otsingutulemuste ikoonina (nõuab vähemalt 48×48, soovituslikult 512×512).

## Mida teeme

### 1. Favicon (kui oled uue pildi üles laadinud)
- Kopeerin uue üleslaaditud pildi `public/favicon.png`-ks (üle kirjutan vana).
- Värskendan `index.html`-s favicon cache-busteri (`?v=...`) uuele ajatemplile, et brauserid ja Google võtaksid uue versiooni.
- Lisan ka `apple-touch-icon` ja `<link rel="icon" sizes="any">` viited.

### 2. OG / jagamispilt
- Kopeerin sinu üleslaaditud OG-pildi `public/og-image.jpg`-ks (eelistatult 1200×630).
- Lisan `index.html`-s:
  - `<meta property="og:image" content="https://1rollo.com/og-image.jpg">`
  - `<meta property="og:image:width" content="1200">` / `height` 630
  - `<meta name="twitter:image" content="...">` (sama URL)

### 3. Head meta täiendused (`index.html`)
Lisan/parandan järgmised read:
- `<link rel="canonical" href="https://1rollo.com/">`
- `<meta property="og:url" content="https://1rollo.com/">`
- `<meta property="og:site_name" content="1ROLLO">`
- `<meta property="og:locale" content="en_US">`
- Täiendan JSON-LD'd nii, et `Organization` skeem oleks olemas (logo URL koos), mis aitab Google'il õige "site name" ja "logo" otsingutulemustes näidata:
  ```json
  {
    "@type": "Organization",
    "name": "1ROLLO",
    "url": "https://1rollo.com",
    "logo": "https://1rollo.com/favicon.png"
  }
  ```

### 4. Title ja description optimeerimine
Praegune:
- Title: *"ROLLO - Autonomous Robot Security Guard"* (40 tähemärki — OK)
- Description: ~150 tähemärki — OK

Soovitus (vajadusel võime hoida praeguse, aga ettepanek):
- Title: **"1ROLLO — Autonomous Robot Security Guard"** (kasutab brändinime nii, nagu kodulehel)
- Description samaks, aga lisame lõppu CTA-na: *"Learn more about the future of autonomous security."*

Kui sulle praegune sõnastus sobib, jätame muutmata — anna teada.

### 5. sitemap.xml ja robots.txt
- Lisan `public/sitemap.xml`-i põhilehtede URL-idega (`/`, `/product`, `/about`, `/contact`, `/blog`, `/funding`).
- Täiendan `public/robots.txt`-i reaga `Sitemap: https://1rollo.com/sitemap.xml`.

### 6. Google Search Console — kuidas reindekseerimist kiirendada
Kirjutan vastuses sammud:
1. Mine [search.google.com/search-console](https://search.google.com/search-console).
2. Vali property `https://1rollo.com` (kui pole, lisa "URL prefix" tüüpi property — võin domeeni omandi tõestamise meta-tagi automaatselt koodi lisada, kui annad rohelise tule).
3. Klõpsa vasakul **Sitemaps** → lisa `https://1rollo.com/sitemap.xml`.
4. Ülal otsingukastis sisesta `https://1rollo.com/` → **Request Indexing**. Korda iga olulise alalehe kohta.
5. Favicon võtab Google'is uuendamiseks tüüpiliselt 1–4 nädalat — Search Console ei paku selleks otseteed, aga sitemap + Request Indexing kiirendab tervet protsessi.

## Mida ma EI tee
- Ei muuda kodulehe disaini ega sisu.
- Ei lisa per-route Helmet'i — see ei ole praeguse soovi jaoks vajalik (sotsiaaljagamine töötab staatilise `index.html`-iga niikuinii paremini, sest LinkedIn/FB ei käivita JS-i).
- Ei seadista Google Search Console'i omandi tõestust automaatselt — küsin enne, kui seda vaja on.

## Mida ma sinult vajan enne ehitamist
1. **Lae chati üles uus favicon-pilt** (eelistatult 512×512 või suurem PNG, ruutformaadis).
2. **Lae üles OG-pilt** (1200×630, JPG või PNG).
3. Kinnita kas Title jääb praeguseks või muudame "1ROLLO — Autonomous Robot Security Guard" peale.

Kui need on olemas, läheme build-mode'i ja teen kõik korraga ära.
