-- Initial schema for Focus AI

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Goals Table
create table public.goals (
    id uuid primary key default uuid_generate_v4(),
    title text not null,
    description text,
    status text not null default 'por_iniciar',
    progress integer not null default 0,
    due_date timestamp with time zone,
    tags text[] default '{}',
    smart jsonb default '{}'::jsonb,
    rpm jsonb default '{}'::jsonb,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

-- Projects Table
create table public.projects (
    id uuid primary key default uuid_generate_v4(),
    goal_id uuid references public.goals(id) on delete set null,
    name text not null,
    color text default '#3b82f6',
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

-- Tasks Table
create table public.tasks (
    id uuid primary key default uuid_generate_v4(),
    project_id uuid references public.projects(id) on delete set null,
    goal_id uuid references public.goals(id) on delete set null,
    title text not null,
    notes text,
    priority text not null default 'medium',
    status text not null default 'pending',
    deadline timestamp with time zone,
    estimated_minutes integer default 0,
    progress integer not null default 0,
    blocked_by text[] default '{}',
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

-- Tags Table
create table public.tags (
    id uuid primary key default uuid_generate_v4(),
    name text not null unique,
    color text default '#6b7280'
);

-- Task Tags (Many-to-Many)
create table public.task_tags (
    task_id uuid references public.tasks(id) on delete cascade,
    tag_id uuid references public.tags(id) on delete cascade,
    primary key (task_id, tag_id)
);

-- Milestones (Linked to Goals)
create table public.milestones (
    id uuid primary key default uuid_generate_v4(),
    goal_id uuid references public.goals(id) on delete cascade,
    title text not null,
    completed boolean not null default false,
    created_at timestamp with time zone default now()
);

-- Focus Sessions
create table public.focus_sessions (
    id uuid primary key default uuid_generate_v4(),
    task_id uuid references public.tasks(id) on delete set null,
    start_time timestamp with time zone not null,
    end_time timestamp with time zone,
    duration_minutes integer not null default 0,
    break_minutes integer not null default 0,
    status text not null default 'in_progress',
    pause_count integer not null default 0,
    notes text,
    created_at timestamp with time zone default now()
);

-- Functions for automatic updated_at
create or replace function public.handle_updated_at()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

-- Triggers for updated_at
create trigger set_updated_at_goals
    before update on public.goals
    for each row execute function public.handle_updated_at();

create trigger set_updated_at_projects
    before update on public.projects
    for each row execute function public.handle_updated_at();

create trigger set_updated_at_tasks
    before update on public.tasks
    for each row execute function public.handle_updated_at();

-- RLS (Row Level Security) - Initial setup: disable for now or set simple policies
-- Since it's a personal app, we might just allow all for authenticated users or just all if it's local development
alter table public.goals enable row level security;
alter table public.projects enable row level security;
alter table public.tasks enable row level security;
alter table public.tags enable row level security;
alter table public.task_tags enable row level security;
alter table public.milestones enable row level security;
alter table public.focus_sessions enable row level security;

-- Policy: Allow all for now (Simplified for personal app)
create policy "Allow all for authenticated users" on public.goals
    for all using (true) with check (true);
create policy "Allow all for authenticated users" on public.projects
    for all using (true) with check (true);
create policy "Allow all for authenticated users" on public.tasks
    for all using (true) with check (true);
create policy "Allow all for authenticated users" on public.tags
    for all using (true) with check (true);
create policy "Allow all for authenticated users" on public.task_tags
    for all using (true) with check (true);
create policy "Allow all for authenticated users" on public.milestones
    for all using (true) with check (true);
create policy "Allow all for authenticated users" on public.focus_sessions
    for all using (true) with check (true);
