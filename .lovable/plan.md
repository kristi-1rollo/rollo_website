

# Koodi puhastamine ja professionaalseks muutmine

## Tuvastatud probleemid

### 1. Vigane edge function URL (KRIITILINE)
`src/pages/Product.tsx` rida 21 kasutab **vale Supabase projekti URL-i** (`iysxjfluapydbocywubv`), samas kui kogu muu kood kasutab `igdxbtuaajrhvuqtwhmm`. See tähendab, et Product lehe reservatsiooni vorm ei tööta.

### 2. Kasutamata failid (dead code)
Järgmisi komponente ei importeerita kuskil (v.a üksteise sees):
- `src/components/AamirLayerPreview.tsx`
- `src/components/CustomCursor.tsx`
- `src/components/HeroRobotSprite.tsx`
- `src/components/HeroSection.tsx`
- `src/components/OrbitalNode.tsx` (ainult RadialOrbitalTimeline sees)
- `src/components/ROICalculator.tsx`
- `src/components/RaaSSection.tsx`
- `src/components/RadialOrbitalTimeline.tsx` (ainult AamirLayerPreview ja SpecificationsSection sees)
- `src/components/CTASection.tsx`
- `src/components/FeaturesSection.tsx`
- `src/components/SpecificationsSection.tsx`
- `src/components/UseCasesSection.tsx`
- `src/components/FAQSection.tsx`
- `src/components/NavLink.tsx`
- `src/App.css` - Vite boilerplate, ei kasutata kuskil

### 3. Kasutamata impordid
- `src/pages/Index.tsx` rida 4: `AlertTriangle` importeeritud aga mitte kasutatud

### 4. Duplikeeritud loogika (DRY rikkumine)
**Kontaktvormi loogika** on kopeeritud kolme kohta:
- `src/pages/Contact.tsx` - kontaktivorm
- `src/pages/Product.tsx` - reservatsioonivorm
- `src/components/RegistrationModal.tsx` - modaalvorm

Kõigil kolmel on identsed: `deploymentAreaOptions`, `handleInputChange`, `handleDeploymentAreaToggle`, `handleSubmit` ja edge function kutse. Need tuleks refaktoreerida ühiseks hookiks (`useContactForm`).

### 5. Koodi stiili ebakõlad
- `src/pages/AboutUs.tsx`: `import { Link }` on rida 28, **pärast** andmemassiivi (rida 1-26). Impordid peavad olema faili alguses.
- Segamini eesti- ja ingliskeelsed stringid UI-s (admin paneel eesti, muu inglise). See on teadlik otsus, mitte viga, aga väärib mainimist.

### 6. `src/App.css` on Vite boilerplate
Sisaldab `#root { max-width: 1280px }` ja muid Vite algse template stiile. See **ei ole mitte kuskil importeeritud** ja on rämps.

### 7. `any` tüübid
- `src/components/BlogPostEditor.tsx` rida 51: `pendingDraft` on tüüp `any`
- `src/pages/Admin.tsx` rida 31, 205: `err: any` catch-plokis
- Mitmed muud `as any` cast'id

### 8. Edge function URL peaks tulema env muutujast
Contact.tsx kasutab `VITE_SUPABASE_URL`-i baasil korrektset URL-i, aga Product.tsx on hardcode'itud vale URL. Mõlemas kohas peaks olema `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/submit-registration`.

---

## Plaan

### Samm 1: Paranda kriitiline viga
- `Product.tsx`: asenda hardcoded URL env-muutujaga: `` `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/submit-registration` ``

### Samm 2: Kustuta kasutamata failid
Kustutan 14 kasutamata komponendifaili:
- `AamirLayerPreview.tsx`, `CustomCursor.tsx`, `HeroRobotSprite.tsx`, `HeroSection.tsx`, `OrbitalNode.tsx`, `ROICalculator.tsx`, `RaaSSection.tsx`, `RadialOrbitalTimeline.tsx`, `CTASection.tsx`, `FeaturesSection.tsx`, `SpecificationsSection.tsx`, `UseCasesSection.tsx`, `FAQSection.tsx`, `NavLink.tsx`
- `src/App.css`

### Samm 3: Eemalda kasutamata import
- `Index.tsx`: eemalda `AlertTriangle` impordist

### Samm 4: Paranda impordijärjekord
- `AboutUs.tsx`: liiguta `import { Link }` faili algusesse, enne andmemassiivi

### Samm 5: Refaktoori kontaktvormi loogika ühiseks hookiks
Loon `src/hooks/useContactForm.ts`:
- Ühine `deploymentAreaOptions` massiiv
- Ühine `formData` state ja handlerid
- Ühine `handleSubmit` loogika edge function kutsega
- Kasutan seda hooksi `Contact.tsx`, `Product.tsx` ja `RegistrationModal.tsx` sees

### Samm 6: Kasuta env-muutujat edge function URL-is
- `RegistrationModal.tsx` rida 65 ja `Contact.tsx` rida 6: muuda URL kasutama env muutujat sarnaselt

