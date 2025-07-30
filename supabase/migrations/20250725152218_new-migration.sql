create policy "Enable users to view their own data only"
on "public"."profiles"
as PERMISSIVE
for SELECT
to authenticated
using (
  (select auth.uid()) = id
);

create policy "Enable insert for authenticated users only"
on "public"."profiles"
as PERMISSIVE
for INSERT
to authenticated
with check (
  true
);

-- Allow users to UPDATE their own profile
create policy "Enable users to update their own data only"
on "public"."profiles"
as PERMISSIVE
for UPDATE
to authenticated
using (
  (select auth.uid()) = id
)
with check (
  (select auth.uid()) = id
);

-- Allow users to DELETE their own profile
create policy "Enable users to delete their own data only"
on "public"."profiles"
as PERMISSIVE
for DELETE
to authenticated
using (
  (select auth.uid()) = id
);

create table connections (
  id uuid primary key default gen_random_uuid(),
  user_a uuid not null references profiles(id) on delete cascade,
  user_b uuid not null references profiles(id) on delete cascade,
  created_at timestamp with time zone default now(),
  unique (user_a, user_b)
);

create policy "Users can view their own connections"
on connections
as permissive
for select
to authenticated
using (
  (select auth.uid()) = user_a
  or (select auth.uid()) = user_b
);

--- allow acces to users in profiles.... 
create policy "Users can view profiles of their connections"
on public.profiles
as permissive
for select
to authenticated
using (
  exists (
    select 1
    from public.connections
    where (
      (user_a = (select auth.uid()) and user_b = profiles.id) or
      (user_b = (select auth.uid()) and user_a = profiles.id)
    )
  )
);

create table invites (
  id uuid primary key default gen_random_uuid(),
  inviter_id uuid not null references profiles(id) on delete cascade,
  used boolean default false,
  used_by uuid references profiles(id),
  created_at timestamp with time zone default now(),
  expires_at timestamp with time zone
);

create policy "Enable users to view their own invites"
on invites
as PERMISSIVE
for SELECT
to authenticated
using (
  (select auth.uid()) = inviter_id
);