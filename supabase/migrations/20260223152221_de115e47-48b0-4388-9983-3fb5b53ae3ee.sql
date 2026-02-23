ALTER TABLE public.blog_posts
  ADD COLUMN IF NOT EXISTS thumbnail_width integer,
  ADD COLUMN IF NOT EXISTS thumbnail_height integer,
  ADD COLUMN IF NOT EXISTS media_gallery jsonb DEFAULT '[]'::jsonb;