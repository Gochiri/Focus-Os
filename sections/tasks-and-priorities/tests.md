# Test Instructions: Tasks & Priorities

These test-writing instructions are **framework-agnostic**. Adapt them to your testing setup (Jest, Vitest, Playwright, Cypress, React Testing Library, etc.).

## Overview

Test the task management system with Pareto prioritization, CRUD operations, dependencies, filtering, and calendar view.

---

## User Flow Tests

### Flow 1: View High-Impact Tasks

**Scenario:** User views their task list organized by Pareto priority

#### Success Path

**Setup:**
- User has 10 tasks with varying priorities
- 2 tasks are high priority, 3 medium, 5 low

**Steps:**
1. User navigates to `/tasks`
2. User sees "Alto Impacto" section header
3. User sees high-priority tasks in that section
4. User sees "Otras Tareas" section below

**Expected Results:**
- [ ] "Alto Impacto" section displays at top
- [ ] High-priority tasks (2) appear in that section
- [ ] "Otras Tareas" section shows remaining tasks
- [ ] Each task card shows: title, priority badge, deadline, tags

### Flow 2: Create a New Task

**Scenario:** User creates a new task with full details

#### Success Path

**Setup:**
- User is on task list page
- Projects and tags exist in system

**Steps:**
1. User clicks "Nueva tarea" button
2. User enters title: "Preparar presentación"
3. User enters notes: "Incluir métricas del Q4"
4. User selects deadline: tomorrow
5. User selects project: "Marketing"
6. User adds tags: "urgente", "Q1"
7. User clicks "Crear" button

**Expected Results:**
- [ ] Modal/form opens with empty fields
- [ ] All fields accept input correctly
- [ ] "Crear" button is enabled when title filled
- [ ] After submit, task appears in list
- [ ] Task has AI-calculated Pareto priority
- [ ] Success feedback shown (toast or redirect)

#### Failure Path: Missing Required Fields

**Setup:**
- Task creation form is open

**Steps:**
1. User leaves title empty
2. User clicks "Crear" button

**Expected Results:**
- [ ] Validation error shows: "El título es requerido"
- [ ] Form is not submitted
- [ ] Focus moves to title field

#### Failure Path: Server Error

**Setup:**
- API will return 500 error

**Steps:**
1. User fills in valid task data
2. User clicks "Crear"
3. Server returns error

**Expected Results:**
- [ ] Error message appears: "Error al crear la tarea. Intenta de nuevo."
- [ ] Form data is preserved (not cleared)
- [ ] User can retry submission

### Flow 3: Complete a Task

**Scenario:** User marks a task as completed

#### Success Path

**Setup:**
- Task exists with status "pending"
- Task is blocking another task

**Steps:**
1. User clicks checkbox on task card
2. Task status changes to "completed"

**Expected Results:**
- [ ] Task checkbox shows checked state
- [ ] Task card shows completed styling (strikethrough or faded)
- [ ] Blocked task becomes unblocked (lock icon removed)
- [ ] Success feedback shown

### Flow 4: Filter Tasks by Project

**Scenario:** User filters task list to show only one project

#### Success Path

**Setup:**
- 10 tasks exist across 3 projects
- Project "Marketing" has 3 tasks

**Steps:**
1. User clicks project dropdown
2. User selects "Marketing"
3. Task list updates

**Expected Results:**
- [ ] Only 3 tasks from "Marketing" displayed
- [ ] Filter indicator shows active filter
- [ ] "Limpiar filtros" option is visible

### Flow 5: View Blocked Task

**Scenario:** User sees that a task is blocked by dependency

#### Success Path

**Setup:**
- Task A exists (incomplete)
- Task B exists with `blockedBy: [taskA.id]`

**Steps:**
1. User views task list
2. User sees Task B

**Expected Results:**
- [ ] Task B shows lock icon
- [ ] Task B shows "Bloqueada por: Task A"
- [ ] Task B cannot be marked complete
- [ ] Clicking complete shows explanation

---

## Empty State Tests

### Primary Empty State

**Scenario:** User has no tasks yet (first-time or all deleted)

**Setup:**
- Tasks array is empty (`[]`)

**Expected Results:**
- [ ] Shows heading: "No hay tareas"
- [ ] Shows description: "Crea tu primera tarea para empezar"
- [ ] Shows button: "Nueva tarea"
- [ ] Clicking "Nueva tarea" opens creation form
- [ ] No blank or broken UI

### Filtered Empty State

**Scenario:** Filter returns no results

**Setup:**
- Tasks exist but none match selected project

**Expected Results:**
- [ ] Shows message: "No hay tareas en este proyecto"
- [ ] Shows "Limpiar filtros" link
- [ ] Clicking clear shows all tasks again

### Calendar Empty State

**Scenario:** Calendar month has no tasks

**Setup:**
- User is viewing calendar for a month with no deadlines

**Expected Results:**
- [ ] Calendar renders correctly with empty days
- [ ] Message shows: "Sin tareas este mes"
- [ ] User can navigate to other months

---

## Component Interaction Tests

### TaskCard

**Renders correctly:**
- [ ] Displays task title
- [ ] Shows priority badge with correct color (high=red, medium=amber, low=green)
- [ ] Shows deadline formatted: "Vence 15 ene"
- [ ] Shows tags as pills
- [ ] Shows progress bar if progress > 0

**User interactions:**
- [ ] Clicking checkbox calls `onCompleteTask` with task id
- [ ] Clicking edit icon calls `onEditTask` with task id
- [ ] Clicking delete icon calls `onDeleteTask` with task id
- [ ] Hover shows action buttons

### TaskFilters

**Renders correctly:**
- [ ] Project dropdown shows all projects
- [ ] Tag filter shows available tags

**User interactions:**
- [ ] Selecting project calls `onFilterByProject`
- [ ] Selecting tags calls `onFilterByTags`
- [ ] Clear button resets all filters

---

## Edge Cases

- [ ] Handles very long task titles with truncation
- [ ] Works with 1 task and 100+ tasks
- [ ] Deadline in past shows "Vencida" indicator
- [ ] Task with no deadline shows "Sin fecha"
- [ ] Task with 0% progress shows empty progress bar
- [ ] Transition from empty to first task works smoothly
- [ ] Deleting last task shows empty state

---

## Accessibility Checks

- [ ] Task cards are keyboard accessible
- [ ] Checkbox has proper label
- [ ] Filter dropdowns work with keyboard
- [ ] Focus management after actions
- [ ] Screen reader announces task status changes

---

## Sample Test Data

```typescript
const mockTask = {
  id: "task-1",
  title: "Preparar presentación Q1",
  notes: "Incluir métricas de ventas",
  priority: "high",
  status: "pending",
  deadline: "2026-01-20",
  estimatedMinutes: 120,
  progress: 30,
  projectId: "proj-1",
  goalId: null,
  tagIds: ["tag-1"],
  blockedBy: []
};

const mockProject = {
  id: "proj-1",
  name: "Marketing",
  color: "violet"
};

const mockTag = {
  id: "tag-1",
  name: "urgente",
  color: "red"
};

// Empty state
const mockEmptyTasks = [];

// Blocked task
const mockBlockedTask = {
  ...mockTask,
  id: "task-2",
  title: "Revisar presentación",
  blockedBy: ["task-1"]
};
```
