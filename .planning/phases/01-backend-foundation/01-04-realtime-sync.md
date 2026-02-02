# Plan 01-04: Real-time Sync Implementation

**Goal**: Enable real-time updates across multiple clients and implement automatic progress calculations in the database.

## Proposed Changes

### 1. Database Infrastructure (Supabase)
- Add triggers to calculate `progress` automatically:
    - `tasks` progress should be updated when child items (if any, though not in schema yet) change, but for now, we can have a trigger that updates `projects` progress when `tasks` status changes.
    - `projects` progress: Average of associated tasks' progress.
    - `goals` progress: Average of associated projects' progress (or milestones).
- Enable Realtime for `goals`, `projects`, and `tasks` tables in Supabase.

### 2. Service Layer Updates
- Add `subscribeToGoals`, `subscribeToProjects`, `subscribeToTasks` methods to their respective services.
- These methods will use `supabase.channel()` to listen for `INSERT`, `UPDATE`, and `DELETE` events.

### 3. Frontend Integration
- Update `GoalsPage`, `TasksPage`, and other relevant components to use these subscriptions.
- Ensure that when a change is received via Realtime, the local state is updated efficiently.

## Success Criteria
1. Changes made in one tab reflect in another without manual refresh.
2. Updating a task to "completed" automatically updates the parent project's and goal's progress values in the database.
3. The frontend reflects these calculated progress values in real-time.
