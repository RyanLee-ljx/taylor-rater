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
  (14, 'Hits Different', 234, 'extra', true)
) as v(track_no, title, duration_seconds, edition, is_bonus)
on conflict (album_id, track_no) do update
set
  title = excluded.title,
  duration_seconds = excluded.duration_seconds,
  edition = excluded.edition,
  is_bonus = excluded.is_bonus;
