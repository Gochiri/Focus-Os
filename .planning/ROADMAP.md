# Roadmap: Focus AI

## Overview

Focus AI transforms from a frontend prototype with mock data into a fully functional personal productivity app. The roadmap progresses from backend infrastructure through the entity hierarchy (Goals -> Projects -> Tasks), then adds the feature layers (Focus Sessions, Coach IA, Dashboard) that consume this data. Each phase delivers a coherent, verifiable capability that unlocks the next.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Backend Foundation** - Supabase setup with database schema and real-time sync
- [ ] **Phase 2: Goals (Metas)** - Full goal management with SMART/RPM frameworks
- [ ] **Phase 3: Projects** - Project management linked to goals with progress tracking
- [ ] **Phase 4: Tasks** - Complete task system with states, priorities, tags, dependencies
- [ ] **Phase 5: Focus Sessions** - Pomodoro timer linked to tasks with time tracking
- [ ] **Phase 6: Coach IA** - AI coach with full context and conversation capabilities
- [ ] **Phase 7: Dashboard** - Real metrics, progress visualization, and daily summary

## Phase Details

### Phase 1: Backend Foundation
**Goal**: Establish persistent data layer that enables all subsequent features
**Depends on**: Nothing (first phase)
**Requirements**: DATA-01, DATA-02, DATA-03, DATA-04
**Success Criteria** (what must be TRUE):
  1. Supabase project is configured and accessible from the frontend
  2. Database schema exists for goals, projects, tasks with proper relationships
  3. Data created in the app persists across browser sessions
  4. Changes made in one browser tab appear in another tab within seconds
  5. Progress percentages calculate automatically as tasks complete
**Plans**: TBD

Plans:
- [x] 01-01: Supabase Initialization and Schema Definition
- [x] 01-02: Goal Service and Persistence
- [x] 01-03: Project and Task Services
- [x] 01-04: Real-time Sync implementation

### Phase 2: Goals (Metas)
**Goal**: Users can define and track life goals using SMART and RPM methodologies
**Depends on**: Phase 1
**Requirements**: META-01, META-02, META-03, META-04, META-05, META-06, META-07, META-08
**Success Criteria** (what must be TRUE):
  1. User can create a new goal with title and description
  2. User can fill in SMART fields (Specific, Measurable, Achievable, Relevant, Time-bound)
  3. User can fill in RPM fields (Result, Purpose, Massive Action Plan)
  4. User can add, edit, and remove milestones within a goal
  5. User can see goal progress percentage (derived from projects/tasks)
  6. User can filter goals by status (active, completed, all)
**Plans**: TBD

Plans:
- [x] 02-01: Goal Creation and SMART/RPM details
- [x] 02-02: Goal Progress and Project Linking

### Phase 3: Projects
**Goal**: Users can organize work into projects that contribute to goals
**Depends on**: Phase 2
**Requirements**: PROJ-01, PROJ-02, PROJ-03, PROJ-04, PROJ-05
**Success Criteria** (what must be TRUE):
  1. User can create a project and link it to an existing goal
  2. User can edit project details (title, description, linked goal)
  3. User can delete a project
  4. User can see project progress percentage (calculated from tasks)
  5. User can filter projects by which goal they belong to
**Plans**: TBD

Plans:
- [x] 03-01: Task-Project Linking (Infrastructure already done in P2)
- [ ] 03-02: Projects Management View (TBD)

### Phase 4: Tasks
**Goal**: Users can manage granular work items with full workflow control
**Depends on**: Phase 3
**Requirements**: TASK-01, TASK-02, TASK-03, TASK-04, TASK-05, TASK-06, TASK-07, TASK-08, TASK-09
**Success Criteria** (what must be TRUE):
  1. User can create a task linked to a project
  2. User can set task status (pending, in progress, completed, blocked)
  3. User can set priority (high, medium, low) and deadline
  4. User can add and remove tags from tasks
  5. User can mark task X as blocked by task Y
  6. User can filter tasks by project, status, priority, and tags
**Plans**: TBD

Plans:
- [x] 04-01: Enhanced Task CRUD and Goal/Project Linking
- [ ] 04-02: TBD

### Phase 5: Focus Sessions
**Goal**: Users can track focused work time against specific tasks
**Depends on**: Phase 4
**Requirements**: FOCUS-01, FOCUS-02, FOCUS-03, FOCUS-04, FOCUS-05
**Success Criteria** (what must be TRUE):
  1. User can start a pomodoro timer with configurable duration
  2. User can select which task they are working on during a session
  3. User can pause and resume an active focus session
  4. User can see history of completed focus sessions
  5. User can see total focused time aggregated by task, project, and goal
**Plans**: TBD

Plans:
- [ ] 05-01: TBD

### Phase 6: Coach IA
**Goal**: Users have an AI assistant that understands their full context and helps them stay productive
**Depends on**: Phase 5
**Requirements**: COACH-01, COACH-02, COACH-03, COACH-04, COACH-05, COACH-06, COACH-07
**Success Criteria** (what must be TRUE):
  1. User can open a chat interface and send messages to the coach
  2. Coach responses reflect knowledge of user's goals, projects, tasks, and progress
  3. When asked "what should I do now?", coach provides prioritized suggestions
  4. When user says "I'm stuck on X", coach offers actionable unblocking strategies
  5. When user lacks motivation, coach provides encouragement based on their progress
  6. Coach proactively surfaces relevant suggestions based on context
**Plans**: TBD

Plans:
- [ ] 06-01: TBD
- [ ] 06-02: TBD

### Phase 7: Dashboard
**Goal**: Users can see their productivity at a glance and understand daily priorities
**Depends on**: Phase 6
**Requirements**: DASH-01, DASH-02, DASH-03, DASH-04
**Success Criteria** (what must be TRUE):
  1. Dashboard shows real progress toward each goal (not mock data)
  2. Dashboard displays productivity metrics: tasks completed, time focused
  3. User can see their streak of consecutive productive days
  4. Dashboard shows a daily summary: what was done, what remains
**Plans**: TBD

Plans:
- [ ] 07-01: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Backend Foundation | 4/4 | Completed | 2026-02-02 |
| 2. Goals (Metas) | 2/2 | Completed | 2026-02-02 |
| 3. Projects | 1/1 | Completed | 2026-02-02 |
| 4. Tasks | 1/1 | Completed | 2026-02-02 |
| 5. Focus Sessions | 1/1 | Completed | 2026-02-02 |
| 6. Coach IA | 1/1 | Completed | 2026-02-02 |
| 7. Dashboard | 1/1 | Completed | 2026-02-02 |
| 3. Projects | 0/? | Not started | - |
| 4. Tasks | 0/? | Not started | - |
| 5. Focus Sessions | 0/? | Not started | - |
| 6. Coach IA | 0/? | Not started | - |
| 7. Dashboard | 0/? | Not started | - |

---

*Roadmap created: 2025-01-29*
*Last updated: 2025-01-29*
