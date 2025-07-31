create table profiles (
  id uuid references auth.users(id) on delete cascade not null primary key,
  updated_at timestamp with time zone,
  email text unique,
  full_name text,
  avatar_url text,
);


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

--- Connections

create table connections (
  id uuid primary key default gen_random_uuid(),
  inviter_id uuid not null references profiles(id) on delete cascade,
  invitee_id uuid not null references profiles(id) on delete cascade,
  created_at timestamp with time zone default now(),
  unique (inviter_id, invitee_id)
);

alter table connections enable row level security;

create policy "Users can view their own connections"
on connections
as permissive
for select
to authenticated
using (
  (select auth.uid()) in (inviter_id, invitee_id)
);

--- allow acces to users in profiles.... 
create policy "Users can view profiles of their connections"
on public.profiles
as permissive
for select
to authenticated
using (
  profiles.id in (
    select inviter_id from public.connections where invitee_id = (select auth.uid())
    union
    select invitee_id from public.connections where inviter_id = (select auth.uid())
  )
);


--- Invites
create table invites (
  id uuid primary key default gen_random_uuid(),
  inviter_id uuid not null references profiles(id) on delete cascade,
  used boolean default false,
  used_by uuid references profiles(id),
  created_at timestamp with time zone default now(),
  expires_at timestamp with time zone
);

alter table invites enable row level security;

create policy "Enable insert for invites -- authenticated users only"
on invites
as PERMISSIVE
for INSERT
to authenticated
with check (
  true
);

create policy "Enable users to view their own invites"
on invites
as PERMISSIVE
for SELECT
to authenticated
using (
  (select auth.uid()) = inviter_id
);