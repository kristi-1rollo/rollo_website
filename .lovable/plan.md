

# Karjääri süsteemi ümberkorraldus

## Muudatused

### 1. Andmebaas — lisa `poster_url` veerg
Lisa `career_posts` tabelile `poster_url text` veerg plakati pildi jaoks.

### 2. Eemalda "Careers" headerist
`src/components/Header.tsx` — eemalda `{ label: "Careers", to: "/careers" }` nav massiivist.

### 3. Eemalda eraldi Careers ja CareerPost marsruudid
`src/App.tsx` — eemalda `/careers` ja `/careers/:id` marsruudid (sisu kuvatakse nüüd Contact lehel modaalis).

### 4. Muuda Contact lehe "Open Positions" sektsiooni
`src/pages/Contact.tsx`:
- Impordi `usePublishedCareerPosts` hook
- Impordi `Dialog` komponent modaali jaoks
- "Open Positions" kastis kuva aktiivsete kuulutuste pealkirjad (nimekirja kujul)
- Klikkimisel ava modaal, mis kuvab kuulutuse sisu (HTML + DOMPurify) ja plakati pilti
- Kui kuulutusi pole, kuva senine "Send your CV" tekst
- Lisa `useState` valitud kuulutuse ja modaali oleku jaoks

### 5. Lisa plakati pilt CareerPostEditorisse
`src/components/CareerPostEditor.tsx`:
- Lisa pildi üleslaadimise väli (file input, 794x1123px soovitus)
- Lae pilt Supabase Storage'isse (`career-posters` bucket)
- Salvesta URL `poster_url` veergu

### 6. Storage bucket
Loo `career-posters` storage bucket (public read).

### 7. Uuenda `useCareerPosts.ts` tüüpe
Lisa `poster_url` väli `CareerPost` interfacei.

### 8. Tekstide värv
Contact lehe Career sektsioonis muuda `text-slate-300` klassid `text-white` klassideks.

### 9. Kustuta kasutamata failid
Eemalda `src/pages/Careers.tsx` ja `src/pages/CareerPost.tsx` (enam ei kasutata).

