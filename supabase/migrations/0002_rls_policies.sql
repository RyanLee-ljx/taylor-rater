alter table public.albums enable row level security;
alter table public.tracks enable row level security;
alter table public.users enable row level security;
alter table public.ratings enable row level security;

create policy "Albums are publicly readable"
on public.albums for select
using (true);

create policy "Tracks are publicly readable"
on public.tracks for select
using (true);

create policy "Users are publicly readable for review wall"
on public.users for select
using (true);

create policy "Users can create their own profile"
on public.users for insert
with check (auth.uid() = auth_uid);

create policy "Users can update their own profile"
on public.users for update
using (auth.uid() = auth_uid)
with check (auth.uid() = auth_uid);

create policy "Ratings are publicly readable for leaderboard"
on public.ratings for select
using (true);

create policy "Users can create their own ratings"
on public.ratings for insert
with check (
  exists (
    select 1
    from public.users u
    where u.id = ratings.user_id
      and u.album_id = ratings.album_id
      and u.auth_uid = auth.uid()
  )
);

create policy "Users can update their own ratings"
on public.ratings for update
using (
  exists (
    select 1
    from public.users u
    where u.id = ratings.user_id
      and u.album_id = ratings.album_id
      and u.auth_uid = auth.uid()
  )
)
with check (
  exists (
    select 1
    from public.users u
    where u.id = ratings.user_id
      and u.album_id = ratings.album_id
      and u.auth_uid = auth.uid()
  )
);
