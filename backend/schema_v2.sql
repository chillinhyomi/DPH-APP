-- ================================================================
-- DPH Schema v2 - profiles, music_files 추가
-- Supabase SQL Editor에서 실행하세요.
-- ================================================================

-- ─── Profiles ────────────────────────────────────────────────────
create table if not exists profiles (
  id           uuid primary key references auth.users(id) on delete cascade,
  name         text not null default '',
  email        text not null default '',
  avatar_color text not null default '#6C3AED',
  dancer_role  text not null default '',
  updated_at   timestamptz not null default now()
);

alter table profiles enable row level security;

create policy "users can view own profile" on profiles
  for select using (auth.uid() = id);

create policy "users can update own profile" on profiles
  for update using (auth.uid() = id);

create policy "users can insert own profile" on profiles
  for insert with check (auth.uid() = id);

-- 로그인 시 자동으로 profiles 행 생성하는 트리거
create or replace function handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into profiles (id, name, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    coalesce(new.email, '')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();

-- ─── Music Files ─────────────────────────────────────────────────
create table if not exists music_files (
  id           uuid primary key default uuid_generate_v4(),
  project_id   uuid not null references projects(id) on delete cascade,
  file_name    text not null,
  file_url     text not null,
  storage_path text not null,
  uploaded_by  uuid not null references auth.users(id) on delete cascade,
  uploaded_at  timestamptz not null default now()
);

alter table music_files enable row level security;

create policy "members can view music" on music_files
  for select using (
    exists (
      select 1 from project_members
      where project_members.project_id = music_files.project_id
        and project_members.user_id = auth.uid()
    )
  );
