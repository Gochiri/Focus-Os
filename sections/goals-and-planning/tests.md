# Test Instructions: Goals & Planning

These test-writing instructions are **framework-agnostic**. Adapt them to your testing setup.

## Overview

Test the goal management system with SMART/RPM fields, Kanban board, status changes, milestones, and linked tasks.

---

## User Flow Tests

### Flow 1: Create a New Goal

**Scenario:** User creates a goal with SMART criteria

#### Success Path

**Setup:**
- User is on goals page
- Kanban board is displayed

**Steps:**
1. User clicks "Nueva meta" button
2. User enters title: "Lanzar app móvil"
3. User enters description: "Publicar en App Store y Play Store"
4. User sets due date: March 15
5. User adds tags: "Producto", "Q1"
6. User fills SMART fields (optional)
7. User clicks "Crear"

**Expected Results:**
- [ ] Modal/form opens for goal creation
- [ ] All fields accept input
- [ ] After submit, goal appears in "Por iniciar" column
- [ ] Success feedback shown
- [ ] Goal shows 0% progress initially

#### Failure Path: Server Error

**Steps:**
1. User fills valid goal data
2. User clicks "Crear"
3. Server returns error

**Expected Results:**
- [ ] Error message: "Error al crear la meta. Intenta de nuevo."
- [ ] Form data preserved
- [ ] User can retry

### Flow 2: Move Goal Between Statuses

**Scenario:** User drags goal from "Por iniciar" to "En progreso"

#### Success Path

**Setup:**
- Goal exists in "Por iniciar" column

**Steps:**
1. User drags goal card
2. User drops in "En progreso" column
3. Status updates

**Expected Results:**
- [ ] Goal card moves visually during drag
- [ ] After drop, goal is in new column
- [ ] Status saved to database
- [ ] Column counts update

### Flow 3: Track Progress via Milestones

**Scenario:** User completes milestones to track goal progress

#### Success Path

**Setup:**
- Goal exists with 4 milestones (all incomplete)

**Steps:**
1. User views goal detail
2. User clicks checkbox on first milestone
3. Milestone marked complete

**Expected Results:**
- [ ] Checkbox shows checked state
- [ ] Progress recalculates: 1/4 = 25%
- [ ] Progress bar updates
- [ ] Changes saved

### Flow 4: Create Task from Goal

**Scenario:** User creates a linked task from goal detail

#### Success Path

**Setup:**
- Goal exists
- User is viewing goal detail

**Steps:**
1. User clicks "Agregar tarea"
2. User enters task title: "Diseñar onboarding"
3. User clicks "Crear"

**Expected Results:**
- [ ] Task input appears
- [ ] Task created and linked to goal
- [ ] Task appears in linkedTasks list
- [ ] Task also appears in Tasks & Priorities section

---

## Empty State Tests

### Primary Empty State

**Scenario:** User has no goals yet

**Setup:**
- Goals array is empty (`[]`)

**Expected Results:**
- [ ] Shows heading: "No hay metas todavía"
- [ ] Shows description: "Define tu primera meta para empezar"
- [ ] Shows button: "Nueva meta"
- [ ] Clicking button opens creation form
- [ ] Kanban columns show empty placeholder

### Empty Kanban Column

**Scenario:** A status column has no goals

**Setup:**
- Goals exist but none have status "completada"

**Expected Results:**
- [ ] "Completada" column shows: "No hay metas completadas"
- [ ] Other columns render normally
- [ ] User can drag goals into empty column

### Goal with No Tasks

**Scenario:** Goal has milestones but no linked tasks

**Setup:**
- Goal exists with milestones
- linkedTasks is empty (`[]`)

**Expected Results:**
- [ ] Goal detail renders correctly
- [ ] Tasks section shows: "Sin tareas vinculadas"
- [ ] "Agregar tarea" button is visible
- [ ] Clicking button allows adding task

---

## Component Interaction Tests

### GoalCard

**Renders correctly:**
- [ ] Displays goal title
- [ ] Shows progress percentage and bar
- [ ] Shows due date formatted: "Vence 15 mar"
- [ ] Shows tags as pills
- [ ] Shows status icon

**User interactions:**
- [ ] Clicking card calls `onView` with goal id
- [ ] Menu button shows edit/delete options
- [ ] Dragging initiates drag-and-drop

### GoalKanban

**Renders correctly:**
- [ ] Shows 4 columns: Por iniciar, En progreso, Pausada, Completada
- [ ] Each column shows goal count
- [ ] Goals distributed to correct columns

**User interactions:**
- [ ] Drag-and-drop between columns works
- [ ] Drop calls `onStatusChange` with new status

---

## Edge Cases

- [ ] Goal with very long title truncates properly
- [ ] Works with 1 goal and 50+ goals
- [ ] Due date in past shows "(vencida)" indicator
- [ ] Goal at 100% progress shows completed styling
- [ ] Deleting goal with tasks shows confirmation warning
- [ ] SMART/RPM fields are optional (can be empty)

---

## Sample Test Data

```typescript
const mockGoal = {
  id: "goal-1",
  title: "Lanzar la app móvil",
  description: "Publicar en App Store y Play Store",
  status: "en_progreso",
  progress: 65,
  dueDate: "2026-03-15",
  tags: ["Producto", "Q1"],
  smart: {
    specific: "Lanzar en ambas tiendas",
    measurable: "1000 descargas primer mes",
    achievable: "Equipo de 3 devs",
    relevant: "Core del negocio",
    timeBound: "Q1 2026"
  },
  rpm: {
    result: "App publicada y funcionando",
    purpose: "Llegar a usuarios móviles",
    massiveActionPlan: "Sprint de 6 semanas"
  },
  milestones: [
    { id: "m1", title: "Diseño completado", completed: true },
    { id: "m2", title: "MVP funcional", completed: true },
    { id: "m3", title: "Beta testing", completed: false },
    { id: "m4", title: "Publicación", completed: false }
  ],
  linkedTasks: [
    { id: "t1", title: "Diseñar onboarding", completed: true },
    { id: "t2", title: "Implementar auth", completed: false }
  ]
};

// Empty states
const mockEmptyGoals = [];
const mockGoalWithNoTasks = { ...mockGoal, linkedTasks: [] };
```
