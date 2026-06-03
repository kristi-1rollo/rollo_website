-- Slugify function (handles Estonian diacritics + general unicode-ish lowering)
CREATE OR REPLACE FUNCTION public.slugify(_input text)
RETURNS text
LANGUAGE plpgsql
IMMUTABLE
SET search_path = public
AS $$
DECLARE
  s text;
BEGIN
  IF _input IS NULL THEN
    RETURN NULL;
  END IF;
  s := lower(_input);
  -- Estonian + common diacritics
  s := translate(s,
    'äöõüšžáàâãåéèêëíìîïóòôøúùûñçÿýÄÖÕÜŠŽ',
    'aoouszaaaaaeeeeiiiioooouuuncyyaoousz'
  );
  -- Replace & with -and-
  s := regexp_replace(s, '&', '-and-', 'g');
  -- Anything not a-z 0-9 becomes a dash
  s := regexp_replace(s, '[^a-z0-9]+', '-', 'g');
  -- Trim leading/trailing dashes
  s := regexp_replace(s, '(^-+|-+$)', '', 'g');
  IF s = '' THEN
    s := 'post';
  END IF;
  RETURN s;
END;
$$;

-- Add slug column
ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS slug text;

-- Backfill with uniqueness using row_number suffix
WITH numbered AS (
  SELECT id,
         public.slugify(title) AS base_slug,
         row_number() OVER (PARTITION BY public.slugify(title) ORDER BY created_at) AS rn
  FROM public.blog_posts
)
UPDATE public.blog_posts bp
SET slug = CASE WHEN n.rn = 1 THEN n.base_slug ELSE n.base_slug || '-' || n.rn END
FROM numbered n
WHERE bp.id = n.id;

-- Enforce NOT NULL + UNIQUE
ALTER TABLE public.blog_posts ALTER COLUMN slug SET NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS blog_posts_slug_key ON public.blog_posts(slug);

-- Trigger: auto-generate slug from title when missing, ensure uniqueness
CREATE OR REPLACE FUNCTION public.blog_posts_set_slug()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  base text;
  candidate text;
  i int := 2;
BEGIN
  IF NEW.slug IS NULL OR length(trim(NEW.slug)) = 0 THEN
    base := public.slugify(NEW.title);
  ELSE
    base := public.slugify(NEW.slug);
  END IF;

  candidate := base;
  WHILE EXISTS (
    SELECT 1 FROM public.blog_posts
    WHERE slug = candidate
      AND id <> COALESCE(NEW.id, '00000000-0000-0000-0000-000000000000'::uuid)
  ) LOOP
    candidate := base || '-' || i;
    i := i + 1;
  END LOOP;

  NEW.slug := candidate;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS blog_posts_set_slug_trigger ON public.blog_posts;
CREATE TRIGGER blog_posts_set_slug_trigger
BEFORE INSERT OR UPDATE OF title, slug ON public.blog_posts
FOR EACH ROW
EXECUTE FUNCTION public.blog_posts_set_slug();