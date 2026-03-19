

# Build error fix + career posterite optimeerimine

## 1. Build error parandus
**Fail:** `src/components/ScrollControlledVideo.tsx` rida 87
- Eemalda `loading="lazy"` — `<video>` elemendil pole seda atribuuti. Video laisk laadimine on juba tagatud `preload="metadata"` kaudu.

## 2. Career posterite üleslaadimise optimeerimine
**Fail:** `src/components/CareerPostEditor.tsx`
- Kasuta olemasolevat `optimizeImage` funktsiooni (või `uploadThumbnail` mis juba sisaldab optimeerimist) career posterite üleslaadimiseks, et need samuti automaatselt WebP formaati konverteeritaks ja suurust vähendataks.

## 3. OptimizedImage komponent (kuva-aegne)
**Uus fail:** `src/components/OptimizedImage.tsx`
- Universaalne `<img>` wrapper mis lisab automaatselt:
  - `loading="lazy"` + `decoding="async"` (v.a. above-the-fold pildid, kus `priority={true}`)
  - `width` ja `height` atribuudid CLS vältimiseks
  - Supabase Storage piltidele `?width=X&format=webp` transformatsiooni parameetrid `srcSet`-is

Seda saab järk-järgult rakendada olemasolevatele komponentidele — kohe automaatset asendust ei tee, aga komponent on valmis kasutamiseks.

### Muudetavad failid
1. `src/components/ScrollControlledVideo.tsx` — eemalda `loading="lazy"`
2. `src/components/CareerPostEditor.tsx` — lisa pildi optimeerimine üleslaadimisele
3. `src/components/OptimizedImage.tsx` — uus komponent

