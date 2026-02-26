
CREATE OR REPLACE FUNCTION public.audit_blog_post_changes()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _action text;
  _target_id uuid;
  _meta jsonb;
BEGIN
  IF TG_OP = 'INSERT' THEN
    _action := 'blog_post_created';
    _target_id := NEW.author_id;
    _meta := jsonb_build_object('post_id', NEW.id, 'title', NEW.title, 'is_published', NEW.is_published);
  ELSIF TG_OP = 'UPDATE' THEN
    _action := 'blog_post_updated';
    _target_id := NEW.author_id;
    _meta := jsonb_build_object('post_id', NEW.id, 'title', NEW.title, 'is_published', NEW.is_published);
    IF OLD.is_published IS DISTINCT FROM NEW.is_published THEN
      IF NEW.is_published THEN
        _action := 'blog_post_published';
      ELSE
        _action := 'blog_post_unpublished';
      END IF;
    END IF;
  ELSIF TG_OP = 'DELETE' THEN
    _action := 'blog_post_deleted';
    _target_id := OLD.author_id;
    _meta := jsonb_build_object('post_id', OLD.id, 'title', OLD.title);
  END IF;

  INSERT INTO public.admin_audit_log (actor_id, action, target_user_id, metadata)
  VALUES (COALESCE(auth.uid(), '00000000-0000-0000-0000-000000000000'::uuid), _action, _target_id, _meta);

  IF TG_OP = 'DELETE' THEN
    RETURN OLD;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_audit_blog_posts
AFTER INSERT OR UPDATE OR DELETE ON public.blog_posts
FOR EACH ROW EXECUTE FUNCTION public.audit_blog_post_changes();
