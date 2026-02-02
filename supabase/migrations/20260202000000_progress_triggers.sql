-- Migration: Automatic progress calculation triggers

-- 1. Function to calculate project progress based on tasks
create or replace function public.calculate_project_progress()
returns trigger as $$
declare
    v_project_id uuid;
    v_progress float;
begin
    if (tg_op = 'DELETE') then
        v_project_id = old.project_id;
    else
        v_project_id = new.project_id;
    end if;

    if v_project_id is not null then
        select coalesce(avg(progress), 0) into v_progress
        from public.tasks
        where project_id = v_project_id;

        update public.projects
        set progress = round(v_progress)
        where id = v_project_id;
    end if;

    return null;
end;
$$ language plpgsql;

-- 2. Function to calculate goal progress based on projects
create or replace function public.calculate_goal_progress_from_projects()
returns trigger as $$
declare
    v_goal_id uuid;
    v_progress float;
begin
    if (tg_op = 'DELETE') then
        v_goal_id = old.goal_id;
    else
        v_goal_id = new.goal_id;
    end if;

    if v_goal_id is not null then
        -- We calculate goal progress as the average of its projects' progress
        select coalesce(avg(progress), 0) into v_progress
        from public.projects
        where goal_id = v_goal_id;

        update public.goals
        set progress = round(v_progress)
        where id = v_goal_id;
    end if;

    return null;
end;
$$ language plpgsql;

-- 3. Triggers for tasks -> project progress
create trigger trigger_calculate_project_progress
after insert or update of progress or delete on public.tasks
for each row execute function public.calculate_project_progress();

-- 4. Triggers for projects -> goal progress
create trigger trigger_calculate_goal_progress
after insert or update of progress or delete on public.projects
for each row execute function public.calculate_goal_progress_from_projects();

-- 5. Enable Realtime for core tables
alter publication supabase_realtime add table public.goals;
alter publication supabase_realtime add table public.projects;
alter publication supabase_realtime add table public.tasks;
alter publication supabase_realtime add table public.milestones;
