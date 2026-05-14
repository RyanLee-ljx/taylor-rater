insert into public.albums (slug, title, artist, release_date, cover_url, description)
values (
  'midnights',
  'Midnights',
  'Taylor Swift',
  '2022-10-21',
  '/images/midnights-cover.jpg',
  'Midnights track rating with friends.'
)
on conflict (slug) do update
set
  title = excluded.title,
  artist = excluded.artist,
  release_date = excluded.release_date,
  cover_url = excluded.cover_url,
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

insert into public.albums (slug, title, artist, release_date, cover_url, description)
values (
  'the-tortured-poets-department',
  'THE TORTURED POETS DEPARTMENT',
  'Taylor Swift',
  '2024-04-19',
  '/images/ttpd-cover.jpg',
  'THE TORTURED POETS DEPARTMENT and The Anthology track rating with friends.'
)
on conflict (slug) do update
set
  title = excluded.title,
  artist = excluded.artist,
  release_date = excluded.release_date,
  cover_url = excluded.cover_url,
  description = excluded.description;

with album as (
  select id from public.albums where slug = 'the-tortured-poets-department'
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
  (1, 'Fortnight', 228, 'standard', false),
  (2, 'The Tortured Poets Department', 293, 'standard', false),
  (3, 'My Boy Only Breaks His Favorite Toys', 203, 'standard', false),
  (4, 'Down Bad', 261, 'standard', false),
  (5, 'So Long, London', 262, 'standard', false),
  (6, 'But Daddy I Love Him', 340, 'standard', false),
  (7, 'Fresh Out The Slammer', 210, 'standard', false),
  (8, 'Florida!!!', 215, 'standard', false),
  (9, 'Guilty as Sin?', 254, 'standard', false),
  (10, 'Who''s Afraid of Little Old Me?', 334, 'standard', false),
  (11, 'I Can Fix Him (No Really I Can)', 156, 'standard', false),
  (12, 'loml', 277, 'standard', false),
  (13, 'I Can Do It With a Broken Heart', 218, 'standard', false),
  (14, 'The Smallest Man Who Ever Lived', 245, 'standard', false),
  (15, 'The Alchemy', 196, 'standard', false),
  (16, 'Clara Bow', 216, 'standard', false),
  (17, 'The Black Dog', 238, 'extra', true),
  (18, 'imgonnagetyouback', 222, 'extra', true),
  (19, 'The Albatross', 183, 'extra', true),
  (20, 'Chloe or Sam or Sophia or Marcus', 213, 'extra', true),
  (21, 'How Did It End?', 238, 'extra', true),
  (22, 'So High School', 228, 'extra', true),
  (23, 'I Hate It Here', 243, 'extra', true),
  (24, 'thanK you aIMee', 263, 'extra', true),
  (25, 'I Look in People''s Windows', 131, 'extra', true),
  (26, 'The Prophecy', 249, 'extra', true),
  (27, 'Cassandra', 240, 'extra', true),
  (28, 'Peter', 283, 'extra', true),
  (29, 'The Bolter', 238, 'extra', true),
  (30, 'Robin', 240, 'extra', true),
  (31, 'The Manuscript', 224, 'extra', true)
) as v(track_no, title, duration_seconds, edition, is_bonus)
on conflict (album_id, track_no) do update
set
  title = excluded.title,
  duration_seconds = excluded.duration_seconds,
  edition = excluded.edition,
  is_bonus = excluded.is_bonus;
