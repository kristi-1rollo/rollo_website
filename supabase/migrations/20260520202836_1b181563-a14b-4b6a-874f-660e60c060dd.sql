-- Allow admins to delete registrations
CREATE POLICY "Admins delete registrations"
ON public.registrations
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Audit trigger for registration deletions
CREATE OR REPLACE FUNCTION public.audit_registration_delete()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.admin_audit_log (actor_id, action, target_user_id, metadata)
  VALUES (
    COALESCE(auth.uid(), '00000000-0000-0000-0000-000000000000'::uuid),
    'registration_deleted',
    NULL,
    jsonb_build_object(
      'registration_id', OLD.id,
      'name', OLD.name,
      'email', OLD.email,
      'region', OLD.region,
      'topics', OLD.topics,
      'created_at', OLD.created_at
    )
  );
  RETURN OLD;
END;
$$;

CREATE TRIGGER trg_audit_registration_delete
BEFORE DELETE ON public.registrations
FOR EACH ROW
EXECUTE FUNCTION public.audit_registration_delete();