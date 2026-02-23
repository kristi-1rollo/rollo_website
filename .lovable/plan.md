

# Blog System with Admin Console

## Overview
Transform the static blog page into a dynamic, database-driven blog with thumbnails, sorting, filtering, and an admin console for creating posts.

## What will be built

### 1. Database setup
- **`blog_posts` table** with columns: id, title, excerpt, content, tag, thumbnail_url, published_at, created_at, author_id, is_published
- **Storage bucket** `blog-images` for thumbnails
- **RLS policies**: public read for published posts, authenticated write for admins
- **User roles** table with `app_role` enum (admin, user) and `has_role()` function for secure access control
- **Authentication** with login page for admin users

### 2. Blog page improvements
- Each post card gets a **thumbnail image** at the top
- Posts are **sorted by date** (newest first)
- **Tag filter bar** above the grid to filter posts by category
- Data loaded dynamically from database via react-query

### 3. Admin console (`/admin/blog`)
- Protected route requiring admin role
- **Login page** at `/login`
- **Post list** with edit/delete actions
- **Post editor** with title, excerpt, full content (textarea), tag selector, image upload, publish toggle
- Image upload to storage bucket with preview

## Technical Details

### Database Migration
```sql
-- Role system
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

-- Blog posts table
CREATE TABLE public.blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  excerpt text NOT NULL,
  content text NOT NULL DEFAULT '',
  tag text NOT NULL DEFAULT 'General',
  thumbnail_url text,
  is_published boolean NOT NULL DEFAULT false,
  published_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  author_id uuid REFERENCES auth.users(id) ON DELETE SET NULL
);
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Public can read published posts
CREATE POLICY "Public read published" ON public.blog_posts
  FOR SELECT USING (is_published = true);

-- Admins can do everything
CREATE POLICY "Admins full access" ON public.blog_posts
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Storage bucket for blog images
INSERT INTO storage.buckets (id, name, public) VALUES ('blog-images', 'blog-images', true);

CREATE POLICY "Admins upload blog images" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'blog-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Public read blog images" ON storage.objects
  FOR SELECT USING (bucket_id = 'blog-images');

-- RLS on user_roles
CREATE POLICY "Users read own roles" ON public.user_roles
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
```

### New Files
| File | Purpose |
|------|---------|
| `src/pages/Login.tsx` | Email/password login form |
| `src/pages/AdminBlog.tsx` | Admin console - list, create, edit posts |
| `src/components/BlogPostEditor.tsx` | Post editor form with image upload |
| `src/hooks/useBlogPosts.ts` | React-query hooks for fetching/mutating posts |
| `src/hooks/useAuth.ts` | Auth state hook |

### Modified Files
| File | Change |
|------|--------|
| `src/pages/Blog.tsx` | Fetch from DB, add thumbnails, tag filter, date sort |
| `src/App.tsx` | Add `/login` and `/admin/blog` routes |

### Blog Card with Thumbnail (visual change)
Each card will show a thumbnail image above the tag/title area. If no thumbnail exists, a placeholder gradient is shown.

### Filtering UI
A horizontal row of tag buttons (All, Technology, Security, Field Test, etc.) above the posts grid. Active tag highlighted in brand green.

### Admin Flow
1. Navigate to `/login`, sign in with email/password
2. Navigate to `/admin/blog`
3. See list of all posts (published and drafts)
4. Click "New Post" to open editor
5. Fill in title, excerpt, content, select tag, upload thumbnail
6. Toggle publish and save
