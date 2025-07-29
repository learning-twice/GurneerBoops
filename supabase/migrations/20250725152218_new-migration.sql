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