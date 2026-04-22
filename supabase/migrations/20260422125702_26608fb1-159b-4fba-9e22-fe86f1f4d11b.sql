CREATE POLICY "Admins update blog images"
ON storage.objects
FOR UPDATE
TO authenticated
USING ((bucket_id = 'blog-images') AND public.has_role(auth.uid(), 'admin'))
WITH CHECK ((bucket_id = 'blog-images') AND public.has_role(auth.uid(), 'admin'));