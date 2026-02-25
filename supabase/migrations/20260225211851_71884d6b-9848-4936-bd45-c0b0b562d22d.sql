ALTER TABLE public.blog_posts
  ADD COLUMN IF NOT EXISTS thumbnail_focal_x real DEFAULT 50,
  ADD COLUMN IF NOT EXISTS thumbnail_focal_y real DEFAULT 50,
  ADD COLUMN IF NOT EXISTS thumbnail_zoom real DEFAULT 1;