insert into public.albums (slug, title, artist, release_date, description)
values (
  'midnights',
  'Midnights',
  'Taylor Swift',
  '2022-10-21',
  'Midnights track rating with friends.'
)
on conflict (slug) do update
set
  title = excluded.title,
  artist = excluded.artist,
  release_date = excluded.release_date,
  description = excluded.description;

with album as (
  select id from public.albums where slug = 'midnights'
)
update public.tracks t
set
  track_no = 21,
  duration_seconds = 234,
  edition = 'extra',
  is_bonus = true
from album
where t.album_id = album.id
  and t.title = 'Hits Different';

with album as (
  select id from public.albums where slug = 'midnights'
)
insert into public.tracks (album_id, track_no, title, duration_seconds, edition, is_bonus)
select
  album.id,
  track_no,
  title,
  duration_seconds,
  edition,
  is_bonus
from album,
(values
  (1, 'Lavender Haze', 202, 'standard', false),
  (2, 'Maroon', 218, 'standard', false),
  (3, 'Anti-Hero', 200, 'standard', false),
  (4, 'Snow On The Beach', 256, 'standard', false),
  (5, 'You''re On Your Own, Kid', 194, 'standard', false),
  (6, 'Midnight Rain', 174, 'standard', false),
  (7, 'Question...?', 210, 'standard', false),
  (8, 'Vigilante Shit', 164, 'standard', false),
  (9, 'Bejeweled', 194, 'standard', false),
  (10, 'Labyrinth', 247, 'standard', false),
  (11, 'Karma', 204, 'standard', false),
  (12, 'Sweet Nothing', 188, 'standard', false),
  (13, 'Mastermind', 191, 'standard', false),
  (14, 'The Great War', 240, 'extra', true),
  (15, 'Bigger Than The Whole Sky', 218, 'extra', true),
  (16, 'Paris', 196, 'extra', true),
  (17, 'High Infidelity', 231, 'extra', true),
  (18, 'Glitch', 148, 'extra', true),
  (19, 'Would''ve Could''ve, Should''ve', 260, 'extra', true),
  (20, 'Dear Reader', 225, 'extra', true),
  (21, 'Hits Different', 234, 'extra', true)
) as v(track_no, title, duration_seconds, edition, is_bonus)
on conflict (album_id, track_no) do update
set
  title = excluded.title,
  duration_seconds = excluded.duration_seconds,
  edition = excluded.edition,
  is_bonus = excluded.is_bonus;
