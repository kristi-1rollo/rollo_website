# 🛡️ Turvapakett — Soovituslik (1–6) + AI scraperite blokeerimine

## Eesmärk
Tugevdada veebilehe turvalisust 6 omavahel täiendava kihiga, ilma et see häiriks tavakasutaja kogemust. Lisaks blokeerida AI scraperid, et sisu ei jõuaks treeningandmetesse.

---

## 1. Content Security Policy + turvaheaderid (`index.html`)

Lisan `<head>`-i:
- **CSP meta-tag** — lubatud allikad: `'self'`, Supabase (`*.supabase.co`), Google Fonts, YouTube nocookie embed (blogi), Lovable preview
- **X-Content-Type-Options: nosniff**
- **X-Frame-Options: SAMEORIGIN** (clickjacking-kaitse)
- **Referrer-Policy: strict-origin-when-cross-origin**
- **Permissions-Policy** — keelan kaamera, mikrofoni, geolokatsiooni

## 2. HIBP lekkinud paroolide kontroll (Lovable Cloud Auth)

Kasutan `configure_auth` tööriista koos `password_hibp_enabled: true`. Adminid ei saa enam kasutada teadaolevalt lekkinud paroole.

## 3. Honeypot bot-kaitse (3 faili + 1 edge function)

Peidetud `<input name="website" />` (CSS `position:absolute; left:-9999px; opacity:0; tabindex=-1; aria-hidden`):
- `src/components/RegistrationModal.tsx`
- `src/hooks/useContactForm.ts` (lisan väli + saadan payload'is)
- `src/pages/Contact.tsx` (kontaktivormis)

**Server-side** `submit-registration` edge functionis: kui `website` field on täidetud → tagastame `{ ok: true }` (bot arvab, et õnnestus), aga ei salvesta DB-sse.

## 4. CORS päiste kitsendamine (3 edge functioni)

Asendan `Access-Control-Allow-Origin: *` dünaamilise origin-validaatoriga:
```ts
const ALLOWED_ORIGINS = [
  "https://1rollo.com",
  "https://www.1rollo.com",
  "https://new.1rollo.com",
  "https://rollo.lovable.app",
];
const ALLOWED_PATTERNS = [
  /^https:\/\/[\w-]+\.lovable\.app$/,
  /^https:\/\/[\w-]+--1e9f235c-7103-4e02-85ab-d7a638683566\.lovable\.app$/,
  /^http:\/\/localhost(:\d+)?$/,
];
```
Mõjutatud failid:
- `supabase/functions/submit-registration/index.ts`
- `supabase/functions/manage-admin/index.ts`
- `supabase/functions/generate-excerpt/index.ts`

## 5. AI-scraperite blokeerimine (`public/robots.txt`)

Lisan olemasoleva faili lõppu:
```
# AI training crawlers — disallowed
User-agent: GPTBot
Disallow: /

User-agent: ClaudeBot
Disallow: /

User-agent: anthropic-ai
Disallow: /

User-agent: Google-Extended
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: PerplexityBot
Disallow: /

User-agent: cohere-ai
Disallow: /

User-agent: ChatGPT-User
Disallow: /
```

## 6. Storage bucket listing piiramine (uus migration)

Praegu `blog-images` ja `career-posters` lubavad anon-ile failide listimist. Migration:
- Eemaldab laia anon `SELECT` policy storage.objects-l (kui olemas)
- Lisab kitsama policy: avalik lugemine konkreetse faili järgi OK, aga `list()` API anon-ile ei tagasta loendit

> Pildid laadivad endiselt `<img src="...">` kaudu. Ainult brute-force file enumeration ei toimi.

---

## Mõjutatud failid kokku

| Fail | Tüüp |
|---|---|
| `index.html` | Edit (CSP + headerid) |
| `public/robots.txt` | Edit (AI blokk) |
| `src/components/RegistrationModal.tsx` | Edit (honeypot) |
| `src/hooks/useContactForm.ts` | Edit (honeypot) |
| `src/pages/Contact.tsx` | Edit (honeypot vorm) |
| `supabase/functions/submit-registration/index.ts` | Edit (honeypot + CORS) |
| `supabase/functions/manage-admin/index.ts` | Edit (CORS) |
| `supabase/functions/generate-excerpt/index.ts` | Edit (CORS) |
| Auth seaded | `configure_auth` tool — HIBP |
| Uus SQL migration | Storage RLS kitsendus |
| `mem://technical-decisions/security-measures` | Update (uus turvatase) |

## Testimisplaan pärast rakendamist

1. Kontaktivorm saadab edukalt
2. Registreerumisvorm töötab (RegistrationModal)
3. Admin login + manage-admin toimingud töötavad
4. Blog/karjäär pildid kuvatakse
5. YouTube embedid blogis töötavad
6. Lovable preview pole CSP poolt blokeeritud
7. Konsoolis pole CSP-rikkumiste hoiatusi
8. Honeypot — täidetud `website` väli → server tagastab ok, aga DB-sse ei salvestata

## Manuaalne kinnitus (sina)

Pärast rakendamist palun kontrolli **Lovable Cloud → Users → Auth Settings**, kas HIBP päringu lüliti on aktiivne.
