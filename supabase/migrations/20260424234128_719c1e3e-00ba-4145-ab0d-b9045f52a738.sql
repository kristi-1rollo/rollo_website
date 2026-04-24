-- Restrict storage.objects listing for blog-images and career-posters
-- Public CDN URLs continue to work (public buckets bypass RLS for /object/public/*)
-- This prevents anonymous bulk-listing/enumeration via the storage API

DROP POLICY IF EXISTS "Public read blog images" ON storage.objects;
DROP POLICY IF EXISTS "Public read career posters" ON storage.objects;

CREATE POLICY "Authenticated read blog images"
ON storage.objects
FOR SELECT
TO authenticated
USING (bucket_id = 'blog-images');

CREATE POLICY "Authenticated read career posters"
ON storage.objects
FOR SELECT
TO authenticated
USING (bucket_id = 'career-posters');