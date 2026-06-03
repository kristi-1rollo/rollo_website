# Plan

## 1. Target Unit kaardi uuendus (BlogPost.tsx)

- Lisa uus robotipilt projekti kui Lovable Asset:
  - `lovable-assets create --file /mnt/user-uploads/rollo-target-unit.png --filename rollo-target-unit.png > src/assets/robot/rollo-target-unit.png.asset.json`
- `src/pages/BlogPost.tsx`:
  - Asenda import `rolloRenderP013WebP` uue asset JSON-iga.
  - Muuda `<img>` `object-cover` → `object-contain` ja lisa kerge tume taust (`bg-black/40`), et valgel taustal renderpilt ei näeks ära lõigatud.
  - Muuda link tekst `View 1ROLLO` → `View Product`.

## 2. Puhtad slug-URL-id blogi artiklitele

### Andmebaas (migration)
- Lisa `blog_posts.slug TEXT` (nullable algul, hiljem UNIQUE).
- Lisa Postgres funktsioon `slugify(text)`:
  - lowercase, asenda täpitähed (ä→a, ö→o, õ→o, ü→u, š→s, ž→z), mitte-alfanum → `-`, trim `-`.
- Backfill: `UPDATE blog_posts SET slug = slugify(title)` ning lahenda duplikaadid lisades `-2`, `-3` jne (CTE row_number'iga).
- Lisa `UNIQUE` indeks `slug` veerule + `NOT NULL`.
- Trigger `BEFORE INSERT OR UPDATE OF title, slug`: kui `slug` on tühi, genereeri `slugify(title)`-st; tagame unikaalsuse järelliite lisamisega.

### Frontend
- `useBlogPosts.ts`: lisa `slug: string` `BlogPost` tüübile.
- `src/App.tsx`: muuda route `/blog/:id` → `/blog/:slug` (jätame ka `/blog/:id` tagasiühilduvuseks, mis suunab slugi peale ümber).
- `src/pages/BlogPost.tsx`:
  - Loe `useParams<{ slug: string }>()`.
  - Päring: `.eq("slug", slug)`. Kui ei leita ja parameeter näeb välja nagu UUID, fallback `.eq("id", slug)` + `navigate(\`/blog/\${post.slug}\`, { replace: true })`.
- Kõik lingid (`Blog.tsx`, `BlogPost.tsx` prev/next, sharing URL-id, sitemap, SEO `canonical`/`path`) kasutavad `post.slug`.
- `BlogPostEditor.tsx`: kuvame slug-välja (auto-genereeritud pealkirjast, kuid admin saab muuta). Tühjana saatmisel genereerib trigger automaatselt.

### Tagasiühilduvus
- Vanad `/blog/<uuid>` lingid jäävad töötama (UUID fallback teeb 301 stiilis `navigate replace` slugile), nii et olemasolevad jagatud lingid (nt praegune `5c8b5e59-...`) ei katki.

## Tehnilised märkused
- Eesti tähed teisendatakse ASCII-ks (nt "Tehisintellekt ja turvalisus" → `tehisintellekt-ja-turvalisus`).
- Sitemap.xml regenereerimine pole automaatne — kui vaja, võime hiljem uuendada.
- Admin paneel jääb eesti keelde, public site inglise keelde (vastavalt mälule).
