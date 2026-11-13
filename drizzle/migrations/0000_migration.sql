-- Roles
create type public.app_role as enum ('admin', 'user');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null,
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

create policy "Users read own roles" on public.user_roles for select to authenticated
  using (user_id = auth.uid() or public.has_role(auth.uid(), 'admin'));

-- First user to sign up becomes admin automatically
create or replace function public.handle_first_admin()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if not exists (select 1 from public.user_roles where role = 'admin') then
    insert into public.user_roles (user_id, role) values (new.id, 'admin');
  end if;
  return new;
end;
$$;
create trigger on_auth_user_created_first_admin
  after insert on auth.users for each row execute function public.handle_first_admin();

-- Packages (nacional, internacional, crucero, hotel)
create table public.packages (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  category text not null check (category in ('nacional','internacional','crucero','hotel')),
  region text,
  title text not null,
  destination text not null,
  summary text not null default '',
  description text not null default '',
  duration_days int not null default 1,
  duration_nights int not null default 0,
  price_pen numeric(10,2),
  price_usd numeric(10,2),
  image_url text not null default '/images/hero-machu-picchu.jpg',
  gallery text[] not null default '{}',
  includes text[] not null default '{}',
  not_includes text[] not null default '{}',
  itinerary jsonb not null default '[]'::jsonb,
  policies text not null default '',
  badge text,
  operator text,
  stars int,
  location text,
  amenities text[] not null default '{}',
  is_offer boolean not null default false,
  offer_ends_at timestamptz,
  offer_discount int,
  is_published boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select on public.packages to anon;
grant select, insert, update, delete on public.packages to authenticated;
grant all on public.packages to service_role;
alter table public.packages enable row level security;
create policy "Public reads published packages" on public.packages for select to anon, authenticated
  using (is_published = true or public.has_role(auth.uid(), 'admin'));
create policy "Admins insert packages" on public.packages for insert to authenticated
  with check (public.has_role(auth.uid(), 'admin'));
create policy "Admins update packages" on public.packages for update to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));
create policy "Admins delete packages" on public.packages for delete to authenticated
  using (public.has_role(auth.uid(), 'admin'));

create or replace function public.touch_updated_at()
returns trigger language plpgsql set search_path = public as $$
begin new.updated_at = now(); return new; end; $$;
create trigger packages_touch before update on public.packages for each row execute function public.touch_updated_at();

-- Quote requests
create table public.quote_requests (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text not null,
  service_type text not null,
  destination text,
  origin text,
  departure_date date,
  return_date date,
  adults int not null default 1,
  children int not null default 0,
  budget text,
  comments text,
  package_title text,
  status text not null default 'nueva',
  created_at timestamptz not null default now()
);
grant insert on public.quote_requests to anon;
grant select, insert, update, delete on public.quote_requests to authenticated;
grant all on public.quote_requests to service_role;
alter table public.quote_requests enable row level security;
create policy "Anyone can submit a quote" on public.quote_requests for insert to anon, authenticated
  with check (
    char_length(full_name) between 2 and 120 and char_length(email) between 5 and 255
    and char_length(phone) between 6 and 30 and char_length(coalesce(comments,'')) <= 2000
  );
create policy "Admins read quotes" on public.quote_requests for select to authenticated
  using (public.has_role(auth.uid(), 'admin'));
create policy "Admins update quotes" on public.quote_requests for update to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));
create policy "Admins delete quotes" on public.quote_requests for delete to authenticated
  using (public.has_role(auth.uid(), 'admin'));
