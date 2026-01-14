# Milestone 2: Tasks & Priorities

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) complete

---

## About These Instructions

**What you're receiving:**
- Finished UI designs (React components with full styling)
- Data model definitions (TypeScript types and sample data)
- UI/UX specifications (user flows, requirements, screenshots)
- Design system tokens (colors, typography, spacing)
- Test-writing instructions for each section (for TDD approach)

**What you need to build:**
- Backend API endpoints and database schema
- Authentication and authorization
- Data fetching and state management
- Business logic and validation
- Integration of the provided UI components with real data

**Important guidelines:**
- **DO NOT** redesign or restyle the provided components — use them as-is
- **DO** wire up the callback props to your routing and API calls
- **DO** replace sample data with real data from your backend
- **DO** implement proper error handling and loading states
- **DO** implement empty states when no records exist (first-time users, after deletions)
- **DO** use test-driven development — write tests first using `tests.md` instructions
- The components are props-based and ready to integrate — focus on the backend and data layer

---

## Goal

Implement the Tasks & Priorities feature — core task management with automatic Pareto prioritization that identifies the 20% of high-impact tasks.

## Overview

This section enables users to manage their tasks with AI-powered Pareto prioritization. The system automatically identifies which 20% of tasks will generate 80% of results, visually highlighting them. Users can view tasks by priority or in a calendar view, create dependencies between tasks, and perform quick actions.

**Key Functionality:**
- View tasks organized by Pareto priority (high impact highlighted at top)
- Create, edit, and delete tasks with full details
- Define dependencies between tasks (task A blocks task B)
- Switch between priority view and calendar view
- Filter tasks by project or tags
- Quick actions: complete, postpone, duplicate, change priority

## Recommended Approach: Test-Driven Development

Before implementing this section, **write tests first** based on the test specifications provided.

See `product-plan/sections/tasks-and-priorities/tests.md` for detailed test-writing instructions including:
- Key user flows to test (success and failure paths)
- Specific UI elements, button labels, and interactions to verify
- Expected behaviors and assertions

**TDD Workflow:**
1. Read `tests.md` and write failing tests for the key user flows
2. Implement the feature to make tests pass
3. Refactor while keeping tests green

## What to Implement

### Components

Copy the section components from `product-plan/sections/tasks-and-priorities/components/`:

- `TaskCard.tsx` — Individual task display with actions
- `TaskFilters.tsx` — Project and tag filtering
- `TaskPriorityView.tsx` — Main priority-based view
- `TaskCalendarView.tsx` — Calendar view with deadlines
- `CalendarDay.tsx` — Individual day cell in calendar

### Data Layer

The components expect these data shapes:

```typescript
interface Task {
  id: string
  title: string
  notes: string
  priority: 'high' | 'medium' | 'low'
  status: 'pending' | 'in_progress' | 'completed' | 'blocked'
  deadline: string
  estimatedMinutes: number
  progress: number
  projectId: string | null
  goalId: string | null
  tagIds: string[]
  blockedBy: string[]  // IDs of tasks that must complete first
}

interface Project {
  id: string
  name: string
  color: string
}

interface Tag {
  id: string
  name: string
  color: string
}
```

You'll need to:
- Create API endpoints for CRUD operations on tasks
- Implement Pareto priority calculation logic (consider deadline, dependencies, description)
- Store and manage projects and tags

### Callbacks

Wire up these user actions:

| Callback | Description |
|----------|-------------|
| `onCreateTask` | Open task creation modal/form |
| `onEditTask` | Open task editing with task ID |
| `onDeleteTask` | Delete task (with confirmation) |
| `onCompleteTask` | Mark task as completed |
| `onPostponeTask` | Change task deadline |
| `onDuplicateTask` | Create copy of task |
| `onChangePriority` | Manually override priority |
| `onChangeView` | Switch between priority/calendar |
| `onFilterByProject` | Filter by selected project |
| `onFilterByTags` | Filter by selected tags |

### Empty States

Implement empty state UI for when no records exist yet:

- **No tasks yet:** Show helpful message and CTA to create first task
- **No tasks match filter:** Show message to adjust filters with clear option
- **No tasks in calendar view:** Show empty calendar with prompt to add tasks

## Files to Reference

- `product-plan/sections/tasks-and-priorities/README.md` — Feature overview
- `product-plan/sections/tasks-and-priorities/tests.md` — Test-writing instructions
- `product-plan/sections/tasks-and-priorities/components/` — React components
- `product-plan/sections/tasks-and-priorities/types.ts` — TypeScript interfaces
- `product-plan/sections/tasks-and-priorities/sample-data.json` — Test data
- `product-plan/sections/tasks-and-priorities/screenshot.png` — Visual reference

## Expected User Flows

### Flow 1: View High-Impact Tasks

1. User navigates to Tasks & Priorities
2. User sees "Alto Impacto" section with highlighted high-priority tasks
3. User sees remaining tasks below in "Otras Tareas" section
4. **Outcome:** User can quickly identify which tasks matter most

### Flow 2: Create a New Task

1. User clicks "Nueva tarea" button
2. User fills in task title, notes, deadline, project, tags
3. User clicks "Crear" to save
4. **Outcome:** New task appears in list, AI calculates Pareto priority

### Flow 3: Complete a Task

1. User clicks checkbox or "Completar" on a task
2. Task status changes to completed
3. If task was blocking others, blocked tasks become unblocked
4. **Outcome:** Task marked complete, dependent tasks updated

### Flow 4: Filter Tasks

1. User clicks project dropdown or tag filter
2. User selects project or tags to filter by
3. Task list updates to show only matching tasks
4. **Outcome:** Filtered view of relevant tasks

## Done When

- [ ] Tests written for key user flows (success and failure paths)
- [ ] All tests pass
- [ ] Tasks display with Pareto prioritization
- [ ] CRUD operations work (create, read, update, delete)
- [ ] Dependencies work (blocked tasks show indicator)
- [ ] Empty states display properly when no tasks exist
- [ ] Filtering by project and tags works
- [ ] Calendar view shows deadlines
- [ ] Quick actions work
- [ ] Matches the visual design
- [ ] Responsive on mobile
