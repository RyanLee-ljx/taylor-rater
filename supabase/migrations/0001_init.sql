create extension if not exists "pgcrypto";

create table if not exists public.albums (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  artist text not null,
  release_date date,
  cover_url text,
  description text,
  created_at timestamptz not null default now()
);

create table if not exists public.tracks (
  id uuid primary key default gen_random_uuid(),
  album_id uuid not null references public.albums(id) on delete cascade,
  track_no smallint not null,
  title text not null,
  duration_seconds int,
  edition text not null default 'standard',
  is_bonus boolean not null default false,
  created_at timestamptz not null default now(),
  unique (id, album_id),
  unique (album_id, track_no),
  unique (album_id, title)
);

create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  album_id uuid not null references public.albums(id) on delete cascade,
  auth_uid uuid not null default auth.uid(),
  nickname text not null,
  invite_code text unique default encode(gen_random_bytes(6), 'hex'),
  avatar_color text,
  submitted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (id, album_id),
  unique (album_id, auth_uid)
);

create table if not exists public.ratings (
  id uuid primary key default gen_random_uuid(),
  album_id uuid not null references public.albums(id) on delete cascade,
  user_id uuid not null,
  track_id uuid not null,
  score numeric(3,1) not null,
  comment text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint ratings_score_range check (score >= 0 and score <= 10),
  constraint ratings_score_one_decimal check (score * 10 = trunc(score * 10)),
  constraint ratings_comment_length check (comment is null or char_length(comment) <= 280),

  foreign key (user_id, album_id) references public.users(id, album_id) on delete cascade,
  foreign key (track_id, album_id) references public.tracks(id, album_id) on delete cascade,
  unique (album_id, user_id, track_id)
);

create or replace view public.album_track_leaderboard as
select
  t.album_id,
  t.id as track_id,
  t.track_no,
  t.title,
  t.edition,
  t.is_bonus,
  count(r.id)::int as rating_count,
  round(avg(r.score)::numeric, 2) as avg_score,
  row_number() over (
    partition by t.album_id
    order by avg(r.score) desc nulls last, count(r.id) desc, t.track_no asc
  ) as position
from public.tracks t
left join public.ratings r on r.track_id = t.id and r.album_id = t.album_id
group by t.album_id, t.id, t.track_no, t.title, t.edition, t.is_bonus;

create or replace view public.track_review_wall as
select
  r.album_id,
  r.track_id,
  u.nickname,
  u.avatar_color,
  r.score,
  r.comment,
  r.updated_at
from public.ratings r
join public.users u on u.id = r.user_id
where r.comment is not null and length(trim(r.comment)) > 0
order by r.updated_at desc;
