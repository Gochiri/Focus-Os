# Milestone 3: Goals & Planning

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation), Milestone 2 (Tasks & Priorities) complete

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

Implement the Goals & Planning feature — SMART goal system with RPM methodology for structuring objectives with purpose and massive action plans.

## Overview

This section enables users to create and manage goals using proven frameworks. Goals are structured with SMART criteria (Specific, Measurable, Achievable, Relevant, Time-bound) and RPM methodology (Result, Purpose, Massive Action Plan). Users can track progress through milestones and linked tasks.

**Key Functionality:**
- Create goals with SMART fields and RPM structure
- View goals in Kanban board with 4 status columns
- Move goals between statuses via drag-and-drop
- Track progress via milestones and linked tasks
- Switch between Kanban, Timeline, and List views
- Create tasks directly from a goal

## Recommended Approach: Test-Driven Development

Before implementing this section, **write tests first** based on the test specifications provided.

See `product-plan/sections/goals-and-planning/tests.md` for detailed test-writing instructions including:
- Key user flows to test (success and failure paths)
- Specific UI elements, button labels, and interactions to verify
- Expected behaviors and assertions

**TDD Workflow:**
1. Read `tests.md` and write failing tests for the key user flows
2. Implement the feature to make tests pass
3. Refactor while keeping tests green

## What to Implement

### Components

Copy the section components from `product-plan/sections/goals-and-planning/components/`:

- `GoalCard.tsx` — Goal card with progress, tags, due date
- `GoalKanban.tsx` — Kanban board with 4 columns

### Data Layer

The components expect these data shapes:

```typescript
interface Goal {
  id: string
  title: string
  description: string
  status: 'por_iniciar' | 'en_progreso' | 'pausada' | 'completada'
  progress: number
  dueDate: string
  tags: string[]
  smart: {
    specific: string
    measurable: string
    achievable: string
    relevant: string
    timeBound: string
  }
  rpm: {
    result: string
    purpose: string
    massiveActionPlan: string
  }
  milestones: Array<{ id: string; title: string; completed: boolean }>
  linkedTasks: Array<{ id: string; title: string; completed: boolean }>
}
```

You'll need to:
- Create API endpoints for CRUD operations on goals
- Link goals to tasks (sync with Tasks & Priorities)
- Calculate progress from milestones and linked tasks

### Callbacks

Wire up these user actions:

| Callback | Description |
|----------|-------------|
| `onCreate` | Open goal creation form |
| `onView` | View goal details |
| `onEdit` | Edit goal |
| `onDelete` | Delete goal (with confirmation) |
| `onStatusChange` | Move goal to different status column |
| `onToggleMilestone` | Mark milestone as complete/incomplete |
| `onCreateTask` | Create task linked to this goal |
| `onViewModeChange` | Switch between Kanban/Timeline/List |

### Empty States

Implement empty state UI for when no records exist yet:

- **No goals yet:** Show helpful message and CTA to create first goal
- **Empty status column:** Show placeholder in Kanban column
- **Goal with no tasks:** Show prompt to add tasks to the goal

## Files to Reference

- `product-plan/sections/goals-and-planning/README.md` — Feature overview
- `product-plan/sections/goals-and-planning/tests.md` — Test-writing instructions
- `product-plan/sections/goals-and-planning/components/` — React components
- `product-plan/sections/goals-and-planning/types.ts` — TypeScript interfaces
- `product-plan/sections/goals-and-planning/sample-data.json` — Test data
- `product-plan/sections/goals-and-planning/screenshot.png` — Visual reference

## Expected User Flows

### Flow 1: Create a New Goal

1. User clicks "Nueva meta" button
2. User fills in title, description, due date, tags
3. User fills in SMART fields (optional)
4. User fills in RPM fields (optional)
5. User clicks "Crear" to save
4. **Outcome:** New goal appears in "Por iniciar" column

### Flow 2: Move Goal Status

1. User drags goal card from "Por iniciar" column
2. User drops goal in "En progreso" column
3. Goal status updates in database
4. **Outcome:** Goal moved to new status, Kanban reflects change

### Flow 3: Track Progress via Milestones

1. User views goal detail
2. User clicks checkbox on a milestone
3. Milestone marked complete, progress recalculates
4. **Outcome:** Progress bar updates based on completed milestones

### Flow 4: Create Task from Goal

1. User views goal detail
2. User clicks "Agregar tarea" button
3. User enters task title
4. Task created and linked to goal
4. **Outcome:** Task appears in Tasks & Priorities with goal reference

## Done When

- [ ] Tests written for key user flows (success and failure paths)
- [ ] All tests pass
- [ ] Goals display in Kanban with 4 columns
- [ ] CRUD operations work (create, read, update, delete)
- [ ] Drag-and-drop status change works
- [ ] SMART and RPM fields save correctly
- [ ] Milestones toggle and update progress
- [ ] Tasks can be created from goals (sync with Tasks section)
- [ ] Empty states display properly
- [ ] View modes work (Kanban, Timeline, List)
- [ ] Matches the visual design
- [ ] Responsive on mobile
