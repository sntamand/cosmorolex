# Cosmorolex automatic admin

This version uses Supabase so products and images publish automatically.

## Setup

1. Create a Supabase project.
2. In SQL Editor, run:

```sql
create table public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  brand text,
  reference text,
  price numeric not null,
  stock integer default 0,
  description text,
  image_url text,
  published boolean default true,
  created_at timestamptz default now()
);

alter table public.products enable row level security;

create policy "Public can read published products"
on public.products for select
using (published = true);

create policy "Authenticated admins can manage products"
on public.products for all
to authenticated
using (true)
with check (true);
```

3. Create a Storage bucket named `product-images` and make it public.
4. Add storage policies allowing authenticated users to upload and delete files.
5. Create an admin user under Supabase Authentication > Users.
6. Open `supabase-config.js` and replace the URL and anon key.
7. Upload all files to GitHub Pages.

The admin is at `/admin.html`. Uploading a product immediately saves it to Supabase; the storefront reads the live database automatically.
