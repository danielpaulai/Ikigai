-- ============================================================
-- Ikigai App — Supabase Schema
-- Run this in Supabase Dashboard → SQL Editor
-- ============================================================

-- 1. Sessions — one row per Ikigai session
create table if not exists sessions (
  id            uuid primary key,
  mode          text not null check (mode in ('short', 'long')),
  status        text not null default 'active' check (status in ('active', 'completed', 'abandoned')),
  started_at    timestamptz not null default now(),
  completed_at  timestamptz,
  duration_ms   integer,
  question_count integer default 0,

  -- Geo (captured from Vercel headers — zero user friction)
  country       text,
  country_code  text,
  region        text,
  city          text,
  latitude      real,
  longitude     real,
  timezone      text,

  -- Device
  device_type   text check (device_type in ('mobile', 'tablet', 'desktop')),
  browser       text,
  os            text,
  screen_width  integer,

  -- Attribution
  referrer      text,
  utm_source    text,
  utm_medium    text,
  utm_campaign  text,
  utm_content   text,
  landing_page  text,

  -- Privacy-safe IP fingerprint (SHA-256 hash, not raw IP)
  ip_hash       text,

  created_at    timestamptz not null default now()
);

-- 2. Messages — every message for conversation analysis
create table if not exists session_messages (
  id            uuid primary key default gen_random_uuid(),
  session_id    uuid not null references sessions(id) on delete cascade,
  role          text not null check (role in ('user', 'assistant')),
  content       text not null,
  circle        text,
  circle_label  text,
  message_index integer not null,
  created_at    timestamptz not null default now()
);

-- 3. Results — generated Ikigai profiles
create table if not exists session_results (
  id              uuid primary key default gen_random_uuid(),
  session_id      uuid unique not null references sessions(id) on delete cascade,
  results         jsonb not null,
  archetype_name  text,
  ikigai_statement text,
  share_slug      text unique,
  created_at      timestamptz not null default now()
);

-- 4. Events — granular analytics (circle completions, downloads, shares, etc.)
create table if not exists analytics_events (
  id          uuid primary key default gen_random_uuid(),
  session_id  uuid references sessions(id) on delete set null,
  event       text not null,
  properties  jsonb default '{}',
  created_at  timestamptz not null default now()
);

-- ============================================================
-- Indexes for fast analytics queries
-- ============================================================

create index if not exists idx_sessions_mode          on sessions(mode);
create index if not exists idx_sessions_status        on sessions(status);
create index if not exists idx_sessions_country_code  on sessions(country_code);
create index if not exists idx_sessions_started_at    on sessions(started_at desc);
create index if not exists idx_sessions_completed_at  on sessions(completed_at desc);

create index if not exists idx_messages_session       on session_messages(session_id);
create index if not exists idx_messages_role          on session_messages(role);

create index if not exists idx_results_session        on session_results(session_id);
create index if not exists idx_results_share_slug     on session_results(share_slug) where share_slug is not null;
create index if not exists idx_results_archetype      on session_results(archetype_name);

create index if not exists idx_events_session         on analytics_events(session_id);
create index if not exists idx_events_event           on analytics_events(event);
create index if not exists idx_events_created_at      on analytics_events(created_at desc);

-- ============================================================
-- Row Level Security
-- ============================================================

alter table sessions enable row level security;
alter table session_messages enable row level security;
alter table session_results enable row level security;
alter table analytics_events enable row level security;

-- Service role (server-side) bypasses RLS automatically.
-- Public read for shared results only:
create policy "Public can read shared results"
  on session_results for select
  using (share_slug is not null);

-- ============================================================
-- Useful views for the analytics dashboard
-- ============================================================

create or replace view analytics_overview as
select
  count(*)                                               as total_sessions,
  count(*) filter (where status = 'completed')           as completed_sessions,
  count(*) filter (where status = 'abandoned')           as abandoned_sessions,
  round(
    100.0 * count(*) filter (where status = 'completed')
    / nullif(count(*), 0), 1
  )                                                      as completion_rate_pct,
  count(*) filter (where mode = 'short')                 as quick_sessions,
  count(*) filter (where mode = 'long')                  as deep_dive_sessions,
  avg(duration_ms) filter (where status = 'completed')   as avg_duration_ms,
  count(distinct country_code)                           as unique_countries,
  count(distinct ip_hash)                                as unique_visitors
from sessions;

create or replace view analytics_by_country as
select
  country_code,
  country,
  count(*)                                               as total_sessions,
  count(*) filter (where status = 'completed')           as completed,
  round(
    100.0 * count(*) filter (where status = 'completed')
    / nullif(count(*), 0), 1
  )                                                      as completion_rate_pct
from sessions
where country_code is not null
group by country_code, country
order by total_sessions desc;

create or replace view analytics_archetypes as
select
  archetype_name,
  count(*) as total,
  round(100.0 * count(*) / nullif((select count(*) from session_results), 0), 1) as pct
from session_results
where archetype_name is not null
group by archetype_name
order by total desc;

create or replace view analytics_daily as
select
  date_trunc('day', started_at)::date as day,
  count(*)                            as sessions,
  count(*) filter (where status = 'completed') as completed,
  count(distinct ip_hash)             as unique_visitors
from sessions
group by day
order by day desc;
