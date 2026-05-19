CREATE POLICY "Admins read career posters"
  ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'career-posters' AND has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Admins update career posters" ON storage.objects;
CREATE POLICY "Admins update career posters"
  ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'career-posters' AND has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (bucket_id = 'career-posters' AND has_role(auth.uid(), 'admin'::app_role));