## Eesmärk
Lisada veebilehe arendaja (Whau OÜ — Kristi Vahter) credit **koodi tasandil**, ilma visuaalsete muudatusteta lehel. Krediit jaotatakse 7 erinevasse kohta, et eemaldamine oleks tahtlik tegevus, ja sõnastus piiritleb autorluse selgelt **kujundusele, koodile ja tehnilisele teostusele** (mitte sisule, mis kuulub 1ROLLO-le).

## Mõjutatud failid

### 1. `index.html` — `<head>` lisandused
- HTML-kommentaar pärast `<meta charset>`:
  ```html
  <!--
    ─────────────────────────────────────────────
     Website design & development by Whau OÜ
     Kristi Vahter — https://whau.ee
    ─────────────────────────────────────────────
  -->
  ```
- Uued meta-tagid (olemasoleva `<meta name="author" content="1ROLLO">` kõrvale, mis jääb alles sisu autorina):
  ```html
  <meta name="designer" content="Whau OÜ — website design & development" />
  <meta name="developer" content="Whau OÜ — Kristi Vahter (https://whau.ee)" />
  <link rel="author" href="/humans.txt" />
  ```
- JSON-LD struktureeritud andmed (Schema.org `author` = sisu, `creator` = veebilehe looja):
  ```html
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "ROLLO",
    "url": "https://1rollo.com",
    "author": { "@type": "Organization", "name": "1ROLLO" },
    "creator": {
      "@type": "Organization",
      "name": "Whau OÜ",
      "url": "https://whau.ee",
      "email": "whau@whau.ee",
      "description": "Website design and development"
    }
  }
  </script>
  ```

### 2. `public/humans.txt` (uus fail)
```
/* WEBSITE DESIGN & DEVELOPMENT */
Developer: Kristi Vahter
Company: Whau OÜ
Role: Website design, UI/UX, front-end & back-end development
Contact: whau@whau.ee
Site: https://whau.ee
Location: Estonia

/* CONTENT */
Owner: 1ROLLO
Note: All textual content, product information, and brand assets
      are the property of 1ROLLO.

/* SITE */
Last update: 2026/04
Standards: HTML5, CSS3, TypeScript
Components: React, Vite, Tailwind CSS
```

### 3. `public/robots.txt` — kommentaar faili algusesse (olemasolevad reeglid säilivad)
```
# ─────────────────────────────────────────────
# Website design & development: Whau OÜ
# https://whau.ee  ·  whau@whau.ee
# Content & brand: 1ROLLO
# ─────────────────────────────────────────────
```

### 4. `src/main.tsx` — stiliseeritud konsooli sõnum enne `createRoot`
```ts
console.log(
  '%c Website by Whau OÜ ',
  'background:#BEFF4B;color:#050505;font-size:14px;padding:6px 10px;font-weight:700;border-radius:4px'
);
console.log('%cDesign & development → https://whau.ee', 'color:#BEFF4B;font-size:12px');
```

### 5. `package.json` — lisa väljad
```json
"author": "Whau OÜ <whau@whau.ee> (https://whau.ee)",
"contributors": ["Kristi Vahter <whau@whau.ee> (https://whau.ee)"]
```

### 6. `LICENSE` (uus fail) — Proprietary + Attribution Required, sisu/kood eraldi
```
Copyright (c) 2026 1ROLLO. All rights reserved.

This repository contains both proprietary content and original creative work
by third parties. Rights are divided as follows:

────────────────────────────────────────────────────────────────────
CONTENT (owned by 1ROLLO)
────────────────────────────────────────────────────────────────────
All textual content, product information, brand assets, logos, photographs,
renderings, videos, and marketing copy are the property of 1ROLLO.
Unauthorized copying, modification, or distribution is prohibited.

────────────────────────────────────────────────────────────────────
WEBSITE DESIGN, CODE & IMPLEMENTATION (created by Whau OÜ)
────────────────────────────────────────────────────────────────────
The website's visual design, user interface, layout, interaction patterns,
front-end and back-end source code, component architecture, and technical
implementation were designed and developed by:

  Whau OÜ — Kristi Vahter
  https://whau.ee
  whau@whau.ee

ATTRIBUTION REQUIREMENT
All authorship metadata referencing Whau OÜ — including HTML comments,
meta tags (designer, developer), humans.txt, package.json author fields,
console attribution, and this LICENSE file — must remain intact in any
deployed or derivative version of this codebase. Removal or alteration
of design/code attribution constitutes a breach of the development
agreement under which this work was delivered.
```

## Tulemus
- ✅ Visuaalselt lehel mitte midagi ei muutu
- ✅ "View Source", DevTools, `/humans.txt`, `/robots.txt`, Console — kõikjal arendaja credit
- ✅ Google/SEO mõistab JSON-LD kaudu, et lehe lõi Whau OÜ
- ✅ Sisu autorlus (1ROLLO) ja koodi/disaini autorlus (Whau OÜ) on selgelt piiritletud
- ✅ LICENSE annab juriidilise kaalu attribution-nõudele

## Mälu
Salvestan uue mälu `mem://technical-decisions/developer-attribution`, mis dokumenteerib Whau OÜ krediidi paiknemise 7 kohas, et tulevased muudatused ei eemaldaks neid kogemata.