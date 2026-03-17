
CREATE TABLE public.career_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  location text NOT NULL DEFAULT '',
  type text NOT NULL DEFAULT 'Full-time',
  content text NOT NULL DEFAULT '',
  excerpt text NOT NULL DEFAULT '',
  is_published boolean NOT NULL DEFAULT false,
  published_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  author_id uuid
);

ALTER TABLE public.career_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read published careers" ON public.career_posts
  FOR SELECT TO public USING (is_published = true);

CREATE POLICY "Admins read all careers" ON public.career_posts
  FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins insert careers" ON public.career_posts
  FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins update careers" ON public.career_posts
  FOR UPDATE TO authenticated
  USING (has_role(auth.uid(), 'admin'))
  WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins delete careers" ON public.career_posts
  FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'));
