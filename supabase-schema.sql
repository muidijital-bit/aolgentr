-- Run this in Supabase SQL Editor

create table if not exists products (
  id           text primary key,
  idx          text,
  title        text,
  kicker       text,
  desc_short   text,
  body_html    text,
  image_url    text,
  seo_title    text,
  seo_desc     text,
  seo_keywords text,
  updated_at   timestamptz default now()
);

-- Storage bucket for product images
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict do nothing;

-- Allow public read
create policy "Public read" on storage.objects
  for select using (bucket_id = 'product-images');

-- Allow authenticated upload
create policy "Authenticated upload" on storage.objects
  for insert with check (bucket_id = 'product-images');

create policy "Authenticated update" on storage.objects
  for update using (bucket_id = 'product-images');

create policy "Authenticated delete" on storage.objects
  for delete using (bucket_id = 'product-images');

-- Allow anon to read/write products (admin panel uses anon key)
alter table products enable row level security;
create policy "Public read products" on products for select using (true);
create policy "Anon write products" on products for all using (true) with check (true);

-- Migration: add hidden + is_custom columns (run if table already exists)
alter table products add column if not exists hidden boolean default false;
alter table products add column if not exists is_custom boolean default false;
