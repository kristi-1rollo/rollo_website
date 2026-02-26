

## Blogi suururendus -- 13 parandust

See plaan katab koik kasutaja soovid uhes terviklikus uuenduses.

---

### 1. YouTube embed ilma reklaamita

**Fail:** `src/components/RichTextEditor.tsx`

YouTube laienduse konfiguratsiooni lisada `nocookie: true` ja `enableIFrameApi: false`. See kasutab `youtube-nocookie.com` domeeni, mis ei naita soovitusi ega reklaami.

---

### 2. Galerii karussell koos lightbox-iga

**Fail:** `src/components/BlogMediaGallery.tsx`

Praegune grid-vaade asendada karusselli ja lightbox-i lahendusega:
- Pisipildid kuvatakse horisontaalses karusselli-ribas (Embla Carousel, mis on juba installitud)
- Pildile klikates avaneb taissuuruses lightbox (Dialog komponent Radix UI-st, mis on juba olemas)
- Lightbox-is on eelmise/jargmise nupp ja sulgemise nupp
- Videod kuvatakse endiselt inline, kuid samuti karusselli osana

---

### 3. Blogilehe header pilt 16:9 formaadis

**Fail:** `src/pages/BlogPost.tsx`

Praegu on thumbnail konteineri `maxWidth` ja `maxHeight` maaratud originaalpildi mootudega. Asendame selle fikseeritud `aspectRatio: "16/9"` stiiliga, et header-pilt oleks alati maastiku-formaadis.

---

### 4. Admin liidese "Back" nupu parandus

**Fail:** `src/pages/Admin.tsx`

Praegu kasutab BlogTab "Cancel" nuppu, mis kutsub `onDone()` ja laheb tagasi postituste nimekirja. Probleem on selles, et brauseri "Back" nupp viib `/login` lehele, sest kasutaja tuli sealt. Lahendus: admin lehe navigeerimisel kasutada `replace: true`, et login leht ei jaaks brauseri ajalukku.

**Fail:** `src/pages/Login.tsx` -- lisada `navigate("/admin", { replace: true })` peale edukat sisselogimist.

---

### 5. Automaatne draft salvestamine

**Fail:** `src/components/BlogPostEditor.tsx`

Lisa automaatne draft salvestamine localStorage-sse:
- Iga 10 sekundi tagant salvestatakse vorm `localStorage`-sse votkega `blog-draft-{id}` (uue postituse puhul `blog-draft-new`)
- Redaktori avamisel kontrollitakse, kas on salvestatud draft, ja kasutajale pakutakse selle taastamist
- Eduka salvestamise jarel kustutatakse draft localStorage-st
- See kaitseb andmete kadumise eest koigil juhtudel (brauseri krahh, kogemata navigeerimine jne)

---

### 6. Kasutajate haldamine admin paneelil

**Uus fail:** `src/components/AdminUsersTab.tsx`

Lisa admin paneelile uus tab "Users", kus admin saab:
- Naha olemasolevaid kasutajaid (user_roles tabelis)
- Lisada uusi adminikasutajaid (e-posti jargi)
- Eemaldada admin-oigusi

**Uus edge function:** `supabase/functions/manage-admin/index.ts`
- Kontrollib, et kutsuv kasutaja on admin
- Lubab lisada/eemaldada admin-rolli teistelt kasutajatelt
- Salvestab muudatuste ajaloo

**Uus tabel:** `admin_audit_log`
- Salvestab koik admin-tegevused: kes tegi, mida tegi, kellele tegi, millal
- Veerud: `id`, `actor_id`, `action` (nt "grant_admin", "revoke_admin", "create_post", "delete_post"), `target_user_id`, `metadata`, `created_at`
- RLS: ainult adminid saavad lugeda

**Fail:** `src/pages/Admin.tsx` -- lisada "Users" ja "Audit Log" tab-id

---

### 7. Blogiteksti sektsioonide fade-in efekt

**Fail:** `src/pages/BlogPost.tsx`

Praegu on kogu content uhes `ScrollFadeIn` wrapperis, mis tahendab et kogu tekst ilmub korraga. Lahendus: parsi HTML content osadeks H2 sektsioonide jargi ja mappi iga sektsioon eraldi `ScrollFadeIn` komponenti. Iga sektsioon saab oma fade-in efekti, kui kasutaja kerib selle juurde. Samuti tagab see, et eraldavad elemendid (border-t + primary accent line) on naitavad.

---

### 8. Piltide proportsioonilukk editoris

**Fail:** `src/components/BlogPostEditor.tsx`

Lisa thumbnail width/height valjade vahele lukuikoon:
- Vaikimisi lukus (proportsioonid seotud)
- Klikates saab avada (vabad mootmed)
- Kui lukus ja muudad laiust, arvutatakse korgus automaatselt originaalse kuvasuhte pohjal ja vastupidi
- Sama loogika galerii piltide W/H valjadele

---

### 9. Galerii piltide jarjestamine lohistades

**Fail:** `src/components/BlogPostEditor.tsx`

Praegu on ArrowUp/ArrowDown nupud olemas, aga lohistamine on mugavam. Kuna drag-and-drop teekide installimine pole vajalik (HTML5 DnD API), implementeerime lihtsa lohistamise:
- `draggable` atribuut galerii elementidele
- `onDragStart`, `onDragOver`, `onDrop` handlid jarjestuse muutmiseks
- Visuaalne indikaator lohistamise ajal

---

### 10. Teksti vaikimisi rooopjoondus ja loetelu stiilid

**Fail:** `src/components/RichTextEditor.tsx`

Lisa editori `editorProps.attributes.class`-i:
- `[&_p]:text-justify` -- paragrahvid vaikimisi roopjoonduses
- `[&_h1]:text-left [&_h2]:text-left [&_h3]:text-left` -- pealkirjad vasakjoonduses
- `[&_ul]:text-left [&_ol]:text-left` -- loetelud vasakjoonduses
- `[&_li]:leading-snug` -- loetelude kitsam reavahe

**Fail:** `src/pages/BlogPost.tsx` -- samad stiilid prose div-ile, et ka avalikus vaates kehtiks.

---

### 11. Sticky toolbar redaktoris

**Fail:** `src/components/RichTextEditor.tsx`

Lisa toolbarile `sticky top-0 z-10` klass, et see jaaaks naitavaks ka pika teksti puhul. Toolbar on juba eraldi div-is, nii et piisab CSS-klasside lisamisest.

---

### 12. Pildi laiuse % nuppude parandus

**Fail:** `src/components/RichTextEditor.tsx`

Praegune `setImageWidth` funktsioon kasutab `state.doc.nodesBetween(from, to, ...)`, mis tootab ainult siis, kui pilt on selekteeritud. Probleem: kasutaja ei pruugi pilti tapselt selekteerida. Parandus:
- Kontrolli kas praegune selection on image node (nodeSelection) voi kas kursor on pildi lahedal
- Kui pilt on selekteeritud, rakenda laiuse stiil korrektselt
- Lisa visuaalne tagasiside -- aktiivne nupp naitab praegust laiust

---

### 13. ImageCropPositioner kuvasuhte parandus

**Fail:** `src/components/ImageCropPositioner.tsx` -- lisa `displayAspectRatio` prop
**Fail:** `src/components/BlogPostEditor.tsx` -- anna `displayAspectRatio="16/9"` kaasa

---

### Tehnilised detailid

**Uued failid:**
- `src/components/AdminUsersTab.tsx` -- kasutajate halduse tab
- `supabase/functions/manage-admin/index.ts` -- admin-halduse edge function

**Uus migratsioon:**
- `admin_audit_log` tabel koos RLS-iga

**Muudetavad failid:**
- `src/components/RichTextEditor.tsx` -- YouTube nocookie, sticky toolbar, text-justify, % nuppude fix
- `src/components/BlogMediaGallery.tsx` -- karussell + lightbox
- `src/pages/BlogPost.tsx` -- 16:9 header, sektsioonide fade-in, teksti stiilid
- `src/pages/Admin.tsx` -- Users tab, Audit Log tab
- `src/pages/Login.tsx` -- replace navigeerimine
- `src/components/BlogPostEditor.tsx` -- draft salvestamine, proportsioonilukk, drag reorder, displayAspectRatio
- `src/components/ImageCropPositioner.tsx` -- displayAspectRatio prop

**Uusi soltuvusi ei lisata** -- koik vajalik (Embla Carousel, Radix Dialog, HTML5 DnD) on juba olemas.

