

# Career (töökuulutused) süsteemi lisamine

## Andmebaas

Loome `career_posts` tabeli, mis järgib `blog_posts` mustrit (lihtsustatud):

```sql
CREATE TABLE public.career_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  location text NOT NULL DEFAULT '',
  type text NOT NULL DEFAULT 'Full-time',  -- Full-time, Part-time, Contract, Internship
  content text NOT NULL DEFAULT '',
  excerpt text NOT NULL DEFAULT '',
  is_published boolean NOT NULL DEFAULT false,
  published_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  author_id uuid
);

ALTER TABLE public.career_posts ENABLE ROW LEVEL SECURITY;

-- Public read published
CREATE POLICY "Public read published careers" ON public.career_posts
  FOR SELECT TO public USING (is_published = true);

-- Admin full access
CREATE POLICY "Admins read all careers" ON public.career_posts
  FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins insert careers" ON public.career_posts
  FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update careers" ON public.career_posts
  FOR UPDATE TO authenticated
  USING (has_role(auth.uid(), 'admin'))
  WITH CHECK (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete careers" ON public.career_posts
  FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'));
```

## Uued failid

1. **`src/hooks/useCareerPosts.ts`** -- hook published/all kuulutuste jaoks + upsert/delete (sama muster nagu `useBlogPosts.ts`)

2. **`src/pages/Careers.tsx`** -- avalik lehekülg, mis kuvab avaldatud kuulutused. Lihtne kaartide vaade: pealkiri, asukoht, tüüp, lühikirjeldus, "Read more" link.

3. **`src/pages/CareerPost.tsx`** -- üksiku kuulutuse vaade (sisu renderdamine sarnaselt BlogPost lehele)

4. **`src/components/CareerPostEditor.tsx`** -- admin redaktor (TipTap nagu blogis), väljad: title, location, type (select), content, is_published toggle

## Muudetavad failid

5. **`src/pages/Admin.tsx`** -- lisame "Careers" tabi, mis kuvab kuulutuste nimekirja ja lubab luua/muuta/kustutada (sama muster nagu BlogTab)

6. **`src/App.tsx`** -- lisame marsruudid `/careers` ja `/careers/:id`

7. **`src/components/Header.tsx`** -- lisame "Careers" nav lingi

