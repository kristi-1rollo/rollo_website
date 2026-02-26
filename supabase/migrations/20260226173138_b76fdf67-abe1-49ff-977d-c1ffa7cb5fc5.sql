
-- Replace overly permissive insert policy with one that only allows authenticated users to insert their own profile
DROP POLICY "Service insert profiles" ON public.profiles;

CREATE POLICY "Users insert own profile"
  ON public.profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);
