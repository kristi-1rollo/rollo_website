

## Blogi terviklik uuendus -- 7 parandust

### 1. Thumbnail pildi positsioneerimine (drag) juba olemas

Thumbnail crop/drag funktsioon on juba implementeeritud `ImageCropPositioner` komponendiga. See ilmub pärast pildi üleslaadimist, kui width ja height on määratud. Praegu on probleem selles, et see on natuke peidetud -- lisame selgema visuaalse vihje.

### 2. Thumbnail üleslaadimise juhis

Praegune üleslaadimise nupp näitab ainult "Upload image". Lisame kasti sisse soovitusliku suuruse ja formaadi info:
- "Soovituslik: 1200 x 630 px, JPG/PNG/WebP"
- See ilmub enne pildi lisamist tühjas upload-kastis

### 3. Blogi eelvaate kaardid -- excerpt parandused

**Rööpjoondus**: Lisada `text-justify` excerpt tekstile
**Fikseeritud kõrgus**: Excerpt saab `line-clamp-3` (3 rida max), mis hoiab kõik kaardid ühtse kõrgusega. Ülejääv tekst lõigatakse ära ellipsisega.

### 4. Kogu kaart klikatav

Praegu saab blogi artiklit avada ainult "Read More" lingi kaudu. Muudame kogu `<article>` kaardi klikatavaks, kasutades `<Link>` wrapper-it, säilitades "Read More" visuaalse lingi.

### 5. AI-põhine SEO lühikirjelduse genereerimine

Lisame BlogPostEditor-isse "Generate with AI" nupu excerpt välja kõrvale:
- Loob uue edge function `supabase/functions/generate-excerpt/index.ts`
- Kasutab Lovable AI Gateway-d (`google/gemini-3-flash-preview`) 
- Saadab blogipostituse sisu ja saab tagasi professionaalse SEO-optimeeritud lühikirjelduse (max 160 tähemärki)
- Admin saab genereeritud teksti alati käsitsi muuta

### 6. Teksti sisse lisatud piltide suuruse muutmine ja stiilid

TipTap Image laiendust laiendame:
- Lisame pildi suuruse muutmise toe (`resizable` konfiguratsioon) -- kasutame custom node view-d, mis lisab pildile resize-handle'd
- Lisame pildile varju/raami valikud tööriistaribal: "shadow" ja "rounded" efektid CSS klassidega
- Piltide stiilid: `shadow-lg shadow-black/20 rounded-lg` lisatakse automaatselt, et pilt sulanduks lehte

### 7. Piltide suuruse muutmine redaktoris (lihtsustatud lahendus)

Kuna TipTap-i täielik resizable node view on keeruline, kasutame pragmaatilist lahendust:
- Pildi lisamisel küsitakse laiuse protsenti (25%, 50%, 75%, 100%)
- Lisame pildi tööriistariba nupud suuruse valimiseks
- Pildile lisatakse inline `width` stiil

---

### Tehnilised detailid

**Uued failid:**
- `supabase/functions/generate-excerpt/index.ts` -- AI excerpt edge function

**Muudetavad failid:**
- `src/pages/Blog.tsx` -- kaart klikatavaks, excerpt line-clamp + justify
- `src/components/BlogPostEditor.tsx` -- thumbnail juhis, AI excerpt nupp
- `src/components/RichTextEditor.tsx` -- pildi suuruse nupud, pildi stiilid (shadow/frame)
- `src/pages/BlogPost.tsx` -- pildi stiilid prose div-is

**Sõltuvused:** Uusi sõltuvusi ei lisata

**Edge function:** `generate-excerpt` kasutab `LOVABLE_API_KEY` (juba olemas) ja Lovable AI Gateway-d. Prompt: "Generate a professional SEO meta description (max 160 chars) in the same language as the content."

