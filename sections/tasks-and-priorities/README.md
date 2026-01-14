# Tasks & Priorities

## Overview

Gestión de tareas con priorización automática Pareto calculada por IA. Dos vistas principales: prioridad (destacando el 20% de alto impacto) y calendario (deadlines + bloques de trabajo). Sistema de dependencias entre tareas que bloquea el inicio de tareas vinculadas hasta que se completen los prerequisitos.

## User Flows

- Ver lista de tareas organizada por prioridad Pareto (alto impacto destacado arriba)
- Crear nueva tarea via modal/drawer
- Editar tarea existente
- Definir dependencias entre tareas (tarea A bloquea tarea B)
- Ver indicador de tareas bloqueadas por dependencias no completadas
- Cambiar entre vista prioridad y vista calendario
- Programar bloques de trabajo en el calendario
- Filtrar tareas por proyecto o etiquetas
- Acciones rápidas: completar, posponer, eliminar, duplicar, cambiar prioridad

## Design Decisions

- High-impact tasks (20%) visually separated with "Alto Impacto" section header
- Task cards show all key info at a glance: title, priority badge, deadline, tags, progress
- Blocked tasks show lock icon and cannot be started
- Quick actions accessible without opening task detail
- Calendar view shows both deadlines and scheduled work blocks

## Data Used

**Entities:** Task, Project, Tag, WorkBlock

**From global model:** Task entity is the core, references Goal optionally

## Visual Reference

See `screenshot.png` for the target UI design (if available).

## Components Provided

- `TaskCard.tsx` — Individual task display with actions and status
- `TaskFilters.tsx` — Project dropdown and tag filter pills
- `TaskPriorityView.tsx` — Main view with priority sections
- `TaskCalendarView.tsx` — Calendar month view with tasks
- `CalendarDay.tsx` — Individual day cell in calendar

## Callback Props

| Callback | Description |
|----------|-------------|
| `onCreateTask` | Called when user clicks to create new task |
| `onEditTask` | Called when user clicks to edit a task |
| `onDeleteTask` | Called when user clicks to delete a task |
| `onCompleteTask` | Called when user marks task complete |
| `onPostponeTask` | Called when user changes deadline |
| `onDuplicateTask` | Called when user duplicates task |
| `onChangePriority` | Called when user changes priority |
| `onChangeView` | Called when switching priority/calendar |
| `onFilterByProject` | Called when filtering by project |
| `onFilterByTags` | Called when filtering by tags |
