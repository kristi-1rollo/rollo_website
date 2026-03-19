

# Blogi thumbnail ja päisepildi parandus + build error fix

## Probleem
1. **Blog listing (Blog.tsx)**: Grid-kaartidel on thumbnail kõrgus fikseeritud `h-48`-ga, aga puudub 16:9 aspect ratio. Hero-postitusel pole samuti fikseeritud kuvasuhet. Focal point / zoom väärtusi ei kasutata üldse.
2. **BlogPostHeader**: Kasutab `aspect-[21/9]` (mitte 16:9) ja ei rakenda focal point / zoom positsioneerimist.
3. **Build error**: `ScrollControlledVideo.tsx` rida 87 — `loading="lazy"` ei ole `<video>` elemendi lubatud atribuut TypeScriptis.

## Lahendus

### 1. Build error fix
**Fail:** `src/components/ScrollControlledVideo.tsx` rida 87
- Eemalda `loading="lazy"` atribuut `<video>` elemendilt (see on ainult `<img>` jaoks).

### 2. Blog listing thumbnailid — 16:9 + focal point
**Fail:** `src/pages/Blog.tsx`

**Hero postitus (rida 79–91):**
- Muuda `dispatch-hero__image` sisu: lisa `aspect-[16/9]` konteinerile
- Lisa `style={{ objectPosition, transform, transformOrigin }}` kasutades `thumbnail_focal_x/y` ja `thumbnail_zoom`

**Grid kaardid (rida 131–143):**
- Asenda `h-48` → `aspect-[16/9] w-full` konteinerile
- Lisa focal point / zoom stiilid `<img>` elemendile sarnaselt hero-le

### 3. BlogPostHeader — 16:9 + focal point
**Fail:** `src/components/BlogPostHeader.tsx`

- Muuda `aspect-[21/9]` → `aspect-[16/9]`
- Lisa propsidesse `focalX`, `focalY`, `zoom` (vaikeväärtused 50, 50, 1)
- Rakenda `objectPosition` ja `transform/transformOrigin` `<img>` elemendile

**Fail:** `src/pages/BlogPost.tsx` rida 137–141
- Edasta `BlogPostHeader`-ile `focalX={post.thumbnail_focal_x}`, `focalY={post.thumbnail_focal_y}`, `zoom={post.thumbnail_zoom}`

### Muudetavad failid:
1. `src/components/ScrollControlledVideo.tsx` — eemalda `loading`
2. `src/pages/Blog.tsx` — 16:9 aspect ratio + focal/zoom stiilid
3. `src/components/BlogPostHeader.tsx` — 16:9 + focal point propsid
4. `src/pages/BlogPost.tsx` — edasta focal point propsid headerile

