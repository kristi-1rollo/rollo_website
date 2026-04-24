-- Remove broad SELECT entirely. Public URLs (/object/public/*) still work because buckets remain public.
-- Only path-based listing via the API is now blocked.
DROP POLICY IF EXISTS "Authenticated read blog images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated read career posters" ON storage.objects;