-- Create public videos bucket with 100MB limit
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'videos',
  'videos',
  true,
  104857600, -- 100 MB
  ARRAY['video/mp4', 'video/webm', 'video/quicktime']
)
ON CONFLICT (id) DO UPDATE
  SET public = EXCLUDED.public,
      file_size_limit = EXCLUDED.file_size_limit,
      allowed_mime_types = EXCLUDED.allowed_mime_types;

-- Public read access
CREATE POLICY "Public can view videos"
ON storage.objects
FOR SELECT
USING (bucket_id = 'videos');

-- Admin-only upload
CREATE POLICY "Admins can upload videos"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'videos'
  AND public.has_role(auth.uid(), 'admin')
);

-- Admin-only update
CREATE POLICY "Admins can update videos"
ON storage.objects
FOR UPDATE
USING (
  bucket_id = 'videos'
  AND public.has_role(auth.uid(), 'admin')
);

-- Admin-only delete
CREATE POLICY "Admins can delete videos"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'videos'
  AND public.has_role(auth.uid(), 'admin')
);