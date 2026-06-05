-- Jr Jim Product Hub — Supabase schema

create table if not exists waitlist (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  product text not null,
  source text default '/',
  created_at timestamptz not null default now()
);

create index if not exists waitlist_created_at_idx on waitlist (created_at desc);
create index if not exists waitlist_product_idx on waitlist (product);

create table if not exists feedback (
  id uuid primary key default gen_random_uuid(),
  product text not null,
  type text not null check (type in ('suggestion', 'issue', 'requirement')),
  content text not null,
  created_at timestamptz not null default now()
);

create index if not exists feedback_product_idx on feedback (product);

create table if not exists analytics_events (
  id uuid primary key default gen_random_uuid(),
  event text not null,
  product text,
  source text,
  meta jsonb default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists analytics_event_idx on analytics_events (event);
create index if not exists analytics_created_at_idx on analytics_events (created_at desc);
