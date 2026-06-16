-- ================================================================
-- DPH Database Schema
-- Supabase SQL Editor에 붙여넣기하여 실행하세요.
-- ================================================================

-- Enable UUID extension (Supabase 기본 활성화)
create extension if not exists "uuid-ossp";

-- ─── Projects ────────────────────────────────────────────────────
create table if not exists projects (
  id            uuid primary key default uuid_generate_v4(),
  title         text not null,
  description   text not null default '',
  stage_width   numeric not null default 10,
  stage_height  numeric not null default 8,
  invite_code   text not null unique,
  password      text not null,
  owner_id      uuid not null references auth.users(id) on delete cascade,
  is_favorite   boolean not null default false,
  formation_count integer not null default 0,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- ─── Project Members ─────────────────────────────────────────────
create table if not exists project_members (
  id          uuid primary key default uuid_generate_v4(),
  project_id  uuid not null references projects(id) on delete cascade,
  user_id     uuid not null references auth.users(id) on delete cascade,
  name        text not null,
  color       text not null default '#6C3AED',
  role        text not null check (role in ('owner', 'editor', 'viewer')) default 'viewer',
  dancer_role text not null default '댄서',
  unique (project_id, user_id)
);

-- ─── Formations ──────────────────────────────────────────────────
create table if not exists formations (
  id          uuid primary key default uuid_generate_v4(),
  project_id  uuid not null references projects(id) on delete cascade,
  name        text not null,
  "order"     integer not null default 0,
  duration    numeric not null default 8,
  positions   jsonb not null default '[]',
  created_at  timestamptz not null default now()
);

-- ─── Notices ─────────────────────────────────────────────────────
create table if not exists notices (
  id          uuid primary key default uuid_generate_v4(),
  project_id  uuid references projects(id) on delete cascade,
  title       text not null,
  content     text not null,
  author_id   uuid not null references auth.users(id) on delete cascade,
  author_name text not null,
  is_pinned   boolean not null default false,
  attachments jsonb not null default '[]',
  created_at  timestamptz not null default now()
);

create table if not exists notice_comments (
  id          uuid primary key default uuid_generate_v4(),
  notice_id   uuid not null references notices(id) on delete cascade,
  author_name text not null,
  content     text not null,
  created_at  timestamptz not null default now()
);

-- ─── Schedule Events ─────────────────────────────────────────────
create table if not exists schedule_events (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  project_id  uuid references projects(id) on delete cascade,
  title       text not null,
  date        date not null,
  start_time  text not null,
  end_time    text not null,
  type        text not null check (type in ('리허설', '공연', '회의', '기타')),
  place       text not null default '',
  created_at  timestamptz not null default now()
);

-- ─── Q&A Posts ───────────────────────────────────────────────────
create table if not exists qna_posts (
  id           uuid primary key default uuid_generate_v4(),
  title        text not null,
  content      text not null,
  author_id    uuid not null references auth.users(id) on delete cascade,
  author_name  text not null,
  is_anonymous boolean not null default false,
  status       text not null check (status in ('waiting', 'answered')) default 'waiting',
  views        integer not null default 0,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create table if not exists qna_replies (
  id          uuid primary key default uuid_generate_v4(),
  post_id     uuid not null references qna_posts(id) on delete cascade,
  content     text not null,
  author_id   uuid not null references auth.users(id) on delete cascade,
  author_name text not null,
  is_admin    boolean not null default false,
  created_at  timestamptz not null default now()
);

-- ================================================================
-- Row Level Security (RLS)
-- ================================================================

alter table projects         enable row level security;
alter table project_members  enable row level security;
alter table formations       enable row level security;
alter table notices          enable row level security;
alter table notice_comments  enable row level security;
alter table schedule_events  enable row level security;
alter table qna_posts        enable row level security;
alter table qna_replies      enable row level security;

-- FastAPI service role key는 RLS를 우회하므로 아래 정책은
-- 프론트엔드가 직접 Supabase에 접근할 때를 대비한 기본 보안입니다.

-- projects: 멤버만 조회 가능
create policy "members can view project" on projects
  for select using (
    exists (
      select 1 from project_members
      where project_members.project_id = projects.id
        and project_members.user_id = auth.uid()
    )
  );

-- project_members: 같은 프로젝트 멤버끼리 조회 가능
create policy "members can view members" on project_members
  for select using (
    exists (
      select 1 from project_members pm2
      where pm2.project_id = project_members.project_id
        and pm2.user_id = auth.uid()
    )
  );

-- formations: 같은 프로젝트 멤버만 조회 가능
create policy "members can view formations" on formations
  for select using (
    exists (
      select 1 from project_members
      where project_members.project_id = formations.project_id
        and project_members.user_id = auth.uid()
    )
  );

-- notices: 로그인한 사용자는 전체 공지 조회 가능
create policy "authenticated can view notices" on notices
  for select using (auth.uid() is not null);

create policy "authenticated can view comments" on notice_comments
  for select using (auth.uid() is not null);

-- schedule_events: 본인 일정 또는 같은 프로젝트 멤버 일정
create policy "view own or project events" on schedule_events
  for select using (
    user_id = auth.uid()
    or exists (
      select 1 from project_members
      where project_members.project_id = schedule_events.project_id
        and project_members.user_id = auth.uid()
    )
  );

-- qna: 로그인한 사용자 전체 조회 가능
create policy "authenticated can view qna" on qna_posts
  for select using (auth.uid() is not null);

create policy "authenticated can view replies" on qna_replies
  for select using (auth.uid() is not null);

-- ================================================================
-- updated_at 자동 갱신 트리거
-- ================================================================

create or replace function update_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger trg_projects_updated_at
  before update on projects
  for each row execute function update_updated_at();

create trigger trg_qna_posts_updated_at
  before update on qna_posts
  for each row execute function update_updated_at();
