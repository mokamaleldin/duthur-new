create or replace function public.handle_admin_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if lower(coalesce(new.email, '')) in ('duthurco@gmail.com', 'mohammed.kamal.eliwa@gmail.com') then
    insert into public.profiles (id, email, role)
    values (new.id, lower(new.email), 'admin')
    on conflict (id) do update set email = excluded.email, role = 'admin';
  end if;
  return new;
end;
$$;

drop trigger if exists on_auth_admin_user_created on auth.users;
create trigger on_auth_admin_user_created
after insert or update of email on auth.users
for each row execute function public.handle_admin_user();

insert into public.profiles (id, email, role)
select id, lower(email), 'admin'
from auth.users
where lower(coalesce(email, '')) in ('duthurco@gmail.com', 'mohammed.kamal.eliwa@gmail.com')
on conflict (id) do update set email = excluded.email, role = 'admin';

revoke execute on function public.handle_admin_user() from public, anon, authenticated;
revoke execute on function public.is_admin() from public, anon;
grant execute on function public.is_admin() to authenticated, service_role;
