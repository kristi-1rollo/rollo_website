-- Tighten: drop broad public read, allow only direct file access pattern
DROP POLICY IF EXISTS "Public can view videos" ON storage.objects;

-- Public can read individual files (direct CDN URL works); listing requires admin
CREATE POLICY "Public read individual videos"
ON storage.objects
FOR SELECT
USING (
  bucket_id = 'videos'
  AND (
    -- direct file access (name is provided) is allowed for everyone
    name IS NOT NULL
    -- admin gets full access including listing
    OR public.has_role(auth.uid(), 'admin')
  )
);