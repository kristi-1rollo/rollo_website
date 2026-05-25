## Lehepõhine SEO (react-helmet-async)

Lisan igale avalikule lehele unikaalse title, description, canonical ja og:* tag'id, et Google mõistaks iga lehe sisu eraldi.

### Sammud

1. **Paigaldan `react-helmet-async**` paketi.
2. **Wrapan App'i `<HelmetProvider>`'sse** (`src/main.tsx`).
3. **Eemaldan `<link rel="canonical">` `index.html`-st** — iga leht haldab oma canonical'i ise (vältimaks duplikaate). Sitewide og:* jääb fallback'iks alles.
4. **Lisan `<Helmet>` bloki igale avalikule lehele**:
  - `/` (Index) — "1ROLLO — Autonomous robots that see, hear, speak, and move."
  - `/product` — "1ROLLO Robot — Specs & Capabilities"
  - `/about` — "About 1ROLLO — **Decade of Shared Robotics Experience**"
  - `/blog` — "1ROLLO Blog — Latest thinking on autonomous security, field test results, and the future of robotic patrol technology."
  - `/blog/:id` (BlogPost) — postituse pealkiri + excerpt + og:type=article
  - `/contact` — "Contact 1ROLLO — Get a Quote"
  - `/funding` + `/eu-kaasrahastus` — "EU Co-Financing — 1ROLLO"
   Iga `<Helmet>` sisaldab: `<title>`, `<meta name="description">`, `<link rel="canonical">`, `og:title`, `og:description`, `og:url`, `og:type`.
5. **Mitte-indekseeritavad lehed** (`/login`, `/admin*`, `/set-password`, `/unsubscribe`, `/career-new`) saavad `<meta name="robots" content="noindex,nofollow">`.

### Tehniline märkus

- Helmet töötab kliendi pool (Googlebot käivitab JS-i, näeb õigeid tag'e).
- LinkedIn / Slack / Facebook preview crawler'id ei käivita JS-i — nemad näevad ainult `index.html` fallback'i. See on aktsepteeritav, kuna sitewide og:* on juba korralik.
- Canonical URL'id kasutavad `https://1rollo.com` baasi.

### Failid mida muuta

- `package.json` (uus dep)
- `src/main.tsx` (HelmetProvider wrapper)
- `index.html` (eemaldan canonical)
- `src/pages/*.tsx` (8 lehte saavad Helmet bloki)