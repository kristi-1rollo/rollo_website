## Probleem

Career posteri üleslaadimine viskab `new row violates row-level security policy`.

## Diagnostika tulemused

- Bucket `career-posters` on olemas ja `public=true`, ilma mime/size piiranguteta.
- RLS poliitika `Admins upload career posters` lubab INSERT'i kui kasutaja on admin rollis.
- Sisselogitud kasutaja JWT (network logist): `admin@rollo.ee` (id `3ab2615d…`) — `user_roles` tabelis on tal `admin` roll.
- Otsene test: `has_role('3ab2615d…', 'admin')` tagastab `true`.
- Eelmised edukad uploadid (aprillis) tegi sama poliitika alt teine admin (Kristi).

Loogiliselt **peaks** upload õnnestuma. Tähendab — viga tuleb millestki muust, mis pole praeguses snapshot'is näha.

## Kõige tõenäolisem põhjus

`CareerPostEditor` kasutab `upload(path, file, { upsert: true })`. Bucketil ei ole `SELECT` poliitikat (ainult INSERT/UPDATE/DELETE), ja UPDATE poliitikal puudub `WITH CHECK`. Upsert nõuab tegelikult mõlemat (INSERT + UPDATE) policyt korraga ja võib failida `WITH CHECK` puudumise tõttu, isegi kui sihtfail ei eksisteeri (juhuslik UUID).

## Plaan

1. **Lisa puuduvad storage policy'd** `career-posters` (ja samasugune `blog-images`) jaoks:
   - `SELECT` — admin näeb kõiki faile (avalik lugemine käib juba `public=true` bucketi kaudu).
   - Täienda olemasolevat `UPDATE` policyt nii et `WITH CHECK` on samuti määratud (sama tingimus kui `USING`).

2. **Eemalda `upsert: true`** `CareerPostEditor.tsx`'ist — failinimi on juba `crypto.randomUUID()`, nii et kokkupõrget ei teki ja saame puhta INSERT'i, mis on policy'ga garanteeritult lubatud. Sama parandus rakendub `BlogPostEditor`is, kui seal sama muster esineb.

3. **Pärast migratsiooni** palun proovi uuesti posterit üles laadida ja anna teada, kas õnnestus. Kui viga jätkub, vaatame `storage.objects` logi ja täpset HTTP vastust.

## Tehnilised detailid

```sql
-- 1. SELECT policy (lubab admin'il ka private kontekstis lugeda; avalik lugemine niikuinii toimib)
CREATE POLICY "Admins read career posters"
  ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'career-posters' AND has_role(auth.uid(), 'admin'::app_role));

-- 2. UPDATE policyle WITH CHECK
DROP POLICY "Admins update career posters" ON storage.objects;
CREATE POLICY "Admins update career posters"
  ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'career-posters' AND has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (bucket_id = 'career-posters' AND has_role(auth.uid(), 'admin'::app_role));

-- (sama blog-images jaoks kontrollime; UPDATE'l on juba with_check, OK)
```

```ts
// src/components/CareerPostEditor.tsx
await supabase.storage
  .from("career-posters")
  .upload(path, optimized);  // ilma { upsert: true }
```
