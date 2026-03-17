-- Add poster_url column
ALTER TABLE public.career_posts ADD COLUMN poster_url text;

-- Create career-posters storage bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('career-posters', 'career-posters', true);

-- Allow public read on career-posters
CREATE POLICY "Public read career posters" ON storage.objects
  FOR SELECT TO public USING (bucket_id = 'career-posters');

-- Allow admins to upload/update/delete career posters
CREATE POLICY "Admins upload career posters" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'career-posters' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update career posters" ON storage.objects
  FOR UPDATE TO authenticated USING (bucket_id = 'career-posters' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete career posters" ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'career-posters' AND public.has_role(auth.uid(), 'admin'));