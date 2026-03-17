

# Parandused: Career link + Apply nupp + sessiooni püsivus

## 1. Footer career link ei scrolli õigesse kohta
**Fail:** `src/components/Footer.tsx`, rida 78-83

React Routeri `<Link>` ei käivita brauseri natiivset hash-scrollimist teiselt lehelt tulles. Asendan `<Link to="/contact#career">` tavalise `<a href="/contact#career">` elemendiga.

## 2. Apply nupp ei tööta
**Fail:** `src/pages/Contact.tsx`

Modaali "Apply — join@1rollo.com" nupp on juba `<a href="mailto:join@1rollo.com">` — kontrollin, et see on korrektne. Kui see on `<button>` või `<Link>`, muudan `<a href="mailto:join@1rollo.com">` elemendiks.

## 3. Sessiooni püsivus (eelmisest vestlusest kinnitatud plaan)
**Fail:** `src/hooks/useAuth.ts`

Lisa `sessionStorage` põhine kontroll:
- Pärast edukat sisselogimist salvesta `sessionStorage.setItem("rollo_admin_active", "true")`
- `useEffect`-is kontrolli: kui `sessionStorage` märget pole, aga Supabase sessioon on olemas → logi välja
- Brauseri sulgemisel `sessionStorage` tühjendatakse automaatselt → järgmisel avamisel logitakse välja

