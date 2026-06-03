REVOKE EXECUTE ON FUNCTION public.slugify(text) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.blog_posts_set_slug() FROM PUBLIC, anon, authenticated;