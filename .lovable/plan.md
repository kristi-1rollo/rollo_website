

## Piltide positsioneerimine ja zoomimise voimalus

Lisatakse piltide karpimise (crop) funktsionaalsus, mis voimaldab pilti sisse zoomida ja lohistades oigesse kohta liigutada, kui pildi proportsioonid ei kattu soovitud moistmetega.

### Kuidas see toob

- Kui thumbnail voi galeriipildil on moistmed (nt 800x400), aga pilt ise on teistes proportsioonides, ilmub eelvaate peale crop-tookiist
- Slider zoomimiseks (1x kuni 3x)
- Hiire voi puutega lohistamine, et pilti kasti sees oigesse kohta nihutada
- Salvestab positsiooni (`objectPosition`) ja zoomi taseme (`focal_x`, `focal_y`, `zoom`) andmebaasi

### Mida muudetakse

**1. Uus komponent `src/components/ImageCropPositioner.tsx`**
- Kuvab pildi kindlate moistmetega kastis (`overflow: hidden`)
- Zoom slider (1x-3x skaalal)
- Hiire drag voi touch-drag pildi liigutamiseks kasti sees
- Kuvab eelvaate reaalajas
- Valjastab `{ focalX, focalY, zoom }` vaartused (protsendid 0-100)

**2. `MediaGalleryItem` tyybi laiendamine (`src/hooks/useBlogPosts.ts`)**
- Lisanduvad valikulised valjad: `focal_x?: number`, `focal_y?: number`, `zoom?: number`

**3. `src/components/BlogPostEditor.tsx` muudatused**
- Thumbnailile lisatakse crop-positsioneerimine, kui moistmed on maaratud
- Galeriipiltidele lisatakse sama voimalus
- Salvestatakse focal_x, focal_y ja zoom vaartused

**4. `src/components/BlogMediaGallery.tsx` muudatused**
- Kasutab salvestatud `focal_x/focal_y/zoom` vaartusi, et kuvada pilt oiges positsioonis:
  ```css
  object-fit: cover;
  object-position: {focal_x}% {focal_y}%;
  transform: scale({zoom});
  ```

**5. `src/pages/BlogPost.tsx` muudatused**
- Thumbnail kuvamisel kasutatakse samu positsioneerimise vaartusi

### Tehniline detail
- Andmebaasi muudatusi pole vaja -- `focal_x/focal_y/zoom` salvestatakse olemasoleva `media_gallery` JSONB massiivi sisse ja thumbnailile lisanduvad uued state vaartused, mis salvestatakse postituse uuendamisel
- Kogu crop-loogika on puhtalt frontend-pohine (CSS object-fit + object-position + transform scale)
- Drag kasutab `onMouseDown/Move/Up` ja `onTouchStart/Move/End` sündmusi
