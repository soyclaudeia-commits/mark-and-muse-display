create table public.complaints (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  document_type text not null default 'DNI',
  document_number text not null,
  email text not null,
  phone text not null,
  address text,
  kind text not null check (kind in ('reclamo','queja')),
  service text,
  amount text,
  detail text not null,
  request text not null,
  status text not null default 'pendiente',
  created_at timestamptz not null default now()
);
grant insert on public.complaints to anon;
grant select, insert, update, delete on public.complaints to authenticated;
grant all on public.complaints to service_role;
alter table public.complaints enable row level security;
create policy "Anyone can file a complaint" on public.complaints for insert to anon, authenticated
  with check (char_length(full_name) between 2 and 120 and char_length(detail) between 5 and 3000 and char_length(request) between 2 and 2000);
create policy "Admins read complaints" on public.complaints for select to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins update complaints" on public.complaints for update to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));
create policy "Admins delete complaints" on public.complaints for delete to authenticated using (public.has_role(auth.uid(), 'admin'));
