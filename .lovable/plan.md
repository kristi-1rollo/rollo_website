

# Kolm parandust: Apply nupp → kopeeri, Admin back-navigatsioon, Draft turvakontroll

## 1. Apply nupp → kopeeri lõikelauale
**Fail:** `src/pages/Contact.tsx` (read 406-412)

`mailto:` link ei pruugi kõigis keskondades töötada. Muudan nupu funktsiooniks e-posti aadressi kopeerimise lõikelauale `navigator.clipboard.writeText("join@1rollo.com")` abil ning näitan toast-teadet "Email copied to clipboard!". Nupu tekst muutub hetkeks "Copied!" tagasisideks.

## 2. Admin back-navigatsioon viib paneelist välja
**Probleem:** Admin paneelis on Blog ja Careers tabid, kus redaktor renderdatakse `editing` state'i põhjal (`useState`). Kui kasutaja vajutab brauseri "Back" nuppu, ei lähe ta mitte redaktorist tagasi loendisse, vaid brauseri ajaloos sammu tagasi (nt `/login` lehele).

**Lahendus:** `BlogTab` ja `CareersTab` komponentides kasutan `window.history.pushState` + `popstate` kuulajat:
- Kui `editing` muutub aktiivseks, lisan brauseri ajalukku uue kirje (`pushState`)
- Kui kasutaja vajutab Back, tabab `popstate` sündmust → seab `editing` tagasi `null`-iks (naaseb loendisse)
- See hoiab kasutaja admin paneelis ega vii teda välja

**Muudetav fail:** `src/pages/Admin.tsx` — `BlogTab` ja `CareersTab` komponendid

## 3. Draft turvakontroll (unsaved changes warning)
**Probleem:** Kui pooleli on blogipostituse või töökuulutuse loomine/muutmine ja kasutaja üritab lahkuda (Cancel, Back, tabi sulgemine), kaob töö kaduma.

**Lahendus:**
- `BlogPostEditor` ja `CareerPostEditor` komponentidesse lisan `beforeunload` sündmuse kuulaja (kaitseb brauseri sulgemise/refreshi eest)
- `BlogTab` ja `CareersTab`-is lisan Cancel/Back toimingule `AlertDialog` kinnitusdialoogi: "Unsaved changes will be lost. Save as draft or discard?"
  - **Save Draft** — kutsub upsert mutatsiooni `is_published: false`-ga, siis sulgeb redaktori
  - **Discard** — sulgeb redaktori ilma salvestamata
  - **Cancel** — jääb redaktorisse

Lisa iga redaktorisse `isDirty` lipp (jälgib, kas sisu on muutunud). Kontrolli seda enne lahkumist.

**Muudetavad failid:**
- `src/pages/Admin.tsx` — BlogTab ja CareersTab: AlertDialog + popstate loogika
- `src/components/BlogPostEditor.tsx` — `isDirty` tracking + `beforeunload` + `onDirtyChange` callback
- `src/components/CareerPostEditor.tsx` — sama loogika

### Tehniline kokkuvõte muudetavatest failidest:
1. **`src/pages/Contact.tsx`** — Apply nupp → clipboard copy + toast
2. **`src/pages/Admin.tsx`** — pushState/popstate back-navigatsioon + AlertDialog unsaved changes
3. **`src/components/BlogPostEditor.tsx`** — isDirty jälgimine + beforeunload
4. **`src/components/CareerPostEditor.tsx`** — isDirty jälgimine + beforeunload

