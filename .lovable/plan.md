

## Blogi Uuendused

### 1. Blogikaartide uus kujundus (viitekohaselt)

Praegune kaartide kujundus asendatakse viitepildi stiilis kujundusega:
- Thumbnail'i EI kuvata kaardil (ainult silt, pealkiri, kokkuvõte ja "Read More" link)
- Tag badge rohelisena (nagu viitepildil)
- "Read More ->" link kaardi allosas
- Puhas, minimalistlik disain tumeda taustaga

### 2. Blogiposti detailvaade (`/blog/:id`)

Uus leht, mis avaneb "Read More" lingil klõpsates:
- Kuvab kogu postituse sisu (pealkiri, kuupäev, silt, thumbnail, sisu, galerii)
- Jääb saidi sisse (Layout komponent)
- Tagasi navigeerimise nupp blogileheküljele

### 3. Pildi- ja videogalerii tugi

**Andmebaasi muudatus:** Lisame `blog_posts` tabelisse uue veeru `media_gallery` (JSONB massiiv), mis hoiab galerii elemente:
```
[
  { "url": "...", "type": "image"|"video", "width": 800, "height": 600, "caption": "..." }
]
```

**Storage:** Kasutame olemasolevat `blog-images` bucketi't ka galeriipiltide jaoks.

### 4. Thumbnail'i mõõtmete kuvamine ja muutmine

Admin editoris:
- Pildi üleslaadimisel kuvatakse automaatselt pildi originaalmõõtmed (laius x kõrgus)
- Kasutaja saab sisestada soovitud mõõtmed (laius/kõrgus pikslites)
- Mõõtmed salvestatakse `blog_posts` tabelisse uutesse veergudesse `thumbnail_width` ja `thumbnail_height`

### 5. Galeriihaldur admin editoris

BlogPostEditor'isse lisandub galeriisektsioon:
- Piltide ja videote üleslaadimine
- Iga meediaelemendi jaoks mõõtmete kuvamine ja muutmine
- Elementide järjestamine (drag-and-drop või nooled)
- Elementide eemaldamine

---

### Tehniline plaan

**Andmebaasi migratsioon:**
```sql
ALTER TABLE public.blog_posts
  ADD COLUMN thumbnail_width integer,
  ADD COLUMN thumbnail_height integer,
  ADD COLUMN media_gallery jsonb DEFAULT '[]'::jsonb;
```

**Uued/muudetavad failid:**

1. **`src/pages/BlogPost.tsx`** (UUS) - Blogiposti detailvaade
   - Laeb postituse ID järgi
   - Kuvab täisteksti, thumbnail'i, galerii
   - Galeriipildid kuvatakse originaalformaadis (või kasutaja määratud mõõtmetes)

2. **`src/pages/Blog.tsx`** (MUUDETAV) - Kaartide ümberkujundamine
   - Eemaldame thumbnail'i kaardilt
   - Lisame "Read More ->" lingi
   - Kujundus vastavalt viitepildile

3. **`src/components/BlogPostEditor.tsx`** (MUUDETAV)
   - Thumbnail'i mõõtmete kuvamine ja sisestamine
   - Galeriihalduri sektsioon (piltide/videote üleslaadimine, mõõtmed, järjestamine)

4. **`src/components/BlogMediaGallery.tsx`** (UUS) - Galerii komponent detailvaates
   - Kuvab pildid ja videod
   - Pildid kuvatakse kasutaja määratud mõõtmetes

5. **`src/hooks/useBlogPosts.ts`** (MUUDETAV)
   - Lisa üksiku postituse päring (`usePostById`)
   - Uuenda `BlogPost` tüüpi uute veergudega

6. **`src/App.tsx`** (MUUDETAV) - Lisa uus route `/blog/:id`

