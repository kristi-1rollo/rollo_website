## Why Google still shows the Lovable icon

The current `public/favicon.ico` is **a PNG file renamed to `.ico`** (not a valid ICO container). Most search crawlers reject it and fall back to a generic/default icon. Fix = ship a real multi-resolution ICO plus a clean PNG/Apple/PWA set generated from your uploaded 2000×2000 1R gradient mark.

## Files generated from the uploaded `1R_gradient-2.png` (2000×2000 RGB)

Saved into `public/`:

- `favicon.ico` — **real** multi-resolution ICO containing 16, 32, 48 px frames
- `favicon-16.png`, `favicon-32.png`
- `favicon-96.png` (Google Search's preferred size)
- `apple-touch-icon.png` — 180×180
- `icon-192.png`, `icon-512.png` (PWA / Android)
- `site.webmanifest` — references the two PWA icons
- `favicon-source.png` — the 2000×2000 master, kept for future regeneration

Old `public/favicon.png` is replaced with a freshly-rendered 512×512 PNG (same filename so existing JSON-LD `logo` URLs still resolve — no SEO regressions).

## `index.html` head changes (favicon block only)

Replace the current four `<link rel="icon" …>` lines with:

```html
<link rel="icon" href="/favicon.ico?v=1rollo-20260625" sizes="any" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png?v=1rollo-20260625" />
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png?v=1rollo-20260625" />
<link rel="icon" type="image/png" sizes="96x96" href="/favicon-96.png?v=1rollo-20260625" />
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=1rollo-20260625" />
<link rel="manifest" href="/site.webmanifest?v=1rollo-20260625" />
<meta name="theme-color" content="#0a0a0a" />
```

Nothing else in `index.html` changes. JSON-LD, OG tags, CSP, prerender hooks, routing — all untouched.

## `site.webmanifest`

```json
{
  "name": "1ROLLO",
  "short_name": "1ROLLO",
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "any maskable" }
  ],
  "theme_color": "#0a0a0a",
  "background_color": "#0a0a0a",
  "display": "standalone"
}
```

## Generation method

One Python script using Pillow (already available): open the uploaded 2000×2000 PNG, resize with Lanczos to each target size, save each PNG, and build a real `.ico` via `Image.save(..., format='ICO', sizes=[(16,16),(32,32),(48,48)])`.

## Verification (after build)

1. Run `npm run build`.
2. Print favicon-related lines from `dist/index.html`.
3. `python3 -c "from PIL import Image; print(Image.open('dist/favicon.ico').ico.sizes())"` — must list `{(16,16),(32,32),(48,48)}`.
4. `grep -rin "lovable" dist/index.html dist/favicon* dist/site.webmanifest dist/apple-touch* dist/icon-*` — must return empty for icon files.
5. Confirm the final favicon HTML block to you and tell you to use Google Search Console's "Request indexing" + clear browser cache so the new icon appears in SERPs (Google re-crawls favicons on its own schedule — typically days to weeks).

## What I will NOT change

Page layout, components, routes, prerender scripts (`scripts/prerender.mjs`, `scripts/routes.mjs`), SEO meta, JSON-LD content, CSP, OG image. Strictly favicon files + the icon `<link>` block in `index.html`.
