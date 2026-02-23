
-- Fix: enable RLS on registrations table (pre-existing table)
CREATE POLICY "Allow public insert registrations" ON public.registrations
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins read registrations" ON public.registrations
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
